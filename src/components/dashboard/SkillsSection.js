import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FiSave, FiEdit3, FiPlus, FiTrash2, FiX } from "react-icons/fi";

const SkillsSection = ({ data, editMode, onToggleEdit, onSave }) => {
  const { register, handleSubmit, reset, watch, setValue } = useForm();
  const [newTechSkill, setNewTechSkill] = useState({ name: "", level: 50 });
  const [techSkills, setTechSkills] = useState(data.technical || []);
  const [softSkills, setSoftSkills] = useState(data.soft || []);
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setTechSkills(data.technical || []);
    setSoftSkills(data.soft || []);
  }, [data]);

  const addTechSkill = () => {
    if (newTechSkill.name.trim()) {
      const updatedSkills = [
        ...techSkills,
        { ...newTechSkill, id: Date.now() },
      ];
      setTechSkills(updatedSkills);
      setNewTechSkill({ name: "", level: 50 });
    }
  };

  const removeTechSkill = (index) => {
    const updatedSkills = techSkills.filter((_, i) => i !== index);
    setTechSkills(updatedSkills);
  };

  const updateTechSkillLevel = (index, level) => {
    const updatedSkills = [...techSkills];
    updatedSkills[index].level = level;
    setTechSkills(updatedSkills);
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() && !softSkills.includes(newSoftSkill.trim())) {
      setSoftSkills([...softSkills, newSoftSkill.trim()]);
      setNewSoftSkill("");
    }
  };

  const removeSoftSkill = (skillToRemove) => {
    setSoftSkills(softSkills.filter((skill) => skill !== skillToRemove));
  };

  const saveSkills = async () => {
    setIsLoading(true);
    try {
      await onSave({
        technical: techSkills,
        soft: softSkills,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Skills</h2>
        <div className="flex gap-2">
          {editMode && (
            <button
              onClick={saveSkills}
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
                  Save All
                </>
              )}
            </button>
          )}
          <button
            onClick={onToggleEdit}
            className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
          >
            <FiEdit3 className="mr-2" />
            {editMode ? "Cancel" : "Edit"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Technical Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Technical Skills</h3>

          {editMode && (
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-3">Add New Technical Skill</h4>
              <div className="flex gap-2 items-end">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Skill Name</label>
                  <input
                    type="text"
                    value={newTechSkill.name}
                    onChange={(e) =>
                      setNewTechSkill({ ...newTechSkill, name: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-gray-700 rounded text-sm"
                    placeholder="e.g., React"
                  />
                </div>
                <div className="w-32">
                  <label className="block text-sm mb-1">Level (%)</label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newTechSkill.level}
                    onChange={(e) =>
                      setNewTechSkill({
                        ...newTechSkill,
                        level: parseInt(e.target.value),
                      })
                    }
                    className="w-full"
                  />
                  <div className="text-center text-xs text-gray-400">
                    {newTechSkill.level}%
                  </div>
                </div>
                <button
                  onClick={addTechSkill}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            {techSkills.map((skill, index) => (
              <div key={index} className="bg-gray-800 p-3 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-primary-400 text-sm">
                      {skill.level}%
                    </span>
                    {editMode && (
                      <button
                        onClick={() => removeTechSkill(index)}
                        className="p-1 bg-red-600 hover:bg-red-700 rounded text-xs"
                      >
                        <FiTrash2 size={12} />
                      </button>
                    )}
                  </div>
                </div>

                {editMode ? (
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) =>
                      updateTechSkillLevel(index, parseInt(e.target.value))
                    }
                    className="w-full"
                  />
                ) : (
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Soft Skills */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Soft Skills</h3>

          {editMode && (
            <div className="bg-gray-800 p-4 rounded-lg mb-4">
              <h4 className="font-medium mb-3">Add New Soft Skill</h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && addSoftSkill()}
                  className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm"
                  placeholder="e.g., Leadership"
                />
                <button
                  onClick={addSoftSkill}
                  className="px-3 py-2 bg-green-600 hover:bg-green-700 rounded text-sm"
                >
                  <FiPlus />
                </button>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {softSkills.map((skill, index) => (
              <div
                key={index}
                className={`flex items-center gap-2 px-3 py-1 bg-primary-500/20 text-primary-400 rounded-full text-sm ${
                  editMode ? "pr-1" : ""
                }`}
              >
                <span>{skill}</span>
                {editMode && (
                  <button
                    onClick={() => removeSoftSkill(skill)}
                    className="p-1 hover:bg-red-500/20 rounded-full"
                  >
                    <FiX size={12} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsSection;
