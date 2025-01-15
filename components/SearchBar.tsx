"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { Command } from "./ui/command";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    // <form onSubmit={handleSearch} className="flex space-x-2">
    //   <input
    //     type="text"
    //     placeholder="Search articles..."
    //     value={query}
    //     onChange={(e) => setQuery(e.target.value)}
    //     className="w-full p-2 border rounded"
    //   />
    //   <button type="submit" className="p-2 bg-blue-500 text-white rounded">
    //     Search
    //   </button>
    // </form>
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        > */}
        {/* {value
            ? frameworks.find((framework) => framework.value === value)?.label */}
        <Search
          aria-expanded={open}
          className="w-8 h-8 p-2 rounded-md text-dark-grey hover:bg-slate-100 cursor-pointer"
        />
        {/* } */}
        {/* <ChevronsUpDown className="opacity-50" /> */}
        {/* </Button> */}
      </PopoverTrigger>
      <PopoverContent className="w-[200px] md:w-[300px] p-0">
        <Command onSubmit={handleSearch}>
          {/* <CommandInput value={query} placeholder="Search framework..." /> */}
          <form onSubmit={handleSearch} className="flex space-x-2 items-center">
            <input
              type="text"
              placeholder="Search articles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-2 rounded outline-none "
            />
            <Button className="w-14 md:w-16">Search</Button>
          </form>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
