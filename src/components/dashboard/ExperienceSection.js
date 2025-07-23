import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiSave, FiEdit3, FiTrash2 } from "react-icons/fi";

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
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (isEditing) {
      reset(experience);
      setValue("technologies", experience.technologies?.join(", ") || "");
    }
  }, [isEditing, experience, reset, setValue]);

  const handleFormSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const updatedData = {
        ...formData,
        technologies: formData.technologies
          ? formData.technologies.split(",").map((t) => t.trim())
          : [],
      };
      await onSubmit(updatedData, experience.id);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      {isEditing ? (
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="space-y-4"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Position</label>
              <input
                {...register("position", { required: true })}
                defaultValue={experience.position}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                placeholder="Software Engineer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company</label>
              <input
                {...register("company", { required: true })}
                defaultValue={experience.company}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                placeholder="Tech Company Inc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Period</label>
            <input
              {...register("period", { required: true })}
              defaultValue={experience.period}
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
              defaultValue={experience.description}
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
              defaultValue={experience.technologies?.join(", ") || ""}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              placeholder="React, JavaScript, Node.js, MongoDB"
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
              onClick={() => onToggleEdit("experience", experience.id)}
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
              <h3 className="font-semibold text-lg">{experience.position}</h3>
              <p className="text-primary-400 font-medium">
                {experience.company}
              </p>
              <p className="text-gray-400 text-sm">{experience.period}</p>
              {experience.description && (
                <p className="text-gray-300 mt-2">{experience.description}</p>
              )}
              {experience.technologies &&
                experience.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {experience.technologies.map((tech, index) => (
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
                onClick={() => onToggleEdit("experience", experience.id)}
                className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
              >
                <FiEdit3 size={16} />
              </button>
              <button
                onClick={() => onDelete("experience", experience.id)}
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
};

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

export default ExperienceSection;
