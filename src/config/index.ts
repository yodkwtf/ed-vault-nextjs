import { ArrowDownToLine, CheckCircle, Leaf } from 'lucide-react';

export const perks = [
  {
    name: 'Instant Delivery',
    Icon: ArrowDownToLine,
    description:
      'Get your assets delivered to your inbox in seconds and download them instantly.',
  },
  {
    name: 'Guaranteed Quality',
    Icon: CheckCircle,
    description:
      'Every asset on our platform is verified by our team to ensure our highest quality standards.',
  },
  {
    name: 'For the Planet',
    Icon: Leaf,
    description:
      'We plant a tree for every 100 assets sold on our platform. Help us make the world a better place.',
  },
];

export const PRODUCT_CATEGORIES = [
  // TODO: Update categories
  {
    label: 'UI Kits',
    value: 'ui_kits' as const,
    featured: [
      {
        name: 'Editor Picks',
        href: '#',
        imageSrc: '/nav/ui-kits/mixed.jpg',
      },
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: '/nav/ui-kits/blue.jpg',
      },
      {
        name: 'Bestsellers',
        href: '#',
        imageSrc: '/nav/ui-kits/purple.jpg',
      },
    ],
  },

  {
    label: 'Icons',
    value: 'icons' as const,
    featured: [
      {
        name: 'Favorite Icon Picks',
        href: '#',
        imageSrc: '/nav/icons/picks.jpg',
      },
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: '/nav/icons/new.jpg',
      },
      {
        name: 'Bestselling Icons',
        href: '#',
        imageSrc: '/nav/icons/bestsellers.jpg',
      },
    ],
  },
];
