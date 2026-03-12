import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Navbar() {
  const scrolled = useScrollTop();
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      setIsLoggedIn(false);
      navigate('/');
    } else {
      navigate('/signup');
    }
  };

  return (
    <div className={cn(
      "fixed w-full border-b border-gray-800 bg-[#0F1115]",
      scrolled && "border-b shadow-sm"
    )}>
      <div className="grid grid-cols-3">
        <img src="../src/assets/logo.png" alt="Logo" className="h-20 w-20 flex ml-12" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-[#0F1115] border-gray-800 text-white">
                <div>
                  <ul className="grid w-50 gap-0.5 md:w-125 md:grid-row-4 lg:w-100 h-40">
                    <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                      <div>
                        <a>Foundations Track</a>
                      </div>
                    </div>
                    <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                      <div>
                        <a>Software Engineering Track</a>
                      </div>
                    </div>
                    <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                      <div>
                        <a>Data & Analytics Track</a>
                      </div>
                    </div>
                    <div className="flex items-center hover:bg-gray-400/10 p-1 rounded-sm">
                      <div>
                        <p className="text-gray-400 text-sm font-light">
                          For other courses&nbsp;
                          <Link
                            to="/courses"
                            className="underline text-gray-400 text-sm font-light"
                          >
                            visit course page
                          </Link>
                        </p>
                      </div>
                    </div>
                  </ul>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Schools & Institutions</NavigationMenuTrigger>
              <NavigationMenuContent>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Students</NavigationMenuTrigger>
              <NavigationMenuContent>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="hover:bg-[#1A1D23] hover:text-white w-20">
                <Link
                  to="/about-us"
                >
                  About Us
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className="hover:bg-[#1A1D23] hover:text-white">
                <Link
                  to="/gallery"
                >
                  Gallery
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button
          variant="ghost"
          size="lg"
          onClick={handleAuth}
          className="bg-[#3B82F6] text-white font-medium hover:bg-[#2563EB] hover:text-white self-center justify-self-end mr-12 px-6">
          {isLoggedIn ? 'Logout' : 'Login'}
        </Button>
      </div>
    </div>
  )
}
