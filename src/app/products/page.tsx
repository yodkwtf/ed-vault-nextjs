import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import ProductReel from '@/components/ProductReel';
import { PRODUCT_CATEGORIES } from '@/config';

type Param = string | string[] | undefined;

interface ProductsPageProps {
  searchParams: {
    [key: string]: Param;
  };
}

const parse = (param: Param) => {
  return typeof param === 'string' ? param : undefined;
};

const ProductsPage = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const categoryLabel = PRODUCT_CATEGORIES.find(
    (c) => c.value === category
  )?.label;

  return (
    <MaxWidthWrapper>
      <ProductReel
        title={categoryLabel ?? 'Browse high-quality products'}
        query={{
          category,
          limit: 40,
          sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
        }}
      />
    </MaxWidthWrapper>
  );
};
export default ProductsPage;
