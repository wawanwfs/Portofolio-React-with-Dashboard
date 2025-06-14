# 🎨 Advanced Portfolio Settings Guide

## Overview

Portfolio Anda sekarang dilengkapi dengan sistem settings yang sangat komprehensif yang memungkinkan Anda mengustomisasi hampir semua aspek tampilan dan fungsionalitas. Sistem ini terdiri dari **9 kategori utama** dengan lebih dari **40 opsi kustomisasi**.

## 🚀 Cara Mengakses Settings

1. **Login ke Dashboard**: Masuk dengan credentials admin
2. **Buka Tab Settings**: Klik tab "Settings" di sidebar dashboard
3. **Pilih Kategori**: Pilih dari 9 kategori settings yang tersedia

## 📋 Kategori Settings

### 1. 🎭 Branding & Identity (BARU!)

Kontrol penuh atas identitas visual portfolio:

**Site Information**:

- **Site Name**: Nama portfolio utama
- **Site Tagline**: Tagline profesional
- **Site Description**: Deskripsi untuk SEO

**Logo Settings**:

- **Logo URL**: Path ke file logo
- **Logo Text**: Teks alternatif logo
- **Logo Position**: Left, Center, Right
- **Logo Size**: Small, Medium, Large
- **Show Logo Text**: Toggle tampilan teks

**Favicon & Icons**:

- **Favicon URL**: Icon browser tab
- **Social Preview Image**: Gambar sharing media sosial

**SEO & Meta Tags**:

- **Meta Author**: Nama penulis
- **Meta Keywords**: Keywords untuk SEO
- **Twitter Handle**: Handle Twitter untuk cards

### 2. 🎭 Templates

Pilih dari 5 template yang telah dirancang sebelumnya:

- **Modern**: Design kontemporer dengan animasi smooth
- **Classic**: Layout profesional tradisional
- **Minimal**: Design sederhana fokus pada konten
- **Creative**: Design artistik dengan elemen dinamis
- **Cyberpunk**: Design futuristik dengan tema neon

**Fitur**:

- Preview langsung untuk setiap template
- One-click template switching
- Otomatis mengatur semua settings terkait

### 3. 🌈 Colors

Kontrol penuh atas skema warna portfolio:

**Predefined Schemes**:

- Purple-Pink (Default)
- Blue-Cyan
- Green-Teal
- Orange-Red
- Monochrome

**Custom Colors**:

- Primary Color picker
- Secondary Color picker
- Accent Color picker
- Live preview dengan color values

### 4. ✍️ Typography

Atur typography sesuai preferensi:

- **Font Family**: Inter, Poppins, Roboto, Playfair Display, Montserrat
- **Font Size**: Small, Normal, Large
- **Font Weight**: Light, Normal, Medium, Bold
- **Line Height**: Tight, Normal, Relaxed

### 5. 📐 Layout

Kontrol tata letak dan spacing:

- **Container Width**: Narrow (1024px), Default (1280px), Wide (1536px), Full Width
- **Section Spacing**: Compact, Normal, Spacious
- **Navigation Style**: Horizontal, Vertical, Sidebar
- **Layout Type**: Default, Sidebar, Grid, Masonry

### 6. ⚡ Animations

Kontrol animasi dan motion effects:

- **Enable/Disable Animations**: Toggle semua animasi
- **Reduced Motion**: Mode aksesibilitas
- **Particle Effects**: Background particles on/off
- **Hover Effects**: Interactive hover animations
- **Animation Speed**: Slow, Normal, Fast

### 7. 🧩 Components

Visibility control untuk komponen:

- Background Particles
- Gradient Backgrounds
- Glass Morphism Effect
- Social Media Links
- Scroll Indicator
- Loading Screen

### 8. ♿ Accessibility

Settings untuk aksesibilitas:

- **High Contrast Mode**: Meningkatkan kontras visual
- **Focus Indicators**: Visual focus untuk keyboard navigation
- **Keyboard Navigation**: Enhanced keyboard support
- **Screen Reader Optimized**: Optimasi untuk screen reader

### 9. ⚙️ Advanced

Settings lanjutan untuk developer:

- **Custom CSS**: Tambahkan CSS kustom
- **Developer Mode**: Debug features
- **Debug Mode**: Console logging
- **Image Optimization**: Optimasi gambar otomatis
- **Lazy Loading**: Loading progresif

## 🔧 Cara Menggunakan Settings

### Branding Setup (BARU!)

```
1. Pilih tab "Branding"
2. Atur Site Name dan Tagline
3. Upload logo atau masukkan logo URL
4. Atur ukuran dan posisi logo
5. Setup favicon dan social preview
6. Konfigurasi SEO meta tags
7. Perubahan langsung terlihat di navbar
```

### Template Switching

```
1. Pilih tab "Templates"
2. Klik template yang diinginkan
3. Settings akan otomatis diterapkan
4. Preview akan langsung berubah
```

### Color Customization

```
1. Pilih tab "Colors"
2. Pilih predefined scheme ATAU
3. Gunakan color picker untuk custom colors
4. Masukkan hex code manual jika diperlukan
5. Perubahan akan langsung terlihat
```

### Layout Adjustment

```
1. Pilih tab "Layout"
2. Sesuaikan container width
3. Atur section spacing
4. Pilih navigation style
5. Tentukan layout type
```

## 💾 Import/Export Settings

### Export Settings

1. Klik tombol "Export" di header settings
2. File JSON akan otomatis terdownload
3. File berisi semua konfigurasi saat ini

### Import Settings

1. Klik tombol "Import"
2. Pilih file JSON settings
3. Konfigurasi akan otomatis diterapkan

### Reset Settings

1. Klik tombol "Reset"
2. Konfirmasi reset
3. Semua settings kembali ke default

## 🎯 Best Practices

### Branding Guidelines

- Gunakan logo dengan ukuran optimal (PNG/SVG recommended)
- Pastikan favicon berukuran 32x32 atau 16x16 pixels
- Social preview image sebaiknya 1200x630 pixels
- Isi meta description 150-160 karakter
- Keywords dipisahkan dengan koma

### Performance Optimization

- Disable particle effects untuk performa lebih baik
- Gunakan reduced motion untuk device lambat
- Enable image optimization dan lazy loading

### Accessibility

- Selalu test dengan high contrast mode
- Ensure focus indicators enabled
- Test keyboard navigation
- Consider screen reader optimization

### Design Consistency

- Stick to one template untuk konsistensi
- Gunakan color scheme yang harmonis
- Maintain consistent spacing
- Test di berbagai ukuran layar

## 🔄 Auto-Apply Features

Settings sistem secara otomatis:

- **Menyimpan ke localStorage**: Semua perubahan tersimpan otomatis
- **Apply CSS Custom Properties**: Menggunakan CSS variables
- **Update Global Styles**: Perubahan langsung terlihat
- **Cross-Component Sync**: Semua komponen terupdate
- **Dynamic Meta Tags**: SEO tags update real-time
- **Favicon Switching**: Icon browser update otomatis

## 🛠️ Technical Implementation

### Branding Integration

```javascript
// Auto-update document title
document.title = `${siteName} - ${siteTagline}`;

// Dynamic favicon
favicon.href = settings.faviconUrl;

// Meta tags update
metaDesc.content = settings.siteDescription;
```

### CSS Custom Properties

```css
:root {
  --primary-color: #8b5cf6;
  --secondary-color: #ec4899;
  --accent-color: #f59e0b;
  --font-family: "Inter", sans-serif;
  --container-width: 1280px;
  --animation-duration: 0.5s;
}
```

### Context Integration

```javascript
// Menggunakan settings di komponen
const { settings, updateSettings } = useSettings();

// Update specific setting
updateSettings({ siteName: "My Portfolio" });

// Apply template
applyTemplate("modern");
```

### Accessibility Classes

```css
.high-contrast {
  filter: contrast(1.5) brightness(1.2);
}
.reduced-motion * {
  animation-duration: 0.01ms !important;
}
```

## 🎨 Template Specifications

### Modern Template

- Glass morphism effects
- Gradient backgrounds
- Smooth animations
- Purple-pink color scheme
- Inter font family

### Classic Template

- Clean professional layout
- Minimal effects
- Blue-cyan color scheme
- Roboto font family
- Slow animations

### Minimal Template

- Lots of whitespace
- No particles or gradients
- Monochrome colors
- Fast transitions
- Content-focused

### Creative Template

- Bold artistic design
- Dynamic animations
- Orange-red scheme
- Poppins font
- Grid layout

### Cyberpunk Template

- Futuristic neon theme
- Glitch effects
- Neon green/pink colors
- Montserrat font
- Fast animations

## 🚨 Troubleshooting

### Settings Not Applying

1. Check browser console for errors
2. Clear localStorage: `localStorage.clear()`
3. Refresh page dan re-apply settings
4. Try import/export untuk backup

### Branding Issues

1. Pastikan path logo benar (relative ke public folder)
2. Check favicon format (ICO, PNG, SVG)
3. Verify social preview image accessible
4. Test meta tags dengan developer tools

### Performance Issues

1. Disable particle effects
2. Enable reduced motion
3. Turn off complex animations
4. Use narrow container width

### Visual Issues

1. Check color contrast in accessibility tab
2. Test different font sizes
3. Adjust spacing settings
4. Try different templates

## 📱 Responsive Behavior

Settings sistem responsive dan akan:

- Adapt ke berbagai screen sizes
- Maintain proportions di mobile
- Optimize animations untuk touch devices
- Ensure accessibility di semua platforms
- Logo scaling berdasarkan screen size

## 🔮 Future Enhancements

Planned features:

- **Logo Upload**: Direct file upload untuk logo
- **Favicon Generator**: Auto-generate berbagai ukuran
- **Brand Kit**: Color palette generator
- **Social Media Integration**: Auto-posting setup
- **Analytics Integration**: Google Analytics/tracking
- **Custom Domain**: Domain management
- **Multi-language**: Internationalization support

## 📊 Assets Requirements

### Logo Specifications

- **Format**: PNG, SVG, atau JPEG
- **Size**: Minimum 200x200px untuk quality
- **Background**: Transparent (PNG/SVG recommended)
- **Ratio**: Square atau horizontal landscape

### Favicon Requirements

- **ICO Format**: 16x16, 32x32, 48x48 pixels
- **PNG Alternative**: 32x32px minimum
- **Apple Touch Icon**: 180x180px
- **Android Icon**: 192x192px

### Social Preview Image

- **Size**: 1200x630 pixels (Facebook/Twitter optimal)
- **Format**: PNG atau JPEG
- **File Size**: Under 5MB
- **Content**: Professional dengan branding

---

**Sistem settings ini memberikan kontrol penuh atas portfolio Anda. Eksperimen dengan berbagai kombinasi untuk menemukan look yang perfect untuk brand Anda!** 🎨✨
