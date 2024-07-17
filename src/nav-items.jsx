import { Home, Mic } from "lucide-react";
import Index from "./pages/Index.jsx";
import Recordings from "./pages/Recordings.jsx";

/**
 * Central place for defining the navigation items. Used for navigation components and routing.
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Recordings",
    to: "/recordings",
    icon: <Mic className="h-4 w-4" />,
    page: <Recordings />,
  },
];