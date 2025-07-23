import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiSave, FiEdit3, FiTrash2 } from "react-icons/fi";

const BlogSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitBlog = async (formData, blogId) => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        publishedAt:
          formData.publishedAt || new Date().toISOString().split("T")[0],
      };
      await onSave("blog", updatedData, blogId);
    } finally {
      setIsLoading(false);
    }
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
                      className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Saving...
                        </>
                      ) : (
                        <>
                          <FiSave className="mr-2" />
                          Save
                        </>
                      )}
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

export default BlogSection;
