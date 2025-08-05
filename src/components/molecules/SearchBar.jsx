import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Input from "@/components/atoms/Input";

const SearchBar = ({ 
  placeholder = "Search tasks...", 
  onSearch, 
  className 
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value) => {
    setSearchValue(value);
    onSearch && onSearch(value);
  };

  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <ApperIcon 
          name="Search" 
          size={16} 
          className="text-gray-400" 
        />
      </div>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-10 bg-gradient-to-r from-gray-50 to-white border-gray-200 focus:from-white focus:to-white"
      />
    </div>
  );
};

export default SearchBar;