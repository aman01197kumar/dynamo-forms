"use client";

import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  ChevronUpDownIcon,
  CheckIcon,
  RectangleGroupIcon,
  Squares2X2Icon,
  Bars3Icon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

const questionTypes = [
  { id: 1, name: "Short Answer", value: "short-answer", icon: Bars3Icon },
  {
    id: 2,
    name: "Multiple Choice",
    value: "multiple-choice",
    icon: Squares2X2Icon,
  },
  { id: 3, name: "Checkboxes", value: "checkboxes", icon: CheckCircleIcon },
  //   { id: 4, name: "", value: "checkboxes", icon: CheckCircleIcon },
];

interface QuestionTypeDropdownProps {
  setQuestionType: (type: string) => void;
}

export default function QuestionTypeDropdown({
  setQuestionType,
}: QuestionTypeDropdownProps) {
  const [selected, setSelected] = useState(questionTypes[0]);

  useEffect(() => {
    setQuestionType(selected.value);
  }, [selected]);

  return (
    <div className="w-60 z-10">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          {/* Button */}
          <Listbox.Button className="relative w-full cursor-pointer rounded-lg border py-2 pl-3 pr-10 text-left shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <span className="flex items-center gap-2">
              <selected.icon className="h-5 w-5 text-black" />
              <span className="block truncate text-black">{selected.name}</span>
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-black" />
            </span>
          </Listbox.Button>

          {/* Dropdown Menu */}
          <Transition
            as={Fragment}
            enter="transition duration-150 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {questionTypes.map((type) => (
                <Listbox.Option
                  key={type.id}
                  value={type}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected }) => (
                    <>
                      <span className="absolute left-3 top-2 flex items-center gap-2">
                        <type.icon className="h-5 w-5 text-gray-600" />
                      </span>

                      <span
                        className={`block truncate ${
                          selected ? "font-medium" : "font-normal"
                        }`}
                      >
                        {type.name}
                      </span>

                      {selected && (
                        <span className="absolute inset-y-0 right-3 flex items-center">
                          <CheckIcon className="h-5 w-5 text-blue-600" />
                        </span>
                      )}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
