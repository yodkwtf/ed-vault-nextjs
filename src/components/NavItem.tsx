'use client';

import { PRODUCT_CATEGORIES } from '@/config';
import { Button } from './ui/button';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  toggleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}

const NavItem = ({ isAnyOpen, category, toggleOpen, isOpen }: NavItemProps) => {
  return (
    <div className="flex">
      <div className="relative flex items-center">
        <Button
          className="gap-1.5"
          onClick={toggleOpen}
          variant={isOpen ? 'secondary' : 'ghost'}
        >
          {category.label}
          <ChevronDownIcon
            className={cn('h-4 w-4 transition text-muted-foreground', {
              '-rotate-180': isOpen,
            })}
          />
        </Button>
      </div>
    </div>
  );
};
export default NavItem;
