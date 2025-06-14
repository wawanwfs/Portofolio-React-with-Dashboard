import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiGithub,
  FiExternalLink,
  FiEye,
  FiStar,
  FiFilter,
  FiSearch,
  FiCalendar,
  FiCode,
} from "react-icons/fi";
import { usePortfolio } from "../App";

const Projects = () => {
  const { data } = usePortfolio();
  const { projects } = data;
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", name: "All Projects", color: "from-purple-500 to-pink-500" },
    { id: "web", name: "Web Development", color: "from-blue-500 to-cyan-500" },
    {
      id: "mobile",
      name: "Mobile Apps",
      color: "from-green-500 to-emerald-500",
    },
    {
      id: "desktop",
      name: "Desktop Apps",
      color: "from-orange-500 to-red-500",
    },
    { id: "ai", name: "AI/ML", color: "from-violet-500 to-purple-500" },
    { id: "game", name: "Games", color: "from-pink-500 to-rose-500" },
  ];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        selectedCategory === "all" || project.category === selectedCategory;
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [projects, selectedCategory, searchTerm]);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.6,
        type: "spring",
        stiffness: 100,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      rotateY: 15,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ animation: "floating 20s ease-in-out infinite" }}
        />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          style={{ animation: "morphing 15s ease-in-out infinite" }}
        />
        <div
          className="absolute top-40 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-bounce"
          style={{ animationDuration: "12s" }}
        />
      </div>

      <motion.div
        className="relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <section className="section-padding">
          <div className="container-custom">
            <motion.div className="text-center mb-16" variants={itemVariants}>
              <motion.h1
                className="text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: -30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
              >
                My <span className="gradient-text-rainbow">Projects</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Explore my portfolio of innovative projects, from web
                applications to mobile apps and everything in between
              </motion.p>
            </motion.div>

            {/* Search and Filter Section */}
            <motion.div
              className="glass-effect p-6 rounded-2xl mb-12"
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
            >
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <motion.div
                    className="absolute left-4 top-1/2 transform -translate-y-1/2"
                    whileHover={{ scale: 1.1 }}
                  >
                    <FiSearch className="text-gray-400" />
                  </motion.div>
                  <motion.input
                    type="text"
                    placeholder="Search projects..."
                    className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    whileFocus={{ scale: 1.02 }}
                  />
                </div>

                {/* Category Filter */}
                <div className="flex items-center space-x-2">
                  <FiFilter className="text-gray-400" />
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <motion.button
                        key={category.id}
                        className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                          selectedCategory === category.id
                            ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                            : "bg-gray-800/50 text-gray-400 hover:text-white hover:bg-gray-700/50"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category.name}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Projects Grid */}
            <motion.div
              className="grid md:grid-cols-2 xl:grid-cols-3 gap-8"
              layout
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    className="glass-effect rounded-2xl overflow-hidden group"
                    variants={projectVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    whileHover={{
                      y: -10,
                      rotateY: 5,
                      scale: 1.02,
                      transition: { type: "spring", stiffness: 300 },
                    }}
                  >
                    {/* Project Image */}
                    <div className="relative overflow-hidden h-48">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-all duration-500"
                        whileHover={{ scale: 1.1 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Project status badge */}
                      <motion.div
                        className="absolute top-4 left-4"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                            project.status === "completed"
                              ? "bg-green-500/30 text-green-300 border-green-400/30"
                              : project.status === "in-progress"
                              ? "bg-yellow-500/30 text-yellow-300 border-yellow-400/30"
                              : "bg-blue-500/30 text-blue-300 border-blue-400/30"
                          }`}
                        >
                          {project.status}
                        </span>
                      </motion.div>

                      {/* Featured badge */}
                      {project.featured && (
                        <motion.div
                          className="absolute top-4 right-4"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{
                            delay: index * 0.1 + 0.2,
                            type: "spring",
                          }}
                        >
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-2 rounded-full">
                            <FiStar className="text-white text-sm" />
                          </div>
                        </motion.div>
                      )}

                      {/* Hover overlay with actions */}
                      <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex space-x-4">
                          <motion.a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1, rotateZ: 5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiEye className="text-white" />
                          </motion.a>
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                            whileHover={{ scale: 1.1, rotateZ: -5 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiGithub className="text-white" />
                          </motion.a>
                          {project.liveUrl && (
                            <motion.a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
                              whileHover={{ scale: 1.1, rotateZ: 5 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FiExternalLink className="text-white" />
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6">
                      <motion.h3
                        className="text-xl font-bold mb-3 group-hover:gradient-text transition-all duration-300"
                        whileHover={{ x: 5 }}
                      >
                        {project.title}
                      </motion.h3>

                      <p className="text-gray-400 mb-4 line-clamp-2 group-hover:text-gray-300 transition-colors">
                        {project.description}
                      </p>

                      {/* Project metadata */}
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <div className="flex items-center">
                          <FiCalendar className="mr-1" />
                          <span>{project.year}</span>
                        </div>
                        <div className="flex items-center">
                          <FiCode className="mr-1" />
                          <span>{project.category}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 4).map((tag, tagIndex) => (
                          <motion.span
                            key={tag}
                            className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-xs border border-purple-400/20"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              delay: index * 0.1 + tagIndex * 0.05,
                              type: "spring",
                              stiffness: 200,
                            }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            {tag}
                          </motion.span>
                        ))}
                        {project.tags.length > 4 && (
                          <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded-full text-xs">
                            +{project.tags.length - 4} more
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex space-x-3">
                        <motion.a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg text-center text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          View Demo
                        </motion.a>
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-2 px-4 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-600/50 hover:text-white transition-all duration-300"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FiGithub className="inline" />
                        </motion.a>
                      </div>
                    </div>

                    {/* Gradient border effect on hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(45deg, #8b5cf6, #ec4899, #f59e0b, #10b981)",
                        padding: "2px",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "exclude",
                      }}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* No results message */}
            {filteredProjects.length === 0 && (
              <motion.div
                className="text-center py-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="text-6xl mb-4"
                  animate={{
                    rotateY: [0, 180, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🔍
                </motion.div>
                <h3 className="text-2xl font-bold gradient-text mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-400 mb-6">
                  Try adjusting your search terms or filters
                </p>
                <motion.button
                  className="btn-primary"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Reset Filters
                </motion.button>
              </motion.div>
            )}

            {/* Stats Section */}
            <motion.div
              className="mt-20 glass-effect p-8 rounded-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <motion.div whileHover={{ scale: 1.05 }}>
                  <motion.div
                    className="text-3xl font-bold gradient-text mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {projects.length}
                  </motion.div>
                  <p className="text-gray-400">Total Projects</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <motion.div
                    className="text-3xl font-bold gradient-text-blue mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.1, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {projects.filter((p) => p.status === "completed").length}
                  </motion.div>
                  <p className="text-gray-400">Completed</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <motion.div
                    className="text-3xl font-bold text-green-400 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {projects.filter((p) => p.featured).length}
                  </motion.div>
                  <p className="text-gray-400">Featured</p>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <motion.div
                    className="text-3xl font-bold text-orange-400 mb-2"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3, type: "spring" }}
                    viewport={{ once: true }}
                  >
                    {new Set(projects.flatMap((p) => p.tags)).size}
                  </motion.div>
                  <p className="text-gray-400">Technologies</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Projects;
