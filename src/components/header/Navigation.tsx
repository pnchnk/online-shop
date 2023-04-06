import { useState } from "react";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector } from "../../store/hooks";
import { BasketItem, Product } from "../../types";


function Navigation() {
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  
  const basket: BasketItem[] = useAppSelector((state) => state.basket?.basketItems);

  const totalQuantity: number = basket?.reduce(
    (acc, item) => (acc += item.quantity),
    0
  );

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/cart`);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {!modalWindow ? null : (
        <>
          <div
            className="modal-window"
            onClick={() => setModalWindow(false)}
          ></div>
          <div className="modal-cart">
            <h3 className="text-center mt-2 mb-3">Your products:</h3>
            {!basket.length && (
              <div className="empty-cart">Cart is empty.</div>
            )}
            {basket.map((item) => {
              return <Modal item={(item)} quantity={item.quantity} key={`modal-product${item.id}`}/>;
            })}
            {!basket.length ? null : (
              <button
                id="crt-btn"
                className="btn btn-outline-dark text-center"
                type="button"
                onClick={handleNavigate}
                disabled={!basket.length}
                style={{marginLeft: "20px", marginBottom:"10px"}}
              >
                Go to cart <FontAwesomeIcon icon={faCartShopping} />
              </button>
            )}
            <div className="dropdown-button position-relative"></div>
          </div>
        </>
      )}
      <div className="container px-4 px-lg-5">
        <Link className="navbar-brand" to={"/"}>
          Main Page
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                to=""
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Shop
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <Link className="dropdown-item" to={"/"}>
                    All Products
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to={"/smartphones/"} state={{name: 'smartphones'}}>
                    Smartphones
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/laptops"} state={{name: 'laptops'}}>
                    Laptops
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/fragrances"} state={{name: 'fragrances'}}>
                    Fragrances
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/home_decorations"} state={{name: 'home-decorations'}}>
                    Home-decorations
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/groceries"} state={{name: 'groceries'}}>
                    Groceries
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={"/skincare"} state={{name: 'skincare'}}>
                    Skincare
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <div className="dropdown-button position-relative">
            <form className="d-flex">
              <button
                id="crt-btn"
                className="btn btn-outline-dark"
                type="button"
                onClick={() => setModalWindow(true)}
                disabled={!basket.length}
              >
                Cart <FontAwesomeIcon icon={faCartShopping} />
                <span className="js-amount badge bg-dark text-white ms-1 rounded-pill">
                  {totalQuantity}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
