import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '' },
    { name: 'Notes', href: 'notes' },
    { name: 'Tasks', href: '#' },
    { name: 'Calendar', href: '#' },
  ];

  return (
    <nav className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-sm px-4 md:px-6 lg:px-10">
      <div className="flex items-center gap-6">
        <Link className="flex items-center gap-3" to="/">
          <span className="material-symbols-outlined text-primary text-3xl">
            task_alt
          </span>
          <h1 className="text-primary text-xl font-bold">NoteMaster</h1>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link, index) => (
            <NavLink
              className="text-sm font-medium text-subtle-light dark:text-subtle-dark hover:text-primary transition-colors"
              key={index}
              to={`/${link.href == "" ? "" : link.href}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block text-subtle-light dark:text-subtle-dark">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtle-light dark:text-subtle-dark">
            search
          </span>
          <input
            className="h-10 w-full rounded-lg border border-border-light dark:border-border-dark bg-surface-light/50 dark:bg-surface-dark/50 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Search..."
            type="search"
          />
        </div>
        <button className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <div
          className="h-10 w-10 rounded-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuC8VLSYzimlLuNIzb5r3R64kpfP0cYK1YrHPXgnoOuXkAzIiKnfKMO6-q3SN7nQGUe-VKtz4zlThXyFHyPsKip4kVwU11jNMyllKg9fdsePJ3togqP7Vfo7yAjuzyXMLtPy-nWnEkECVwVzZQHQCL9YBeHncx-ZB2feGNdgVhbs0o4ZRLDsz7Bd-lhfSmfY36uNuX0Jvu2BtqPZ51YneoAz6-K3_XFL3YbM5qAx1jlYwFYirbyBYRsvzcQ8n1YtYFK20uCjbaWDLZFT')`,
          }}
        />
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex h-10 w-10 items-center justify-center rounded-full hover:bg-primary/20 transition-colors"
        >
          <span className="material-symbols-outlined">menu</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;