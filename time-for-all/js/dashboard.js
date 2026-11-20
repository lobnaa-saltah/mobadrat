/**
 * وقت لبعض | Time for All - Dashboard Script
 * Populates real-time metrics, requests, and transactions from LocalStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentUser = Storage.getCurrentUser();
  if (!currentUser) {
    // Redirect to login if unauthenticated
    window.location.href = 'login.html';
    return;
  }

  // Populate Sidebar User Information
  const avatarEl = document.getElementById('sidebar-user-avatar');
  const nameEl = document.getElementById('sidebar-user-name');
  const cityEl = document.getElementById('sidebar-user-city');
  const balanceEl = document.getElementById('sidebar-balance-num');

  if (avatarEl) avatarEl.src = currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80';
  if (nameEl) nameEl.textContent = currentUser.name;
  if (cityEl) cityEl.textContent = `${currentUser.city || 'القاهرة'} • ${currentUser.university || 'عضو مجتمعي'}`;
  if (balanceEl) balanceEl.textContent = currentUser.balance;

  // Header Welcome
  const welcomeTitle = document.getElementById('dash-welcome-title');
  if (welcomeTitle) {
    welcomeTitle.textContent = `أهلاً بك يا ${currentUser.name.split(' ')[0]} 👋`;
  }

  // Zero-balance banner toggle
  const zeroBanner = document.getElementById('zero-balance-banner');
  if (zeroBanner) {
    if (currentUser.balance === 0) {
      zeroBanner.style.display = 'flex';
    } else {
      zeroBanner.style.display = 'none';
    }
  }

  // Populate Metrics
  document.getElementById('metric-balance').textContent = currentUser.balance;
  document.getElementById('metric-earned').textContent = currentUser.totalEarned || 0;
  document.getElementById('metric-spent').textContent = currentUser.totalSpent || 0;
  document.getElementById('metric-donated').textContent = currentUser.totalDonated || 0;

  // Load Requests
  renderDashboardRequests(currentUser);

  // Load Recent Transactions
  renderRecentTransactions(currentUser.id);

  // Logout handler
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      showConfirmModal(
        'تسجيل الخروج',
        'هل ترغب بالفعل في تسجيل الخروج من حسابك؟',
        'تسجيل الخروج',
        () => {
          Storage.logout();
          showToast('تم الخروج', 'إلى اللقاء! نراك قريباً.');
          setTimeout(() => window.location.href = 'index.html', 500);
        }
      );
    });
  }
});

function renderDashboardRequests(currentUser) {
  const allRequests = Storage.getRequests();
  
  // Pending incoming requests for this provider
  const pendingIncoming = allRequests.filter(r => r.providerId === currentUser.id && r.status === 'pending');
  const pendingBadge = document.getElementById('sidebar-pending-badge');
  if (pendingBadge) {
    if (pendingIncoming.length > 0) {
      pendingBadge.textContent = pendingIncoming.length;
      pendingBadge.style.display = 'inline-block';
    } else {
      pendingBadge.style.display = 'none';
    }
  }

  const pendingContainer = document.getElementById('pending-requests-container');
  if (pendingContainer) {
    if (pendingIncoming.length === 0) {
      pendingContainer.innerHTML = `
        <div class="empty-state" style="padding: 24px 10px;">
          <div class="empty-state-icon">✓</div>
          <div class="empty-state-title" style="font-size: 1rem;">لا توجد طلبات جديدة معلقة</div>
          <p class="empty-state-desc" style="font-size: 0.85rem; margin-bottom: 0;">أنت على اطلاع بكل طلباتك الحالية.</p>
        </div>
      `;
    } else {
      pendingContainer.innerHTML = pendingIncoming.map(r => `
        <div class="request-item-card">
          <div class="req-item-left">
            <img src="${r.requesterAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'}" class="req-avatar" alt="${r.requesterName}">
            <div>
              <div class="req-item-title">${r.serviceTitle}</div>
              <div class="req-item-meta">
                <span>👤 ${r.requesterName}</span>
                <span>⏱️ ${r.hours} ساعات</span>
                <span>📅 ${r.date}</span>
              </div>
            </div>
          </div>
          <div>
            <a href="my-requests.html" class="btn btn-primary btn-sm">مراجعة والرد</a>
          </div>
        </div>
      `).join('');
    }
  }

  // Upcoming scheduled services (either as provider or requester)
  const upcoming = allRequests.filter(r => 
    (r.providerId === currentUser.id || r.requesterId === currentUser.id) && 
    (r.status === 'scheduled' || r.status === 'accepted')
  );

  const upcomingContainer = document.getElementById('upcoming-services-container');
  if (upcomingContainer) {
    if (upcoming.length === 0) {
      upcomingContainer.innerHTML = `
        <div class="empty-state" style="padding: 24px 10px;">
          <div class="empty-state-icon">📅</div>
          <div class="empty-state-title" style="font-size: 1rem;">لا توجد مواعيد قادمة مجدولة</div>
          <p class="empty-state-desc" style="font-size: 0.85rem;">تصفح الخدمات واطلب مساعدة أو حدد موعداً مع زملائك.</p>
          <a href="services.html" class="btn btn-outline btn-sm">استكشف الخدمات</a>
        </div>
      `;
    } else {
      upcomingContainer.innerHTML = upcoming.map(r => {
        const isProvider = r.providerId === currentUser.id;
        const otherParty = isProvider ? r.requesterName : r.providerName;
        const roleLabel = isProvider ? 'أنت مقدم الخدمة' : 'أنت المستفيد';

        return `
          <div class="request-item-card" style="border-right: 4px solid var(--secondary);">
            <div class="req-item-left">
              <div>
                <div class="req-item-title">${r.serviceTitle}</div>
                <div class="req-item-meta">
                  <span style="font-weight: 700; color: var(--primary);">مع: ${otherParty} (${roleLabel})</span>
                  <span>📅 ${r.date} - ${r.time}</span>
                  ${r.isSolidarity ? '<span class="badge badge-solidarity">مكفول تكافلياً</span>' : ''}
                </div>
              </div>
            </div>
            <div>
              <a href="my-requests.html" class="btn btn-secondary btn-sm">تفاصيل الموعد</a>
            </div>
          </div>
        `;
      }).join('');
    }
  }
}

function renderRecentTransactions(userId) {
  const transactions = Storage.getUserTransactions(userId).slice(0, 5);
  const tbody = document.getElementById('recent-transactions-tbody');
  if (!tbody) return;

  if (transactions.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">
          لا توجد معاملات مسجلة بعد في محفظتك.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = transactions.map(t => {
    let typeBadge = '';
    let sign = '';
    let colorStyle = '';

    switch (t.type) {
      case 'welcome':
        typeBadge = '<span class="badge" style="background:#fef3e6; color:#9c6307;">رصيد ترحيبي 🎁</span>';
        sign = '+';
        colorStyle = 'color: #137333; font-weight: 700;';
        break;
      case 'earned':
        typeBadge = '<span class="badge badge-completed">ساعات مكتسبة 📈</span>';
        sign = '+';
        colorStyle = 'color: #137333; font-weight: 700;';
        break;
      case 'spent':
        typeBadge = '<span class="badge" style="background:#e8f0fe; color:#1967d2;">ساعات مستفادة 📉</span>';
        sign = '-';
        colorStyle = 'color: #1967d2; font-weight: 700;';
        break;
      case 'donated':
        typeBadge = '<span class="badge badge-solidarity">تبرع للتكافل 🤝</span>';
        sign = '-';
        colorStyle = 'color: #a06e1e; font-weight: 700;';
        break;
      case 'gifted':
        typeBadge = '<span class="badge" style="background:#fce8e6; color:#c5221f;">إهداء ساعات 🎁</span>';
        sign = '-';
        colorStyle = 'color: #c5221f; font-weight: 700;';
        break;
      case 'received_gift':
        typeBadge = '<span class="badge badge-completed">هدية واردة 🎁</span>';
        sign = '+';
        colorStyle = 'color: #137333; font-weight: 700;';
        break;
      default:
        typeBadge = `<span class="badge">${t.type}</span>`;
    }

    return `
      <tr>
        <td style="font-size: 0.85rem; color: var(--text-muted);">${t.date}</td>
        <td>${typeBadge}</td>
        <td style="font-weight: 600;">${t.description}</td>
        <td>${t.relatedUser || '-'}</td>
        <td style="${colorStyle}">${sign}${t.amount} ساعة</td>
        <td style="font-weight: 700; color: var(--primary);">${t.balanceAfter} ساعة</td>
      </tr>
    `;
  }).join('');
}
