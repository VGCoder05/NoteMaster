import NavLinkUI from "./NavLinkUI";

const Sidebar = ({ navLinks, currentPath, onCloseMenu, isMenuOpen }) => {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onCloseMenu}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-40
          ${isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-surface shadow-xl z-50
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6">
          <h2 className="text-lg font-bold mb-6 text-primary">Menu</h2>
          <NavLinkUI
            navLinks={navLinks}
            currentPath={currentPath}
            onCloseMenu={onCloseMenu}
          />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
