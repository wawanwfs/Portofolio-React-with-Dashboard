import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiTag,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";
import { usePortfolio } from "../App";

const Blog = () => {
  const { data } = usePortfolio();
  const { blog } = data;

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");

  // Get all unique tags
  const allTags = [...new Set(blog.flatMap((post) => post.tags))];

  // Filter posts
  const filteredPosts = blog.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "all" || post.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

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
              My <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Thoughts, tutorials, and insights about web development,
              technology, and the industry.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search */}
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400"
                />
              </div>

              {/* Tag Filter */}
              <div className="relative">
                <FiTag
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <select
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-effect rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white appearance-none cursor-pointer"
                >
                  <option value="all">All Topics</option>
                  {allTags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Blog Posts */}
      <motion.section
        className="section-padding bg-black/20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container-custom">
          <div className="mb-8">
            <p className="text-gray-400 text-center">
              Showing {filteredPosts.length} of {blog.length} articles
            </p>
          </div>

          {filteredPosts.length > 0 ? (
            <div className="grid lg:grid-cols-2 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  className="glass-effect rounded-xl overflow-hidden hover-lift group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>

                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center text-sm text-gray-400 mb-4">
                      <div className="flex items-center mr-6">
                        <FiCalendar className="mr-2" size={14} />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <FiClock className="mr-2" size={14} />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-sm hover:bg-primary-500/30 transition-colors cursor-pointer"
                          onClick={() => setSelectedTag(tag)}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <div className="flex justify-between items-center">
                      <Link
                        to={`/blog/${post.id}`}
                        className="flex items-center text-primary-400 hover:text-primary-300 transition-colors group-hover:scale-105 transform duration-300"
                      >
                        Read More <FiArrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          ) : (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-semibold mb-2">No articles found</h3>
              <p className="text-gray-400 mb-6">
                Try adjusting your search terms or filter
              </p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedTag("all");
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </motion.div>
          )}
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section
        className="section-padding"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container-custom">
          <motion.div
            className="glass-effect p-12 rounded-2xl text-center max-w-4xl mx-auto"
            variants={itemVariants}
          >
            <h2 className="text-4xl font-bold mb-4">
              Stay <span className="gradient-text">Updated</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get the latest articles and tutorials delivered straight to your
              inbox. No spam, just quality content about web development and
              technology.
            </p>

            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 glass-effect rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white placeholder-gray-400"
              />
              <button type="submit" className="btn-primary px-8 py-3">
                Subscribe
              </button>
            </form>

            <p className="text-sm text-gray-500 mt-4">
              Join 500+ developers who are already subscribed.
            </p>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Blog;
