
import { Link } from "react-router-dom";
import { useApp } from "@/contexts/AppContext";
import { Moon, Sun, Search, Menu, User, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Header() {
  const { darkMode, toggleDarkMode } = useApp();
  const isMobile = useIsMobile();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-[#1A1A1B] border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-2 h-12 flex items-center justify-between">
        <div className="flex items-center">
          {isMobile && (
            <Button variant="ghost" size="icon" className="mr-1">
              <Menu className="h-5 w-5" />
            </Button>
          )}
          
          <Link to="/" className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className="w-8 h-8 mr-2">
              <g>
                <circle fill="#FF4500" cx="10" cy="10" r="10"></circle>
                <path fill="#FFF" d="M16.67,10A1.46,1.46,0,0,0,14.2,9a7.12,7.12,0,0,0-3.85-1.23L11,4.65,13.14,5.1a1,1,0,1,0,.13-0.61L10.82,4a0.31,0.31,0,0,0-.37.24L9.71,7.71a7.14,7.14,0,0,0-3.9,1.23,1.46,1.46,0,1,0-1.61,2.39,2.87,2.87,0,0,0,0,.44c0,2.24,2.61,4.06,5.83,4.06s5.83-1.82,5.83-4.06a2.87,2.87,0,0,0,0-.44A1.46,1.46,0,0,0,16.67,10Zm-10,1a1,1,0,1,1,1,1A1,1,0,0,1,6.67,11Zm5.81,2.75a3.84,3.84,0,0,1-2.47.77,3.84,3.84,0,0,1-2.47-.77,0.27,0.27,0,0,1,.38-0.38A3.27,3.27,0,0,0,10,14a3.28,3.28,0,0,0,2.09-.61A0.27,0.27,0,1,1,12.48,13.79Zm-0.18-1.71a1,1,0,1,1,1-1A1,1,0,0,1,12.29,12.08Z"></path>
              </g>
            </svg>
            {!isMobile && <span className="text-xl font-semibold text-black dark:text-white">reddit</span>}
          </Link>
        </div>
        
        <div className="flex-1 mx-2 max-w-xl">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Reddit"
              className="w-full bg-gray-100 dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 px-3 py-1 pl-8 focus:outline-none focus:border-blue-500 text-sm"
            />
            <Search className="absolute left-2 top-1.5 h-4 w-4 text-gray-500" />
          </div>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full" 
            onClick={toggleDarkMode}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
            >
              <Bell className="h-5 w-5" />
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:flex border border-reddit-blue text-reddit-blue hover:bg-blue-50 dark:hover:bg-gray-700"
          >
            Log In
          </Button>
          
          <Button
            size="sm"
            className="hidden sm:flex bg-reddit-blue hover:bg-blue-700 text-white"
          >
            Sign Up
          </Button>
          
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full" 
            >
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
