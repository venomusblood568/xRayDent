import { useRef } from "react";

export default function SelectButton(){
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if(file){
            console.log(`Selected file:`,file.name);
        }
    }
    return (
      <>
        <button 
          onClick={handleButtonClick}
          className="bg-white text-black px-8 py-4 rounded-xl text-xl font-semibold hover:bg-gray-300 transition duration-200 shadow-md cursor-pointer">
          Select .dcm file
        </button>
        <input 
            type ="file"
            accept=".dcm"
            ref = {fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            />
        
      </>
    );
}