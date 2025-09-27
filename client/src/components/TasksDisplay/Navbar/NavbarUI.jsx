import { Link, NavLink } from "react-router-dom";

function NavbarUI({
  isDarkMode,
  isMenuOpen,
  currentPath,
  navLinks,
  onToggleDarkMode,
  onToggleMenu,
  onCloseMenu,
  onSearchClick,
}) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm px-4 md:px-6 lg:px-10">
      
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-10">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Logo */}
            <Link className="flex items-center gap-3" to="/">
              <span className="material-symbols-outlined text-primary text-3xl">
                task_alt
              </span>
              <h1 className="text-primary text-xl font-bold">NoteMaster</h1>
            </Link>
            {/* Nav Links */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link, index) => (
                <NavLink
                  className="flex items-center gap-2 text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors"
                  key={index}
                  to={`/${link.href == "/" ? "" : link.href}`}
                >
                  <span className="material-symbols-outlined text-base">
                    {link.icon}
                  </span>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Button */}
            {onSearchClick && (
              <button
                onClick={onSearchClick}
                className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-primary/10 transition-colors md:hidden"
                aria-label="Search"
              >
                <span className="material-symbols-outlined text-base">
                  search
                </span>
              </button>
            )}

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-primary/10 transition-colors"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-base">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={onToggleMenu}
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-primary/10 transition-colors md:hidden"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-base">
                {isMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="border-t border-border-light dark:border-border-dark py-4 md:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link, index) => (
                <NavLink
                  className="flex items-center gap-2 text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors"
                  key={index}
                  to={`/${link.href == "/" ? "" : link.href}`}
                >
                  <span className="material-symbols-outlined text-base">
                    {link.icon}
                  </span>
                  {link.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavbarUI;