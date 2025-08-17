import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiTag,
  FiArrowLeft,
  FiShare2,
  FiTwitter,
  FiFacebook,
  FiLinkedin,
  FiCopy,
} from "react-icons/fi";
import { usePortfolio } from "../App";
import toast from "react-hot-toast";

const BlogDetail = () => {
  const { id } = useParams();
  const { data } = usePortfolio();
  const { blog } = data;

  // Find the blog post by ID
  const post = blog.find((p) => p.id === parseInt(id));

  // If post not found, redirect to blog page
  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${post.title}`;

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(shareUrl)}`,
      "_blank"
    );
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl
      )}`,
      "_blank"
    );
  };

  // Related posts (other posts with similar tags)
  const relatedPosts = blog
    .filter(
      (p) => p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-20">
      {/* Back to Blog */}
      <motion.div
        className="container-custom py-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Link
          to="/blog"
          className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors mb-8"
        >
          <FiArrowLeft className="mr-2" />
          Back to Blog
        </Link>
      </motion.div>

      {/* Hero Section */}
      <motion.section
        className="section-padding"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Featured Image */}
            <div className="relative mb-8 rounded-2xl overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/800x400?text=Blog+Image";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6">
              <div className="flex items-center">
                <FiCalendar className="mr-2" size={16} />
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center">
                <FiClock className="mr-2" size={16} />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-primary-500/20 text-primary-400 rounded text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {post.excerpt}
            </p>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-700">
              <span className="text-gray-400 mr-2">Share:</span>
              <button
                onClick={shareOnTwitter}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                title="Share on Twitter"
              >
                <FiTwitter size={18} />
              </button>
              <button
                onClick={shareOnFacebook}
                className="p-2 bg-blue-800 hover:bg-blue-900 rounded-lg transition-colors"
                title="Share on Facebook"
              >
                <FiFacebook size={18} />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2 bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors"
                title="Share on LinkedIn"
              >
                <FiLinkedin size={18} />
              </button>
              <button
                onClick={() => copyToClipboard(shareUrl)}
                className="p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                title="Copy Link"
              >
                <FiCopy size={18} />
              </button>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Article Content */}
      <motion.section
        className="section-padding"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-invert max-w-none">
              <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {post.content ||
                  `This is the full content of the blog post "${post.title}". 
                  
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Key Points

1. **First important point** - Detailed explanation of the first key concept
2. **Second important point** - In-depth discussion of another crucial aspect  
3. **Third important point** - Additional insights and considerations

## Conclusion

Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.

Feel free to reach out if you have any questions about this topic!`}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <motion.section
          className="section-padding bg-black/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="container-custom">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Related <span className="gradient-text">Articles</span>
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="glass-effect rounded-xl overflow-hidden hover-lift group block"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/400x200?text=Blog+Image";
                        }}
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
                        <FiCalendar className="mr-1" />
                        <span>
                          {new Date(
                            relatedPost.publishedAt
                          ).toLocaleDateString()}
                        </span>
                        <span className="mx-2">•</span>
                        <FiClock className="mr-1" />
                        <span>{relatedPost.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Back to Top */}
      <div className="container-custom py-8">
        <div className="text-center">
          <Link to="/blog" className="btn-secondary inline-flex items-center">
            <FiArrowLeft className="mr-2" />
            Back to All Articles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
