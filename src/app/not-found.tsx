import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import { perks } from '@/config';
import ProductReel from '@/components/ProductReel';

const Home = () => {
  return (
    <>
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="flex flex-col gap-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            {/* TODO: change base color from green */}
            <span className="text-green-600">404</span>
            <span>Page Not Found</span>
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            The page you are looking for does not exist.
          </p>

          <div className="flex sm:flex-row gap-4 mt-6">
            <Link href="/" className={buttonVariants()}>
              Go Home
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Home;
