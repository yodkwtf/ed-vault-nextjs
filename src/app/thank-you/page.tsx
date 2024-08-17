import PaymentStatus from '@/components/PaymentStatus';
import { PRODUCT_CATEGORIES } from '@/config';
import { TRANSACTION_FEE } from '@/config/constants';
import { getPayloadClient } from '@/get-payload';
import { getServerSideUser } from '@/lib/payload-utils';
import { formatPrice } from '@/lib/utils';
import { Product, ProductFile, User } from '@/payload-types';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';

interface PageProps {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

const ThankYouPage = async ({ searchParams }: PageProps) => {
  const { orderId } = searchParams;
  const nextCookies = cookies();

  const { user } = await getServerSideUser(nextCookies);
  const payload = await getPayloadClient();

  const { docs: orders } = await payload.find({
    collection: 'orders',
    depth: 2,
    where: {
      id: {
        equals: orderId,
      },
    },
  });
  const [order] = orders;

  if (!order) {
    return notFound();
  }

  // find order's user
  const orderUserId =
    typeof order.user === 'string' ? order.user : order.user.id;

  if (orderUserId !== user?.id) {
    return redirect(`/sign-in?origin=thank-you?orderId=${order.id}`);
  }

  const products = order.products as Product[];
  const orderTotal = products.reduce(
    (total, product) => total + product.price,
    0
  );

  return (
    <main className="relative lg:min-h-full">
      <div className="hidden lg:block h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          src="/checkout-thank-you.png"
          alt="thank you image"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24">
          <div className="lg:col-start-2">
            <p className="text-sm font-medium text-green-600">
              Order successful
            </p>
            <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Thank you for ordering
            </h1>

            {order._isPaid ? (
              <p className="mt-2 text-base text-muted-foreground">
                Your order has been processed. Please download your assets from
                the link below. We&apos;ve sent your receipt and order details
                to{' '}
                {typeof order.user !== 'string' && (
                  <span className="font-medium text-gray-900">
                    {order.user.email}
                  </span>
                )}
                .
              </p>
            ) : (
              <p className="mt-2 text-base text-muted-foreground">
                We appreciate your order. Your order is being processed.
                We&apos;ll send you confirmation very soon!
              </p>
            )}

            <div className="mt-16 text-sm font-medium">
              <div className="text-muted-foreground">Order no.</div>
              <div className="mt-2 text-gray-900">{order.id}</div>

              <ul className="mt-6 divide-y divide-gray-200 border-t border-gray-200 text-sm font-medium text-muted-foreground">
                {(order.products as Product[]).map((product) => {
                  const category = PRODUCT_CATEGORIES.find(
                    (category) => category.value === product.category
                  )?.label;

                  const downloadUrl = (product.product_files as ProductFile)
                    .url as string;

                  const { image } = product.images[0];

                  return (
                    <li key={product.id} className="flex space-x-6 py-6">
                      <div className="relative h-24 w-24">
                        {typeof image !== 'string' && image.url && (
                          <Image
                            src={image.url}
                            alt="product image"
                            fill
                            className="flex-none bg-gray-100 rounded-md object-cover object-center"
                          />
                        )}
                      </div>

                      <div className="flex-auto flex flex-col justify-between">
                        <div className="space-y-1">
                          <h3 className="text-gray-900">{product.name}</h3>
                          <p className="my-1">Category: {category}</p>
                        </div>

                        {order._isPaid && (
                          <a
                            href={downloadUrl}
                            download={product.name}
                            target="_blank"
                            rel="noreferrer"
                            className="text-green-600 hover:underline underline-offset-2"
                          >
                            Download
                          </a>
                        )}
                      </div>

                      <p className="flex-none font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <div className="space-y-6 border-t border-gray-200 pt-6 text-sm font-medium text-muted-foreground">
                <div className="flex justify-between">
                  <p>Subtotal</p>
                  <p className="text-gray-900">{formatPrice(orderTotal)}</p>
                </div>

                <div className="flex justify-between">
                  <p>Transaction Fee</p>
                  <p className="text-gray-900">
                    {formatPrice(TRANSACTION_FEE)}
                  </p>
                </div>

                <div className="flex justify-between items-center border-t border-gray-200 pt-6 text-gray-900">
                  <p className="text-base">Total</p>
                  <p className="text-base">
                    {formatPrice(TRANSACTION_FEE + orderTotal)}
                  </p>
                </div>
              </div>

              <PaymentStatus
                isPaid={order._isPaid}
                orderEmail={(order.user as User).email}
                orderId={order.id}
              />

              <div className="mt-16 border-t border-gray-200 py-6 text-right">
                <Link
                  href="/products"
                  className="text-sm font-medium text-green-600 hover:text-green-500"
                >
                  Continue shopping &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYouPage;
