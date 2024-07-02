import { usePathname } from 'next/navigation';

import { useMyContext } from '@/context';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  exact?: boolean;
  className?: string;
}

export const NavLink = ({ href, exact, onClick, children, ...props }: NavLinkProps) => {
  const pathname = usePathname();
  const active = 'cursor-not-allowed';
  const { setMenuIsOpen } = useMyContext();

  const isActive = exact ? pathname === href : pathname.startsWith(href);

  if (isActive) {
    props.className += active;
  }

  const handleClick = (e: React.SyntheticEvent) => {
    e.preventDefault(); // Prevent the default navigation
    setMenuIsOpen(false);
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      role="link"
      // href={href}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          // Check for Enter or Space key
          e.preventDefault(); // Prevent the default action
          handleClick(e); // Trigger the click handler
        }
      }}
      className={active ? 'disabled' : ''}
      tabIndex={active ? -1 : undefined}
      aria-disabled={!!active}
      onClick={handleClick}
      {...props}
    >
      {children}
    </div>
  );
};
