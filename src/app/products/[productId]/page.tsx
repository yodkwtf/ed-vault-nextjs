import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { PRODUCT_CATEGORIES } from '@/config';
import { getPayloadClient } from '@/get-payload';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface PageProps {
  params: {
    productId: string;
  };
}

const BREADCRUMBS = [
  {
    id: 1,
    name: 'Home',
    href: '/',
  },
  {
    id: 2,
    name: 'Products',
    href: '/products',
  },
];

const Page = async ({ params }: PageProps) => {
  const payload = await getPayloadClient();

  // Fetch the product
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      id: {
        equals: params.productId,
      },
      approvedForSale: {
        equals: 'approved',
      },
    },
  });

  const [product] = products;

  if (!product) {
    return notFound();
  }

  // find label for product category
  const category = PRODUCT_CATEGORIES.find(
    (category) => category.value === product.category
  )?.label;

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product Details */}
        <div className="lg:max-w-lg lg:self-end">
          <ol className="flex items-center space-x-2">
            {BREADCRUMBS.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center text-sm">
                  <Link
                    href={breadcrumb.href}
                    className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                  >
                    {breadcrumb.name}
                  </Link>
                  {breadcrumb.id !== BREADCRUMBS.length && (
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                    >
                      <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                    </svg>
                  )}
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>
          </div>

          <section className="mt-4">
            <div className="flex items-center">
              <p className="font-medium text-gray-900">
                {formatPrice(product.price)}
              </p>

              <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                {category}
              </div>
            </div>
          </section>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
