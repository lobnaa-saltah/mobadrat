/**
 * وقت لبعض | Time for All - Authentication Logic
 * Login & Register workflows with LocalStorage persistence.
 */

// Quick fill for demo logins
function quickFillLogin(email, password) {
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  if (emailInput && passInput) {
    emailInput.value = email;
    passInput.value = password;
    showToast('تم إدخال البيانات', 'اضغط على زر الدخول أو انتظر لحظة للدخول التلقائي...', 'info');
    setTimeout(() => {
      document.getElementById('login-form').dispatchEvent(new Event('submit'));
    }, 450);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Handle Login Form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const email = document.getElementById('login-email').value.trim();
      const password = document.getElementById('login-password').value.trim();

      if (!email || !password) {
        showToast('خطأ في البيانات', 'يرجى إدخال البريد الإلكتروني وكلمة المرور', 'error');
        return;
      }

      const user = Storage.getUserByEmail(email);

      if (!user) {
        showToast('المستخدم غير موجود', 'لم يتم العثور على حساب بهذا البريد. يمكنك استخدام الحسابات التجريبية بالأعلى أو إنشاء حساب جديد.', 'error');
        return;
      }

      // Password check for demo prototype (admin must match, regular users accept either their pass or 'password')
      if (user.role === 'admin') {
        if (password !== 'admin' && password !== user.password) {
          showToast('كلمة المرور غير صحيحة', 'كلمة مرور حساب الإدارة التجريبي هي: admin', 'error');
          return;
        }
      } else {
        if (password !== user.password && password !== 'password' && password !== '123456') {
          showToast('كلمة المرور غير صحيحة', 'يمكنك كتابة: password لأي حساب تجريبي', 'error');
          return;
        }
      }

      // Set user as current session
      Storage.setCurrentUser(user);
      showToast('مرحباً بك!', `تم تسجيل الدخول بنجاح باسم: ${user.name}`);

      setTimeout(() => {
        if (user.role === 'admin') {
          window.location.href = 'admin.html';
        } else {
          window.location.href = 'dashboard.html';
        }
      }, 700);
    });
  }

  // Handle Registration Form
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reg-name').value.trim();
      const email = document.getElementById('reg-email').value.trim();
      const password = document.getElementById('reg-password').value;
      const confirmPassword = document.getElementById('reg-password-confirm').value;
      const phone = document.getElementById('reg-phone').value.trim();
      const city = document.getElementById('reg-city').value.trim();
      const university = document.getElementById('reg-university').value.trim();
      const skillsRaw = document.getElementById('reg-skills').value.trim();
      const bio = document.getElementById('reg-bio').value.trim();
      const participationType = document.querySelector('input[name="participationType"]:checked')?.value || 'both';

      // Validations
      if (!name || !email || !password || !phone || !city) {
        showToast('حقول مطلوبة', 'يرجى استيفاء جميع الحقول المطلوبة التي تحمل علامة (*)', 'warning');
        return;
      }

      if (password !== confirmPassword) {
        showToast('عدم تطابق', 'كلمة المرور وتأكيد كلمة المرور غير متطابقين!', 'error');
        return;
      }

      if (password.length < 4) {
        showToast('كلمة مرور قصيرة', 'يجب أن لا تقل كلمة المرور عن ٤ أحرف أو أرقام.', 'warning');
        return;
      }

      // Check duplicate email
      const existingUser = Storage.getUserByEmail(email);
      if (existingUser) {
        showToast('البريد مسجل مسبقاً', 'يوجد حساب مسجل بالفعل بهذا البريد الإلكتروني. يرجى تسجيل الدخول بدلاً من ذلك.', 'error');
        return;
      }

      // Parse skills
      const skills = skillsRaw ? skillsRaw.split(/[,،]/).map(s => s.trim()).filter(Boolean) : ['المساعدة العامة'];

      // Get welcome balance setting
      const settings = Storage.getSettings();
      const welcomeBonus = Number(settings.welcomeBonus || 2);

      const newUserId = 'user_' + Date.now();
      const newUser = {
        id: newUserId,
        name,
        email,
        password,
        role: 'user',
        phone,
        city,
        university: university || 'مجتمع المبادرة',
        bio: bio || 'عضو جديد ومهتم بتبادل الوقت والمهارات في مجتمع وقت لبعض.',
        skills,
        participationType,
        balance: welcomeBonus,
        totalEarned: welcomeBonus,
        totalSpent: 0,
        totalDonated: 0,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=250&q=80',
        joinedDate: new Date().toISOString().split('T')[0]
      };

      // Save user
      Storage.saveUser(newUser);

      // Log Welcome Bonus Transaction
      Storage.addTransaction({
        userId: newUserId,
        type: 'welcome',
        amount: welcomeBonus,
        balanceAfter: welcomeBonus,
        description: 'رصيد ترحيبي عند الانضمام لمبادرة وقت لبعض',
        relatedUser: 'مبادرة وقت لبعض'
      });

      // Add Welcome Notification
      Storage.addNotification(newUserId, {
        title: 'أهلاً بك في وقت لبعض!',
        message: `تم تفعيل حسابك وإضافة ${welcomeBonus} ساعات رصيد ترحيبي إلى محفظتك لتبدأ رحلتك فوراً.`,
        type: 'credit',
        link: 'wallet.html'
      });

      // Set current session
      Storage.setCurrentUser(newUser);

      showToast('تم التسجيل بنجاح!', `مرحباً بك يا ${name}! حصلت على ${welcomeBonus} ساعات رصيد مجاناً.`);

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1000);
    });
  }
});
