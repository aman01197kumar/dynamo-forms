import FormType from "@/_types/formType";

export default function RencentForm({ _id, title, description, questions }:FormType) {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center py-10">
      <div className="w-full max-w-2xl space-y-6">

        {/* Header */}
        <div className="bg-white rounded-lg shadow border-t-8 border-violet-700 p-6 space-y-2">
          <h1 className="text-3xl font-medium">{title}</h1>
          <p className="text-gray-600">{description}</p>
          <p className="text-sm text-red-500">* Required</p>
        </div>

        {/* Questions */}
        {questions?.map((q, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow p-6 space-y-4"
          >
            <label className="text-lg font-medium">
              {index + 1}. {q.value}
              {q.required && <span className="text-red-500 ml-1">*</span>}
            </label>

            {/* Short Answer */}
            {q.type === "Short Answer" && (
              <input
                type="text"
                placeholder="Your answer"
                className="w-full border-b border-gray-400 focus:outline-none focus:border-violet-600 py-2"
              />
            )}

            {/* Multiple Choice */}
            {q.type === "Multiple Choice" && (
              <div className="space-y-2">
                {q?.options?.map((option, idx) => (
                  <label
                    key={idx}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      className="accent-violet-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Submit Button */}
        <div className="flex justify-between items-center">
          <button className="bg-violet-700 text-white px-6 py-2 rounded hover:bg-violet-800">
            Submit
          </button>
          <span className="text-sm text-gray-500">
            Never submit passwords
          </span>
        </div>
      </div>
    </div>
  );
}
