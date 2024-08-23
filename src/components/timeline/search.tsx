"use client";

import { Search } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";

type DebouncedFunction<T extends (...args: any[]) => void> = {
  (...args: Parameters<T>): void;
  cancel: () => void;
};

function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): DebouncedFunction<T> {
  let timerId: NodeJS.Timeout | undefined;

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => func(...args), delay);
  };

  debouncedFunction.cancel = () => {
    if (timerId) clearTimeout(timerId);
  };

  return debouncedFunction as DebouncedFunction<T>;
}

interface SearchInputProps {
  onSearch: (query: string) => void;
}

export default function SearchInput({ onSearch }: SearchInputProps) {
  const [inputValue, setInputValue] = useState<string>("");

  useEffect(() => {
    const handler = debounce((value: string) => {
      onSearch(value);
    }, 700);

    handler(inputValue);

    // Cleanup debounce on component unmount
    return () => {
      handler.cancel();
    };
  }, [inputValue, onSearch]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center w-full max-w-[320px] pl-4 pe-4 ">
      <span className="flex items-center gap-2 bg-zinc-100 border border-zinc-200 rounded-lg py-3 px-2 w-full">
        <Search size={18} />
        <input
          alt="Pesquisar histórico"
          placeholder="Pesquisar..."
          className="bg-transparent outline-none w-full"
          value={inputValue}
          onChange={handleChange}
        />
      </span>
    </div>
  );
}
