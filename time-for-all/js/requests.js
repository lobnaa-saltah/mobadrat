/**
 * وقت لبعض | Time for All - Service Requests Lifecycle Module
 * Handles incoming/outgoing requests, status progression, and hours transfers.
 */

let currentRequestTab = 'incoming';

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = Storage.getCurrentUser();
  if (!currentUser) {
    window.location.href = 'login.html';
    return;
  }

  // Populate sidebar
  const avatarEl = document.getElementById('sidebar-user-avatar');
  const nameEl = document.getElementById('sidebar-user-name');
  const cityEl = document.getElementById('sidebar-user-city');
  const balanceEl = document.getElementById('sidebar-balance-num');
  if (avatarEl) avatarEl.src = currentUser.avatar;
  if (nameEl) nameEl.textContent = currentUser.name;
  if (cityEl) cityEl.textContent = currentUser.city || 'القاهرة';
  if (balanceEl) balanceEl.textContent = currentUser.balance;

  renderRequests();
});

window.switchRequestTab = function(type) {
  currentRequestTab = type;
  document.getElementById('tab-incoming-btn').classList.toggle('active', type === 'incoming');
  document.getElementById('tab-outgoing-btn').classList.toggle('active', type === 'outgoing');
  renderRequests();
};

function renderRequests() {
  const currentUser = Storage.getCurrentUser();
  if (!currentUser) return;

  const allRequests = Storage.getRequests();
  const incoming = allRequests.filter(r => r.providerId === currentUser.id);
  const outgoing = allRequests.filter(r => r.requesterId === currentUser.id);

  // Update badge counts
  const incomingBadge = document.getElementById('badge-incoming-count');
  const outgoingBadge = document.getElementById('badge-outgoing-count');
  
  const pendingIncomingCount = incoming.filter(r => r.status === 'pending').length;
  if (incomingBadge) {
    if (pendingIncomingCount > 0) {
      incomingBadge.textContent = pendingIncomingCount;
      incomingBadge.style.display = 'inline-block';
    } else {
      incomingBadge.style.display = 'none';
    }
  }

  const awaitingOutgoingCount = outgoing.filter(r => r.status === 'awaiting_confirmation').length;
  if (outgoingBadge) {
    if (awaitingOutgoingCount > 0) {
      outgoingBadge.textContent = awaitingOutgoingCount;
      outgoingBadge.style.display = 'inline-block';
    } else {
      outgoingBadge.style.display = 'none';
    }
  }

  const container = document.getElementById('requests-list-container');
  const list = currentRequestTab === 'incoming' ? incoming : outgoing;

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="background: #fff; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
        <div class="empty-state-icon">📋</div>
        <h3 class="empty-state-title">لا توجد طلبات في هذا القسم حالياً</h3>
        <p class="empty-state-desc">
          ${currentRequestTab === 'incoming' ? 'لم تتلقَ أي طلبات على خدماتك المعروضة بعد.' : 'لم تقم بإرسال أي طلبات لخدمات زملائك بعد.'}
        </p>
        <a href="services.html" class="btn btn-primary btn-sm">استكشف الخدمات المتاحة</a>
      </div>
    `;
    return;
  }

  container.innerHTML = list.map(req => {
    return currentRequestTab === 'incoming' ? renderIncomingCard(req) : renderOutgoingCard(req);
  }).join('');
}

function renderIncomingCard(req) {
  let statusBadge = getStatusBadge(req.status);
  let actionButtons = '';

  if (req.status === 'pending') {
    actionButtons = `
      <button class="btn btn-danger btn-sm" onclick="rejectRequest('${req.id}')">رفض الطلب</button>
      <button class="btn btn-primary btn-sm" onclick="acceptRequest('${req.id}')">قبول الطلب وتأكيد الموعد</button>
    `;
  } else if (req.status === 'scheduled' || req.status === 'accepted') {
    actionButtons = `
      <button class="btn btn-secondary btn-sm" onclick="markServiceCompletedByProvider('${req.id}')">
        ✓ تأكيد إنجاز الجلسة والخدمة
      </button>
    `;
  } else if (req.status === 'awaiting_confirmation') {
    actionButtons = `
      <span style="font-size: 0.85rem; color: var(--status-pending); font-weight: 700;">
        ⏳ بانتظار تأكيد المستفيد لتحويل الساعات لمحفظتك
      </span>
    `;
  } else if (req.status === 'completed') {
    actionButtons = `
      <span style="font-size: 0.85rem; color: #137333; font-weight: 700;">
        ✓ اكتملت الخدمة وتمت إضافة ${req.hours} ساعات إلى رصيدك
      </span>
    `;
  }

  return `
    <div class="request-full-card">
      <div class="request-card-header">
        <div>
          <span style="font-size: 0.8rem; color: var(--secondary); font-weight: 700;">طلب وارد على خدمتك:</span>
          <h3 style="font-size: 1.25rem; color: var(--primary); margin: 2px 0 6px 0;">${req.serviceTitle}</h3>
        </div>
        <div>
          ${statusBadge}
          ${req.isSolidarity ? '<span class="badge badge-solidarity" style="margin-right: 6px;">مكفول من صندوق التكافل 🤝</span>' : ''}
        </div>
      </div>

      <div class="request-card-meta">
        <span>👤 <strong>طالب الخدمة:</strong> ${req.requesterName}</span>
        <span>⏱️ <strong>المقدار:</strong> ${req.hours} ساعات</span>
        <span>📅 <strong>الموعد المقترح:</strong> ${req.date} (${req.time})</span>
        <span>🕒 <strong>تاريخ الطلب:</strong> ${req.createdAt}</span>
      </div>

      <div class="request-notes-box">
        <strong>رسالة المستفيد وملاحظاته:</strong> ${req.notes || 'لا توجد ملاحظات إضافية'}
      </div>

      <div class="request-actions-bar">
        ${actionButtons}
      </div>
    </div>
  `;
}

function renderOutgoingCard(req) {
  let statusBadge = getStatusBadge(req.status);
  let actionButtons = '';
  let confirmationAlert = '';

  if (req.status === 'pending') {
    actionButtons = `
      <button class="btn btn-outline btn-sm" onclick="cancelRequest('${req.id}')">إلغاء الطلب</button>
      <span style="font-size: 0.85rem; color: var(--text-muted);">بانتظار موافقة مقدم الخدمة...</span>
    `;
  } else if (req.status === 'scheduled' || req.status === 'accepted') {
    actionButtons = `
      <span style="font-size: 0.88rem; color: #1967d2; font-weight: 700;">
        📅 الموعد مؤكد ومجدول (${req.date} - ${req.time})
      </span>
    `;
  } else if (req.status === 'awaiting_confirmation') {
    // Crucial step: Beneficiary must confirm completion to release hours!
    confirmationAlert = `
      <div class="confirmation-alert-banner">
        <div>
          <div style="font-weight: 800; font-size: 1rem; color: #174C3C; margin-bottom: 2px;">
            🎉 أفاد مقدم الخدمة (${req.providerName}) بإتمام الجلسة بنجاح!
          </div>
          <div style="font-size: 0.85rem; color: #202B27;">
            ${req.isSolidarity 
              ? 'هذه الخدمة مكفولة من صندوق التكافل ولن يتم خصم أي ساعات من رصيدك الشخصي.' 
              : `بالضغط على الزر سيتم خصم ${req.hours} ساعة من محفظتك وتحويلها لرصيد مقدم الخدمة تقديراً لجهده.`}
          </div>
        </div>
        <div>
          <button class="btn btn-primary btn-sm" onclick="confirmServiceAndTransfer('${req.id}')" style="background: #2D6A4F;">
            ✓ تأكيد استلام الخدمة وتحويل الساعات
          </button>
        </div>
      </div>
    `;
  } else if (req.status === 'completed') {
    actionButtons = `
      <span style="font-size: 0.85rem; color: #137333; font-weight: 700;">
        ✓ تم تأكيد استلام الخدمة وسداد الساعات بنجاح. شكراً لتبادل وقتك!
      </span>
    `;
  }

  return `
    <div class="request-full-card">
      ${confirmationAlert}

      <div class="request-card-header">
        <div>
          <span style="font-size: 0.8rem; color: var(--secondary); font-weight: 700;">طلب أرسلته للاستفادة:</span>
          <h3 style="font-size: 1.25rem; color: var(--primary); margin: 2px 0 6px 0;">${req.serviceTitle}</h3>
        </div>
        <div>
          ${statusBadge}
          ${req.isSolidarity ? '<span class="badge badge-solidarity" style="margin-right: 6px;">مكفول تكافلياً 🤝</span>' : ''}
        </div>
      </div>

      <div class="request-card-meta">
        <span>👨‍🏫 <strong>مقدم الخدمة:</strong> ${req.providerName}</span>
        <span>⏱️ <strong>الساعات المطلوبة:</strong> ${req.hours} ساعات</span>
        <span>📅 <strong>الموعد:</strong> ${req.date} (${req.time})</span>
        <span>🕒 <strong>تاريخ الطلب:</strong> ${req.createdAt}</span>
      </div>

      <div class="request-notes-box">
        <strong>تفاصيل الطلب:</strong> ${req.notes || 'طلب خدمة'}
      </div>

      <div class="request-actions-bar">
        ${actionButtons}
      </div>
    </div>
  `;
}

function getStatusBadge(status) {
  switch (status) {
    case 'pending': return '<span class="badge badge-pending">قيد الانتظار</span>';
    case 'scheduled':
    case 'accepted': return '<span class="badge badge-scheduled">مجدول ومؤكد</span>';
    case 'awaiting_confirmation': return '<span class="badge" style="background:#fff3cd; color:#856404;">بانتظار تأكيد الاستلام</span>';
    case 'completed': return '<span class="badge badge-completed">مكتمل ومحول ✓</span>';
    case 'rejected': return '<span class="badge badge-rejected">معتذر / مرفوض</span>';
    case 'cancelled': return '<span class="badge badge-rejected">ملغي</span>';
    default: return `<span class="badge">${status}</span>`;
  }
}

// Lifecycle action handlers
window.acceptRequest = function(reqId) {
  const req = Storage.getRequestById(reqId);
  if (!req) return;

  req.status = 'scheduled';
  Storage.saveRequest(req);

  Storage.addNotification(req.requesterId, {
    title: 'تم قبول طلبك! 📅',
    message: `وافق ${req.providerName} على تقديم خدمة "${req.serviceTitle}" بالموعد المحدد.`,
    type: 'request',
    link: 'my-requests.html'
  });

  showToast('تم قبول الطلب', 'تم تأكيد الموعد وإرسال إشعار للمستفيد.');
  renderRequests();
};

window.rejectRequest = function(reqId) {
  showConfirmModal('رفض الطلب', 'هل أنت متأكد من الاعتذار عن تقديم هذه الخدمة؟', 'نعم، اعتذر', () => {
    const req = Storage.getRequestById(reqId);
    if (!req) return;

    req.status = 'rejected';
    Storage.saveRequest(req);

    Storage.addNotification(req.requesterId, {
      title: 'اعتذار عن طلب الخدمة',
      message: `اعتذر ${req.providerName} عن تقديم خدمة "${req.serviceTitle}". يمكنك اختيار موعد آخر أو استكشاف مقدم خدمة بديل.`,
      type: 'request',
      link: 'services.html'
    });

    showToast('تم تحديث الطلب', 'تم الاعتذار عن الطلب.');
    renderRequests();
  });
};

window.cancelRequest = function(reqId) {
  showConfirmModal('إلغاء الطلب', 'هل أنت متأكد من رغبتك في إلغاء هذا الطلب؟', 'نعم، إلغاء', () => {
    const req = Storage.getRequestById(reqId);
    if (!req) return;

    req.status = 'cancelled';
    Storage.saveRequest(req);

    showToast('تم الإلغاء', 'تم إلغاء طلب الخدمة بنجاح.');
    renderRequests();
  });
};

window.markServiceCompletedByProvider = function(reqId) {
  const req = Storage.getRequestById(reqId);
  if (!req) return;

  showConfirmModal(
    'تأكيد إنجاز الخدمة',
    `هل أكملت تقديم جلسة "${req.serviceTitle}" مع المستفيد (${req.requesterName})؟ سيتم إرسال إشعار له لتأكيد الاستلام وإطلاق رصيد الساعات لمحفظتك.`,
    'نعم، أكملت الخدمة',
    () => {
      req.status = 'awaiting_confirmation';
      Storage.saveRequest(req);

      Storage.addNotification(req.requesterId, {
        title: 'أكمل مقدم الخدمة الجلسة! ⏳',
        message: `أفاد ${req.providerName} بإتمام خدمة "${req.serviceTitle}". يرجى الدخول وتأكيد الاستلام لتحويل الساعات.`,
        type: 'request',
        link: 'my-requests.html'
      });

      showToast('تم تسجيل الإنجاز', 'تم إشعار المستفيد للمصادقة وإيداع الساعات في محفظتك.');
      renderRequests();
    }
  );
};

window.confirmServiceAndTransfer = function(reqId) {
  const req = Storage.getRequestById(reqId);
  if (!req) return;

  showConfirmModal(
    'تأكيد استلام الخدمة وإطلاق الساعات',
    `هل تؤكد استلامك لخدمة "${req.serviceTitle}" (${req.hours} ساعات) بنجاح ورضا؟ بالضغط على تأكيد سيتم نقل الساعات لرصيد مقدم الخدمة.`,
    'تأكيد وإطلاق الساعات',
    () => {
      const result = Storage.completeServiceAndTransferHours(reqId);
      if (result.success) {
        showToast('تم بنجاح! 🌟', result.message, 'success');
        
        // Refresh sidebar balance
        const currentUser = Storage.getCurrentUser();
        const balanceEl = document.getElementById('sidebar-balance-num');
        if (balanceEl && currentUser) balanceEl.textContent = currentUser.balance;

        renderRequests();
      } else {
        showToast('تعذر التحويل', result.message, 'error');
      }
    }
  );
};
