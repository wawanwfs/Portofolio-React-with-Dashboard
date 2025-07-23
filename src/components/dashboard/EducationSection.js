import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiSave, FiEdit3, FiTrash2 } from "react-icons/fi";

const EducationSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitEducation = async (formData, eduId) => {
    setIsLoading(true);
    try {
      await onSave("education", formData, eduId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Education</h2>
        <button
          onClick={() =>
            onAdd("education", {
              institution: "New Institution",
              degree: "New Degree",
              period: "2020 - 2024",
              description: "Description here...",
              gpa: "",
            })
          }
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Education
        </button>
      </div>

      <div className="space-y-4">
        {data.map((edu) => {
          const isEditing = editMode[`education_${edu.id}`];

          return (
            <div key={edu.id} className="bg-gray-800 p-4 rounded-lg">
              {isEditing ? (
                <form
                  onSubmit={handleSubmit((formData) =>
                    onSubmitEducation(formData, edu.id)
                  )}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Degree
                      </label>
                      <input
                        {...register("degree", { required: true })}
                        defaultValue={edu.degree}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="Bachelor of Computer Science"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Institution
                      </label>
                      <input
                        {...register("institution", { required: true })}
                        defaultValue={edu.institution}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="University of Technology"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Period
                      </label>
                      <input
                        {...register("period", { required: true })}
                        defaultValue={edu.period}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="2020 - 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        GPA (Optional)
                      </label>
                      <input
                        {...register("gpa")}
                        defaultValue={edu.gpa}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="3.8/4.0"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      {...register("description")}
                      defaultValue={edu.description}
                      rows={3}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Relevant coursework, achievements, etc..."
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
                      onClick={() => onToggleEdit("education", edu.id)}
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
                      <h3 className="font-semibold text-lg">{edu.degree}</h3>
                      <p className="text-primary-400 font-medium">
                        {edu.institution}
                      </p>
                      <p className="text-gray-400 text-sm">{edu.period}</p>
                      {edu.gpa && (
                        <p className="text-gray-400 text-sm">GPA: {edu.gpa}</p>
                      )}
                      {edu.description && (
                        <p className="text-gray-300 mt-2">{edu.description}</p>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => onToggleEdit("education", edu.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete("education", edu.id)}
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

export default EducationSection;
