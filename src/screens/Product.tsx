import React, { useEffect, useState } from "react";

//route
import { useParams } from "react-router-dom";

//components
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Header from "../components/header/Header";
import ProductCard from "../components/productCard/ProductCard";
import Footer from "../components/footer/Footer";
import Card from "../components/card/Card";
import Spinner from "../components/spinner/Index";

//store
import { useGetProductQuery } from "../store/api/products";
import { useAppSelector } from "../store/hooks";

import { Product } from "../types";

function ProductPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const products: [Product["products"]] = useAppSelector(
    //@ts-ignore
    (state) => state.products.products.products
  );

  const { data } = useGetProductQuery(params?.id);

  useEffect(() => {
    const timer = setTimeout(() => {
      return setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const [relevant, setRelevant] = useState<any>();

  const relatedProducts = (product: any) => {
    let temp = products?.filter(
      (el) => el.category === product?.category && el?.id !== product?.id
    );
    if (temp.length > 3) {
      temp.pop();
      setRelevant(temp);
    }
  };

  useEffect(() => {
    relatedProducts(data);
  }, [data]);

  return (
    <>
      {isLoading ? <Spinner /> : null}
      <Header title={data?.title} />
      <Container>
        <Row className="mt-5 product-card ">
          <ProductCard
            thumbnail={data?.thumbnail}
            price={data?.price}
            title={data?.title}
            description={data?.description}
            id={data?.id}
            rating={data?.rating}
            product={data}
            key={`product${data?.id}`}
          />
        </Row>
        <Row className="mt-5 justify-content-center">
          <h3 className="text-center">You may also like</h3>
          {relevant?.map((item: any) => {
            return (
              <Card
                id={item?.id}
                key={`relevant${item?.id}`}
                thumbnail={item?.thumbnail}
                price={item?.price}
                title={item?.title}
                product={item}
              />
            );
          })}
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default ProductPage;
