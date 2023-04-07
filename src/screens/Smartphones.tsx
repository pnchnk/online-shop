import React from "react";
import { useEffect, useState, useMemo } from "react";

//nav
import { useLocation } from "react-router-dom";

//components
import Header from "../components/header/Header";
import Card from "../components/card/Card";
import Footer from "../components/footer/Footer";
import Spinner from "../components/spinner/Index";

//store
import { useGetAllProductsQuery } from "../store/api/products";
import { useAppSelector } from "../store/hooks";

//types
import { Product } from "../types";

function Smartphones() {
  //sort state
  const [sort, setSort] = useState<string>("relevance");

  //loader
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let { state } = useLocation();

  //@ts-ignore
  const products: [Product['products']] = useAppSelector((state) => state.products.products.products);

  const { data } = useGetAllProductsQuery();

  const mainProducts = Array.from(products).filter(
    (el) => el.category === state.name
  );

  const onSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  //loader
  useEffect(() => {
    const timer = setTimeout(() => {
      if (data) {
        return setIsLoading(false);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  //sorting by relevance & price
  const sorted = useMemo(() => {
    if (sort === "relevance") {
      return mainProducts.sort((a, b) => b.rating - a.rating);
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
      <Header title={state.name} />
      <div className="container px-4 px-lg-5 mt-5">
        <div className="products__sort">
          Sort by :{" "}
          <select value={sort} onChange={onSelect}>
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
                id={item?.id}
                key={`smartphone${item?.id}`}
                thumbnail={item?.thumbnail}
                price={item?.price}
                title={item?.title}
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

export default Smartphones;
