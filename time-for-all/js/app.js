/**
 * وقت لبعض | Time for All - Shared Application Module
 * Global utilities, UI components, SVG icons, and Demo switchers.
 */

// Centralized SVG Icons (Zero external dependency fallback)
const AppIcons = {
  clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`,
  heart: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path></svg>`,
  gift: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"></rect><path d="M12 8v13"></path><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"></path><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"></path></svg>`,
  wallet: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path><path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path><path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path></svg>`,
  handshake: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11 17 2 2a1 1 0 0 0 1.4 0l4.3-4.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0L13 11.6"></path><path d="m18 10 1.3-1.3a1 1 0 0 0 0-1.4l-3-3a1 1 0 0 0-1.4 0L13.6 5.6"></path><path d="m2 14 6 6"></path><path d="m3 7 3-3"></path><path d="m7 19 4-4"></path><path d="m6 10 7-7"></path></svg>`,
  user: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>`,
  bell: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path></svg>`,
  check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`,
  plus: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>`,
  logout: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>`,
  home: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>`,
  grid: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="3" rx="1"></rect><rect width="7" height="7" x="14" y="14" rx="1"></rect><rect width="7" height="7" x="3" y="14" rx="1"></rect></svg>`,
  list: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>`,
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  star: `<svg width="18" height="18" viewBox="0 0 24 24" fill="#D7A85B" stroke="#D7A85B" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>`,
  search: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>`,
  sparkles: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"></path></svg>`
};

// Toast Notifications System
function showToast(title, message, type = 'success', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '✓';
  if (type === 'error') icon = '✕';
  if (type === 'warning') icon = '⚠';
  if (type === 'info') icon = 'ℹ';

  toast.innerHTML = `
    <div class="toast-icon">${icon}</div>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-msg">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// Confirmation Modal Dialog Helper
function showConfirmModal(title, message, confirmBtnText = 'تأكيد', onConfirm = () => {}, isDestructive = false) {
  let modalOverlay = document.getElementById('global-confirm-modal');
  if (!modalOverlay) {
    modalOverlay = document.createElement('div');
    modalOverlay.id = 'global-confirm-modal';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title" id="confirm-modal-title">تأكيد الإجراء</h3>
          <button class="modal-close-btn" id="confirm-modal-close">✕</button>
        </div>
        <div class="modal-body" id="confirm-modal-body">
          <p>هل أنت متأكد من المتابعة؟</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" id="confirm-modal-cancel">إلغاء</button>
          <button class="btn btn-primary btn-sm" id="confirm-modal-action">تأكيد</button>
        </div>
      </div>
    `;
    document.body.appendChild(modalOverlay);
  }

  const titleEl = document.getElementById('confirm-modal-title');
  const bodyEl = document.getElementById('confirm-modal-body');
  const actionBtn = document.getElementById('confirm-modal-action');
  const cancelBtn = document.getElementById('confirm-modal-cancel');
  const closeBtn = document.getElementById('confirm-modal-close');

  titleEl.textContent = title;
  bodyEl.innerHTML = `<p style="font-size: 1rem; color: var(--text-dark);">${message}</p>`;
  actionBtn.textContent = confirmBtnText;
  
  if (isDestructive) {
    actionBtn.className = 'btn btn-danger btn-sm';
  } else {
    actionBtn.className = 'btn btn-primary btn-sm';
  }

  const closeModal = () => modalOverlay.classList.remove('active');

  actionBtn.onclick = () => {
    closeModal();
    onConfirm();
  };

  cancelBtn.onclick = closeModal;
  closeBtn.onclick = closeModal;
  modalOverlay.onclick = (e) => {
    if (e.target === modalOverlay) closeModal();
  };

  modalOverlay.classList.add('active');
}

// Global Demo Switcher & Header Initialization
document.addEventListener('DOMContentLoaded', () => {
  // Ensure storage is initialized
  if (typeof Storage !== 'undefined') {
    Storage.init();
  }

  renderDemoBar();
  setupNavigation();
  setupNotificationsPanel();
  highlightActiveNav();
});

// Render the Demo Switcher Top Bar on all pages
function renderDemoBar() {
  const existingBar = document.getElementById('demo-announcement-bar');
  if (existingBar) existingBar.remove();

  const currentUser = typeof Storage !== 'undefined' ? Storage.getCurrentUser() : null;
  const currentUserId = currentUser ? currentUser.id : '';

  const bar = document.createElement('div');
  bar.id = 'demo-announcement-bar';
  bar.className = 'demo-bar';
  bar.innerHTML = `
    <div class="demo-bar-inner">
      <div class="demo-bar-title">
        <span class="pill-tag">نسخة العرض التجريبية</span>
        <span>تبديل الحساب السريع لاختبار سيناريوهات التحكيم:</span>
      </div>
      <div class="demo-switch-group">
        <button class="demo-switch-btn ${currentUserId === 'user_ahmed' ? 'active' : ''}" onclick="switchDemoUser('user_ahmed')">
          👤 أحمد (مقدم خدمات - ٥ ساعات)
        </button>
        <button class="demo-switch-btn ${currentUserId === 'user_sara' ? 'active' : ''}" onclick="switchDemoUser('user_sara')">
          👩‍💻 سارة (مبرمجة - ٤ ساعات)
        </button>
        <button class="demo-switch-btn ${currentUserId === 'user_ibrahim' ? 'active' : ''}" onclick="switchDemoUser('user_ibrahim')">
          🤝 عم إبراهيم (مستفيد تكافل - ٠ رصيد)
        </button>
        <button class="demo-switch-btn ${currentUserId === 'user_admin' ? 'active' : ''}" onclick="switchDemoUser('user_admin')">
          🛡️ مدير المنصة (Admin)
        </button>
        <button class="demo-reset-btn" onclick="resetAllDemoData()" title="استعادة البيانات الافتراضية الأولية">
          🔄 إعادة تعيين البيانات
        </button>
      </div>
    </div>
  `;

  document.body.insertBefore(bar, document.body.firstChild);
}

// Switch demo user with 1 click
function switchDemoUser(userId) {
  if (typeof Storage === 'undefined') return;
  const user = Storage.getUserById(userId);
  if (user) {
    Storage.setCurrentUser(user);
    showToast('تم تبديل الحساب', `أنت تتصفح المنصة الآن باسم: ${user.name}`);
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
}

// Reset all demo data to seed defaults
function resetAllDemoData() {
  showConfirmModal(
    'إعادة تعيين البيانات التجريبية',
    'سيتم مسح أي تعديلات قمت بها واستعادة الحسابات والخدمات والرصيد التكافلي كما كان في البداية. هل ترغب في المتابعة؟',
    'استعادة البيانات الأصلية',
    () => {
      Storage.resetToDefaults();
      showToast('تمت استعادة البيانات', 'تمت إعادة ضبط المنصة للحالة الافتراضية بنجاح.');
      setTimeout(() => window.location.href = 'index.html', 600);
    },
    true
  );
}

// Setup Header Navigation UI dynamically
function setupNavigation() {
  const currentUser = typeof Storage !== 'undefined' ? Storage.getCurrentUser() : null;
  const navActionsContainer = document.getElementById('nav-user-actions');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  if (navActionsContainer) {
    if (currentUser) {
      // User is logged in
      const notifs = Storage.getNotifications(currentUser.id);
      const unreadCount = notifs.filter(n => !n.isRead).length;

      navActionsContainer.innerHTML = `
        <div class="user-nav-profile" onclick="window.location.href='dashboard.html'" title="الانتقال للوحة التحكم">
          <img src="${currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" alt="${currentUser.name}" class="user-nav-avatar">
          <div class="user-nav-info">
            <span class="user-nav-name">${currentUser.name}</span>
            <span class="user-nav-balance">${AppIcons.clock} ${currentUser.balance} ساعة</span>
          </div>
        </div>

        <button class="notif-bell-btn" id="notif-toggle-btn" title="التنبيهات">
          ${AppIcons.bell}
          ${unreadCount > 0 ? `<span class="notif-badge">${unreadCount}</span>` : ''}
        </button>

        <a href="dashboard.html" class="btn btn-primary btn-sm">لوحة التحكم</a>
        
        ${currentUser.role === 'admin' ? '<a href="admin.html" class="btn btn-accent btn-sm" title="لوحة الإدارة">الإدارة</a>' : ''}
      `;
    } else {
      // Logged out
      navActionsContainer.innerHTML = `
        <a href="login.html" class="btn btn-outline btn-sm">تسجيل الدخول</a>
        <a href="register.html" class="btn btn-primary btn-sm">إنشاء حساب</a>
      `;
    }
  }
}

// Notification Dropdown Panel
function setupNotificationsPanel() {
  const notifBtn = document.getElementById('notif-toggle-btn');
  if (!notifBtn) return;

  const currentUser = Storage.getCurrentUser();
  if (!currentUser) return;

  let panel = document.getElementById('notif-panel-dropdown');
  if (!panel) {
    panel = document.createElement('div');
    panel.id = 'notif-panel-dropdown';
    panel.style.cssText = `
      position: absolute;
      top: 65px;
      left: 30px;
      width: 340px;
      background: #fff;
      border-radius: 14px;
      box-shadow: 0 10px 30px rgba(23,76,60,0.15);
      border: 1px solid #E2E8E4;
      z-index: 1050;
      display: none;
      overflow: hidden;
      direction: rtl;
    `;
    document.body.appendChild(panel);
  }

  notifBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isVisible = panel.style.display === 'block';
    if (isVisible) {
      panel.style.display = 'none';
    } else {
      renderNotificationsContent(panel, currentUser.id);
      panel.style.display = 'block';
    }
  });

  document.addEventListener('click', (e) => {
    if (!panel.contains(e.target) && e.target !== notifBtn) {
      panel.style.display = 'none';
    }
  });
}

function renderNotificationsContent(panel, userId) {
  const notifs = Storage.getNotifications(userId);
  
  let listHtml = '';
  if (notifs.length === 0) {
    listHtml = `<div style="padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem;">لا توجد إشعارات جديدة حالياً.</div>`;
  } else {
    listHtml = notifs.map(n => `
      <div style="padding: 12px 16px; border-bottom: 1px solid #E2E8E4; background: ${n.isRead ? '#fff' : '#F4F9F5'}; cursor: pointer;" onclick="handleNotifClick('${n.id}', '${n.link || 'dashboard.html'}')">
        <div style="font-weight: 700; font-size: 0.88rem; color: var(--primary); margin-bottom: 3px;">${n.title}</div>
        <div style="font-size: 0.82rem; color: var(--text-dark); line-height: 1.4;">${n.message}</div>
        <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 4px;">${n.createdAt}</div>
      </div>
    `).join('');
  }

  panel.innerHTML = `
    <div style="padding: 14px 16px; background: var(--bg-warm); border-bottom: 1px solid #E2E8E4; display: flex; justify-content: space-between; align-items: center;">
      <span style="font-weight: 800; color: var(--primary); font-size: 0.95rem;">مركز الإشعارات</span>
      <button style="background: none; border: none; color: var(--secondary); font-size: 0.8rem; font-weight: 700; cursor: pointer;" onclick="markAllRead('${userId}')">تحديد الكل كمقروء</button>
    </div>
    <div style="max-height: 320px; overflow-y: auto;">
      ${listHtml}
    </div>
  `;
}

function handleNotifClick(notifId, link) {
  Storage.markNotificationRead(notifId);
  window.location.href = link;
}

function markAllRead(userId) {
  Storage.markAllNotificationsRead(userId);
  showToast('تمت العملية', 'تم تحديد جميع الإشعارات كمقروءة');
  const panel = document.getElementById('notif-panel-dropdown');
  if (panel) renderNotificationsContent(panel, userId);
  const badge = document.querySelector('.notif-badge');
  if (badge) badge.remove();
}

// Highlight the current page in nav link
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}
