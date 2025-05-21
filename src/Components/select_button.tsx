import { useRef } from "react";

interface SelectButtonProps {
  onFileSelect: (file: File) => void;
}

export default function SelectButton({ onFileSelect }: SelectButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="bg-white text-black px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-300 transition duration-200 shadow-md cursor-pointer"
      >
        Select .dcm file
      </button>

      <input
        type="file"
        accept=".dcm"
        onChange={handleChange}
        ref={inputRef}
        className="hidden"
      />
    </>
  );
}
