/**
 * وقت لبعض | Time for All - Admin Dashboard Logic
 * Controls platform governance, solidarity approvals, volunteer assignments, and settings.
 */

document.addEventListener('DOMContentLoaded', () => {
  setupAdminTabs();
  renderAdminOverview();
  renderAdminSolidarity();
  renderAdminUsers();
  renderAdminServices();
  renderAdminRequests();
  renderAdminLedger();
  setupAdminSettings();
});

// Admin Tabs Navigation
function setupAdminTabs() {
  const tabs = document.querySelectorAll('[data-admin-tab]');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-admin-tab');
      switchAdminTab(targetId);
    });
  });
}

window.switchAdminTab = function(targetId) {
  const tabs = document.querySelectorAll('[data-admin-tab]');
  const contents = document.querySelectorAll('.admin-tab-content');

  tabs.forEach(t => t.classList.toggle('active', t.getAttribute('data-admin-tab') === targetId));
  contents.forEach(c => c.classList.toggle('active', c.id === targetId));

  // Refresh data on tab switch
  if (targetId === 'tab-solidarity') renderAdminSolidarity();
  if (targetId === 'tab-users') renderAdminUsers();
  if (targetId === 'tab-services') renderAdminServices();
  if (targetId === 'tab-requests') renderAdminRequests();
  if (targetId === 'tab-ledger') renderAdminLedger();
};

/**
 * 1. OVERVIEW
 */
function renderAdminOverview() {
  const users = Storage.getUsers();
  const services = Storage.getServices();
  const requests = Storage.getRequests();
  const fund = Storage.getSolidarityFund();
  const solApps = Storage.getSolidarityApplications();

  // Metrics
  document.getElementById('admin-stat-solidarity-avail').textContent = `${fund.availableHours || 0} س`;
  document.getElementById('admin-stat-users-count').textContent = users.length;
  document.getElementById('admin-stat-services-count').textContent = services.length;
  
  // Total hours exchanged
  const completedReqs = requests.filter(r => r.status === 'completed');
  const totalExchanged = completedReqs.reduce((sum, r) => sum + Number(r.hours), 0) + (fund.usedHours || 0);
  document.getElementById('admin-stat-hours-exchanged').textContent = `${totalExchanged} س`;

  // Badge in sidebar
  const pendingApps = solApps.filter(a => a.status === 'pending');
  const badge = document.getElementById('admin-solidarity-badge');
  if (badge) {
    if (pendingApps.length > 0) {
      badge.textContent = pendingApps.length;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }

  // Pending solidarity box
  const pendingBox = document.getElementById('admin-overview-pending-solidarity');
  if (pendingBox) {
    if (pendingApps.length === 0) {
      pendingBox.innerHTML = `<div style="text-align: center; color: var(--text-muted); padding: 18px;">لا توجد طلبات تكافل معلقة للمراجعة حالياً ✓</div>`;
    } else {
      pendingBox.innerHTML = pendingApps.map(a => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-color);">
          <div>
            <div style="font-weight: 700; color: var(--primary);">${a.applicantName} - ${a.assistanceType}</div>
            <div style="font-size: 0.8rem; color: var(--text-muted);">${a.city} • ⏱️ ${a.hoursNeeded} ساعات</div>
          </div>
          <button class="btn btn-primary btn-sm" onclick="switchAdminTab('tab-solidarity')">مراجعة</button>
        </div>
      `).join('');
    }
  }

  // Recent transactions box
  const recentTxBox = document.getElementById('admin-overview-recent-txs');
  if (recentTxBox) {
    const txs = Storage.getTransactions().slice(0, 4);
    recentTxBox.innerHTML = txs.map(t => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--border-color); font-size: 0.85rem;">
        <div>
          <div style="font-weight: 700;">${t.description}</div>
          <div style="color: var(--text-muted); font-size: 0.75rem;">${t.date}</div>
        </div>
        <span style="font-weight: 800; color: var(--primary);">${t.amount} ساعة</span>
      </div>
    `).join('');
  }
}

/**
 * 2. SOLIDARITY MANAGEMENT
 */
function renderAdminSolidarity() {
  const tbody = document.getElementById('admin-solidarity-tbody');
  if (!tbody) return;

  const apps = Storage.getSolidarityApplications();
  if (apps.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 24px;">لا توجد طلبات تكافل مسجلة.</td></tr>`;
    return;
  }

  tbody.innerHTML = apps.map(app => {
    let actions = '';
    if (app.status === 'pending') {
      actions = `
        <button class="btn btn-primary btn-sm" onclick="approveSolidarityApp('${app.id}')">اعتماد الطلب</button>
        <button class="btn btn-outline btn-sm" onclick="openAssignModal('${app.id}')">تعيين متطوع</button>
        <button class="btn btn-danger btn-sm" onclick="rejectSolidarityApp('${app.id}')">رفض</button>
      `;
    } else if (app.status === 'approved') {
      actions = `
        <button class="btn btn-primary btn-sm" onclick="openAssignModal('${app.id}')">تعيين متطوع</button>
      `;
    } else if (app.status === 'assigned') {
      actions = `
        <button class="btn btn-secondary btn-sm" onclick="completeSolidarityApp('${app.id}')" style="background:#eaf4ee; color:#2D6A4F; font-weight:700;">
          ✓ تأكيد الإتمام وصرف الساعات
        </button>
      `;
    } else if (app.status === 'completed') {
      actions = `<span style="color: #137333; font-weight: 700; font-size: 0.85rem;">مكتمل ومدعوم من الصندوق ✓</span>`;
    }

    return `
      <tr>
        <td style="font-weight: 700; color: var(--primary);">${app.applicantName}</td>
        <td style="font-size: 0.85rem;">${app.applicantPhone}</td>
        <td>${app.city}</td>
        <td>${app.assistanceType}</td>
        <td style="font-weight: 800;">⏱️ ${app.hoursNeeded} س</td>
        <td>${app.assignedVolunteerName ? '👤 ' + app.assignedVolunteerName : '<span style="color: var(--text-muted);">-</span>'}</td>
        <td><span class="badge ${getStatusClass(app.status)}">${app.status}</span></td>
        <td><div style="display: flex; gap: 6px; flex-wrap: wrap;">${actions}</div></td>
      </tr>
    `;
  }).join('');
}

function getStatusClass(status) {
  if (status === 'pending') return 'badge-pending';
  if (status === 'completed') return 'badge-completed';
  if (status === 'assigned' || status === 'approved') return 'badge-scheduled';
  return 'badge-rejected';
}

window.approveSolidarityApp = function(appId) {
  const app = Storage.getSolidarityAppById(appId);
  if (!app) return;
  app.status = 'approved';
  Storage.saveSolidarityApplication(app);
  showToast('تم اعتماد الطلب', 'الطلب الآن بانتظار تكليف متطوع مناسب.');
  renderAdminSolidarity();
  renderAdminOverview();
};

window.rejectSolidarityApp = function(appId) {
  showConfirmModal('رفض الطلب', 'هل أنت متأكد من رفض هذا الطلب التكافلي؟', 'رفض الطلب', () => {
    const app = Storage.getSolidarityAppById(appId);
    if (!app) return;
    app.status = 'rejected';
    Storage.saveSolidarityApplication(app);
    showToast('تم الرفض', 'تم رفض الطلب التكافلي.');
    renderAdminSolidarity();
    renderAdminOverview();
  });
};

window.openAssignModal = function(appId) {
  const app = Storage.getSolidarityAppById(appId);
  if (!app) return;

  document.getElementById('assign-app-id').value = appId;
  const select = document.getElementById('volunteer-select');
  select.innerHTML = '<option value="">-- اختر المتطوع المناسب من الأعضاء --</option>';

  const users = Storage.getUsers().filter(u => u.role !== 'admin');
  users.forEach(u => {
    const opt = document.createElement('option');
    opt.value = u.id;
    opt.textContent = `${u.name} (مهارات: ${(u.skills || []).join('، ')})`;
    select.appendChild(opt);
  });

  const modal = document.getElementById('assign-volunteer-modal');
  if (modal) modal.classList.add('active');
};

window.closeAssignModal = function() {
  const modal = document.getElementById('assign-volunteer-modal');
  if (modal) modal.classList.remove('active');
};

document.getElementById('confirm-assign-btn')?.addEventListener('click', () => {
  const appId = document.getElementById('assign-app-id').value;
  const volunteerId = document.getElementById('volunteer-select').value;

  if (!volunteerId) {
    showToast('اختر متطوعاً', 'يرجى اختيار متطوع من القائمة', 'warning');
    return;
  }

  const app = Storage.getSolidarityAppById(appId);
  const volunteer = Storage.getUserById(volunteerId);

  if (app && volunteer) {
    app.status = 'assigned';
    app.assignedVolunteerId = volunteer.id;
    app.assignedVolunteerName = volunteer.name;
    Storage.saveSolidarityApplication(app);

    // Notify Volunteer
    Storage.addNotification(volunteer.id, {
      title: 'تكليف بمهمة تكافلية 🤝',
      message: `تم تكليفك رسمياً من إدارة المنصة بمساعدة "${app.applicantName}" في مجال ${app.assistanceType}. سيتم صرف ${app.hoursNeeded} ساعات لمحفظتك عند الإنجاز!`,
      type: 'solidarity',
      link: 'my-requests.html'
    });

    closeAssignModal();
    showToast('تم التكليف بنجاح', `تم تعيين المتطوع ${volunteer.name} وإرسال إشعار له.`);
    renderAdminSolidarity();
  }
});

window.completeSolidarityApp = function(appId) {
  const app = Storage.getSolidarityAppById(appId);
  if (!app || !app.assignedVolunteerId) return;

  const fund = Storage.getSolidarityFund();
  const hours = Number(app.hoursNeeded);

  if (fund.availableHours < hours) {
    showToast('عجز في رصيد التكافل', 'رصيد الصندوق المتاح حالياً لا يكفي لصرف الساعات للمتطوع.', 'error');
    return;
  }

  showConfirmModal(
    'تأكيد إتمام المهمة التكافلية وصرف الساعات',
    `هل تؤكد إنجاز المهمة لصالح ${app.applicantName}؟ سيتم خصم ${hours} ساعة من صندوق التكافل وإضافتها فوراً لمحفظة المتطوع (${app.assignedVolunteerName}).`,
    'تأكيد وصرف الساعات',
    () => {
      // Deduct from fund
      Storage.updateSolidarityFund({
        availableHours: fund.availableHours - hours,
        usedHours: (fund.usedHours || 0) + hours,
        supportedCount: (fund.supportedCount || 0) + 1
      });

      // Credit volunteer
      const volunteer = Storage.getUserById(app.assignedVolunteerId);
      const newBal = (volunteer.balance || 0) + hours;
      Storage.updateUser(volunteer.id, {
        balance: newBal,
        totalEarned: (volunteer.totalEarned || 0) + hours
      });

      // Log transaction
      Storage.addTransaction({
        userId: volunteer.id,
        type: 'earned',
        amount: hours,
        balanceAfter: newBal,
        description: `إنجاز مهمة تكافلية: ${app.assistanceType} لصالح ${app.applicantName}`,
        relatedUser: 'صندوق التكافل المجتمعي'
      });

      // Update app
      app.status = 'completed';
      Storage.saveSolidarityApplication(app);

      // Notification
      Storage.addNotification(volunteer.id, {
        title: 'تم صرف ساعاتك التكافلية! 🎉',
        message: `تمت إضافة ${hours} ساعات إلى رصيدك من صندوق التكافل تقديراً لمساعدتك لـ ${app.applicantName}. بارك الله في وقتك!`,
        type: 'credit',
        link: 'wallet.html'
      });

      showToast('اكتملت المهمة وصُرفت الساعات', `تم بنجاح تحويل ${hours} ساعة للمتطوع ${volunteer.name}.`);
      renderAdminSolidarity();
      renderAdminOverview();
    }
  );
};

/**
 * 3. USERS MANAGEMENT
 */
function renderAdminUsers() {
  const tbody = document.getElementById('admin-users-tbody');
  if (!tbody) return;

  const users = Storage.getUsers();
  tbody.innerHTML = users.map(u => `
    <tr>
      <td style="font-weight: 700; color: var(--primary); display: flex; align-items: center; gap: 8px;">
        <img src="${u.avatar}" style="width: 30px; height: 30px; border-radius: 50%; object-fit: cover;">
        ${u.name}
      </td>
      <td style="font-size: 0.85rem;">${u.email}</td>
      <td style="font-size: 0.85rem;">${u.university || '-'} / ${u.city || '-'}</td>
      <td><span class="badge ${u.role === 'admin' ? 'badge-solidarity' : 'badge-online'}">${u.role}</span></td>
      <td style="font-weight: 800; color: var(--primary);">⏱️ ${u.balance} س</td>
      <td style="font-size: 0.85rem;"><span style="color:#137333;">+${u.totalEarned || 0}</span> / <span style="color:#1967d2;">-${u.totalSpent || 0}</span></td>
      <td style="color: var(--accent); font-weight: 700;">${u.totalDonated || 0} س</td>
      <td>
        <button class="btn btn-outline btn-sm" onclick="grantBonusHours('${u.id}')">+ منح رصيد</button>
      </td>
    </tr>
  `).join('');
}

window.grantBonusHours = function(userId) {
  const user = Storage.getUserById(userId);
  if (!user) return;

  const hoursStr = prompt(`أدخل عدد الساعات التكريمية التي ترغب بمنحها لـ ${user.name}:`, "2");
  const hours = Number(hoursStr);
  if (isNaN(hours) || hours <= 0) return;

  const newBalance = user.balance + hours;
  Storage.updateUser(user.id, {
    balance: newBalance,
    totalEarned: (user.totalEarned || 0) + hours
  });

  Storage.addTransaction({
    userId: user.id,
    type: 'welcome',
    amount: hours,
    balanceAfter: newBalance,
    description: 'مكافأة ساعات تشجيعية من إدارة المبادرة',
    relatedUser: 'إدارة المنصة'
  });

  Storage.addNotification(user.id, {
    title: 'مكافأة ساعات من الإدارة! 🎁',
    message: `منحتك إدارة المبادرة ${hours} ساعات رصيد تقديراً لمشاركتك الإيجابية.`,
    type: 'credit',
    link: 'wallet.html'
  });

  showToast('تم منح الساعات', `تمت إضافة ${hours} ساعات لرصيد ${user.name}.`);
  renderAdminUsers();
};

/**
 * 4. SERVICES MANAGEMENT
 */
function renderAdminServices() {
  const tbody = document.getElementById('admin-services-tbody');
  if (!tbody) return;

  const services = Storage.getServices();
  tbody.innerHTML = services.map(s => `
    <tr>
      <td style="font-weight: 700; color: var(--primary);">${s.title}</td>
      <td>${s.providerName}</td>
      <td>${s.category}</td>
      <td style="font-weight: 700;">${s.duration} ساعات</td>
      <td><span class="badge ${s.type === 'online' ? 'badge-online' : 'badge-inperson'}">${s.type}</span></td>
      <td><span class="badge badge-completed">${s.status}</span></td>
      <td>
        <button class="btn btn-danger btn-sm" onclick="adminDeleteService('${s.id}')">حذف</button>
      </td>
    </tr>
  `).join('');
}

window.adminDeleteService = function(srvId) {
  showConfirmModal('حذف الخدمة', 'هل ترغب في حذف هذه الخدمة نهائياً من المنصة؟', 'حذف الخدمة', () => {
    Storage.deleteService(srvId);
    showToast('تم الحذف', 'تم حذف الخدمة من السوق.');
    renderAdminServices();
    renderAdminOverview();
  }, true);
};

/**
 * 5. REQUESTS MONITORING
 */
function renderAdminRequests() {
  const tbody = document.getElementById('admin-requests-tbody');
  if (!tbody) return;

  const requests = Storage.getRequests();
  tbody.innerHTML = requests.map(r => `
    <tr>
      <td style="font-weight: 700; color: var(--primary);">${r.serviceTitle}</td>
      <td>${r.requesterName}</td>
      <td>${r.providerName}</td>
      <td style="font-weight: 800;">${r.hours} س</td>
      <td style="font-size: 0.85rem;">${r.date}</td>
      <td>${r.isSolidarity ? '<span class="badge badge-solidarity">تكافل</span>' : '<span class="badge">تبادل مباشر</span>'}</td>
      <td><span class="badge ${getStatusClass(r.status)}">${r.status}</span></td>
    </tr>
  `).join('');
}

/**
 * 6. GLOBAL LEDGER
 */
function renderAdminLedger() {
  const tbody = document.getElementById('admin-ledger-tbody');
  if (!tbody) return;

  const txs = Storage.getTransactions();
  tbody.innerHTML = txs.map(t => {
    const user = Storage.getUserById(t.userId);
    const userName = user ? user.name : t.userId;

    return `
      <tr>
        <td style="font-size: 0.85rem; color: var(--text-muted);">${t.date}</td>
        <td style="font-weight: 700; color: var(--primary);">${userName}</td>
        <td><span class="badge">${t.type}</span></td>
        <td>${t.description}</td>
        <td style="font-weight: 800;">${t.amount} ساعة</td>
        <td style="color: var(--secondary); font-weight: 700;">${t.balanceAfter} ساعة</td>
      </tr>
    `;
  }).join('');
}

/**
 * 7. SETTINGS
 */
function setupAdminSettings() {
  const settings = Storage.getSettings();
  const bonusInput = document.getElementById('conf-welcome-bonus');
  const zeroSelect = document.getElementById('conf-zero-solidarity');

  if (bonusInput) bonusInput.value = settings.welcomeBonus || 2;
  if (zeroSelect) zeroSelect.value = String(settings.allowZeroBalanceSolidarity !== false);

  const form = document.getElementById('admin-settings-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const welcomeBonus = Number(bonusInput.value);
      const allowZeroBalanceSolidarity = zeroSelect.value === 'true';

      Storage.updateSettings({ welcomeBonus, allowZeroBalanceSolidarity });
      showToast('تم حفظ الإعدادات', 'تم تحديث سياسات المنصة بنجاح في LocalStorage!');
    });
  }
}
