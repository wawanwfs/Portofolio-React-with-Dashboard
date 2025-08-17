import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  FiEdit3,
  FiSave,
  FiPlus,
  FiTrash2,
  FiUser,
  FiBriefcase,
  FiBook,
  FiCode,
  FiFolder,
  FiMessageSquare,
  FiSettings,
  FiEye,
  FiEyeOff,
  FiDownload,
  FiUpload,
  FiLogOut,
  FiRotateCcw,
  FiDroplet,
  FiType,
  FiGrid,
  FiZap,
  FiLayers,
  FiCheck,
  FiImage,
  FiGlobe,
  FiMonitor,
  FiX,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiTwitter,
  FiFacebook,
  FiYoutube,
} from "react-icons/fi";
import { usePortfolio } from "../App";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { useSettings } from "../contexts/SettingsContext";

const Dashboard = () => {
  const { data, updateData } = usePortfolio();
  const { logout } = useAuth();
  const { isDarkMode } = useTheme();
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
        isDarkMode
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
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Portfolio <span className="gradient-text">Dashboard</span>
            </h1>
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Manage your portfolio content and settings
            </p>
          </div>

          <div className="flex gap-4 mt-4 md:mt-0">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
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

// Personal Info Section Component
const PersonalInfoSection = ({ data, editMode, onToggleEdit, onSave }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: data,
  });

  React.useEffect(() => {
    reset(data);
  }, [data, reset]);

  const onSubmit = (formData) => {
    onSave(formData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Personal Information</h2>
        <button
          onClick={onToggleEdit}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <FiEdit3 className="mr-2" />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Name</label>
              <input
                {...register("name")}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Title</label>
              <input
                {...register("title")}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Email</label>
              <input
                {...register("email")}
                type="email"
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Phone</label>
              <input
                {...register("phone")}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-2">Location</label>
              <input
                {...register("location")}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block font-medium mb-2">Website</label>
              <input
                {...register("website")}
                className="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <FiSave className="mr-2" />
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-400">Name</h3>
              <p className="text-lg">{data.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-400">Title</h3>
              <p className="text-lg">{data.title}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-gray-400">Description</h3>
            <p className="text-lg">{data.description}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-400">Email</h3>
              <p className="text-lg">{data.email}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-400">Phone</h3>
              <p className="text-lg">{data.phone}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Experience Section with full edit functionality
const ExperienceSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmitExperience = (formData, expId) => {
    onSave("experience", formData, expId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Experience</h2>
        <button
          onClick={() =>
            onAdd("experience", {
              company: "New Company",
              position: "New Position",
              period: "2024 - Present",
              description: "Description here...",
              technologies: ["React", "JavaScript"],
            })
          }
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {data.map((exp) => (
          <ExperienceItem
            key={exp.id}
            experience={exp}
            isEditing={editMode[`experience_${exp.id}`]}
            onToggleEdit={onToggleEdit}
            onSubmit={onSubmitExperience}
            onDelete={onDelete}
            register={register}
            handleSubmit={handleSubmit}
            reset={reset}
            setValue={setValue}
          />
        ))}
      </div>
    </div>
  );
};

// Experience Item Component
const ExperienceItem = ({
  experience,
  isEditing,
  onToggleEdit,
  onSubmit,
  onDelete,
  register,
  handleSubmit,
  reset,
  setValue,
}) => {
  React.useEffect(() => {
    if (isEditing) {
      reset(experience);
      setValue("technologies", experience.technologies?.join(", ") || "");
    }
  }, [isEditing, experience, reset, setValue]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
              {isEditing ? (
                <form
                  onSubmit={handleSubmit((formData) => {
                    const updatedData = {
                      ...formData,
                      technologies: formData.technologies
                        ? formData.technologies.split(",").map((t) => t.trim())
                        : [],
                    };
                    onSubmitExperience(updatedData, exp.id);
                  })}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Position
                      </label>
                      <input
                        {...register("position", { required: true })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        {...register("company", { required: true })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="Tech Company Inc."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Period
                    </label>
                    <input
                      {...register("period", { required: true })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Jan 2022 - Present"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Describe your role and achievements..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Technologies (comma separated)
                    </label>
                    <input
                      {...register("technologies")}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="React, JavaScript, Node.js, MongoDB"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <FiSave className="mr-2" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleEdit("experience", exp.id)}
                      className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{exp.position}</h3>
                      <p className="text-primary-400 font-medium">
                        {exp.company}
                      </p>
                      <p className="text-gray-400 text-sm">{exp.period}</p>
                      {exp.description && (
                        <p className="text-gray-300 mt-2">{exp.description}</p>
                      )}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-3">
                          {exp.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onToggleEdit("experience", exp.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete("experience", exp.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const EducationSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitEducation = (formData, eduId) => {
    onSave("education", formData, eduId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Education</h2>
        <button
          onClick={() =>
            onAdd("education", {
              institution: "New Institution",
              degree: "New Degree", 
              period: "2020 - 2024",
              description: "Description here...",
              gpa: "",
            })
          }
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {data.map((edu) => {
          const isEditing = editMode[`education_${edu.id}`];

          return (
            <div key={edu.id} className="bg-gray-800 p-4 rounded-lg">
              {isEditing ? (
                <form
                  onSubmit={handleSubmit((formData) =>
                    onSubmitEducation(formData, edu.id)
                  )}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Degree
                      </label>
                      <input
                        {...register("degree", { required: true })}
                        defaultValue={edu.degree}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="Bachelor of Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Institution
                      </label>
                      <input
                        {...register("institution", { required: true })}
                        defaultValue={edu.institution}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="University of Technology"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Period
                      </label>
                      <input
                        {...register("period", { required: true })}
                        defaultValue={edu.period}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="2020 - 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        {...register("gpa")}
                        defaultValue={edu.gpa}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      defaultValue={edu.description}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Relevant coursework, achievements, etc..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <FiSave className="mr-2" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleEdit("education", edu.id)}
                      className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <p className="text-primary-400 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-gray-400 text-sm">{edu.period}</p>
                      {edu.gpa && (
                        <p className="text-gray-400 text-sm">GPA: {edu.gpa}</p>
                      )}
                      {edu.description && (
                        <p className="text-gray-300 mt-2">{edu.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onToggleEdit("education", edu.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete("education", edu.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SkillsSection = ({ data, editMode, onToggleEdit, onSave }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [newTechSkill, setNewTechSkill] = useState({ name: "", level: 50 });
  const [techSkills, setTechSkills] = useState(data.technical || []);
  const [softSkills, setSoftSkills] = useState(data.soft || []);
  const [newSoftSkill, setNewSoftSkill] = useState("");

  React.useEffect(() => {
    setTechSkills(data.technical || []);
    setSoftSkills(data.soft || []);
  }, [data]);

  const addTechSkill = () => {
    if (newTechSkill.name.trim()) {
      const updatedSkills = [
        ...techSkills,
        { ...newTechSkill, id: Date.now() },
      ];
      setTechSkills(updatedSkills);
      setNewTechSkill({ name: "", level: 50 });
    }
  };

  const removeTechSkill = (index) => {
    const updatedSkills = techSkills.filter((_, i) => i !== index);
    setTechSkills(updatedSkills);
  };

  const updateTechSkillLevel = (index, level) => {
    const updatedSkills = [...techSkills];
    updatedSkills[index].level = level;
    setTechSkills(updatedSkills);
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !softSkills.includes(newSoftSkill.trim())) {
      setSoftSkills([...softSkills, newSoftSkill.trim()]);
      setNewSoftSkill("");
    }
  };

  const removeSoftSkill = (skillToRemove) => {
    setSoftSkills(softSkills.filter((skill) => skill !== skillToRemove));
  };

  const saveSkills = () => {
    onSave("skills", {
      technical: techSkills,
      soft: softSkills,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="flex gap-2">
          {editMode && (
            <button
              onClick={saveSkills}
              className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
            >
              <FiSave className="mr-2" />
              Save All
            </button>
          )}
          <button
            onClick={onToggleEdit}
            className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            <FiEdit3 className="mr-2" />
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>

          {editMode && (
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-3">Add New Technical Skill</h4>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={newTechSkill.name}
                    onChange={(e) =>
                      setNewTechSkill({ ...newTechSkill, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded text-sm"
                    placeholder="e.g., React"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm mb-1">Level (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newTechSkill.level}
                    onChange={(e) =>
                      setNewTechSkill({
                        ...newTechSkill,
                        level: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="text-center text-xs text-gray-400">
                    {newTechSkill.level}%
                  </div>
                </div>
                <button
                  onClick={addTechSkill}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {techSkills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400 text-sm">
                      {skill.level}%
                    </span>
                    {editMode && (
                      <button
                        onClick={() => removeTechSkill(index)}
                        className="p-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {editMode ? (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) =>
                      updateTechSkillLevel(index, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                ) : (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>

          {editMode && (
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-3">Add New Soft Skill</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSoftSkill()}
                  className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm"
                  placeholder="e.g., Leadership"
                />
                <button
                  onClick={addSoftSkill}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm ${
                  editMode ? "pr-1" : ""
                }`}
              >
                <span>{skill}</span>
                {editMode && (
                  <button
                    onClick={() => removeSoftSkill(skill)}
                    className="p-1 hover:bg-red-500/20 rounded-full"
                  >
                    <FiX size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmitProject = (formData, projectId) => {
    const updatedData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      featured: formData.featured === "true" || formData.featured === true,
    };
    onSave("projects", updatedData, projectId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <button
          onClick={() =>
            onAdd("projects", {
              title: "New Project",
              description: "Project description...",
              image: "https://via.placeholder.com/600x400",
              tags: ["React", "JavaScript"],
              demoUrl: "#",
              githubUrl: "#",
              featured: false,
              status: "completed",
            })
          }
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Project
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {data.map((project) => {
          const isEditing = editMode[`projects_${project.id}`];

          return (
            <div key={project.id} className="bg-gray-800 p-4 rounded-lg">
              {isEditing ? (
                <form
                  onSubmit={handleSubmit((formData) =>
                    onSubmitProject(formData, project.id)
                  )}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Project Title
                    </label>
                    <input
                      {...register("title", { required: true })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="My Awesome Project"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Brief description of your project..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Image URL
                    </label>
                    <input
                      {...register("image")}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Demo URL
                      </label>
                      <input
                        {...register("demoUrl")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="https://demo.example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        GitHub URL
                      </label>
                      <input
                        {...register("githubUrl")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="https://github.com/user/repo"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Technologies (comma separated)
                    </label>
                    <input
                      {...register("tags")}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="React, Node.js, MongoDB"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Status
                      </label>
                      <select
                        {...register("status")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      >
                        <option value="completed">Completed</option>
                        <option value="in-progress">In Progress</option>
                        <option value="planned">Planned</option>
                      </select>
                    </div>
                    <div className="flex items-center">
                      <label className="flex items-center">
                        <input
                          {...register("featured")}
                          type="checkbox"
                          className="mr-2"
                        />
                        Featured Project
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <FiSave className="mr-2" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleEdit("projects", project.id)}
                      className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-32 object-cover rounded mb-3"
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/600x400?text=No+Image";
                    }}
                  />
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">
                          {project.title}
                        </h3>
                        {project.featured && (
                          <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.tags?.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2 text-xs">
                        {project.demoUrl && project.demoUrl !== "#" && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            Demo
                          </a>
                        )}
                        {project.githubUrl && project.githubUrl !== "#" && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300"
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onToggleEdit("projects", project.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete("projects", project.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TestimonialsSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmitTestimonial = (formData, testimonialId) => {
    onSave("testimonials", formData, testimonialId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <button
          onClick={() =>
            onAdd("testimonials", {
              name: "New Client",
              position: "Position at Company",
              company: "Company Name",
              message: "Testimonial message...",
              avatar: "https://via.placeholder.com/100x100",
              rating: 5,
            })
          }
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {data.map((testimonial) => {
          const isEditing = editMode[`testimonials_${testimonial.id}`];

          return (
            <div key={testimonial.id} className="bg-gray-800 p-4 rounded-lg">
              {isEditing ? (
                <form
                  onSubmit={handleSubmit((formData) =>
                    onSubmitTestimonial(formData, testimonial.id)
                  )}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Position
                      </label>
                      <input
                        {...register("position", { required: true })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="CEO"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        {...register("company")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Avatar URL
                      </label>
                      <input
                        {...register("avatar")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Rating (1-5)
                    </label>
                    <select
                      {...register("rating")}
                      className="w-full md:w-32 px-3 py-2 bg-gray-700 rounded-lg"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      {...register("message", { required: true })}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Share your testimonial message here..."
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <FiSave className="mr-2" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onToggleEdit("testimonials", testimonial.id)
                      }
                      className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start flex-1">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100x100?text=Avatar";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-primary-400 text-sm font-medium">
                          {testimonial.position}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                        {testimonial.rating && (
                          <div className="flex items-center gap-1 my-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < testimonial.rating
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-gray-300 mt-2 italic">
                          "{testimonial.message}"
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() =>
                          onToggleEdit("testimonials", testimonial.id)
                        }
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete("testimonials", testimonial.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const BlogSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  const onSubmitBlog = (formData, blogId) => {
    const updatedData = {
      ...formData,
      tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
      publishedAt:
        formData.publishedAt || new Date().toISOString().split("T")[0],
    };
    onSave("blog", updatedData, blogId);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <button
          onClick={() =>
            onAdd("blog", {
              title: "New Blog Post",
              excerpt: "Blog post excerpt...",
              content: "Blog post content...",
              image: "https://via.placeholder.com/600x400",
              tags: ["Web Development"],
              publishedAt: new Date().toISOString().split("T")[0],
              readTime: "5 min",
              status: "draft",
            })
          }
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Post
        </button>
      </div>

      <div className="space-y-4">
        {data.map((post) => {
          const isEditing = editMode[`blog_${post.id}`];

          return (
            <div key={post.id} className="bg-gray-800 p-4 rounded-lg">
              {isEditing ? (
                <form
                  onSubmit={handleSubmit((formData) =>
                    onSubmitBlog(formData, post.id)
                  )}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Post Title
                    </label>
                    <input
                      {...register("title", { required: true })}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="My Awesome Blog Post"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Excerpt
                    </label>
                    <textarea
                      {...register("excerpt")}
                      rows={2}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Brief description of your blog post..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Content
                    </label>
                    <textarea
                      {...register("content")}
                      rows={6}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg font-mono text-sm"
                      placeholder="Write your blog post content here..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Featured Image URL
                    </label>
                    <input
                      {...register("image")}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Published Date
                      </label>
                      <input
                        {...register("publishedAt")}
                        type="date"
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Read Time
                      </label>
                      <input
                        {...register("readTime")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="5 min"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Status
                      </label>
                      <select
                        {...register("status")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      >
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Tags (comma separated)
                    </label>
                    <input
                      {...register("tags")}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Web Development, React, JavaScript"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                    >
                      <FiSave className="mr-2" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => onToggleEdit("blog", post.id)}
                      className="flex items-center px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start">
                    <div className="flex items-start flex-1">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded mr-4"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/600x400?text=No+Image";
                        }}
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-lg">
                            {post.title}
                          </h3>
                          {post.status && (
                            <span
                              className={`px-2 py-1 rounded text-xs ${
                                post.status === "published"
                                  ? "bg-green-500/20 text-green-400"
                                  : post.status === "draft"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {post.status.charAt(0).toUpperCase() +
                                post.status.slice(1)}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-400 text-sm mb-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-4 mb-2 text-sm text-gray-500">
                          <span>{post.publishedAt}</span>
                          <span>{post.readTime}</span>
                        </div>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {post.tags.slice(0, 3).map((tag, index) => (
                              <span
                                key={index}
                                className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                            {post.tags.length > 3 && (
                              <span className="px-2 py-1 bg-gray-500/20 text-gray-400 rounded text-xs">
                                +{post.tags.length - 3} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onToggleEdit("blog", post.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete("blog", post.id)}
                        className="p-2 bg-red-600 hover:bg-red-700 rounded transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Social Media Section Component
const SocialMediaSection = ({ data, editMode, onToggleEdit, onSave }) => {
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    onSave(formData);
  };

  const socialPlatforms = [
    { key: "github", name: "GitHub", icon: FiGithub, color: "bg-gray-700" },
    {
      key: "linkedin",
      name: "LinkedIn",
      icon: FiLinkedin,
      color: "bg-blue-600",
    },
    { key: "twitter", name: "Twitter", icon: FiTwitter, color: "bg-blue-400" },
    {
      key: "instagram",
      name: "Instagram",
      icon: FiInstagram,
      color: "bg-pink-600",
    },
    {
      key: "facebook",
      name: "Facebook",
      icon: FiFacebook,
      color: "bg-blue-700",
    },
    { key: "youtube", name: "YouTube", icon: FiYoutube, color: "bg-red-600" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Social Media Links</h2>
        <button
          onClick={onToggleEdit}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <FiEdit3 className="mr-2" />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.key}>
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Icon className="mr-2" size={18} />
                    {platform.name} URL
                  </label>
                  <input
                    {...register(platform.key)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={`https://${platform.key}.com/yourusername`}
                  />
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Other Social Links (one per line)
            </label>
            <textarea
              {...register("other")}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Discord: https://discord.gg/yourserver&#10;Twitch: https://twitch.tv/yourusername&#10;Website: https://yourwebsite.com"
            />
          </div>

          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <FiSave className="mr-2" />
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              const url = data?.[platform.key];

              return (
                <div key={platform.key} className="glass-effect p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 ${platform.color} rounded-lg mr-3`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold">{platform.name}</h3>
                  </div>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors text-sm break-all"
                    >
                      {url}
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm">Not configured</p>
                  )}
                </div>
              );
            })}
          </div>

          {data?.other && (
            <div className="glass-effect p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Other Social Links</h3>
              <div className="space-y-2">
                {data.other
                  .split("\n")
                  .filter((link) => link.trim())
                  .map((link, index) => (
                    <div key={index} className="text-sm">
                      {link.includes("http") ? (
                        <a
                          href={link.includes(":") ? link.split(": ")[1] : link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          {link}
                        </a>
                      ) : (
                        <span className="text-gray-400">{link}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Resume Section Component
const ResumeSection = ({ data, editMode, onToggleEdit, onSave }) => {
  const { register, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = (formData) => {
    onSave(formData);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume & CV Management</h2>
        <button
          onClick={onToggleEdit}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <FiEdit3 className="mr-2" />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Resume PDF URL
              </label>
              <input
                {...register("resumeUrl")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://yourwebsite.com/resume.pdf"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload your resume to a cloud service and paste the public link
                here
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                CV PDF URL (Alternative)
              </label>
              <input
                {...register("cvUrl")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://yourwebsite.com/cv.pdf"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Resume Summary
            </label>
            <textarea
              {...register("summary")}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Brief summary of your professional background..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Years of Experience
              </label>
              <input
                {...register("experience")}
                type="number"
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Current Position
              </label>
              <input
                {...register("currentPosition")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Senior Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                {...register("location")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="New York, NY"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Key Skills (comma separated)
            </label>
            <input
              {...register("keySkills")}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="JavaScript, React, Node.js, Python, AWS"
            />
          </div>

          <div className="flex items-center">
            <input
              {...register("available")}
              type="checkbox"
              className="mr-3"
            />
            <label className="text-sm">Available for new opportunities</label>
          </div>

          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
          >
            <FiSave className="mr-2" />
            Save Changes
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Resume Links */}
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Resume Files</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data?.resumeUrl && (
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <FiDownload className="mr-2" />
                  Download Resume
                </a>
              )}
              {data?.cvUrl && (
                <a
                  href={data.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <FiDownload className="mr-2" />
                  Download CV
                </a>
              )}
            </div>
            {!data?.resumeUrl && !data?.cvUrl && (
              <p className="text-gray-500 text-center">
                No resume files configured
              </p>
            )}
          </div>

          {/* Professional Summary */}
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
            {data?.summary ? (
              <p className="text-gray-300 leading-relaxed">{data.summary}</p>
            ) : (
              <p className="text-gray-500">No summary provided</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-effect p-4 rounded-lg text-center">
              <h4 className="font-semibold text-primary-400">Experience</h4>
              <p className="text-2xl font-bold mt-2">
                {data?.experience ? `${data.experience}+ years` : "N/A"}
              </p>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <h4 className="font-semibold text-primary-400">Current Role</h4>
              <p className="text-lg font-medium mt-2">
                {data?.currentPosition || "Not specified"}
              </p>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <h4 className="font-semibold text-primary-400">Location</h4>
              <p className="text-lg font-medium mt-2">
                {data?.location || "Not specified"}
              </p>
            </div>
          </div>

          {/* Availability Status */}
          {data?.available && (
            <div className="glass-effect p-4 rounded-lg">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-400 font-medium">
                  Available for new opportunities
                </span>
              </div>
            </div>
          )}

          {/* Key Skills */}
          {data?.keySkills && (
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.keySkills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

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
    { id: "layout", name: "Layout", icon: FiGrid },
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

export default Dashboard;
