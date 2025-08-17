import React from "react";
import { useForm } from "react-hook-form";
import {
  FiSave,
  FiEdit3,
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiInstagram,
  FiFacebook,
  FiYoutube,
} from "react-icons/fi";

const SocialMediaSection = ({ data, editMode, onToggleEdit, onSave }) => {
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

  const socialPlatforms = [
    { key: "github", name: "GitHub", icon: FiGithub, color: "bg-gray-700" },
    {
      key: "linkedin",
      name: "LinkedIn",
      icon: FiLinkedin,
      color: "bg-blue-600",
    },
    { key: "twitter", name: "Twitter", icon: FiTwitter, color: "bg-blue-400" },
    {
      key: "instagram",
      name: "Instagram",
      icon: FiInstagram,
      color: "bg-pink-600",
    },
    {
      key: "facebook",
      name: "Facebook",
      icon: FiFacebook,
      color: "bg-blue-700",
    },
    { key: "youtube", name: "YouTube", icon: FiYoutube, color: "bg-red-600" },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Social Media Links</h2>
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
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <div key={platform.key}>
                  <label className="flex items-center text-sm font-medium mb-2">
                    <Icon className="mr-2" size={18} />
                    {platform.name} URL
                  </label>
                  <input
                    {...register(platform.key)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={`https://${platform.key}.com/yourusername`}
                  />
                </div>
              );
            })}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Other Social Links (one per line)
            </label>
            <textarea
              {...register("other")}
              rows={4}
              className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Discord: https://discord.gg/yourserver&#10;Twitch: https://twitch.tv/yourusername&#10;Website: https://yourwebsite.com"
            />
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {socialPlatforms.map((platform) => {
              const Icon = platform.icon;
              const url = data?.[platform.key];

              return (
                <div key={platform.key} className="glass-effect p-4 rounded-lg">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 ${platform.color} rounded-lg mr-3`}>
                      <Icon size={20} className="text-white" />
                    </div>
                    <h3 className="font-semibold">{platform.name}</h3>
                  </div>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-400 hover:text-primary-300 transition-colors text-sm break-all"
                    >
                      {url}
                    </a>
                  ) : (
                    <p className="text-gray-500 text-sm">Not configured</p>
                  )}
                </div>
              );
            })}
          </div>

          {data?.other && (
            <div className="glass-effect p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Other Social Links</h3>
              <div className="space-y-2">
                {data.other
                  .split("\n")
                  .filter((link) => link.trim())
                  .map((link, index) => (
                    <div key={index} className="text-sm">
                      {link.includes("http") ? (
                        <a
                          href={link.includes(":") ? link.split(": ")[1] : link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-400 hover:text-primary-300 transition-colors"
                        >
                          {link}
                        </a>
                      ) : (
                        <span className="text-gray-400">{link}</span>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SocialMediaSection;
