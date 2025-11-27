"use client";
import { useState } from "react";
import QuestionTypeDropdown from "./QuestionTypeDropdown";

export default function Home() {
  const [fields, setFields] = useState([{ value: "" }]);
  const [questionType, setQuestionType] = useState("");

  const addField = () => {
    setFields([...fields, { value: "" }]);
  };

  const handleChange = (index: number, e: any) => {
    const newFields = [...fields];
    newFields[index].value = e.target.value;
    setFields(newFields);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Form Data:", fields);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center items-start py-10">
      <div className="flex gap-8 w-2/3">
        <div className="flex flex-col space-y-6 w-full">
          <form
            onSubmit={handleSubmit}
            className="p-6 bg-white shadow-lg rounded-lg w-full space-y-4"
          >
            <input
              type="text"
              className="border p-3 rounded w-full text-2xl text-black focus:outline-blue-500"
              placeholder="Untitled Form"
            />

            <input
              type="text"
              className="border p-3 rounded w-full text-sm text-black"
              placeholder="Form Description"
            />
          </form>

          {/* Dynamic Question List */}
          <div className="p-6 bg-white shadow-lg rounded-lg w-full space-y-3">
            <div className="flex flex-col space-y-3 rounded">
              {fields.map((field, index) => (
                <div key={index} className="space-y-3">
                  {/* Question + Dropdown */}
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) => handleChange(index, e)}
                      className="border p-3 rounded w-full text-black focus:outline-blue-500"
                      placeholder="Untitled Question"
                    />

                    <QuestionTypeDropdown setQuestionType={setQuestionType} />
                  </div>

                  {/* Conditional Rendering for Options */}
                  {questionType === "multiple-choice" ? (
                    <div className=" flex flex-col p-3 rounded text-black">
                      <div>
                        <input type="radio" value="option1" />
                        <input className="ml-2 text-black focus:outline-none" placeholder="option"/>
                      </div>
                      <div>
                        <input type="radio" />
                        <label className="ml-2">Option 2</label>
                      </div>
                    </div>
                  ) : questionType === "checkboxes" ? (
                    <div className="flex flex-col items-center gap-2">
                      <input type="checkbox" />
                      <label className="text-black">Option 1</label>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit
            </button>
          </div>
        </div>
        <div className="flex flex-col bg-white shadow-lg rounded-lg p-1 h-fit">
          <button
            type="button"
            onClick={addField}
            className="px-2 text-gray-500 text-2xl rounded-3xl border border-gray-300"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
