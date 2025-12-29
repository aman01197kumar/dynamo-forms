"use client";

interface ToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

export default function ToggleButton({ isOn, onToggle }: ToggleProps) {
  return (
    <div
      className={`relative w-10 h-5 rounded-full cursor-pointer transition-all ${
        isOn ? "bg-violet-700" : "bg-gray-300"
      }`}
      onClick={onToggle}
    >
      <div
        className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
          isOn ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </div>
  );
}
