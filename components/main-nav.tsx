import Link from "next/link";
import SearchBar from "./SearchBar";
import { SidebarTrigger } from "./ui/sidebar";

export function MainNav() {
  const categories = [
    { value: "news", label: "News" },
    { value: "world", label: "World" },
    { value: "business", label: "Business" },
    { value: "art", label: "Art" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "sport", label: "Sport" },
    { value: "opinion", label: "Opinion" },
    { value: "culture", label: "Culture" },
    { value: "politic", label: "Politic" },
    { value: "advertisement", label: "Advertisement" },
    { value: "job-portal", label: "Job Portal" },
  ];

  return (
    <nav
      className="border-b border-dark-grey  overflow-auto scroll-smooth scroll-m-1 "
      style={{ scrollbarWidth: "none" }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center mr-2 md:mr-0 ">
            <SidebarTrigger />
          </div>
          <div className="hidden items-center space-x-6 md:flex">
            {categories.map((category) => (
              <Link
                key={category.value}
                href="#"
                className="scroll-m-20 text-base font-medium tracking-normal nav-link hover:text-grenadier hover:font-semibold delay-75 duration-75  ease-in-out transition-all "
              >
                {category.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center">
            <SearchBar />
          </div>
        </div>
      </div>
    </nav>
  );
}
