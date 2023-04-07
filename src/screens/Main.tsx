import React, { useEffect, useState } from "react";

//components
import Header from "../components/header/Header";
import Card from "../components/card/Card";
import Footer from "../components/footer/Footer";
import Spinner from "../components/spinner/Index";

//store
import { useGetAllProductsQuery } from "../store/api/products";
import { Product } from "../types";

function Main() {
  const { data } = useGetAllProductsQuery();

  //@ts-ignore
  const products = data?.products;

  const [isLoading, setIsLoading] = useState<boolean>(true);

  //loader
  useEffect(() => {
    const timer = setTimeout(() => {
      return setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Header title={"Nikita Shop"} />
      <div className="container px-4 px-lg-5 mt-5">
        <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
          {
            //@ts-ignore
            products?.map((item: Product["products"]) => {
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
            })
          }
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Main;
