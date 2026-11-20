/**
 * وقت لبعض | Time for All - Time Credit Wallet Logic
 * Manages balances, transaction filters, and quick donations.
 */

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

  // Populate Wallet Breakdown Metrics
  renderWalletMetrics(currentUser);

  // Render Transactions Ledger
  let activeFilter = 'all';
  renderWalletTransactions(currentUser.id, activeFilter);

  // Filter tab buttons
  const tabBtns = document.querySelectorAll('[data-tx-filter]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.getAttribute('data-tx-filter');
      renderWalletTransactions(currentUser.id, activeFilter);
    });
  });

  // Setup Quick Donation Confirmation
  const confirmDonationBtn = document.getElementById('confirm-donation-btn');
  if (confirmDonationBtn) {
    confirmDonationBtn.addEventListener('click', () => {
      const hours = Number(document.getElementById('donate-modal-hours').value);
      const res = Storage.donateHours(currentUser.id, hours);

      if (!res.success) {
        showToast('تعذر التبرع', res.message, 'error');
      } else {
        closeQuickDonationModal();
        showToast('شكراً لعطائك!', res.message, 'success');
        
        // Refresh updated data
        const updatedUser = Storage.getUserById(currentUser.id);
        renderWalletMetrics(updatedUser);
        renderWalletTransactions(updatedUser.id, activeFilter);
        if (balanceEl) balanceEl.textContent = updatedUser.balance;
      }
    });
  }
});

function renderWalletMetrics(user) {
  document.getElementById('wallet-main-balance').textContent = user.balance;
  document.getElementById('wb-earned').textContent = user.totalEarned || 0;
  document.getElementById('wb-spent').textContent = user.totalSpent || 0;
  document.getElementById('wb-donated').textContent = user.totalDonated || 0;

  // Calculate gifts specifically from transactions
  const txs = Storage.getUserTransactions(user.id);
  const giftedTotal = txs.filter(t => t.type === 'gifted').reduce((acc, t) => acc + t.amount, 0);
  const receivedGiftsTotal = txs.filter(t => t.type === 'received_gift').reduce((acc, t) => acc + t.amount, 0);

  document.getElementById('wb-gifted').textContent = giftedTotal;
  document.getElementById('wb-received-gifts').textContent = receivedGiftsTotal;
}

function renderWalletTransactions(userId, filter = 'all') {
  let txs = Storage.getUserTransactions(userId);

  if (filter === 'earned') {
    txs = txs.filter(t => t.type === 'earned' || t.type === 'welcome');
  } else if (filter === 'spent') {
    txs = txs.filter(t => t.type === 'spent');
  } else if (filter === 'donated') {
    txs = txs.filter(t => t.type === 'donated');
  } else if (filter === 'gift') {
    txs = txs.filter(t => t.type === 'gifted' || t.type === 'received_gift');
  }

  const tbody = document.getElementById('wallet-transactions-tbody');
  if (!tbody) return;

  if (txs.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; padding: 36px; color: var(--text-muted);">
          لا توجد معاملات مسجلة في هذا التصنيف.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = txs.map(t => {
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
        <td><span class="badge badge-completed">مكتملة ومؤكدة ✓</span></td>
      </tr>
    `;
  }).join('');
}

// Quick donation modal controls
window.openQuickDonationModal = function() {
  const currentUser = Storage.getCurrentUser();
  if (!currentUser) {
    showToast('تسجيل الدخول مطلوب', 'يرجى تسجيل الدخول أولاً', 'warning');
    return;
  }

  if (currentUser.balance < 1) {
    showToast('رصيد غير كافٍ', 'رصيدك الحالي هو ٠ ساعة. شكراً لنيتك الطيبة!', 'warning');
    return;
  }

  document.getElementById('modal-available-balance-text').textContent = currentUser.balance;
  const input = document.getElementById('donate-modal-hours');
  input.max = currentUser.balance;
  input.value = Math.min(1, currentUser.balance);

  const modal = document.getElementById('quick-donation-modal');
  if (modal) modal.classList.add('active');
};

window.closeQuickDonationModal = function() {
  const modal = document.getElementById('quick-donation-modal');
  if (modal) modal.classList.remove('active');
};
