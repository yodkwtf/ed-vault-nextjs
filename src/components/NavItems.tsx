'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { useState } from 'react';
import NavItem from './NavItem';

const NavItems = () => {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  return (
    <div className="flex gap-4 h-full">
      {PRODUCT_CATEGORIES.map((category, index) => {
        const isOpen = index === activeIndex;
        const isAnyOpen = activeIndex !== null;

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
