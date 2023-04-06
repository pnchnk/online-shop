import React, { useEffect, useMemo, useState } from "react";

//components
import Header from "../components/header/Header";
import Card from "../components/card/Card";
import Footer from "../components/footer/Footer";
import Spinner from "../components/spinner/Index";

//store
import { useAppSelector } from "../store/hooks";
import { useGetAllProductsQuery } from "../store/api/products";

//types
import { Product } from "../types";

function Main() {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //@ts-ignore
  const products: [Product['products']] = useAppSelector((state) => state.products.products.products);

  const { data } = useGetAllProductsQuery();

  const mainProducts = products;

  const [sort, setSort] = useState("relevance");

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data) {
        return setIsLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const sorted = useMemo(() => {
    if (sort === "relevance") {
      return mainProducts?.sort((a, b) => b.rating - a.rating);
    } else if (sort === "low-high") {
      return mainProducts.sort(
        (a, b) =>
          Math.round(a.price - (a.price * a.discountPercentage) / 100) -
          Math.round(b.price - (b.price * b.discountPercentage) / 100)
      );
    } else if (sort === "high-low") {
      return mainProducts.sort(
        (a, b) =>
          Math.round(b.price - (b.price * b.discountPercentage) / 100) -
          Math.round(a.price - (a.price * a.discountPercentage) / 100)
      );
    }
  }, [sort]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Header title={"Nikita Shop"} />
      <div className="container px-4 px-lg-5 mt-5">
        <div className="products__sort mb-3">
          Sort by :{" "}
          <select
            value={sort}
            onChange={onSelect}
            aria-label="Default select example"
          >
            <option selected value={"relevance"}>
              Relevance
            </option>
            <option value={"low-high"}>Price: low to high</option>
            <option value={"high-low"}>Price: high to low</option>
          </select>
        </div>
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {sorted?.map((item) => {
            return (
              <Card
                id={item.id}
                key={item.id}
                thumbnail={item.thumbnail}
                price={item.price}
                title={item.title}
                product={item}
              />
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
