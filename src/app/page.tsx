import MaxWidthWrapper from '@/components/MaxWidthWrapper';

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
        <h1>
          Your vault for high quality{' '}
          <span className="text-blue-600">educational assets.</span>{' '}
        </h1>
      </div>
    </MaxWidthWrapper>
  );
}
