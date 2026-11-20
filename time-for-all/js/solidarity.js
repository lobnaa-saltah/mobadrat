/**
 * وقت لبعض | Time for All - Community Solidarity Fund Logic
 * Manages hours donation flow and zero-balance solidarity requests.
 */

document.addEventListener('DOMContentLoaded', () => {
  renderFundStats();
  renderDonorBalance();
  setupPresetButtons();
  setupDonationForm();
  setupSolidarityRequestForm();
  renderSolidarityApplicationsTable();
});

function renderFundStats() {
  const fund = Storage.getSolidarityFund();
  document.getElementById('fund-stat-available').textContent = fund.availableHours || 0;
  document.getElementById('fund-stat-total').textContent = fund.totalDonatedHours || 0;
  document.getElementById('fund-stat-used').textContent = fund.usedHours || 0;
  document.getElementById('fund-stat-supported').textContent = fund.supportedCount || 0;
}

function renderDonorBalance() {
  const currentUser = Storage.getCurrentUser();
  const balanceEl = document.getElementById('donor-current-balance');
  if (balanceEl) {
    if (currentUser) {
      balanceEl.textContent = `${currentUser.balance} ساعات`;
    } else {
      balanceEl.innerHTML = `<a href="login.html" style="color: var(--primary); text-decoration: underline;">سجل الدخول لعرض رصيدك</a>`;
    }
  }

  // Pre-fill request form if logged in user has details
  if (currentUser) {
    const nameInput = document.getElementById('sol-name');
    const phoneInput = document.getElementById('sol-phone');
    const cityInput = document.getElementById('sol-city');

    if (nameInput && !nameInput.value) nameInput.value = currentUser.name;
    if (phoneInput && !phoneInput.value) phoneInput.value = currentUser.phone || '';
    if (cityInput && !cityInput.value) cityInput.value = currentUser.city || '';
  }
}

function setupPresetButtons() {
  const presetBtns = document.querySelectorAll('.preset-btn');
  const customInput = document.getElementById('custom-donation-hours');

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      presetBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const hours = btn.getAttribute('data-hours');
      if (customInput) customInput.value = hours;
    });
  });

  if (customInput) {
    customInput.addEventListener('input', () => {
      presetBtns.forEach(b => {
        if (b.getAttribute('data-hours') === customInput.value) {
          b.classList.add('active');
        } else {
          b.classList.remove('active');
        }
      });
    });
  }
}

function setupDonationForm() {
  const form = document.getElementById('solidarity-donation-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const currentUser = Storage.getCurrentUser();
    if (!currentUser) {
      showToast('تسجيل الدخول مطلوب', 'يرجى تسجيل الدخول أولاً لتتمكن من التبرع بالساعات', 'warning');
      setTimeout(() => window.location.href = 'login.html', 800);
      return;
    }

    const hours = Number(document.getElementById('custom-donation-hours').value);
    const note = document.getElementById('donation-note').value.trim();

    if (isNaN(hours) || hours <= 0) {
      showToast('قيمة غير صالحة', 'يرجى إدخال عدد ساعات صحيح أكبر من صفر', 'warning');
      return;
    }

    if (currentUser.balance < hours) {
      showToast('رصيد غير كافٍ', `رصيدك الحالي هو ${currentUser.balance} ساعة، ولا يمكنك التبرع بـ ${hours} ساعة.`, 'error');
      return;
    }

    showConfirmModal(
      'تأكيد التبرع لصندوق التكافل',
      `أنت على وشك التبرع بـ (${hours}) ساعة رصيد لصندوق التكافل المجتمعي لمساعدة غير القادرين. هل ترغب في المتابعة؟`,
      'تأكيد التبرع بالوقت',
      () => {
        const result = Storage.donateHours(currentUser.id, hours);
        if (result.success) {
          showToast('شكراً لعطائك العظيم! 💚', result.message, 'success');
          
          // Re-render
          renderFundStats();
          renderDonorBalance();
          document.getElementById('custom-donation-hours').value = '1';
          document.getElementById('donation-note').value = '';
        } else {
          showToast('فشل التبرع', result.message, 'error');
        }
      }
    );
  });
}

function setupSolidarityRequestForm() {
  const form = document.getElementById('solidarity-request-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('sol-name').value.trim();
    const phone = document.getElementById('sol-phone').value.trim();
    const assistanceType = document.getElementById('sol-cat').value;
    const hoursNeeded = Number(document.getElementById('sol-hours').value);
    const city = document.getElementById('sol-city').value.trim();
    const contactPreference = document.getElementById('sol-contact').value;
    const description = document.getElementById('sol-desc').value.trim();

    if (!name || !phone || !assistanceType || !city || !description) {
      showToast('حقول مطلوبة', 'يرجى ملء جميع الحقول الإلزامية التي تحمل علامة (*)', 'warning');
      return;
    }

    const newAppId = 'sol_app_' + Date.now();
    const newApp = {
      id: newAppId,
      applicantName: name,
      applicantEmail: 'applicant@waqt.org',
      applicantPhone: phone,
      city: city,
      assistanceType: assistanceType,
      hoursNeeded: hoursNeeded,
      description: description,
      contactPreference: contactPreference,
      status: 'pending',
      assignedVolunteerId: null,
      assignedVolunteerName: null,
      submittedAt: new Date().toISOString().split('T')[0],
      adminNotes: 'طلب جديد تم تسجيله عبر المنصة.'
    };

    Storage.saveSolidarityApplication(newApp);

    showToast(
      'تم استلام طلبك باعتزاز 🤝',
      'طلبك قيد المراجعة الفورية من إدارة الصندوق. سنتواصل معك هاتفياً لترتيب المتطوع المناسب دون أي مقابل مالي أو زمني.',
      'success',
      5000
    );

    form.reset();
    renderSolidarityApplicationsTable();
  });
}

function renderSolidarityApplicationsTable() {
  const tbody = document.getElementById('solidarity-apps-tbody');
  if (!tbody) return;

  const apps = Storage.getSolidarityApplications();

  if (apps.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 24px; color: var(--text-muted);">
          لا توجد طلبات تكافل مسجلة حالياً.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = apps.map(app => {
    let statusBadge = '';
    switch (app.status) {
      case 'pending':
        statusBadge = '<span class="badge badge-pending">قيد مراجعة الإدارة</span>';
        break;
      case 'approved':
        statusBadge = '<span class="badge" style="background:#e8f0fe; color:#1967d2;">معتمد - بانتظار متطوع</span>';
        break;
      case 'assigned':
        statusBadge = '<span class="badge badge-scheduled">تم تكليف متطوع</span>';
        break;
      case 'completed':
        statusBadge = '<span class="badge badge-completed">مكتمل ومدعوم بنجاح ✓</span>';
        break;
      case 'rejected':
        statusBadge = '<span class="badge badge-rejected">مرفوض</span>';
        break;
      default:
        statusBadge = `<span class="badge">${app.status}</span>`;
    }

    return `
      <tr>
        <td style="font-family: monospace; font-size: 0.8rem; color: var(--text-muted);">${app.id.slice(0, 11)}</td>
        <td style="font-weight: 700; color: var(--primary);">${app.applicantName}</td>
        <td>${app.assistanceType}</td>
        <td style="font-size: 0.85rem;">${app.city}</td>
        <td style="font-weight: 700;">⏱️ ${app.hoursNeeded} ساعات</td>
        <td>${app.assignedVolunteerName ? '👤 ' + app.assignedVolunteerName : '<span style="color: var(--text-muted);">قيد التعيين</span>'}</td>
        <td>${statusBadge}</td>
      </tr>
    `;
  }).join('');
}
