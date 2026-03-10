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



export default function Navbar() {
  const scrolled = useScrollTop();
  const navigate = useNavigate();
  const isAuthed = Boolean(localStorage.getItem("token"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <div
      className={cn(
        "fixed w-full border-b border-gray-800 bg-[#0F1115] px-4 md:px-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">
        <Link to="/app" className="flex items-center ml-4 md:ml-12">
          <img
            src="../src/assets/logo.png"
            alt="Logo"
            className="h-12 w-12 md:h-16 md:w-16"
          />
        </Link>
        <div className="hidden md:block justify-self-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <Link
                      to="/app/courses"
                      className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      All Courses
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Schools & Institutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <Link
                      to="/app#schools"
                      className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      Our Programs
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Students</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <Link
                      to="/app#students"
                      className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      Success Stories
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>About Us</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <Link
                      to="/app#about"
                      className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      Our Team
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Gallery</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="p-4 w-48">
                    <Link
                      to="/app#gallery"
                      className="block p-2 text-sm text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                    >
                      Campus Life
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {isAuthed ? (
          <Button
            variant="ghost"
            size="lg"
            className="bg-[#3B82F6] text-white font-medium hover:bg-[#2563EB] hover:text-white self-center justify-self-end mr-4 md:mr-12"
            onClick={handleLogout}
          >
            Logout
          </Button>
        ) : (
          <Button
            asChild
            variant="ghost"
            size="lg"
            className="bg-[#3B82F6] text-white font-medium hover:bg-[#2563EB] hover:text-white self-center justify-self-end mr-4 md:mr-12"
          >
            <Link to="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  )
}
