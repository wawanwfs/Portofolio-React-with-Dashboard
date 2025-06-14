# 🔐 Security & Authentication Guide

## 🛡️ Dashboard Security

Dashboard sekarang dilindungi dengan sistem login untuk mencegah akses yang tidak sah.

### 🔑 Login Credentials

**Default Admin Access:**

- **Username:** `admin`
- **Password:** `admin123`

### 🚨 Cara Mengakses Dashboard

1. **Buka Portfolio** - `http://localhost:3000`
2. **Pergi ke Dashboard** - `http://localhost:3000/dashboard`
3. **Login Form Otomatis Muncul** - Masukkan credentials di atas
4. **Dashboard Terbuka** - Setelah login berhasil

### 🔄 Fitur Authentication

#### ✅ **Login System**

- Form login yang responsive dan aman
- Validasi input dengan error handling
- Loading state saat proses login
- Toast notification untuk feedback

#### 🔒 **Protected Routes**

- Dashboard hanya bisa diakses setelah login
- Redirect otomatis ke login jika belum authenticated
- Session tersimpan di localStorage

#### 🚪 **Logout Functionality**

- Tombol logout di navbar (desktop & mobile)
- Tombol logout di dashboard header
- Konfirmasi logout untuk keamanan
- Clear session data saat logout

### 🎨 Dark/Light Mode

#### 🌙 **Dark Mode (Default)**

- Theme gelap profesional
- Glass morphism effects
- Gradients yang elegan

#### ☀️ **Light Mode**

- Theme terang yang clean
- Background putih dengan accent biru
- UI yang kontras dan mudah dibaca

#### 🔄 **Theme Toggle**

- Toggle button di navbar
- Animasi smooth saat perubahan theme
- Preferensi theme tersimpan di localStorage
- Auto-apply theme saat reload

### 📱 Responsive Design

#### 🖥️ **Desktop Features**

- Theme toggle di navbar
- Logout button dengan icon dan text
- Dropdown effects yang smooth

#### 📱 **Mobile Features**

- Theme toggle di mobile menu
- Compact UI yang user-friendly
- Touch-optimized interactions

### 🔧 Customization

#### 🔐 **Mengganti Password Default**

Edit file `src/contexts/AuthContext.js`:

```javascript
const defaultCredentials = {
  username: "your_username",
  password: "your_secure_password",
};
```

#### 🎨 **Customize Theme Colors**

Edit file `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#your_color', // Main primary color
    600: '#darker_color', // Hover states
  }
}
```

#### 🔒 **Advanced Security (Untuk Production)**

1. **Backend Integration**

   - Ganti localStorage dengan JWT tokens
   - Implementasi server-side authentication
   - Rate limiting untuk login attempts

2. **Password Encryption**

   - Hash passwords dengan bcrypt
   - Salt untuk additional security
   - Secure session management

3. **Multi-Factor Authentication**
   - Email verification
   - SMS atau TOTP codes
   - Backup recovery codes

### 🚀 Features Overview

#### ✅ **Completed Security Features**

- [x] Login/logout system
- [x] Protected dashboard route
- [x] Session persistence
- [x] Theme switching
- [x] Responsive authentication UI
- [x] Form validation & feedback
- [x] Auto-redirect handling

#### 🎯 **Security Best Practices**

- Input validation dan sanitization
- HTTPS only (untuk production)
- Secure session storage
- Password complexity requirements
- Logout confirmation prompts

### 📋 **Quick Start Security**

1. **Test Login:**

   ```
   Username: admin
   Password: admin123
   ```

2. **Access Dashboard:**

   ```
   http://localhost:3000/dashboard
   ```

3. **Switch Themes:**

   ```
   Klik toggle di navbar (sun/moon icon)
   ```

4. **Logout:**
   ```
   Klik logout button di navbar atau dashboard
   ```

### 🔍 **Troubleshooting**

#### ❌ **Login Gagal**

- Pastikan credentials benar (case-sensitive)
- Clear browser cache/localStorage
- Check browser console untuk errors

#### 🎨 **Theme Tidak Berubah**

- Refresh halaman
- Clear localStorage
- Check browser support untuk CSS custom properties

#### 🚪 **Redirect Issues**

- Clear localStorage: `localStorage.clear()`
- Hard refresh: `Ctrl+F5` atau `Cmd+Shift+R`

---

**🛡️ Portfolio Anda sekarang aman dan modern dengan authentication system dan theme switching yang professional!**
