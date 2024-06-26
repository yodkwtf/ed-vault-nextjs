import { PRODUCT_CATEGORIES } from '@/config';
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { Product } from '@/payload-types';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

const CartItem = ({ product }: { product: Product }) => {
  const { image } = product.images[0];

  const { removeItem } = useCart();

  // find label for product category
  const category = PRODUCT_CATEGORIES.find(
    (category) => category.value === product?.category
  )?.label;

  return (
    <div className="space-y-3 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="relative aspect-square h-16 w-16 min-w-fit rounded overflow-hidden">
            {typeof image !== 'string' && image.url ? (
              <Image
                src={image.url}
                alt={product.name}
                fill
                className="absolute object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-secondary">
                <ImageIcon
                  aria-hidden="true"
                  className="text-muted-foreground w-10 h-10"
                />
              </div>
            )}
          </div>

          <div className="flex flex-col self-start">
            <span className="line-clamp-1 text-sm font-medium mb-1">
              {product.name}
            </span>

            <span className="text-xs capitalize text-muted-foreground line-clamp-1">
              {category}
            </span>

            <div className="mt-2 text-xs text-muted-foreground">
              <button
                onClick={() => removeItem(product.id)}
                className="flex items-center gap-0.5 text-red-500"
              >
                <X className="w-3 h-4" /> Remove
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-1 font-medium">
          <span className="ml-auto line-clamp-1 text-sm">
            {formatPrice(product.price)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
