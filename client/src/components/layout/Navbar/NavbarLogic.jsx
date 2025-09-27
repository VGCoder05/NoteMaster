import { useState, useEffect } from "react";
import NavbarUI from "./NavbarUI";
import { useLocation } from "react-router-dom";

function NavbarLogic() {
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState(location.pathname);



  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme");

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }

    // Set current path for navigation highlighting
    setCurrentPath(window.location.pathname);
  }, []);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, [location])

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { name: "Dashboard", href: "" },
    { name: "Notes", href: "notes" },
    { name: "Tasks", href: "tasksPage" },
    // { name: "Tasks Tessting", href: "tasksPage" },
    // { name: 'Calendar', href: '#' },
  ];

  return (
    <NavbarUI
      // For Dark mode
      isDarkMode={isDarkMode}
      onToggleDarkMode={toggleDarkMode}
      // For sidebar
      isMenuOpen={isMenuOpen}
      onToggleMenu={toggleMenu}
      // For navlinks & there styling
      currentPath={currentPath}
      navLinks={navLinks}
      onCloseMenu={closeMenu}
    />
  );
}

export default NavbarLogic;
