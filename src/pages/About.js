import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiDownload,
  FiMail,
  FiPhone,
  FiMapPin,
  FiCalendar,
  FiAward,
  FiUser,
  FiHeart,
  FiCamera,
  FiMusic,
  FiBookOpen,
  FiCode,
} from "react-icons/fi";
import { usePortfolio } from "../App";

const About = () => {
  const { data } = usePortfolio();
  const { personal, experience, education } = data;
  const [activeTab, setActiveTab] = useState("personal");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const tabs = [
    { id: "personal", label: "Personal Info", icon: FiUser },
    { id: "experience", label: "Experience", icon: FiAward },
    { id: "education", label: "Education", icon: FiBookOpen },
  ];

  const interests = [
    { icon: FiCode, name: "Coding", color: "from-blue-500 to-cyan-500" },
    {
      icon: FiCamera,
      name: "Photography",
      color: "from-purple-500 to-pink-500",
    },
    { icon: FiMusic, name: "Music", color: "from-green-500 to-emerald-500" },
    { icon: FiBookOpen, name: "Reading", color: "from-red-500 to-orange-500" },
  ];

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin"
          style={{ animationDuration: "30s" }}
        />
        <div
          className="absolute top-1/2 right-10 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ animation: "floating 15s ease-in-out infinite" }}
        />
        <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute top-20 left-1/2 w-64 h-64 bg-gradient-to-r from-green-400 to-teal-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          style={{ animation: "morphing 20s ease-in-out infinite" }}
        />
      </div>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div variants={itemVariants}>
                <motion.h1
                  className="text-5xl lg:text-6xl font-bold mb-6"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  About <span className="gradient-text-rainbow">Me</span>
                </motion.h1>
                <motion.p
                  className="text-xl text-gray-300 mb-8 leading-relaxed"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {personal.description}
                </motion.p>
                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <motion.div
                    className="glass-effect p-4 rounded-xl group"
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                  >
                    <FiMail className="text-purple-400 mb-2 group-hover:text-pink-400 transition-colors" />
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-semibold group-hover:gradient-text transition-all duration-300">
                      {personal.email}
                    </p>
                  </motion.div>
                  <motion.div
                    className="glass-effect p-4 rounded-xl group"
                    whileHover={{ scale: 1.02, rotateY: -5 }}
                  >
                    <FiPhone className="text-blue-400 mb-2 group-hover:text-cyan-400 transition-colors" />
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-semibold group-hover:gradient-text-blue transition-all duration-300">
                      {personal.phone}
                    </p>
                  </motion.div>
                  <motion.div
                    className="glass-effect p-4 rounded-xl group"
                    whileHover={{ scale: 1.02, rotateY: 5 }}
                  >
                    <FiMapPin className="text-green-400 mb-2 group-hover:text-emerald-400 transition-colors" />
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-semibold group-hover:text-green-400 transition-all duration-300">
                      {personal.location}
                    </p>
                  </motion.div>
                  <motion.div
                    className="glass-effect p-4 rounded-xl group"
                    whileHover={{ scale: 1.02, rotateY: -5 }}
                  >
                    <FiCalendar className="text-orange-400 mb-2 group-hover:text-red-400 transition-colors" />
                    <p className="text-sm text-gray-400">Available</p>
                    <p className="font-semibold group-hover:text-orange-400 transition-all duration-300">
                      {personal.availability}
                    </p>
                  </motion.div>
                </motion.div>
                <motion.a
                  href={personal.resume}
                  className="btn-primary inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiDownload className="mr-2" />
                  Download Resume
                </motion.a>
              </motion.div>

              <motion.div
                className="relative"
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <div className="relative">
                  {/* Animated rings */}
                  <motion.div
                    className="absolute -inset-10 rounded-full border-2 border-purple-400/20"
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  <motion.div
                    className="absolute -inset-16 rounded-full border border-dashed border-pink-400/15"
                    animate={{ rotate: -360, scale: [1.1, 1, 1.1] }}
                    transition={{
                      duration: 25,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    className="relative"
                    whileHover={{ scale: 1.05, rotateY: 10 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.img
                      src={personal.profileImage}
                      alt={personal.name}
                      className="w-full max-w-lg mx-auto rounded-2xl shadow-2xl relative z-10"
                      style={{
                        filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))",
                      }}
                    />

                    {/* Multiple gradient backgrounds */}
                    <motion.div
                      className="absolute -inset-6 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl blur-xl opacity-30"
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <motion.div
                      className="absolute -inset-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-20"
                      animate={{
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Interests Section */}
        <motion.section
          className="section-padding relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 via-transparent to-pink-900/10 pointer-events-none" />

          <div className="container-custom relative z-10">
            <motion.h2
              className="text-4xl font-bold text-center mb-12"
              variants={itemVariants}
            >
              My <span className="gradient-text">Interests</span>
            </motion.h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {interests.map((interest, index) => {
                const Icon = interest.icon;
                return (
                  <motion.div
                    key={interest.name}
                    className="glass-effect p-6 rounded-xl text-center card-hover group"
                    variants={itemVariants}
                    whileHover={{ scale: 1.1, rotateY: 10 }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${interest.color} flex items-center justify-center`}
                      whileHover={{ scale: 1.2, rotateZ: 10 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="text-white text-2xl" />
                    </motion.div>
                    <h3 className="font-semibold group-hover:gradient-text transition-all duration-300">
                      {interest.name}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* Detailed Information Tabs */}
        <motion.section
          className="section-padding"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container-custom">
            <motion.h2
              className="text-4xl font-bold text-center mb-12"
              variants={itemVariants}
            >
              Professional <span className="gradient-text">Journey</span>
            </motion.h2>

            {/* Tab Navigation */}
            <motion.div
              className="flex justify-center mb-12"
              variants={itemVariants}
            >
              <div className="glass-effect p-2 rounded-xl">
                <div className="flex space-x-2">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-300 ${
                          activeTab === tab.id
                            ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                            : "text-gray-400 hover:text-white hover:bg-white/5"
                        }`}
                        onClick={() => setActiveTab(tab.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Icon size={18} />
                        <span>{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === "personal" && (
                  <div className="max-w-4xl mx-auto">
                    <motion.div
                      className="glass-effect p-8 rounded-2xl"
                      whileHover={{ scale: 1.01 }}
                    >
                      <h3 className="text-2xl font-bold mb-6 gradient-text">
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-purple-400">
                            <FiHeart className="inline mr-2" />
                            About Me
                          </h4>
                          <p className="text-gray-300 leading-relaxed mb-6">
                            {personal.bio}
                          </p>
                          <div className="space-y-3">
                            <div className="flex items-center">
                              <span className="text-gray-400 w-20">Age:</span>
                              <span className="font-semibold">
                                {personal.age}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-gray-400 w-20">
                                Languages:
                              </span>
                              <span className="font-semibold">
                                {personal.languages?.join(", ")}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-blue-400">
                            Contact Information
                          </h4>
                          <div className="space-y-4">
                            <motion.div
                              className="glass-effect p-4 rounded-lg"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="flex items-center">
                                <FiMail className="text-purple-400 mr-3" />
                                <div>
                                  <p className="text-sm text-gray-400">Email</p>
                                  <p className="font-semibold">
                                    {personal.email}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                            <motion.div
                              className="glass-effect p-4 rounded-lg"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="flex items-center">
                                <FiPhone className="text-blue-400 mr-3" />
                                <div>
                                  <p className="text-sm text-gray-400">Phone</p>
                                  <p className="font-semibold">
                                    {personal.phone}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}

                {activeTab === "experience" && (
                  <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                      {experience.map((exp, index) => (
                        <motion.div
                          key={exp.id}
                          className="glass-effect p-6 rounded-xl card-hover"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, rotateY: 2 }}
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold gradient-text mb-2">
                                {exp.position}
                              </h3>
                              <p className="text-lg text-purple-400 mb-2">
                                {exp.company}
                              </p>
                              <p className="text-gray-400 mb-4">
                                {exp.description}
                              </p>
                            </div>
                            <motion.div
                              className="glass-effect px-4 py-2 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <p className="text-sm font-medium gradient-text-blue">
                                {exp.duration}
                              </p>
                            </motion.div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, techIndex) => (
                              <motion.span
                                key={tech}
                                className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-400/20"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: index * 0.1 + techIndex * 0.05,
                                }}
                                whileHover={{ scale: 1.1 }}
                              >
                                {tech}
                              </motion.span>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "education" && (
                  <div className="max-w-4xl mx-auto">
                    <div className="space-y-6">
                      {education.map((edu, index) => (
                        <motion.div
                          key={edu.id}
                          className="glass-effect p-6 rounded-xl card-hover"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, rotateY: -2 }}
                        >
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                            <div className="flex-1">
                              <h3 className="text-xl font-bold gradient-text mb-2">
                                {edu.degree}
                              </h3>
                              <p className="text-lg text-blue-400 mb-2">
                                {edu.institution}
                              </p>
                              {edu.description && (
                                <p className="text-gray-400 mb-4">
                                  {edu.description}
                                </p>
                              )}
                              {edu.gpa && (
                                <p className="text-sm text-gray-300">
                                  <span className="text-gray-400">GPA:</span>{" "}
                                  {edu.gpa}
                                </p>
                              )}
                            </div>
                            <motion.div
                              className="glass-effect px-4 py-2 rounded-lg"
                              whileHover={{ scale: 1.05 }}
                            >
                              <p className="text-sm font-medium gradient-text-blue">
                                {edu.duration}
                              </p>
                            </motion.div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default About;
