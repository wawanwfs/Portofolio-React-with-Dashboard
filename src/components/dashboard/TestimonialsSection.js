import React from "react";
import { useForm } from "react-hook-form";
import { FiPlus, FiSave, FiEdit3, FiTrash2 } from "react-icons/fi";

const TestimonialsSection = ({
  data,
  editMode,
  onToggleEdit,
  onSave,
  onAdd,
  onDelete,
}) => {
  const { register, handleSubmit } = useForm();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmitTestimonial = async (formData, testimonialId) => {
    setIsLoading(true);
    try {
      await onSave("testimonials", formData, testimonialId);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Testimonials</h2>
        <button
          onClick={() =>
            onAdd("testimonials", {
              name: "New Client",
              position: "Position at Company",
              company: "Company Name",
              message: "Testimonial message...",
              avatar: "https://via.placeholder.com/100x100",
              rating: 5,
            })
          }
          className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors"
        >
          <FiPlus className="mr-2" />
          Add Testimonial
        </button>
      </div>

      <div className="space-y-4">
        {data.map((testimonial) => {
          const isEditing = editMode[`testimonials_${testimonial.id}`];

          return (
            <div key={testimonial.id} className="bg-gray-800 p-4 rounded-lg">
              {isEditing ? (
                <form
                  onSubmit={handleSubmit((formData) =>
                    onSubmitTestimonial(formData, testimonial.id)
                  )}
                  className="space-y-4"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name
                      </label>
                      <input
                        {...register("name", { required: true })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Position
                      </label>
                      <input
                        {...register("position", { required: true })}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="CEO"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Company
                      </label>
                      <input
                        {...register("company")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Avatar URL
                      </label>
                      <input
                        {...register("avatar")}
                        className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                        placeholder="https://example.com/avatar.jpg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Rating (1-5)
                    </label>
                    <select
                      {...register("rating")}
                      className="w-full md:w-32 px-3 py-2 bg-gray-700 rounded-lg"
                    >
                      <option value={5}>5 Stars</option>
                      <option value={4}>4 Stars</option>
                      <option value={3}>3 Stars</option>
                      <option value={2}>2 Stars</option>
                      <option value={1}>1 Star</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      {...register("message", { required: true })}
                      rows={4}
                      className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                      placeholder="Share your testimonial message here..."
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
                      onClick={() =>
                        onToggleEdit("testimonials", testimonial.id)
                      }
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
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4 object-cover"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100x100?text=Avatar";
                        }}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">
                          {testimonial.name}
                        </h3>
                        <p className="text-primary-400 text-sm font-medium">
                          {testimonial.position}
                          {testimonial.company && ` at ${testimonial.company}`}
                        </p>
                        {testimonial.rating && (
                          <div className="flex items-center gap-1 my-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${
                                  i < testimonial.rating
                                    ? "text-yellow-400"
                                    : "text-gray-600"
                                }`}
                              >
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                        <p className="text-gray-300 mt-2 italic">
                          "{testimonial.message}"
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() =>
                          onToggleEdit("testimonials", testimonial.id)
                        }
                        className="p-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                      >
                        <FiEdit3 size={16} />
                      </button>
                      <button
                        onClick={() => onDelete("testimonials", testimonial.id)}
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

export default TestimonialsSection;
