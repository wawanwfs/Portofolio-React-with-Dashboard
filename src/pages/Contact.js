import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend,
  FiUser,
  FiMessageSquare,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiClock,
  FiHeart,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import { usePortfolio } from "../App";

const Contact = () => {
  const { data } = usePortfolio();
  const { personal } = data;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    {
      icon: FiGithub,
      url: personal.social.github,
      name: "GitHub",
      color: "from-gray-600 to-gray-800",
    },
    {
      icon: FiLinkedin,
      url: personal.social.linkedin,
      name: "LinkedIn",
      color: "from-blue-600 to-blue-800",
    },
    {
      icon: FiTwitter,
      url: personal.social.twitter,
      name: "Twitter",
      color: "from-sky-500 to-blue-600",
    },
    {
      icon: FiInstagram,
      url: personal.social.instagram,
      name: "Instagram",
      color: "from-pink-500 to-purple-600",
    },
  ];

  const contactInfo = [
    {
      icon: FiMail,
      label: "Send me an email",
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: FiPhone,
      label: "Give me a call",
      value: personal.phone,
      href: `tel:${personal.phone}`,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: FiMapPin,
      label: "Visit me at",
      value: personal.location,
      href: "#",
      color: "from-blue-500 to-cyan-500",
    },
  ];

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div
          className="absolute top-1/2 right-10 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          style={{ animation: "floating 20s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-20 left-1/4 w-72 h-72 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          style={{ animation: "morphing 18s ease-in-out infinite" }}
        />
        <div
          className="absolute top-40 right-1/3 w-64 h-64 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-bounce"
          style={{ animationDuration: "8s" }}
        />
        <div
          className="absolute bottom-40 right-20 w-48 h-48 bg-gradient-to-r from-red-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-15"
          style={{ animation: "floating 12s ease-in-out infinite reverse" }}
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
                Get In <span className="gradient-text-rainbow">Touch</span>
              </motion.h1>
              <motion.p
                className="text-xl text-gray-300 max-w-3xl mx-auto mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Have a project in mind or just want to say hello? I'd love to
                hear from you. Send me a message and I'll respond as soon as
                possible!
              </motion.p>

              {/* Availability Status */}
              <motion.div
                className="inline-flex items-center glass-effect px-6 py-3 rounded-full"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-3 h-3 bg-green-400 rounded-full mr-3"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <FiClock className="mr-2 text-green-400" />
                <span className="text-green-400 font-medium">
                  Available for freelance work
                </span>
              </motion.div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div variants={itemVariants}>
                <motion.h2
                  className="text-3xl font-bold mb-8 gradient-text"
                  whileHover={{ scale: 1.02 }}
                >
                  Let's Connect
                </motion.h2>

                <div className="space-y-6 mb-8">
                  {contactInfo.map((info, index) => {
                    const Icon = info.icon;
                    return (
                      <motion.a
                        key={info.label}
                        href={info.href}
                        className="group flex items-center p-6 glass-effect rounded-2xl hover:shadow-2xl transition-all duration-500"
                        whileHover={{
                          scale: 1.02,
                          rotateY: 3,
                          x: 10,
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <motion.div
                          className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mr-6`}
                          whileHover={{
                            scale: 1.1,
                            rotateZ: 5,
                            boxShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
                          }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Icon className="text-white text-2xl" />
                        </motion.div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-1 group-hover:gradient-text transition-all duration-300">
                            {info.label}
                          </h3>
                          <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                            {info.value}
                          </p>
                        </div>
                        <motion.div
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          whileHover={{ x: 5 }}
                        >
                          <FiSend className="text-purple-400" />
                        </motion.div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* Social Links */}
                <motion.div
                  className="glass-effect p-6 rounded-2xl"
                  variants={itemVariants}
                  whileHover={{ scale: 1.01 }}
                >
                  <h3 className="text-xl font-semibold mb-6 gradient-text-blue">
                    Follow Me
                  </h3>
                  <div className="flex space-x-4">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <motion.a
                          key={social.name}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center group`}
                          whileHover={{
                            scale: 1.2,
                            rotateZ: 10,
                            y: -5,
                          }}
                          whileTap={{ scale: 0.9 }}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: index * 0.1,
                            type: "spring",
                            stiffness: 200,
                          }}
                        >
                          <Icon className="text-white text-lg group-hover:scale-110 transition-transform" />
                        </motion.a>
                      );
                    })}
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div variants={itemVariants}>
                <motion.div
                  className="glass-effect p-8 rounded-2xl relative overflow-hidden"
                  whileHover={{ scale: 1.01 }}
                >
                  {/* Animated background gradient */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.h2
                    className="text-3xl font-bold mb-8 gradient-text relative z-10"
                    whileHover={{ scale: 1.02 }}
                  >
                    Send Message
                  </motion.h2>

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6 relative z-10"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <FiUser className="inline mr-2" />
                          Full Name
                        </label>
                        <motion.input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your name"
                          whileFocus={{
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                            borderColor: "#8b5cf6",
                          }}
                        />
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileFocus={{ scale: 1.02 }}
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          <FiMail className="inline mr-2" />
                          Email Address
                        </label>
                        <motion.input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                          placeholder="Enter your email"
                          whileFocus={{
                            boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                            borderColor: "#8b5cf6",
                          }}
                        />
                      </motion.div>
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiMessageSquare className="inline mr-2" />
                        Subject
                      </label>
                      <motion.input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                        placeholder="What's this about?"
                        whileFocus={{
                          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                          borderColor: "#8b5cf6",
                        }}
                      />
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileFocus={{ scale: 1.02 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        <FiMessageSquare className="inline mr-2" />
                        Message
                      </label>
                      <motion.textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 resize-none"
                        placeholder="Tell me about your project..."
                        whileFocus={{
                          boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
                          borderColor: "#8b5cf6",
                        }}
                      />
                    </motion.div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary relative overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="flex items-center justify-center"
                        animate={isSubmitting ? { x: [0, 10, 0] } : {}}
                        transition={{
                          duration: 0.5,
                          repeat: isSubmitting ? Infinity : 0,
                        }}
                      >
                        {isSubmitting ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            <FiSend className="mr-2" />
                            Send Message
                          </>
                        )}
                      </motion.div>

                      {/* Button shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                        whileHover={{
                          translateX: "200%",
                          transition: { duration: 0.6 },
                        }}
                      />
                    </motion.button>
                  </form>
                </motion.div>
              </motion.div>
            </div>

            {/* Quote Section */}
            <motion.div
              className="mt-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.div
                className="glass-effect p-8 rounded-2xl max-w-4xl mx-auto relative overflow-hidden"
                whileHover={{ scale: 1.01 }}
              >
                {/* Background pattern */}
                <motion.div
                  className="absolute inset-0 opacity-5"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  }}
                  animate={{
                    backgroundPosition: ["0px 0px", "60px 60px"],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <motion.div className="relative z-10" whileHover={{ y: -5 }}>
                  <motion.p
                    className="text-2xl lg:text-3xl font-light italic text-gray-300 mb-6"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                  >
                    "The best way to predict the future is to{" "}
                    <span className="gradient-text font-semibold">
                      create it
                    </span>
                    . Let's build something amazing together!"
                  </motion.p>

                  <motion.div
                    className="flex items-center justify-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center mr-4"
                      whileHover={{ scale: 1.1, rotateZ: 5 }}
                    >
                      <FiHeart className="text-white" />
                    </motion.div>
                    <div className="text-left">
                      <p className="font-semibold gradient-text">
                        {personal.name}
                      </p>
                      <p className="text-sm text-gray-400">{personal.title}</p>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </div>
  );
};

export default Contact;
