import { Container } from "@/components/shared/container";
import { Filters } from "@/components/shared/filters";
import { ProductsGroupList } from "@/components/shared/products-group-list";
import { Stories } from "@/components/shared/stories";
import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/top-bar";
import { findPizzasOnSorting, GetSearchParams } from "@/lib/find-pizzas-on-sorting";
import { prisma } from "@/prisma/prisma-client";

export default async function Home({ searchParams }: { searchParams: GetSearchParams }) {
  const categories = await findPizzasOnSorting(searchParams);
  const categoryNames = categories.filter((category) => category.products.length > 0).map(category => ({ id: category.id, name: category.name }));

  return (
    <>
      <Container className="mt-10">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar categoryNames={categoryNames} />
      <Stories />
      <Container className="flex gap-20 mt-10">
        <div className="w-[540px] flex-0">
          <Filters />
        </div>
        <div>
          {
            categories.map(category => category.products.length > 0 && (
              <ProductsGroupList categoryNames={{ id: category.id, name: category.name }} products={category.products} scrollId={category.name} categoryId={category.id} />
            ))
          }
        </div>
      </Container>
    </>
  );
}