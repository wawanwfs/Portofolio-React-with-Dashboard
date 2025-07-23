import React from "react";
import { useForm } from "react-hook-form";
import { FiSave, FiEdit3, FiDownload } from "react-icons/fi";

const ResumeSection = ({ data, editMode, onToggleEdit, onSave }) => {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      await onSave(formData);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Resume & CV Management</h2>
        <button
          onClick={onToggleEdit}
          className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
        >
          <FiEdit3 className="mr-2" />
          {editMode ? "Cancel" : "Edit"}
        </button>
      </div>

      {editMode ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Resume PDF URL
              </label>
              <input
                {...register("resumeUrl")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://yourwebsite.com/resume.pdf"
              />
              <p className="text-xs text-gray-500 mt-1">
                Upload your resume to a cloud service and paste the public link
                here
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                CV PDF URL (Alternative)
              </label>
              <input
                {...register("cvUrl")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="https://yourwebsite.com/cv.pdf"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Resume Summary
            </label>
            <textarea
              {...register("summary")}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Brief summary of your professional background..."
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Years of Experience
              </label>
              <input
                {...register("experience")}
                type="number"
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Current Position
              </label>
              <input
                {...register("currentPosition")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Senior Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                {...register("location")}
                className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="New York, NY"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Key Skills (comma separated)
            </label>
            <input
              {...register("keySkills")}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="JavaScript, React, Node.js, Python, AWS"
            />
          </div>

          <div className="flex items-center">
            <input
              {...register("available")}
              type="checkbox"
              className="mr-3"
            />
            <label className="text-sm">Available for new opportunities</label>
          </div>

          <button
            type="submit"
            className="flex items-center px-6 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors disabled:opacity-50"
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
                Save Changes
              </>
            )}
          </button>
        </form>
      ) : (
        <div className="space-y-6">
          {/* Resume Links */}
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Resume Files</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {data?.resumeUrl && (
                <a
                  href={data.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  <FiDownload className="mr-2" />
                  Download Resume
                </a>
              )}
              {data?.cvUrl && (
                <a
                  href={data.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
                >
                  <FiDownload className="mr-2" />
                  Download CV
                </a>
              )}
            </div>
            {!data?.resumeUrl && !data?.cvUrl && (
              <p className="text-gray-500 text-center">
                No resume files configured
              </p>
            )}
          </div>

          {/* Professional Summary */}
          <div className="glass-effect p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Professional Summary</h3>
            {data?.summary ? (
              <p className="text-gray-300 leading-relaxed">{data.summary}</p>
            ) : (
              <p className="text-gray-500">No summary provided</p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="glass-effect p-4 rounded-lg text-center">
              <h4 className="font-semibold text-primary-400">Experience</h4>
              <p className="text-2xl font-bold mt-2">
                {data?.experience ? `${data.experience}+ years` : "N/A"}
              </p>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <h4 className="font-semibold text-primary-400">Current Role</h4>
              <p className="text-lg font-medium mt-2">
                {data?.currentPosition || "Not specified"}
              </p>
            </div>
            <div className="glass-effect p-4 rounded-lg text-center">
              <h4 className="font-semibold text-primary-400">Location</h4>
              <p className="text-lg font-medium mt-2">
                {data?.location || "Not specified"}
              </p>
            </div>
          </div>

          {/* Availability Status */}
          {data?.available && (
            <div className="glass-effect p-4 rounded-lg">
              <div className="flex items-center justify-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <span className="text-green-400 font-medium">
                  Available for new opportunities
                </span>
              </div>
            </div>
          )}

          {/* Key Skills */}
          {data?.keySkills && (
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {data.keySkills.split(",").map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm"
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeSection;
