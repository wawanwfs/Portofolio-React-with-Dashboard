import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { usePortfolio } from "../App";

const Services = () => {
  const { data } = usePortfolio();
  const { services } = data;

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

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <motion.section
        className="section-padding"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-6">
              My <span className="gradient-text">Services</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              I offer a range of professional services to help bring your ideas
              to life. From concept to deployment, I'm here to help you succeed.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section
        className="section-padding bg-black/20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              return (
                <motion.div
                  key={service.id}
                  className="glass-effect p-8 rounded-xl hover-lift group"
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, y: -5 }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{service.icon}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-gray-400">{service.description}</p>
                  </div>

                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        className="flex items-center text-gray-300"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.2 + featureIndex * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <FiCheck className="text-primary-500 mr-3" size={16} />
                        <span>{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <div className="text-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors group-hover:scale-105 transform duration-300"
                    >
                      Get Started <FiArrowRight className="ml-2" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
      <motion.section
        className="section-padding"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <h2 className="text-4xl font-bold mb-4">
              My <span className="gradient-text">Process</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              I follow a structured approach to ensure every project is
              delivered on time and exceeds expectations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Discovery",
                description:
                  "Understanding your requirements, goals, and target audience.",
                icon: "🔍",
              },
              {
                step: "02",
                title: "Planning",
                description:
                  "Creating detailed project plans, wireframes, and technical specifications.",
                icon: "📋",
              },
              {
                step: "03",
                title: "Development",
                description:
                  "Building your solution using best practices and modern technologies.",
                icon: "⚡",
              },
              {
                step: "04",
                title: "Delivery",
                description:
                  "Testing, deployment, and ongoing support to ensure success.",
                icon: "🚀",
              },
            ].map((process, index) => (
              <motion.div
                key={index}
                className="text-center group"
                variants={itemVariants}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                    <span className="text-3xl">{process.icon}</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {process.step}
                  </div>
                </div>

                <h3 className="text-xl font-semibold mb-3">{process.title}</h3>
                <p className="text-gray-400">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Why Choose Me Section */}
      <motion.section
        className="section-padding bg-black/20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <h2 className="text-4xl font-bold mb-6">
                Why Choose <span className="gradient-text">Me</span>?
              </h2>

              <div className="space-y-6">
                {[
                  {
                    title: "Quality First",
                    description:
                      "I prioritize code quality, performance, and user experience in every project.",
                    icon: "⭐",
                  },
                  {
                    title: "Communication",
                    description:
                      "Regular updates and clear communication throughout the project lifecycle.",
                    icon: "💬",
                  },
                  {
                    title: "On-Time Delivery",
                    description:
                      "Committed to meeting deadlines without compromising on quality.",
                    icon: "⏰",
                  },
                  {
                    title: "Ongoing Support",
                    description:
                      "Post-launch support and maintenance to ensure your success.",
                    icon: "🛠️",
                  },
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    viewport={{ once: true }}
                  >
                    <div className="w-12 h-12 bg-primary-500/20 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <span className="text-xl">{benefit.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{benefit.title}</h3>
                      <p className="text-gray-400">{benefit.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div className="relative" variants={itemVariants}>
              <div className="glass-effect p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6 text-center">
                  Ready to Get Started?
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Response Time:</span>
                    <span className="text-white">Within 24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Project Start:</span>
                    <span className="text-white">Within 1 week</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Free Consultation:</span>
                    <span className="text-green-400">✓ Available</span>
                  </div>
                </div>

                <div className="text-center">
                  <Link
                    to="/contact"
                    className="btn-primary w-full justify-center"
                  >
                    Start Your Project
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
