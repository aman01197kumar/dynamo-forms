"use client";
import { useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import QuestionTypeDropdown from "../utilites/dropdowns/QuestionTypeDropdown";
import ToggleButton from "../utilites/buttons/ToggleButton";
import axios from "axios";

/* ✅ TYPES */
type QuestionType = "short-answer" | "multiple-choice" | "checkboxes";

interface Field {
  value: string;
  type: QuestionType;
  options: string[];
  required: boolean;
}

export default function CreateForm() {
  const [fields, setFields] = useState<Field[]>([
    {
      value: "",
      type: "short-answer",
      options: [],
      required: false,
    },
  ]);

  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");

  const addField = () => {
    setFields((prev) => [
      ...prev,
      { value: "", type: "short-answer", options: [], required: false },
    ]);
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updated = [...fields];
    updated[index].value = e.target.value;
    setFields(updated);
  };

  const handleTypeChange = (index: number, type: QuestionType) => {
    const updated = [...fields];
    updated[index].type = type;
    setFields(updated);
  };

  const addOption = (index: number) => {
    const updated = [...fields];
    updated[index].options.push("");
    setFields(updated);
  };

  const toggleRequired = (index: number) => {
    const updated = [...fields];
    updated[index].required = !updated[index].required;
    setFields(updated);
  };

  const removeField = (index: number) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const updateOptionText = (
    fieldIndex: number,
    optionIndex: number,
    text: string
  ) => {
    const updated = [...fields];
    updated[fieldIndex].options[optionIndex] = text;
    setFields(updated);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formTitle.trim()||!formDescription.trim()) {
      alert("Form title cannot be empty.");
      return;
    }
    fields.forEach((field, index) => {
      if (!field.value.trim()) {
        alert(`Question ${index + 1} cannot be empty.`);
        return;
      }
    });

    const finalData = {
      title: formTitle,
      description: formDescription,
      questions: fields,
    };

    const response = await axios.post('http://localhost:3000/api/form', finalData);


    console.log("Final Output:", response?.data)
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen w-full bg-gray-100 flex justify-center md:py-8 py-4 px-2 mb-14"
    >
      <div className="flex gap-6 md:flex-row flex-col w-full md:w-[70%]">
        <div className="flex flex-col space-y-6 w-full border-t-8 border-violet-700 rounded-t-lg">
          {/* Title */}
          <div className="p-4 md:p-6 bg-white shadow-lg rounded-b-lg space-y-4">
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="p-1 text-2xl md:text-3xl outline-none w-full"
              placeholder="Untitled Form"
            />

            <input
              type="text"
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              className="outline-none p-1 text-sm w-full"
              placeholder="Form Description"
            />
          </div>

          {/* Questions */}
          <ol className="p-4 md:p-6 bg-white shadow-lg rounded-lg space-y-14">
            {fields.map((field, index) => (
              <li key={index} className="space-y-3">
                <div className="flex flex-col md:flex-row gap-3">
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleChange(index, e)}
                    className=" p-1 w-full"
                    placeholder="Untitled Question"
                  />

                  <QuestionTypeDropdown
                    setQuestionType={(type:any) =>
                      handleTypeChange(index, type)
                    }
                  />
                </div>

                {field.type === "multiple-choice" && (
                  <div className="flex flex-col gap-2 p-3">
                    {field.options.map((option, optIdx) => (
                      <div key={optIdx} className="flex gap-2">
                        <input type="radio" disabled />
                        <input
                          type="text"
                          value={option}
                          placeholder={`Option ${optIdx + 1}`}
                          onChange={(e) =>
                            updateOptionText(index, optIdx, e.target.value)
                          }
                          className="p-2 w-full"
                        />
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => addOption(index)}
                      className="text-blue-600 text-sm"
                    >
                      + Add option
                    </button>
                  </div>
                )}

                {field.type === "short-answer" && (
                  <input
                    type="text"
                    disabled
                    className="border-b p-1 w-2/4"
                    placeholder="Short answer text"
                  />
                )}

                <div className="flex justify-between items-center border-t pt-3">
                  <TrashIcon
                    className="w-5 h-5 cursor-pointer"
                    onClick={() => removeField(index)}
                  />

                  <div className="flex gap-2 items-center">
                    <span>Required</span>
                    <ToggleButton
                      isOn={field.required}
                      onToggle={() => toggleRequired(index)}
                    />
                  </div>
                </div>
              </li>
            ))}

            <button
              type="submit"
              className="px-4 py-2 bg-violet-700 text-white rounded"
            >
              Submit
            </button>
          </ol>
        </div>

        <div className="md:static fixed bottom-0 bg-white md:w-1/14 w-full p-2">
          <button
            type="button"
            onClick={addField}
            className="px-4 py-2 text-xl border rounded-full"
          >
            +
          </button>
        </div>
      </div>
    </form>
  );
}
