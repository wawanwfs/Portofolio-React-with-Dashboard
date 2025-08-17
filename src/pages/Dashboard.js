import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import {
  FiUser,
  FiEdit3,
  FiSave,
  FiTrash2,
  FiPlus,
  FiEye,
  FiEyeOff,
  FiUpload,
  FiDownload,
  FiSettings,
  FiDroplet,
  FiType,
  FiLayout,
  FiZap,
  FiLayers,
  FiCode,
  FiImage,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiYoutube,
  FiMonitor,
  FiGrid,
  FiMail,
  FiGlobe,
  FiSliders,
  FiStar,
  FiBook,
  FiHeart,
  FiTrendingUp,
  FiCalendar,
  FiTag,
  FiExternalLink,
  FiAward,
  FiFolder,
  FiMessageSquare,
  FiLogOut,
  FiX,
  FiRotateCcw,
  FiCheck,
  FiBriefcase,
} from "react-icons/fi";
import { usePortfolio } from "../App";
import { useAuth } from "../contexts/AuthContext";
import { useSettings } from "../contexts/SettingsContext";
import PersonalInfoSection from "../components/dashboard/PersonalInfoSection";
import ExperienceSection from "../components/dashboard/ExperienceSection";
import EducationSection from "../components/dashboard/EducationSection";
import SkillsSection from "../components/dashboard/SkillsSection";
import ProjectsSection from "../components/dashboard/ProjectsSection";
import TestimonialsSection from "../components/dashboard/TestimonialsSection";
import BlogSection from "../components/dashboard/BlogSection";
import SocialMediaSection from "../components/dashboard/SocialMediaSection";
import ResumeSection from "../components/dashboard/ResumeSection";
import SettingsSection from "../components/dashboard/SettingsSection";

const Dashboard = () => {
  const { data, updateData } = usePortfolio();
  const { settings } = useSettings();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [editMode, setEditMode] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  const tabs = [
    { id: "personal", name: "Personal Info", icon: FiUser },
    { id: "experience", name: "Experience", icon: FiBriefcase },
    { id: "education", name: "Education", icon: FiBook },
    { id: "skills", name: "Skills", icon: FiCode },
    { id: "projects", name: "Projects", icon: FiFolder },
    { id: "testimonials", name: "Testimonials", icon: FiMessageSquare },
    { id: "blog", name: "Blog", icon: FiEdit3 },
    { id: "social", name: "Social Media", icon: FiGlobe },
    { id: "resume", name: "Resume", icon: FiDownload },
    { id: "settings", name: "Settings", icon: FiSettings },
  ];

  const toggleEditMode = (section, id = null) => {
    const key = id ? `${section}_${id}` : section;
    setEditMode((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveData = (section, updatedData, id = null) => {
    const newData = { ...data };

    if (id) {
      // Update specific item in array
      const index = newData[section].findIndex((item) => item.id === id);
      if (index !== -1) {
        newData[section][index] = {
          ...newData[section][index],
          ...updatedData,
        };
      }
    } else {
      // Update entire section
      newData[section] = { ...newData[section], ...updatedData };
    }

    updateData(newData);
    toast.success("Data saved successfully!");
    toggleEditMode(section, id);
  };

  const addNewItem = (section, newItem) => {
    const newData = { ...data };
    const newId = Math.max(...newData[section].map((item) => item.id || 0)) + 1;
    newData[section].push({ ...newItem, id: newId });
    updateData(newData);
    toast.success("Item added successfully!");
    toggleEditMode(section, newId);
  };

  const deleteItem = (section, id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const newData = { ...data };
      newData[section] = newData[section].filter((item) => item.id !== id);
      updateData(newData);
      toast.success("Item deleted successfully!");
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const dataUri =
      "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
    const exportFileDefaultName = "portfolio-data.json";

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();

    toast.success("Data exported successfully!");
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          updateData(importedData);
          toast.success("Data imported successfully!");
        } catch (error) {
          toast.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logout();
      toast.success("Logged out successfully!");
    }
  };

  return (
    <div
      className={`min-h-screen pt-20 transition-colors duration-300 ${
        settings.themeMode === "dark"
          ? "bg-gradient-to-br from-gray-900 via-black to-gray-900"
          : "bg-gradient-to-br from-blue-50 via-white to-indigo-50"
      }`}
    >
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <h1
              className={`text-4xl font-bold mb-2 ${
                settings.themeMode === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Portfolio <span className="gradient-text">Dashboard</span>
            </h1>
            <p
              className={`${
                settings.themeMode === "dark"
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Manage your portfolio content and settings
            </p>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                settings.themeMode === "dark"
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-900"
              }`}
            >
              {showPreview ? (
                <FiEyeOff className="mr-2" />
              ) : (
                <FiEye className="mr-2" />
              )}
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>

            <button
              onClick={exportData}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <FiDownload className="mr-2" />
              Export Data
            </button>

            <label className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors cursor-pointer">
              <FiUpload className="mr-2" />
              Import Data
              <input
                type="file"
                accept=".json"
                onChange={importData}
                className="hidden"
              />
            </label>

            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            className="lg:col-span-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="glass-effect rounded-xl p-4 sticky top-24">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <motion.button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                        activeTab === tab.id
                          ? "bg-primary-500 text-white"
                          : "text-gray-300 hover:bg-white/10"
                      }`}
                      variants={itemVariants}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon className="mr-3" size={18} />
                      <span className="font-medium">{tab.name}</span>
                    </motion.button>
                  );
                })}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="glass-effect rounded-xl p-6"
              >
                {/* Personal Info Tab */}
                {activeTab === "personal" && (
                  <PersonalInfoSection
                    data={data.personal}
                    editMode={editMode.personal}
                    onToggleEdit={() => toggleEditMode("personal")}
                    onSave={(updatedData) => saveData("personal", updatedData)}
                  />
                )}

                {/* Experience Tab */}
                {activeTab === "experience" && (
                  <ExperienceSection
                    data={data.experience}
                    editMode={editMode}
                    onToggleEdit={toggleEditMode}
                    onSave={saveData}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                  />
                )}

                {/* Education Tab */}
                {activeTab === "education" && (
                  <EducationSection
                    data={data.education}
                    editMode={editMode}
                    onToggleEdit={toggleEditMode}
                    onSave={saveData}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                  />
                )}

                {/* Skills Tab */}
                {activeTab === "skills" && (
                  <SkillsSection
                    data={data.skills}
                    editMode={editMode.skills}
                    onToggleEdit={() => toggleEditMode("skills")}
                    onSave={(updatedData) => saveData("skills", updatedData)}
                  />
                )}

                {/* Projects Tab */}
                {activeTab === "projects" && (
                  <ProjectsSection
                    data={data.projects}
                    editMode={editMode}
                    onToggleEdit={toggleEditMode}
                    onSave={saveData}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                  />
                )}

                {/* Testimonials Tab */}
                {activeTab === "testimonials" && (
                  <TestimonialsSection
                    data={data.testimonials}
                    editMode={editMode}
                    onToggleEdit={toggleEditMode}
                    onSave={saveData}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                  />
                )}

                {/* Blog Tab */}
                {activeTab === "blog" && (
                  <BlogSection
                    data={data.blog}
                    editMode={editMode}
                    onToggleEdit={toggleEditMode}
                    onSave={saveData}
                    onAdd={addNewItem}
                    onDelete={deleteItem}
                  />
                )}

                {/* Social Media Tab */}
                {activeTab === "social" && (
                  <SocialMediaSection
                    data={data.social}
                    editMode={editMode.social}
                    onToggleEdit={() => toggleEditMode("social")}
                    onSave={(updatedData) => saveData("social", updatedData)}
                  />
                )}

                {/* Resume Tab */}
                {activeTab === "resume" && (
                  <ResumeSection
                    data={data.resume}
                    editMode={editMode.resume}
                    onToggleEdit={() => toggleEditMode("resume")}
                    onSave={(updatedData) => saveData("resume", updatedData)}
                  />
                )}

                {/* Settings Tab */}
                {activeTab === "settings" && <SettingsSection />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
