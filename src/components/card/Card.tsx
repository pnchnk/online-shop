import { addToCart } from "../../store/slice/basketSlice";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch } from "../../store/hooks";
import { Product } from "../../types";

type Props = {
 thumbnail: string,
 price: number,
 title: string,
 id: number,
 product: any
}

function Card(props: Props) {
    const {
        thumbnail,
        price,
        title,
        id,
        product
    } = props;
    // const {cart, addToCart} = useContext(MyContext);

    const dispatch = useAppDispatch();

    const handleClick = () => {
        //add to basket
        dispatch(addToCart(product));
    };

    const getStock = (product: Product['products']) => {
        if(product.stock > 5) {
            return (
                <span>In stock</span>
            )
        }
    }

    const getRating = (product: Product['products']) => {
        if (product.rating > 4 && product.rating < 4.5) {
            return (
                <>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStarHalf} />
                </>
            );
        }
        if (product.rating > 4.5 && product.rating < 5) {
            return (
                <>
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                    <FontAwesomeIcon icon={faStar} />
                </>
            );
        }
    };

    const getSale = () => {
        if (product.discountPercentage >= 1) {
            return (
                <div
                    className="badge bg-dark text-white position-absolute"
                    style={{ top: "0.5rem", right: "0.5rem" }}
                >
                    Sale
                </div>
            );
        }
        else {
          return (
            <></>
          )
        }
    };

    let currentPrice = Math.round(
        product?.price - (product?.price * product?.discountPercentage) / 100
    );

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(`/${id}`);
    };

    return (
        <div className="col-6 col-lg-3 mb-5">
            <div className="card h-100">
               {getSale()}
                <img
                    className="card-img-top"
                    src={thumbnail}
                    alt="product"
                    onClick={handleNavigate}
                />
                <div className="card-body p-4" onClick={handleNavigate}>
                    <div className="text-center">
                        <h5 className="card__title">{title}</h5>
                        <div className="d-flex justify-content-between small mb-2">
                            <div className="card__stock">{getStock(product)}</div>
                            <div className="text-warning">{getRating(product)}</div>
                    
                        </div>
                        <span className="text-decoration-line-through card__old-price">
                            {price}$
                        </span>{" "}
                        <span className="card__current-price">{currentPrice}$</span>
                    </div>
                </div>
                <div className="card__footer p-4 pt-0 border-top-0 bg-transparent">
                    <div className="text-center card__btn">
                        <button
                            type="button"
                            className="btn btn-outline-dark mt-auto add-basket"
                            onClick={handleClick}
                        >
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
