import { Link, NavLink } from "react-router-dom";
import SearchBar from "../../common/SearchBar/SearchBar";
import Sidebar from "./Sidebar";
import NavLinkUI from "./NavLinkUI";

function NavbarUI({
  // For Dark mode
  isDarkMode,
  onToggleDarkMode,
  // For sidebar
  isMenuOpen,
  onToggleMenu,
  // For navlinks & there styling
  currentPath,
  navLinks,
  onCloseMenu,
}) {

  const fallbackLinks = [
  { name: "Test1", href: "/test1" },
  { name: "Test2", href: "/test2" }
];




  return (
    <>
      <header className="px-4 md:px-6 lg:px-10 h-16 sticky top-0 z-10 flex items-center gap-10 border-b border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm px-4 md:px-6 lg:px-10">
          {/* Logo & Nav Links */}
          <div className="flex items-center gap-6">
            <Link className="flex items-center gap-3" to="/">
              <span className="material-symbols-outlined text-primary text-3xl">
                task_alt
              </span>
              <h1 className="text-primary text-xl font-bold">NoteMaster</h1>
            </Link>
            <NavLinkUI navLinks={navLinks} currentPath={currentPath} />
          </div>


          {/* Actions + SearchBar */}
          <div className="w-full flex items-center justify-between gap-3">
          <SearchBar />

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="flex h-9 w-9 items-center justify-center dark:text-subtle-dark hover:text-primary/80 dark:hover:text-primary/80 transition-colors cursor-pointer"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-base">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>
            {/* Notifiaction Btn */}
            <button className="flex h-10 w-10 items-center justify-center  dark:text-subtle-dark hover:text-primary/80 dark:hover:text-primary/80 transition-colors cursor-pointer">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            {/* User Profile */}
            <div
              className="h-10 w-10 rounded-full bg-cover bg-center cursor-pointer"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8VLSYzimlLuNIzb5r3R64kpfP0cYK1YrHPXgnoOuXkAzIiKnfKMO6-q3SN7nQGUe-VKtz4zlThXyFHyPsKip4kVwU11jNMyllKg9fdsePJ3togqP7Vfo7yAjuzyXMLtPy-nWnEkECVwVzZQHQCL9YBeHncx-ZB2feGNdgVhbs0o4ZRLDsz7Bd-lhfSmfY36uNuX0Jvu2BtqPZ51YneoAz6-K3_XFL3YbM5qAx1jlYwFYirbyBYRsvzcQ8n1YtYFK20uCjbaWDLZFT')`,
              }}
            />

            {/* Menu Button */}
            <button
              onClick={onToggleMenu}
              className="p-2 flex h-9 w-9 items-center justify-center text-primary z-50 fixed right-4 bg-surface dark:bg-surface-dark rounded-md shadow-md md:hidden"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
      </header>
      {/* For Mobile Navigation */}
      {isMenuOpen && (
        <div className="border-t border-border-light dark:border-border-dark py-4 md:hidden">
          <Sidebar
            navLinks={navLinks}
            currentPath={currentPath}
            onCloseMenu={onCloseMenu}
            onToggleMenu={onToggleMenu}
            isMenuOpen={isMenuOpen}
          />
        </div>
      )}
    </>

  );
}

export default NavbarUI;