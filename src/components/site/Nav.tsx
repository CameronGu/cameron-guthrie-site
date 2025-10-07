import { useEffect, useRef, useState } from 'react';

type NavLink = {
  href: string;
  label: string;
};

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  { href: '/projects', label: 'Projects & Tools' },
  { href: '/contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const handleClick = (event: MouseEvent) => {
      if (
        open &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('keydown', handleKeydown);
      document.removeEventListener('click', handleClick);
    };
  }, [open]);

  return (
    <nav
      ref={containerRef}
      aria-label="Primary navigation"
      className="relative flex items-center gap-3"
    >
      <button
        type="button"
        className="rounded-full border border-secondary/60 bg-secondary/20 px-3 py-1 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/30 hover:text-secondary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        Menu
      </button>
      <ul
        className="-mx-3 hidden items-center gap-1 rounded-full border border-secondary/60 bg-secondary/20 px-3 py-1 text-sm text-secondary-foreground shadow-sm supports-[backdrop-filter]:bg-secondary/30 md:flex"
      >
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="block rounded-full px-3 py-1 font-medium text-secondary-foreground transition hover:bg-primary/15 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
      {open ? (
        <ul className="absolute right-0 top-full z-40 mt-3 w-48 rounded-lg border border-secondary/60 bg-secondary/95 p-2 text-secondary-foreground shadow-lg md:hidden">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-primary/15 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </nav>
  );
}
