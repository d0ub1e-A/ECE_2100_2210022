import { useState, React } from "react";
import MenuIcon from "./MenuIcon";
import '../App.css';

export default function SelectMenu({defaultOption, options}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultOption);
  
  const updateSelectMenu = (option) => {
    setSelectedValue(option);
    setIsOpen(false);
  }

  return(
    <>
      <div className="w-fit p-1.5 border-gray-400 rounded-md cursor-pointer z-20">
        <div className="flex items-center justify-end gap-4" onClick={() => setIsOpen(!isOpen)}>
          <span className="font-bold font-[roboto] text-[#29a7a7] w-fit text-[20px]">{selectedValue}</span>
          <MenuIcon open={isOpen}></MenuIcon>
        </div>
         {isOpen && (
            <ul className="flex flex-col bg-slate-200 rounded-b-md transition">{options.map(option => 
                <a key={option} href={`#${option.toLowerCase()}`} className="p-2 hover:text-indigo-400" onClick={() => updateSelectMenu(option)}>{option}</a>)
              }
            </ul>
          )}
      </div>
    </>
  )
}
