/**
 * وقت لبعض | Time for All - Services Marketplace Logic
 * Powers services browsing, filtering, details & booking, and adding new services.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Services Marketplace Page (services.html)
  if (document.getElementById('services-grid-container')) {
    initServicesMarketplace();
  }

  // 2. Service Details Page (service-details.html)
  if (document.getElementById('service-details-container')) {
    initServiceDetails();
  }

  // 3. Add Service Page (add-service.html)
  if (document.getElementById('add-service-form')) {
    initAddServiceForm();
  }
});

/**
 * MARKETPLACE LOGIC
 */
function initServicesMarketplace() {
  const container = document.getElementById('services-grid-container');
  const countEl = document.getElementById('services-count');
  const emptyEl = document.getElementById('services-empty-state');
  const searchInput = document.getElementById('services-search-input');
  const typeFilter = document.getElementById('type-filter-select');
  const durationFilter = document.getElementById('duration-filter-select');
  const sortSelect = document.getElementById('sort-select');
  const catPills = document.querySelectorAll('.cat-pill');

  let activeCategory = 'all';

  function filterAndRender() {
    let services = Storage.getServices().filter(s => s.status === 'approved');

    // Filter by Category
    if (activeCategory !== 'all') {
      services = services.filter(s => s.category === activeCategory);
    }

    // Filter by Search Query
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
      services = services.filter(s => 
        s.title.toLowerCase().includes(query) ||
        s.shortDesc.toLowerCase().includes(query) ||
        s.fullDesc.toLowerCase().includes(query) ||
        s.providerName.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
      );
    }

    // Filter by Type
    const selectedType = typeFilter.value;
    if (selectedType !== 'all') {
      services = services.filter(s => s.type === selectedType);
    }

    // Filter by Duration
    const selectedDuration = durationFilter.value;
    if (selectedDuration === '1') {
      services = services.filter(s => s.duration === 1);
    } else if (selectedDuration === '2') {
      services = services.filter(s => s.duration === 2);
    } else if (selectedDuration === '3+') {
      services = services.filter(s => s.duration >= 3);
    }

    // Sorting
    const sortVal = sortSelect.value;
    if (sortVal === 'newest') {
      services.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortVal === 'rating') {
      services.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortVal === 'duration_asc') {
      services.sort((a, b) => a.duration - b.duration);
    }

    // Update Counter
    countEl.textContent = services.length;

    // Render Cards
    if (services.length === 0) {
      container.innerHTML = '';
      emptyEl.style.display = 'block';
    } else {
      emptyEl.style.display = 'none';
      container.innerHTML = services.map(s => `
        <div class="service-card">
          <div class="service-card-body">
            <div class="service-card-top">
              <span class="service-category">${s.category}</span>
              <span class="service-duration-badge">${AppIcons.clock} ${s.duration} ساعة</span>
            </div>
            
            <h3 class="service-card-title">${s.title}</h3>
            <p class="service-card-desc">${s.shortDesc}</p>
            
            <div class="service-provider-info">
              <div class="provider-meta">
                <img src="${s.providerAvatar}" alt="${s.providerName}" class="provider-avatar">
                <div>
                  <div class="provider-name">${s.providerName}</div>
                  <span class="badge ${s.type === 'online' ? 'badge-online' : 'badge-inperson'}">
                    ${s.type === 'online' ? '🌐 عن بُعد (أونلاين)' : '📍 ' + s.location}
                  </span>
                </div>
              </div>
              <div class="service-rating">
                ${AppIcons.star} ${s.rating}
              </div>
            </div>
          </div>
          <div class="service-card-footer">
            <a href="service-details.html?id=${s.id}" class="btn btn-secondary btn-block">
              تفاصيل وطلب الخدمة (${s.duration} رصيد)
            </a>
          </div>
        </div>
      `).join('');
    }
  }

  // Category pills event listeners
  catPills.forEach(pill => {
    pill.addEventListener('click', () => {
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeCategory = pill.getAttribute('data-cat');
      filterAndRender();
    });
  });

  // Event Listeners
  searchInput.addEventListener('input', filterAndRender);
  typeFilter.addEventListener('change', filterAndRender);
  durationFilter.addEventListener('change', filterAndRender);
  sortSelect.addEventListener('change', filterAndRender);

  // Initial load
  filterAndRender();
}

/**
 * SERVICE DETAILS & BOOKING LOGIC
 */
function initServiceDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const serviceId = urlParams.get('id') || 'srv_1';
  const container = document.getElementById('service-details-container');

  const service = Storage.getServiceById(serviceId);
  if (!service) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
        <h2 style="color: var(--status-rejected); margin-bottom: 12px;">عذراً، الخدمة المطلوبة غير متوفرة</h2>
        <p style="color: var(--text-muted); margin-bottom: 24px;">قد تكون الخدمة قد حذفت أو انتهت صلاحيتها.</p>
        <a href="services.html" class="btn btn-primary">تصفح الخدمات الأخرى</a>
      </div>
    `;
    return;
  }

  const currentUser = Storage.getCurrentUser();
  const provider = Storage.getUserById(service.providerId) || {
    name: service.providerName,
    avatar: service.providerAvatar,
    city: 'القاهرة',
    university: 'جامعة القاهرة',
    bio: 'مقدم خدمة ومشارك نشط في المبادرة.',
    skills: ['تبادل المهارات']
  };

  const isOwner = currentUser && currentUser.id === service.providerId;
  const userBalance = currentUser ? currentUser.balance : 0;
  const hasEnoughBalance = userBalance >= service.duration;

  // Render Page Content
  container.innerHTML = `
    <!-- Main Service Information -->
    <div class="service-main-panel">
      <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; margin-bottom: 12px;">
        <span class="service-category">${service.category}</span>
        <div style="display: flex; align-items: center; gap: 4px; font-weight: 700; color: var(--accent);">
          ${AppIcons.star} ${service.rating} (${service.reviewsCount || 5} تقييمات)
        </div>
      </div>

      <h1 style="font-size: 2rem; color: var(--primary); margin-bottom: 14px; line-height: 1.35;">${service.title}</h1>
      
      <p style="font-size: 1.1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px;">
        ${service.shortDesc}
      </p>

      <div class="meta-tags-row">
        <span class="badge ${service.type === 'online' ? 'badge-online' : 'badge-inperson'}" style="padding: 6px 14px; font-size: 0.88rem;">
          ${service.type === 'online' ? '🌐 تقديم عن بُعد عبر الإنترنت' : '📍 لقاء حضوري: ' + service.location}
        </span>
        <span class="badge" style="background: var(--light-green); color: var(--primary); padding: 6px 14px; font-size: 0.88rem;">
          ⏱️ مدة الجلسة: ${service.duration} ساعة (تساوي ${service.duration} رصيد)
        </span>
      </div>

      <!-- Provider Full Card -->
      <div class="provider-full-card">
        <img src="${provider.avatar}" alt="${provider.name}" class="provider-full-avatar">
        <div style="flex: 1;">
          <div style="font-weight: 800; font-size: 1.1rem; color: var(--primary);">${provider.name}</div>
          <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 6px;">
            ${provider.university || 'عضو مجتمعي'} • ${provider.city || 'مصر'}
          </div>
          <p style="font-size: 0.88rem; color: var(--text-dark); line-height: 1.5; margin-bottom: 8px;">
            ${provider.bio || ''}
          </p>
          <div style="display: flex; gap: 6px; flex-wrap: wrap;">
            ${(provider.skills || []).map(sk => `<span class="badge" style="background: #fff; border: 1px solid var(--border-color);">${sk}</span>`).join('')}
          </div>
        </div>
      </div>

      <!-- Detailed Description -->
      <h3 style="font-size: 1.25rem; color: var(--primary); margin: 28px 0 12px 0;">ماذا تشمل هذه الجلسة؟</h3>
      <div style="font-size: 1rem; color: var(--text-dark); line-height: 1.8; white-space: pre-line;">
        ${service.fullDesc}
      </div>

      <h3 style="font-size: 1.25rem; color: var(--primary); margin: 28px 0 12px 0;">الأوقات المتاحة لمقدم الخدمة</h3>
      <div style="background: var(--bg-warm); padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); font-weight: 600;">
        📅 ${service.availability}
      </div>

      <!-- Guarantee Rule Box -->
      <div style="margin-top: 32px; padding: 18px; background: #fdfaf3; border: 1px dashed var(--accent); border-radius: var(--radius-md); font-size: 0.88rem; color: #734f0c;">
        <strong>🛡️ ضمان وقت لبعض:</strong>
        لا يتم خصم أي رصيد من محفظتك إلا بعد إتمام الخدمة وتأكيدك الشخصي على جودتها. وقتك وحقك محفوظان دائماً.
      </div>
    </div>

    <!-- Booking Sidebar Card -->
    <div>
      <div class="booking-card">
        <h3 style="font-size: 1.3rem; color: var(--primary); margin-bottom: 6px;">طلب الاستفادة من الخدمة</h3>
        <p style="font-size: 0.88rem; color: var(--text-muted); margin-bottom: 20px;">
          أرسل طلباً بالموعد المناسب لمقدم الخدمة للموافقة عليه.
        </p>

        <!-- Balance Info Box -->
        <div style="background: var(--bg-warm); border-radius: var(--radius-sm); padding: 14px; margin-bottom: 20px; border: 1px solid var(--border-color);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
            <span style="font-size: 0.9rem; color: var(--text-muted);">الساعات المطلوبة:</span>
            <span style="font-weight: 800; color: var(--primary);">${service.duration} ساعات رصيد</span>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <span style="font-size: 0.9rem; color: var(--text-muted);">رصيدك المتاح حالياً:</span>
            <span style="font-weight: 800; color: ${hasEnoughBalance ? 'var(--primary)' : 'var(--status-rejected)'};">
              ${userBalance} ساعات
            </span>
          </div>
        </div>

        ${renderBookingFormState(currentUser, isOwner, hasEnoughBalance, service)}
      </div>
    </div>
  `;

  // Attach submit handler if booking form is present
  const bookForm = document.getElementById('service-booking-form');
  if (bookForm) {
    bookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleServiceBookingSubmit(service, currentUser);
    });
  }
}

function renderBookingFormState(currentUser, isOwner, hasEnoughBalance, service) {
  if (!currentUser) {
    return `
      <div style="text-align: center; padding: 20px 0;">
        <p style="font-size: 0.92rem; color: var(--text-muted); margin-bottom: 16px;">
          يجب تسجيل الدخول أو إنشاء حساب لطلب هذه الخدمة.
        </p>
        <a href="login.html" class="btn btn-primary btn-block">تسجيل الدخول</a>
        <a href="register.html" class="btn btn-outline btn-block" style="margin-top: 8px;">حساب جديد (٢ ساعة مجاناً)</a>
      </div>
    `;
  }

  if (isOwner) {
    return `
      <div style="background: var(--light-green); padding: 18px; border-radius: var(--radius-sm); text-align: center; color: var(--primary); font-weight: 700;">
        أنت صاحب هذه الخدمة! لا يمكنك طلب الخدمة من نفسك. يمكنك تعديل أوقاتك أو خدماتك من لوحة التحكم.
      </div>
    `;
  }

  // If user has zero or insufficient balance
  if (!hasEnoughBalance) {
    return `
      <div style="background: #fff5f5; border: 1px solid #fed7d7; border-radius: var(--radius-sm); padding: 16px; margin-bottom: 20px;">
        <div style="font-weight: 800; color: var(--status-rejected); font-size: 0.95rem; margin-bottom: 6px;">
          ⚠️ رصيدك الحالي لا يكفي
        </div>
        <p style="font-size: 0.85rem; color: #742a2a; line-height: 1.5; margin-bottom: 12px;">
          تحتاج إلى ${service.duration} ساعات رصيد بينما تملك ${currentUser.balance} فقط. لكن في "وقت لبعض"، المساعدة حق للجميع!
        </p>
        
        <button type="button" class="btn btn-accent btn-block btn-sm" onclick="applySolidarityForThisService('${service.id}')">
          🤝 طلب كفالة الخدمة من صندوق التكافل
        </button>
      </div>

      <p style="font-size: 0.82rem; color: var(--text-muted); text-align: center;">
        أو يمكنك تقديم خدمة لزملائك أولاً لكسب ساعات جديدة.
      </p>
    `;
  }

  // Normal Booking Form
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDateStr = tomorrow.toISOString().split('T')[0];

  return `
    <form id="service-booking-form">
      <div class="form-group">
        <label class="form-label" for="book-date">اليوم والتاريخ المقترح *</label>
        <input type="date" id="book-date" class="form-control" required min="${minDateStr}">
      </div>

      <div class="form-group">
        <label class="form-label" for="book-time">الوقت المفضل *</label>
        <input type="text" id="book-time" class="form-control" placeholder="مثال: ٠٧:٠٠ مساءً" required>
      </div>

      <div class="form-group">
        <label class="form-label" for="book-notes">ملاحظات أو أسئلة لمقدم الخدمة</label>
        <textarea id="book-notes" class="form-control" rows="3" placeholder="اشرح النقاط التي ترغب بالتركيز عليها خلال الجلسة..."></textarea>
      </div>

      <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 10px;">
        إرسال طلب الخدمة الآن
      </button>

      <p style="font-size: 0.78rem; color: var(--text-muted); text-align: center; margin-top: 10px;">
        لن يتم خصم الساعات إلا بعد موافقة مقدم الخدمة وإتمام اللقاء.
      </p>
    </form>
  `;
}

function handleServiceBookingSubmit(service, currentUser) {
  const date = document.getElementById('book-date').value;
  const time = document.getElementById('book-time').value.trim();
  const notes = document.getElementById('book-notes').value.trim();

  if (!date || !time) {
    showToast('حقول مطلوبة', 'يرجى تحديد التاريخ والوقت المناسبين', 'warning');
    return;
  }

  const requestId = 'req_' + Date.now();
  const newRequest = {
    id: requestId,
    serviceId: service.id,
    serviceTitle: service.title,
    providerId: service.providerId,
    providerName: service.providerName,
    requesterId: currentUser.id,
    requesterName: currentUser.name,
    requesterAvatar: currentUser.avatar,
    hours: service.duration,
    date: date,
    time: time,
    notes: notes || 'طلب خدمة عبر المنصة',
    status: 'pending',
    isSolidarity: false,
    createdAt: new Date().toISOString().split('T')[0]
  };

  Storage.saveRequest(newRequest);

  // Notify Provider
  Storage.addNotification(service.providerId, {
    title: 'طلب خدمة جديد وارد!',
    message: `أرسل ${currentUser.name} طلباً للاستفادة من خدمة "${service.title}" بتاريخ ${date}.`,
    type: 'request',
    link: 'my-requests.html'
  });

  showToast('تم إرسال طلبك!', `تم إرسال طلب الخدمة إلى ${service.providerName} بنجاح. ستتلقى إشعاراً عند الرد.`);

  setTimeout(() => {
    window.location.href = 'my-requests.html';
  }, 1000);
}

// Request solidarity coverage for a specific service when user has zero or insufficient balance
window.applySolidarityForThisService = function(serviceId) {
  const service = Storage.getServiceById(serviceId);
  const currentUser = Storage.getCurrentUser();
  if (!service || !currentUser) return;

  showConfirmModal(
    'طلب دعم تكافلي للخدمة',
    `هل ترغب في تقديم طلب لصندوق التكافل لتغطية ساعات خدمة "${service.title}" (${service.duration} ساعات) لصالحك دون أي إلزام مالي أو زمني؟`,
    'تأكيد طلب التكافل',
    () => {
      // Create request marked as isSolidarity = true
      const newRequest = {
        id: 'req_' + Date.now(),
        serviceId: service.id,
        serviceTitle: service.title,
        providerId: service.providerId,
        providerName: service.providerName,
        requesterId: currentUser.id,
        requesterName: currentUser.name,
        requesterAvatar: currentUser.avatar,
        hours: service.duration,
        date: 'يحدد بالتنسيق',
        time: 'يحدد بالتنسيق',
        notes: `طلب دعم تكافلي: المستفيد يمر بظروف لا تسمح بتبادل الساعات حالياً.`,
        status: 'pending',
        isSolidarity: true, // Sponsored by fund!
        createdAt: new Date().toISOString().split('T')[0]
      };

      Storage.saveRequest(newRequest);

      // Notify Provider
      Storage.addNotification(service.providerId, {
        title: 'طلب خدمة تكافلية جديد 🤝',
        message: `تم ترشيحك من صندوق التكافل لتقديم خدمة "${service.title}" لصالح ${currentUser.name}. سيتم صرف ساعاتك من صندوق التكافل!`,
        type: 'solidarity',
        link: 'my-requests.html'
      });

      showToast('تم إرسال طلب التكافل', 'تم إرسال طلبك بنجاح وسيتواصل معك مقدم الخدمة وإدارة الصندوق قريباً.');
      setTimeout(() => window.location.href = 'my-requests.html', 1000);
    }
  );
};

/**
 * ADD SERVICE FORM LOGIC
 */
function initAddServiceForm() {
  const currentUser = Storage.getCurrentUser();
  if (!currentUser) {
    showToast('يجب تسجيل الدخول', 'يرجى تسجيل الدخول أولاً لإضافة خدمة جديدة', 'warning');
    setTimeout(() => window.location.href = 'login.html', 800);
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

  const form = document.getElementById('add-service-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('srv-title').value.trim();
    const category = document.getElementById('srv-category').value;
    const duration = Number(document.getElementById('srv-duration').value);
    const type = document.getElementById('srv-type').value;
    const location = document.getElementById('srv-location').value.trim();
    const availability = document.getElementById('srv-availability').value.trim();
    const shortDesc = document.getElementById('srv-short-desc').value.trim();
    const fullDesc = document.getElementById('srv-full-desc').value.trim();

    if (!title || !category || !duration || !location || !availability || !shortDesc || !fullDesc) {
      showToast('حقول مطلوبة', 'يرجى ملء جميع الحقول المطلوبة', 'warning');
      return;
    }

    const newService = {
      id: 'srv_' + Date.now(),
      providerId: currentUser.id,
      providerName: currentUser.name,
      providerAvatar: currentUser.avatar,
      title,
      category,
      duration,
      type,
      location,
      availability,
      shortDesc,
      fullDesc,
      status: 'approved', // Auto-approved for smooth demo prototype
      rating: 5.0,
      reviewsCount: 1,
      createdAt: new Date().toISOString().split('T')[0]
    };

    Storage.saveService(newService);

    // Notification
    Storage.addNotification(currentUser.id, {
      title: 'تم نشر خدمتك بنجاح!',
      message: `أصبحت خدمة "${title}" معروضة الآن في سوق المهارات لجميع الأعضاء.`,
      type: 'service',
      link: `service-details.html?id=${newService.id}`
    });

    showToast('تمت إضافة الخدمة بنجاح!', 'تم نشر خدمتك في المنصة وأصبحت متاحة للتبادل.');

    setTimeout(() => {
      window.location.href = 'services.html';
    }, 900);
  });
}
