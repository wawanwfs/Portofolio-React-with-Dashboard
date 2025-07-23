import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiSave, FiEdit3, FiTrash2 } from "react-icons/fi";

const ProjectsSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset, setValue } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitProject = async (formData, projectId) => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map((t) => t.trim()) : [],
        featured: formData.featured === "true" || formData.featured === true,
      };
      await onSave("projects", updatedData, projectId);
    } finally {
      setIsLoading(false);
    }
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

export default ProjectsSection;
