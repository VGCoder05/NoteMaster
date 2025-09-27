import { useState, useEffect } from "react";
import NavbarUI from "./NavbarUI";

function NavbarLogic({ onSearchClick }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

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
    { name: "Dashboard", href: "/" },
    { name: "Notes", href: "notes" },
    { name: "Tasks", href: "taskDisplay" },
    { name: "Tasks Tessting", href: "tasksPage" },
    // { name: 'Calendar', href: '#' },
  ];

  return (
    <NavbarUI
      isDarkMode={isDarkMode}
      isMenuOpen={isMenuOpen}
      currentPath={currentPath}
      navLinks={navLinks}
      onToggleDarkMode={toggleDarkMode}
      onToggleMenu={toggleMenu}
      onCloseMenu={closeMenu}
      onSearchClick={onSearchClick}
    />
  );
}

export default NavbarLogic;
