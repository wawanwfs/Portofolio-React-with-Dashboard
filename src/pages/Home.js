import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiDownload,
  FiArrowRight,
  FiStar,
  FiEye,
} from "react-icons/fi";
import { usePortfolio } from "../App";

const Home = () => {
  const { data } = usePortfolio();
  const { personal, projects, skills, testimonials } = data;

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

  const socialLinks = [
    { icon: FiGithub, url: personal.social.github, name: "GitHub" },
    { icon: FiLinkedin, url: personal.social.linkedin, name: "LinkedIn" },
    { icon: FiTwitter, url: personal.social.twitter, name: "Twitter" },
    { icon: FiInstagram, url: personal.social.instagram, name: "Instagram" },
  ];

  const featuredProjects = projects.filter((project) => project.featured);
  const topSkills = skills.technical.slice(0, 6);

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-spin"
          style={{ animationDuration: "20s" }}
        ></div>
        <div
          className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-yellow-400 to-red-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-spin"
          style={{ animationDuration: "15s", animationDirection: "reverse" }}
        ></div>
        <div
          className="absolute -bottom-32 left-1/2 w-72 h-72 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-spin"
          style={{ animationDuration: "25s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-bounce"
          style={{ animationDuration: "8s" }}
        ></div>
        <div
          className="absolute bottom-20 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-15"
          style={{ animation: "floating 12s ease-in-out infinite" }}
        ></div>
      </div>

      {/* Hero Section */}
      <motion.section
        className="section-padding relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <motion.h1
                className="text-5xl lg:text-7xl font-bold mb-6 relative"
                initial={{ opacity: 0, x: -50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              >
                <motion.span
                  className="inline-block"
                  initial={{ rotateX: -90 }}
                  animate={{ rotateX: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Hi, I'm{" "}
                </motion.span>
                <motion.span
                  className="gradient-text-rainbow inline-block relative"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.5,
                    duration: 0.6,
                    type: "spring",
                    stiffness: 200,
                  }}
                >
                  {personal.name}
                  <motion.div
                    className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-20 blur-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                </motion.span>
              </motion.h1>

              <motion.h2
                className="text-2xl lg:text-3xl mb-6 gradient-text-blue"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                {personal.title}
              </motion.h2>

              <motion.p
                className="text-lg text-gray-400 mb-8 max-w-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                {personal.description}
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <Link
                  to="/projects"
                  className="btn-primary inline-flex items-center"
                >
                  View My Work <FiArrowRight className="ml-2" />
                </Link>
                <a
                  href={personal.resume}
                  className="btn-secondary inline-flex items-center"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FiDownload className="mr-2" /> Resume
                </a>
              </motion.div>

              <motion.div
                className="flex space-x-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative p-3 rounded-full glass-effect text-gray-400 hover:text-white transition-all duration-300 group"
                      whileHover={{ scale: 1.2, y: -5, rotateZ: 5 }}
                      whileTap={{ scale: 0.9 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                    >
                      <Icon size={24} />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        whileHover={{ scale: 1.1 }}
                      />
                    </motion.a>
                  );
                })}
              </motion.div>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <div className="relative z-10">
                {/* Animated rings around image */}
                <motion.div
                  className="absolute -inset-8 rounded-full border-2 border-purple-400/30"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -inset-12 rounded-full border border-dashed border-pink-400/20"
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.div
                  className="absolute -inset-16 rounded-full border border-dotted border-cyan-400/15"
                  animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.img
                    src={personal.profileImage}
                    alt={personal.name}
                    className="w-full max-w-md mx-auto rounded-2xl shadow-2xl relative z-10 hover:shadow-purple-500/25 transition-shadow duration-500"
                    initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{ duration: 1, delay: 0.4, type: "spring" }}
                  />

                  {/* Multiple gradient backgrounds */}
                  <motion.div
                    className="absolute -inset-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-2xl blur-lg opacity-40"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0],
                      opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <motion.div
                    className="absolute -inset-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 rounded-2xl blur-xl opacity-20"
                    animate={{
                      scale: [1.1, 1, 1.1],
                      rotate: [0, -5, 5, 0],
                      opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                  />
                  <motion.div
                    className="absolute -inset-8 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl blur-2xl opacity-10"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        className="section-padding relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Background gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-pink-900/20 pointer-events-none" />

        <div className="container-custom relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            Skills & <span className="gradient-text">Technologies</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {topSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="glass-effect p-6 rounded-xl text-center card-hover group"
                variants={itemVariants}
                whileHover={{ scale: 1.05, rotateY: 5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="text-4xl mb-3"
                  whileHover={{ scale: 1.2, rotateZ: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  💻
                </motion.div>
                <h3 className="font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
                  {skill.name}
                </h3>
                <div className="w-full bg-gray-700 rounded-full h-3 mb-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-3 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.1,
                      ease: "easeOut",
                    }}
                    viewport={{ once: true }}
                  />
                </div>
                <span className="text-sm text-gray-400 font-medium">
                  {skill.level}%
                </span>
                <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Projects */}
      <motion.section
        className="section-padding relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Here are some of my recent projects that showcase my skills and
              experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="glass-effect rounded-xl overflow-hidden card-hover group"
                variants={itemVariants}
                whileHover={{ y: -10, rotateY: 2 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-all duration-500"
                    whileHover={{ scale: 1.1 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <motion.div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-4 right-4">
                    <motion.span
                      className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                        project.status === "completed"
                          ? "bg-green-500/30 text-green-300 border border-green-400/30"
                          : "bg-yellow-500/30 text-yellow-300 border border-yellow-400/30"
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {project.status}
                    </motion.span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:gradient-text transition-all duration-300">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, tagIndex) => (
                      <motion.span
                        key={tag}
                        className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 rounded-full text-sm border border-purple-400/20"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + tagIndex * 0.1 }}
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <motion.a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                      whileHover={{ scale: 1.05, x: 2 }}
                    >
                      <FiEye className="mr-1" size={16} />
                      Demo
                    </motion.a>
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05, x: 2 }}
                    >
                      <FiGithub className="mr-1" size={16} />
                      Code
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" variants={itemVariants}>
            <Link
              to="/projects"
              className="btn-primary inline-flex items-center"
            >
              View All Projects <FiArrowRight className="ml-2" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.section
        className="section-padding relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none" />

        <div className="container-custom relative z-10">
          <motion.h2
            className="text-4xl font-bold text-center mb-16"
            variants={itemVariants}
          >
            What People <span className="gradient-text">Say</span>
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className="glass-effect p-6 rounded-xl card-hover group"
                variants={itemVariants}
                whileHover={{ scale: 1.02, rotateY: 3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.2 + i * 0.1 }}
                    >
                      <FiStar
                        className="text-yellow-400 fill-current"
                        size={16}
                      />
                    </motion.div>
                  ))}
                </div>

                <p className="text-gray-300 mb-4 italic group-hover:text-gray-200 transition-colors duration-300">
                  "{testimonial.message}"
                </p>

                <div className="flex items-center">
                  <motion.img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                    whileHover={{ scale: 1.1, rotateZ: 5 }}
                  />
                  <div>
                    <h4 className="font-semibold group-hover:gradient-text transition-all duration-300">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-400">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <motion.div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="section-padding relative"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.div
            className="glass-effect p-12 rounded-2xl text-center relative overflow-hidden"
            variants={itemVariants}
          >
            {/* Animated background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10"
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <h2 className="text-4xl font-bold mb-4 relative z-10">
              Ready to Start a <span className="gradient-text">Project</span>?
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto relative z-10">
              I'm always excited to work on new projects and collaborate with
              amazing people. Let's create something great together!
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Link to="/contact" className="btn-primary">
                Get In Touch
              </Link>
              <Link to="/services" className="btn-secondary">
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
