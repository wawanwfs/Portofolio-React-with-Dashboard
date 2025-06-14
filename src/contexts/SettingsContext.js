import React, { createContext, useContext, useState, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

const defaultSettings = {
  // Branding & Identity
  siteName: "Portfolio",
  siteTagline: "Professional Portfolio",
  siteDescription: "A modern portfolio showcasing my work and expertise",
  logoUrl: "/logo.png",
  faviconUrl: "/favicon.ico",
  logoText: "Portfolio",
  showLogoText: true,
  logoPosition: "left", // left, center, right
  logoSize: "medium", // small, medium, large

  // SEO & Meta
  metaKeywords: "portfolio, web development, react, javascript",
  metaAuthor: "Portfolio Owner",
  socialImage: "/social-preview.jpg",
  twitterHandle: "@portfolio",

  // Template & Layout
  template: "modern", // modern, classic, minimal, creative
  layout: "default", // default, sidebar, grid, masonry
  navigation: "horizontal", // horizontal, vertical, sidebar

  // Theme Mode
  themeMode: "auto", // light, dark, auto

  // Color Schemes
  colorScheme: "purple-pink", // purple-pink, blue-cyan, green-teal, orange-red, custom
  primaryColor: "#8b5cf6",
  secondaryColor: "#ec4899",
  accentColor: "#f59e0b",
  lightBackgroundColor: "#ffffff",
  darkBackgroundColor: "#000000",

  // Typography
  fontFamily: "inter", // inter, poppins, roboto, playfair, montserrat
  fontSize: "normal", // small, normal, large
  fontWeight: "normal", // light, normal, medium, bold
  lineHeight: "normal", // tight, normal, relaxed

  // Animations
  animationsEnabled: true,
  animationSpeed: "normal", // slow, normal, fast
  reducedMotion: false,
  particleEffects: true,
  hoverEffects: true,

  // Components Visibility
  showParticles: true,
  showGradients: true,
  showGlassEffect: true,
  showSocialLinks: true,
  showScrollIndicator: true,
  showLoadingScreen: true,

  // Layout Spacing
  containerWidth: "default", // narrow, default, wide, full
  sectionSpacing: "normal", // compact, normal, spacious
  cardSpacing: "normal", // compact, normal, spacious

  // Performance
  imageOptimization: true,
  lazyLoading: true,
  preloadCritical: true,

  // Accessibility
  highContrast: false,
  focusIndicators: true,
  keyboardNavigation: true,
  screenReaderOptimized: false,

  // Advanced
  customCSS: "",
  devMode: false,
  debugMode: false,
};

const colorSchemes = {
  "purple-pink": {
    primary: "#8b5cf6",
    secondary: "#ec4899",
    accent: "#f59e0b",
    gradients: ["from-purple-500", "via-pink-500", "to-red-500"],
    lightText: "#374151",
    darkText: "#f3f4f6",
    lightBg: "#ffffff",
    darkBg: "#000000",
    lightCard: "#f9fafb",
    darkCard: "#1f2937",
  },
  "blue-cyan": {
    primary: "#3b82f6",
    secondary: "#06b6d4",
    accent: "#10b981",
    gradients: ["from-blue-500", "via-cyan-500", "to-teal-500"],
    lightText: "#374151",
    darkText: "#f3f4f6",
    lightBg: "#ffffff",
    darkBg: "#000000",
    lightCard: "#f9fafb",
    darkCard: "#1f2937",
  },
  "green-teal": {
    primary: "#10b981",
    secondary: "#14b8a6",
    accent: "#f59e0b",
    gradients: ["from-green-500", "via-emerald-500", "to-teal-500"],
    lightText: "#374151",
    darkText: "#f3f4f6",
    lightBg: "#ffffff",
    darkBg: "#000000",
    lightCard: "#f9fafb",
    darkCard: "#1f2937",
  },
  "orange-red": {
    primary: "#f97316",
    secondary: "#ef4444",
    accent: "#eab308",
    gradients: ["from-orange-500", "via-red-500", "to-pink-500"],
    lightText: "#374151",
    darkText: "#f3f4f6",
    lightBg: "#ffffff",
    darkBg: "#000000",
    lightCard: "#f9fafb",
    darkCard: "#1f2937",
  },
  monochrome: {
    primary: "#6b7280",
    secondary: "#374151",
    accent: "#9ca3af",
    gradients: ["from-gray-600", "via-gray-500", "to-gray-400"],
    lightText: "#374151",
    darkText: "#f3f4f6",
    lightBg: "#ffffff",
    darkBg: "#000000",
    lightCard: "#f9fafb",
    darkCard: "#1f2937",
  },
};

const templates = {
  modern: {
    name: "Modern",
    description: "Clean, contemporary design with smooth animations",
    features: [
      "Glass morphism",
      "Gradient backgrounds",
      "Smooth animations",
      "Modern typography",
    ],
  },
  classic: {
    name: "Classic",
    description: "Traditional professional layout with subtle effects",
    features: [
      "Clean lines",
      "Professional colors",
      "Minimal animations",
      "Traditional layout",
    ],
  },
  minimal: {
    name: "Minimal",
    description: "Simple, clean design focusing on content",
    features: [
      "Lots of whitespace",
      "Simple colors",
      "Minimal effects",
      "Content-focused",
    ],
  },
  creative: {
    name: "Creative",
    description: "Bold, artistic design with dynamic elements",
    features: [
      "Bold colors",
      "Creative layouts",
      "Dynamic animations",
      "Artistic elements",
    ],
  },
  cyberpunk: {
    name: "Cyberpunk",
    description: "Futuristic neon-themed design",
    features: [
      "Neon colors",
      "Glitch effects",
      "Dark theme",
      "Futuristic elements",
    ],
  },
};

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("portfolio_settings");
    return saved
      ? { ...defaultSettings, ...JSON.parse(saved) }
      : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem("portfolio_settings", JSON.stringify(settings));
    applyGlobalStyles(settings);

    // Listen for system theme changes when in auto mode
    if (settings.themeMode === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleThemeChange = () => applyGlobalStyles(settings);

      mediaQuery.addEventListener("change", handleThemeChange);
      return () => mediaQuery.removeEventListener("change", handleThemeChange);
    }
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.removeItem("portfolio_settings");
  };

  const applyTemplate = (templateName) => {
    const templateSettings = getTemplateSettings(templateName);
    updateSettings(templateSettings);
  };

  const applyColorScheme = (schemeName) => {
    const scheme = colorSchemes[schemeName];
    if (scheme) {
      updateSettings({
        colorScheme: schemeName,
        primaryColor: scheme.primary,
        secondaryColor: scheme.secondary,
        accentColor: scheme.accent,
      });
    }
  };

  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "portfolio-settings.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  const importSettings = (settingsData) => {
    try {
      const imported = JSON.parse(settingsData);
      setSettings({ ...defaultSettings, ...imported });
      return true;
    } catch (error) {
      console.error("Failed to import settings:", error);
      return false;
    }
  };

  const value = {
    settings,
    updateSettings,
    resetSettings,
    applyTemplate,
    applyColorScheme,
    exportSettings,
    importSettings,
    colorSchemes,
    templates,
    defaultSettings,
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};

// Apply global styles based on settings
const applyGlobalStyles = (settings) => {
  const root = document.documentElement;
  const body = document.body;

  // Determine current theme
  const getThemeMode = () => {
    if (settings.themeMode === "auto") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return settings.themeMode;
  };

  const currentTheme = getThemeMode();
  const currentScheme = colorSchemes[settings.colorScheme];

  // Apply theme class to body with force update
  body.classList.remove("light", "dark");
  body.classList.add(currentTheme);

  // Ensure the data attribute is also set for additional CSS targeting
  body.setAttribute("data-theme", currentTheme);

  // Helper function to convert hex to rgb
  const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  // Helper function to generate color variations
  const generateColorVariations = (baseColor, prefix) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;

    const { r, g, b } = rgb;

    // Generate variations
    root.style.setProperty(`--${prefix}-50`, `rgba(${r}, ${g}, ${b}, 0.05)`);
    root.style.setProperty(`--${prefix}-100`, `rgba(${r}, ${g}, ${b}, 0.1)`);
    root.style.setProperty(`--${prefix}-200`, `rgba(${r}, ${g}, ${b}, 0.2)`);
    root.style.setProperty(`--${prefix}-300`, `rgba(${r}, ${g}, ${b}, 0.3)`);
    root.style.setProperty(`--${prefix}-400`, `rgba(${r}, ${g}, ${b}, 0.6)`);
    root.style.setProperty(`--${prefix}-500`, baseColor);
    root.style.setProperty(`--${prefix}-600`, `rgba(${r}, ${g}, ${b}, 0.8)`);
    root.style.setProperty(`--${prefix}-700`, `rgba(${r}, ${g}, ${b}, 0.9)`);
    root.style.setProperty(`--${prefix}-800`, `rgba(${r}, ${g}, ${b}, 0.95)`);
    root.style.setProperty(`--${prefix}-900`, `rgba(${r}, ${g}, ${b}, 1)`);
  };

  // Apply CSS custom properties for colors
  root.style.setProperty("--primary-color", settings.primaryColor);
  root.style.setProperty("--secondary-color", settings.secondaryColor);
  root.style.setProperty("--accent-color", settings.accentColor);

  // Generate color variations for Tailwind
  generateColorVariations(settings.primaryColor, "primary");
  generateColorVariations(settings.secondaryColor, "secondary");
  generateColorVariations(settings.accentColor, "accent");

  // Apply theme-specific colors using CSS custom properties
  if (currentScheme) {
    const textColor =
      currentTheme === "dark"
        ? currentScheme.darkText
        : currentScheme.lightText;
    const bgColor =
      currentTheme === "dark" ? currentScheme.darkBg : currentScheme.lightBg;
    const cardColor =
      currentTheme === "dark"
        ? currentScheme.darkCard
        : currentScheme.lightCard;
    const borderColor = currentTheme === "dark" ? "#374151" : "#d1d5db";
    const inputBg = currentTheme === "dark" ? "#374151" : "#ffffff";
    const inputText = currentTheme === "dark" ? "#f3f4f6" : "#1f2937";
    const glassBg =
      currentTheme === "dark"
        ? "rgba(255, 255, 255, 0.1)"
        : "rgba(255, 255, 255, 0.9)";
    const glassBorder =
      currentTheme === "dark"
        ? "rgba(255, 255, 255, 0.2)"
        : "rgba(0, 0, 0, 0.1)";
    const scrollbarTrack = currentTheme === "dark" ? "#1a1a1a" : "#f3f4f6";

    // Set CSS custom properties on root
    root.style.setProperty("--text-color", textColor);
    root.style.setProperty("--bg-color", bgColor);
    root.style.setProperty("--card-color", cardColor);
    root.style.setProperty("--border-color", borderColor);
    root.style.setProperty("--input-bg", inputBg);
    root.style.setProperty("--input-text", inputText);
    root.style.setProperty("--glass-bg", glassBg);
    root.style.setProperty("--glass-border", glassBorder);
    root.style.setProperty("--scrollbar-track", scrollbarTrack);
    root.style.setProperty("--scrollbar-thumb", settings.primaryColor);

    // Convert hex colors to RGB for rgba() functions
    const textRgb = hexToRgb(textColor);
    if (textRgb) {
      root.style.setProperty(
        "--text-color-rgb",
        `${textRgb.r}, ${textRgb.g}, ${textRgb.b}`
      );
    }

    // Apply to body for immediate effect with !important
    body.style.setProperty("background-color", bgColor, "important");
    body.style.setProperty("color", textColor, "important");
  }

  // Apply font family
  const fontFamilies = {
    inter: '"Inter", sans-serif',
    poppins: '"Poppins", sans-serif',
    roboto: '"Roboto", sans-serif',
    playfair: '"Playfair Display", serif',
    montserrat: '"Montserrat", sans-serif',
  };

  if (fontFamilies[settings.fontFamily]) {
    root.style.setProperty("--font-family", fontFamilies[settings.fontFamily]);
    // Also update body font family for immediate effect
    document.body.style.fontFamily = fontFamilies[settings.fontFamily];
  }

  // Apply container width
  const containerWidths = {
    narrow: "1024px",
    default: "1280px",
    wide: "1536px",
    full: "100%",
  };

  root.style.setProperty(
    "--container-width",
    containerWidths[settings.containerWidth]
  );

  // Apply animation settings
  if (!settings.animationsEnabled || settings.reducedMotion) {
    root.style.setProperty("--animation-duration", "0s");
    root.style.setProperty("--transition-duration", "0s");
  } else {
    const speeds = {
      slow: "0.8s",
      normal: "0.5s",
      fast: "0.3s",
    };
    root.style.setProperty(
      "--animation-duration",
      speeds[settings.animationSpeed]
    );
    root.style.setProperty(
      "--transition-duration",
      speeds[settings.animationSpeed]
    );
  }

  // Apply font size
  const fontSizes = {
    small: "0.875rem",
    normal: "1rem",
    large: "1.125rem",
  };
  root.style.setProperty("--font-size-base", fontSizes[settings.fontSize]);

  // Apply line height
  const lineHeights = {
    tight: "1.25",
    normal: "1.5",
    relaxed: "1.75",
  };
  root.style.setProperty(
    "--line-height-base",
    lineHeights[settings.lineHeight]
  );

  // Apply custom CSS
  if (settings.customCSS) {
    let customStyleElement = document.getElementById("custom-portfolio-styles");
    if (!customStyleElement) {
      customStyleElement = document.createElement("style");
      customStyleElement.id = "custom-portfolio-styles";
      document.head.appendChild(customStyleElement);
    }
    customStyleElement.textContent = settings.customCSS;
  }

  // Apply accessibility settings
  if (settings.highContrast) {
    root.classList.add("high-contrast");
  } else {
    root.classList.remove("high-contrast");
  }

  if (settings.reducedMotion) {
    root.classList.add("reduced-motion");
  } else {
    root.classList.remove("reduced-motion");
  }

  // Apply component visibility
  if (!settings.showParticles) {
    root.style.setProperty("--particles-display", "none");
  } else {
    root.style.setProperty("--particles-display", "block");
  }

  if (!settings.showGradients) {
    root.style.setProperty("--gradients-opacity", "0");
  } else {
    root.style.setProperty("--gradients-opacity", "1");
  }

  // Apply branding settings
  applyBrandingSettings(settings);

  // Force re-render by updating a CSS variable with timestamp
  root.style.setProperty("--settings-update-time", Date.now().toString());

  // Trigger a reflow to ensure styles are applied
  void document.body.offsetHeight;

  // Dispatch custom event to notify components of settings change
  window.dispatchEvent(
    new CustomEvent("settingsUpdated", { detail: settings })
  );
};

// Apply branding settings
const applyBrandingSettings = (settings) => {
  // Update document title
  if (settings.siteName) {
    document.title = settings.siteTagline
      ? `${settings.siteName} - ${settings.siteTagline}`
      : settings.siteName;
  }

  // Update favicon
  if (settings.faviconUrl) {
    let favicon = document.querySelector('link[rel="icon"]');
    if (!favicon) {
      favicon = document.createElement("link");
      favicon.rel = "icon";
      document.head.appendChild(favicon);
    }
    favicon.href = settings.faviconUrl;
  }

  // Update meta description
  if (settings.siteDescription) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.name = "description";
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = settings.siteDescription;
  }

  // Update meta keywords
  if (settings.metaKeywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement("meta");
      metaKeywords.name = "keywords";
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = settings.metaKeywords;
  }

  // Update meta author
  if (settings.metaAuthor) {
    let metaAuthor = document.querySelector('meta[name="author"]');
    if (!metaAuthor) {
      metaAuthor = document.createElement("meta");
      metaAuthor.name = "author";
      document.head.appendChild(metaAuthor);
    }
    metaAuthor.content = settings.metaAuthor;
  }

  // Update Open Graph meta tags
  const ogTags = [
    { property: "og:title", content: settings.siteName },
    { property: "og:description", content: settings.siteDescription },
    { property: "og:image", content: settings.socialImage },
    { property: "og:type", content: "website" },
  ];

  ogTags.forEach((tag) => {
    if (tag.content) {
      let metaTag = document.querySelector(`meta[property="${tag.property}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.setAttribute("property", tag.property);
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    }
  });

  // Update Twitter Card meta tags
  const twitterTags = [
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: settings.siteName },
    { name: "twitter:description", content: settings.siteDescription },
    { name: "twitter:image", content: settings.socialImage },
    { name: "twitter:site", content: settings.twitterHandle },
  ];

  twitterTags.forEach((tag) => {
    if (tag.content) {
      let metaTag = document.querySelector(`meta[name="${tag.name}"]`);
      if (!metaTag) {
        metaTag = document.createElement("meta");
        metaTag.name = tag.name;
        document.head.appendChild(metaTag);
      }
      metaTag.content = tag.content;
    }
  });
};

// Get template-specific settings
const getTemplateSettings = (templateName) => {
  const templateConfigs = {
    modern: {
      template: "modern",
      colorScheme: "purple-pink",
      showGradients: true,
      showGlassEffect: true,
      showParticles: true,
      animationsEnabled: true,
      animationSpeed: "normal",
      fontFamily: "inter",
      layout: "default",
    },
    classic: {
      template: "classic",
      colorScheme: "blue-cyan",
      showGradients: false,
      showGlassEffect: false,
      showParticles: false,
      animationsEnabled: true,
      animationSpeed: "slow",
      fontFamily: "roboto",
      layout: "default",
    },
    minimal: {
      template: "minimal",
      colorScheme: "monochrome",
      showGradients: false,
      showGlassEffect: false,
      showParticles: false,
      animationsEnabled: false,
      animationSpeed: "fast",
      fontFamily: "inter",
      layout: "default",
      sectionSpacing: "spacious",
    },
    creative: {
      template: "creative",
      colorScheme: "orange-red",
      showGradients: true,
      showGlassEffect: true,
      showParticles: true,
      animationsEnabled: true,
      animationSpeed: "fast",
      fontFamily: "poppins",
      layout: "grid",
    },
    cyberpunk: {
      template: "cyberpunk",
      colorScheme: "purple-pink",
      showGradients: true,
      showGlassEffect: true,
      showParticles: true,
      animationsEnabled: true,
      animationSpeed: "fast",
      fontFamily: "montserrat",
      layout: "default",
      primaryColor: "#00ff88",
      secondaryColor: "#ff0080",
      accentColor: "#ffff00",
      backgroundColor: "#000000",
    },
  };

  return templateConfigs[templateName] || {};
};

export default SettingsContext;
