'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useEffect, useRef, useState } from 'react';
import NavItem from './NavItem';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const isAnyOpen = activeIndex !== null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveIndex(null);
    };

    document.addEventListener('keydown', handler);

    return () => {
      document.removeEventListener('keydown', handler);
    };
  }, []);

  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setActiveIndex(null));

  return (
    <div className="flex gap-4 h-full" ref={navRef}>
      {PRODUCT_CATEGORIES.map((category, index) => {
        const isOpen = index === activeIndex;

        const toggleOpen = () => {
          setActiveIndex(isOpen ? null : index);
        };

        return (
          <NavItem
            key={category.value}
            category={category}
            toggleOpen={toggleOpen}
            isOpen={isOpen}
            isAnyOpen={isAnyOpen}
          />
        );
      })}
    </div>
  );
};
export default NavItems;
