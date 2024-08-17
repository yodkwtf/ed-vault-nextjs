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
  {
    label: 'Learning Resources',
    value: 'learning_resources' as const,
    featured: [
      {
        name: 'Editor Picks',
        href: '#',
        imageSrc: '/nav/editor-picks.webp',
      },
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: '/nav/new-arrivals.webp',
      },
      {
        name: 'Bestsellers',
        href: '#',
        imageSrc: '/nav/bestsellers.jpeg',
      },
    ],
  },

  {
    label: 'Educational Tools',
    value: 'educational_tools' as const,
    featured: [
      {
        name: 'Editor Picks',
        href: '#',
        imageSrc: '/nav/editor-picks.webp',
      },
      {
        name: 'New Arrivals',
        href: '#',
        imageSrc: '/nav/new-arrivals.webp',
      },
      {
        name: 'Bestsellers',
        href: '#',
        imageSrc: '/nav/bestsellers.jpeg',
      },
    ],
  },
];
