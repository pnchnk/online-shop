import React, { useState, useEffect } from "react";

//nav
import { useNavigate } from "react-router-dom";

//components
import Header from "../components/header/Header";
import Card from "../components/shoppingCartCard/Card";
import Footer from "../components/footer/Footer";
import Modal from "../components/modalSuccessfull/Modal";
import Spinner from "../components/spinner/Index";

//store & slices
import { cleanCart } from "../store/slice/basketSlice";
import { useAppSelector, useAppDispatch } from "../store/hooks";

//auth
import { useAuth } from "../store/hooks";


function Cart() {
  //basket state
  const basket = useAppSelector((state) => state.basket.basketItems);

  //firebase auth
  const { isAuth } = useAuth();

  const [modalWindow, setModalWindow] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  //nav
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/`);
  };

  const dispatch = useAppDispatch();

  //close modal and remove basket items
  const handleClose = () => {
    setModalWindow(false);
    dispatch(cleanCart());
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      return setIsLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [basket]);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      <Header title={"Shopping cart"} />
      <section className="section-js hidden py-5 bg-light position-relative">
        <div
          className="container px-4 px-lg-5 mt-1"
          style={{ minHeight: "46vh" }}
        >
          {!basket.length && (
            <div className="empty-cart">
              Your cart is empty. Go to{" "}
              <span
                onClick={handleNavigate}
                style={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Main Page{" "}
              </span>
              to continue shopping.
            </div>
          )}
          <div className="basket-smth">
            {basket?.map((product) => {
              return (
                <Card
                  key={`shopping-cart${product?.id}`}
                  images={product?.images}
                  title={product?.title}
                  price={product?.price}
                  discountPercentage={product?.discountPercentage}
                  quantity={product?.quantity}
                  id={product?.id}
                  product={product}
                />
              );
            })}
          </div>
          <div className="cart-actions">
            {!basket.length ? null : (
              <>
                <span className="cart__total-price">
                  Total Price:{"  "}
                  {basket.reduce(
                    (acc, item) =>
                      Math.floor(
                        (acc +=
                          (item?.price -
                            (item?.price * item?.discountPercentage) / 100) *
                          item?.quantity)
                      ),
                    1
                  )}
                  $
                </span>
                {isAuth ? (
                  <button
                    className="btn btn-outline-dark text-center"
                    type="button"
                    onClick={() => setModalWindow(true)}
                  >
                    Place order.
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark text-center"
                    type="button"
                    onClick={() => navigate('/login')}
                  >
                    Please sign in to complete the order.
                  </button>
                )}
              </>
            )}
          </div>
          {!modalWindow ? null : <Modal closeModal={handleClose} />}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Cart;
