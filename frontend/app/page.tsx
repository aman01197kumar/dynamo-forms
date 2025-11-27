"use client";
import { useState } from "react";
import QuestionTypeDropdown from "./QuestionTypeDropdown";
import { TrashIcon } from "@heroicons/react/24/outline";
import ToggleButton from "./ToggleButton";

export default function Home() {
  const [fields, setFields] = useState([
    { value: "", type: "short-answer", options: [] },
  ]);

  const addField = () => {
    setFields([...fields, { value: "", type: "short-answer", options: [] }]);
  };

  const handleChange = (index: number, e: any) => {
    const updated = [...fields];
    updated[index].value = e.target.value;
    setFields(updated);
  };

  const handleTypeChange = (index: number, type: string) => {
    const updated = [...fields];
    updated[index].type = type;
    setFields(updated);
  };

  const addOption = (index: number) => {
    const updated = [...fields];
    // updated[index].options.push("");
    setFields(updated);
  };

  const updateOptionText = (i: number, optionIndex: number, text: string) => {
    const updated = [...fields];
    // updated[i].options[optionIndex] = text;
    setFields(updated);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Final Form:", fields);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center py-10">
      <div className="flex gap-8 w-2/3">
        {/* LEFT SECTION */}
        <div className="flex flex-col space-y-6 w-full border-t-8 border-violet-700 rounded-t-lg">
          {/* Title Section */}
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-lg rounded-b-lg space-y-4"
          >
            <input
              type="text"
              className=" p-1 text-3xl placeholder-black text-black outline-none w-full "
              placeholder="Untitled Form"
            />

            <input
              type="text"
              className="outline-none p-1 text-sm text-black w-full"
              placeholder="Form Description"
            />
          </form>

          {/* Dynamic Questions List */}
          <div className="p-6 bg-white shadow-lg rounded-lg space-y-3">
            {fields.map((field, index) => (
              <div key={index} className="space-y-3">
                {/* Question Input + Dropdown */}
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleChange(index, e)}
                    className="border-b-2 border-gray-400 p-1 text-sm text-black outline-none w-full focus:border-blue-700"
                    placeholder="Untitled Question"
                  />

                  <QuestionTypeDropdown
                    // selectedType={field.type}
                    setQuestionType={(type) => handleTypeChange(index, type)}
                  />
                </div>

                {/* Question Type Based UI */}
                {field.type === "multiple-choice" && (
                  <div className="flex flex-col gap-2 p-3">
                    {field.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex gap-2 items-center">
                        <input type="radio" disabled />
                        <input
                          type="text"
                          className="border p-2 rounded w-full"
                          placeholder={`Option ${optIdx + 1}`}
                          value={option}
                          onChange={(e) =>
                            updateOptionText(index, optIdx, e.target.value)
                          }
                        />
                      </div>
                    ))}

                    <button
                      onClick={() => addOption(index)}
                      className="text-blue-600 text-sm hover:underline w-fit"
                    >
                      + Add option
                    </button>
                  </div>
                )}

                {field.type === "checkboxes" && (
                  <div className="flex gap-2 items-center">
                    <input type="checkbox" disabled />
                    <span className="text-black">Checkbox Option</span>
                  </div>
                )}

                {field.type === "short-answer" && (
                  <input
                    type="text"
                    className="border-b border-gray-400 p-1 text-sm text-black outline-none w-2/4"
                    placeholder="Short answer text"
                  />
                )}
                <div className="space-x-8 flex items-center justify-end w-full border-t border-gray-300 mt-3 p-4 ">
                  {/* Left: Trash Icon */}
                  <div className="flex items-center w-1/30 text-gray-500">
                    <TrashIcon />
                  </div>
                  <div className="w-[1px] h-8 bg-gray-400"></div>

                  {/* Right: Toggle + Required Text */}
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-normal">Required</span>
                    <ToggleButton />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="flex bg-white shadow-lg rounded-lg p-2 h-fit">
          <button
            type="button"
            onClick={addField}
            className="px-3 py-1 text-gray-500 text-xl rounded-full border border-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
