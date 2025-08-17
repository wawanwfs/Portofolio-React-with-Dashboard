import React, { useState } from "react";
import { toast } from "react-hot-toast";
import {
  FiImage,
  FiEdit3,
  FiDroplet,
  FiType,
  FiLayout,
  FiZap,
  FiLayers,
  FiEye,
  FiCode,
  FiDownload,
  FiUpload,
  FiRotateCcw,
  FiCheck,
} from "react-icons/fi";
import { useSettings } from "../../contexts/SettingsContext";

const SettingsSection = () => {
  const {
    settings,
    updateSettings,
    resetSettings,
    applyTemplate,
    applyColorScheme,
    exportSettings,
    importSettings,
    colorSchemes,
    templates,
  } = useSettings();
  const [activeSettingsTab, setActiveSettingsTab] = useState("templates");

  const settingsTabs = [
    { id: "branding", name: "Branding", icon: FiImage },
    { id: "templates", name: "Templates", icon: FiEdit3 },
    { id: "colors", name: "Colors", icon: FiDroplet },
    { id: "typography", name: "Typography", icon: FiType },
    { id: "layout", name: "Layout", icon: FiLayout },
    { id: "animations", name: "Animations", icon: FiZap },
    { id: "components", name: "Components", icon: FiLayers },
    { id: "accessibility", name: "Accessibility", icon: FiEye },
    { id: "advanced", name: "Advanced", icon: FiCode },
  ];

  const handleFileImport = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const success = importSettings(e.target.result);
        if (success) {
          toast.success("Settings imported successfully!");
        } else {
          toast.error("Failed to import settings. Invalid file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Portfolio Settings</h2>
        <div className="flex gap-2">
          <button
            onClick={exportSettings}
            className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm"
          >
            <FiDownload className="mr-2" size={16} />
            Export
          </button>
          <label className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer text-sm">
            <FiUpload className="mr-2" size={16} />
            Import
            <input
              type="file"
              accept=".json"
              onChange={handleFileImport}
              className="hidden"
            />
          </label>
          <button
            onClick={() => {
              if (window.confirm("Reset all settings to default?")) {
                resetSettings();
                toast.success("Settings reset to default!");
              }
            }}
            className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
          >
            <FiRotateCcw className="mr-2" size={16} />
            Reset
          </button>
        </div>
      </div>

      {/* Settings Navigation */}
      <div className="glass-effect rounded-xl p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSettingsTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-all text-sm ${
                  activeSettingsTab === tab.id
                    ? "bg-primary-500 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon className="mr-2" size={16} />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Settings Content */}
      <div className="glass-effect rounded-xl p-6">
        {/* Branding Tab */}
        {activeSettingsTab === "branding" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Branding & Identity</h3>

            {/* Site Information */}
            <div className="mb-8">
              <h4 className="font-medium mb-4">Site Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Site Name
                  </label>
                  <input
                    type="text"
                    value={settings.siteName}
                    onChange={(e) =>
                      updateSettings({ siteName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="Your Portfolio"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Site Tagline
                  </label>
                  <input
                    type="text"
                    value={settings.siteTagline}
                    onChange={(e) =>
                      updateSettings({ siteTagline: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="Professional Portfolio"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) =>
                    updateSettings({ siteDescription: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm h-20"
                  placeholder="Brief description of your portfolio"
                />
              </div>
            </div>

            {/* Logo Settings */}
            <div className="mb-8">
              <h4 className="font-medium mb-4">Logo Settings</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Logo URL
                  </label>
                  <input
                    type="text"
                    value={settings.logoUrl}
                    onChange={(e) =>
                      updateSettings({ logoUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="/logo.png"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Logo Text
                  </label>
                  <input
                    type="text"
                    value={settings.logoText}
                    onChange={(e) =>
                      updateSettings({ logoText: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="Portfolio"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Logo Position
                  </label>
                  <select
                    value={settings.logoPosition}
                    onChange={(e) =>
                      updateSettings({ logoPosition: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Logo Size
                  </label>
                  <select
                    value={settings.logoSize}
                    onChange={(e) =>
                      updateSettings({ logoSize: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                  >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                  </select>
                </div>
                <div className="flex items-end">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.showLogoText}
                      onChange={(e) =>
                        updateSettings({ showLogoText: e.target.checked })
                      }
                      className="mr-2"
                    />
                    Show Logo Text
                  </label>
                </div>
              </div>
            </div>

            {/* Favicon & Icons */}
            <div className="mb-8">
              <h4 className="font-medium mb-4">Favicon & Icons</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Favicon URL
                  </label>
                  <input
                    type="text"
                    value={settings.faviconUrl}
                    onChange={(e) =>
                      updateSettings({ faviconUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="/favicon.ico"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Social Preview Image
                  </label>
                  <input
                    type="text"
                    value={settings.socialImage}
                    onChange={(e) =>
                      updateSettings({ socialImage: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="/social-preview.jpg"
                  />
                </div>
              </div>
            </div>

            {/* SEO & Meta */}
            <div>
              <h4 className="font-medium mb-4">SEO & Meta Tags</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Meta Author
                  </label>
                  <input
                    type="text"
                    value={settings.metaAuthor}
                    onChange={(e) =>
                      updateSettings({ metaAuthor: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Twitter Handle
                  </label>
                  <input
                    type="text"
                    value={settings.twitterHandle}
                    onChange={(e) =>
                      updateSettings({ twitterHandle: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                    placeholder="@yourhandle"
                  />
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Meta Keywords
                </label>
                <input
                  type="text"
                  value={settings.metaKeywords}
                  onChange={(e) =>
                    updateSettings({ metaKeywords: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg text-sm"
                  placeholder="portfolio, web development, react, javascript"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Separate keywords with commas
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeSettingsTab === "templates" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Choose Template</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(templates).map(([key, template]) => (
                <motion.div
                  key={key}
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    settings.template === key
                      ? "border-primary-500 bg-primary-500/10"
                      : "border-gray-600 hover:border-gray-500"
                  }`}
                  onClick={() => applyTemplate(key)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4 className="font-semibold mb-2">{template.name}</h4>
                  <p className="text-sm text-gray-400 mb-3">
                    {template.description}
                  </p>
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center text-xs text-gray-500"
                      >
                        <FiCheck className="mr-2" size={12} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Colors Tab */}
        {activeSettingsTab === "colors" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Colors & Theme</h3>

            {/* Theme Mode */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Theme Mode</h4>
              <div className="flex gap-3">
                {[
                  { value: "light", label: "Light", icon: "☀️" },
                  { value: "dark", label: "Dark", icon: "🌙" },
                  { value: "auto", label: "Auto", icon: "⚙️" },
                ].map((mode) => (
                  <button
                    key={mode.value}
                    onClick={() => updateSettings({ themeMode: mode.value })}
                    className={`flex items-center px-4 py-2 rounded-lg border-2 transition-all ${
                      settings.themeMode === mode.value
                        ? "border-primary-500 bg-primary-500/10"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <span className="mr-2">{mode.icon}</span>
                    {mode.label}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Auto mode follows your system preference
              </p>
            </div>

            {/* Predefined Color Schemes */}
            <div className="mb-6">
              <h4 className="font-medium mb-3">Predefined Schemes</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {Object.entries(colorSchemes).map(([key, scheme]) => (
                  <motion.div
                    key={key}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      settings.colorScheme === key
                        ? "border-primary-500"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                    onClick={() => applyColorScheme(key)}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="flex space-x-1 mb-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: scheme.primary }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: scheme.secondary }}
                      ></div>
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: scheme.accent }}
                      ></div>
                    </div>
                    <p className="text-xs capitalize">
                      {key.replace("-", " ")}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Custom Colors */}
            <div>
              <h4 className="font-medium mb-3">Custom Colors</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2">Primary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        updateSettings({ primaryColor: e.target.value })
                      }
                      className="w-10 h-10 rounded border border-gray-600"
                    />
                    <input
                      type="text"
                      value={settings.primaryColor}
                      onChange={(e) =>
                        updateSettings({ primaryColor: e.target.value })
                      }
                      className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Secondary Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings.secondaryColor}
                      onChange={(e) =>
                        updateSettings({ secondaryColor: e.target.value })
                      }
                      className="w-10 h-10 rounded border border-gray-600"
                    />
                    <input
                      type="text"
                      value={settings.secondaryColor}
                      onChange={(e) =>
                        updateSettings({ secondaryColor: e.target.value })
                      }
                      className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm mb-2">Accent Color</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) =>
                        updateSettings({ accentColor: e.target.value })
                      }
                      className="w-10 h-10 rounded border border-gray-600"
                    />
                    <input
                      type="text"
                      value={settings.accentColor}
                      onChange={(e) =>
                        updateSettings({ accentColor: e.target.value })
                      }
                      className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Typography Tab */}
        {activeSettingsTab === "typography" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Typography Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Font Family
                </label>
                <select
                  value={settings.fontFamily}
                  onChange={(e) =>
                    updateSettings({ fontFamily: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="inter">Inter</option>
                  <option value="poppins">Poppins</option>
                  <option value="roboto">Roboto</option>
                  <option value="playfair">Playfair Display</option>
                  <option value="montserrat">Montserrat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Font Size
                </label>
                <select
                  value={settings.fontSize}
                  onChange={(e) => updateSettings({ fontSize: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="small">Small</option>
                  <option value="normal">Normal</option>
                  <option value="large">Large</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Font Weight
                </label>
                <select
                  value={settings.fontWeight}
                  onChange={(e) =>
                    updateSettings({ fontWeight: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="light">Light</option>
                  <option value="normal">Normal</option>
                  <option value="medium">Medium</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Line Height
                </label>
                <select
                  value={settings.lineHeight}
                  onChange={(e) =>
                    updateSettings({ lineHeight: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="tight">Tight</option>
                  <option value="normal">Normal</option>
                  <option value="relaxed">Relaxed</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Layout Tab */}
        {activeSettingsTab === "layout" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Layout Settings</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Container Width
                </label>
                <select
                  value={settings.containerWidth}
                  onChange={(e) =>
                    updateSettings({ containerWidth: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="narrow">Narrow (1024px)</option>
                  <option value="default">Default (1280px)</option>
                  <option value="wide">Wide (1536px)</option>
                  <option value="full">Full Width</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Section Spacing
                </label>
                <select
                  value={settings.sectionSpacing}
                  onChange={(e) =>
                    updateSettings({ sectionSpacing: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="compact">Compact</option>
                  <option value="normal">Normal</option>
                  <option value="spacious">Spacious</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Navigation Style
                </label>
                <select
                  value={settings.navigation}
                  onChange={(e) =>
                    updateSettings({ navigation: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                  <option value="sidebar">Sidebar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">
                  Layout Type
                </label>
                <select
                  value={settings.layout}
                  onChange={(e) => updateSettings({ layout: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                >
                  <option value="default">Default</option>
                  <option value="sidebar">Sidebar</option>
                  <option value="grid">Grid</option>
                  <option value="masonry">Masonry</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Animations Tab */}
        {activeSettingsTab === "animations" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Animation Settings</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.animationsEnabled}
                      onChange={(e) =>
                        updateSettings({ animationsEnabled: e.target.checked })
                      }
                      className="mr-3"
                    />
                    Enable Animations
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.reducedMotion}
                      onChange={(e) =>
                        updateSettings({ reducedMotion: e.target.checked })
                      }
                      className="mr-3"
                    />
                    Reduced Motion
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.particleEffects}
                      onChange={(e) =>
                        updateSettings({ particleEffects: e.target.checked })
                      }
                      className="mr-3"
                    />
                    Particle Effects
                  </label>
                </div>
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={settings.hoverEffects}
                      onChange={(e) =>
                        updateSettings({ hoverEffects: e.target.checked })
                      }
                      className="mr-3"
                    />
                    Hover Effects
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Animation Speed
                </label>
                <select
                  value={settings.animationSpeed}
                  onChange={(e) =>
                    updateSettings({ animationSpeed: e.target.value })
                  }
                  className="w-full md:w-1/2 px-3 py-2 bg-gray-700 rounded-lg"
                  disabled={!settings.animationsEnabled}
                >
                  <option value="slow">Slow</option>
                  <option value="normal">Normal</option>
                  <option value="fast">Fast</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Components Tab */}
        {activeSettingsTab === "components" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Component Visibility</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showParticles}
                  onChange={(e) =>
                    updateSettings({ showParticles: e.target.checked })
                  }
                  className="mr-3"
                />
                Background Particles
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showGradients}
                  onChange={(e) =>
                    updateSettings({ showGradients: e.target.checked })
                  }
                  className="mr-3"
                />
                Gradient Backgrounds
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showGlassEffect}
                  onChange={(e) =>
                    updateSettings({ showGlassEffect: e.target.checked })
                  }
                  className="mr-3"
                />
                Glass Morphism Effect
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showSocialLinks}
                  onChange={(e) =>
                    updateSettings({ showSocialLinks: e.target.checked })
                  }
                  className="mr-3"
                />
                Social Media Links
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showScrollIndicator}
                  onChange={(e) =>
                    updateSettings({ showScrollIndicator: e.target.checked })
                  }
                  className="mr-3"
                />
                Scroll Indicator
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.showLoadingScreen}
                  onChange={(e) =>
                    updateSettings({ showLoadingScreen: e.target.checked })
                  }
                  className="mr-3"
                />
                Loading Screen
              </label>
            </div>
          </div>
        )}

        {/* Accessibility Tab */}
        {activeSettingsTab === "accessibility" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">
              Accessibility Settings
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(e) =>
                    updateSettings({ highContrast: e.target.checked })
                  }
                  className="mr-3"
                />
                High Contrast Mode
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.focusIndicators}
                  onChange={(e) =>
                    updateSettings({ focusIndicators: e.target.checked })
                  }
                  className="mr-3"
                />
                Focus Indicators
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.keyboardNavigation}
                  onChange={(e) =>
                    updateSettings({ keyboardNavigation: e.target.checked })
                  }
                  className="mr-3"
                />
                Keyboard Navigation
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.screenReaderOptimized}
                  onChange={(e) =>
                    updateSettings({ screenReaderOptimized: e.target.checked })
                  }
                  className="mr-3"
                />
                Screen Reader Optimized
              </label>
            </div>
          </div>
        )}

        {/* Advanced Tab */}
        {activeSettingsTab === "advanced" && (
          <div>
            <h3 className="text-xl font-semibold mb-4">Advanced Settings</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Custom CSS
                </label>
                <textarea
                  value={settings.customCSS}
                  onChange={(e) =>
                    updateSettings({ customCSS: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg h-32 font-mono text-sm"
                  placeholder="/* Add your custom CSS here */"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Add custom CSS to override default styles. Use with caution.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.devMode}
                    onChange={(e) =>
                      updateSettings({ devMode: e.target.checked })
                    }
                    className="mr-3"
                  />
                  Developer Mode
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.debugMode}
                    onChange={(e) =>
                      updateSettings({ debugMode: e.target.checked })
                    }
                    className="mr-3"
                  />
                  Debug Mode
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.imageOptimization}
                    onChange={(e) =>
                      updateSettings({ imageOptimization: e.target.checked })
                    }
                    className="mr-3"
                  />
                  Image Optimization
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.lazyLoading}
                    onChange={(e) =>
                      updateSettings({ lazyLoading: e.target.checked })
                    }
                    className="mr-3"
                  />
                  Lazy Loading
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsSection;
