import React from "react";
import { useState, useRef } from "react";
import "../productCard/product-card.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalf, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import {
    productPageAdd
} from "../../store/slice/basketSlice";

type Props = {
    thumbnail: string,
    price: number,
    title: string,
    id: number,
    description: string,
    rating: number,
    product: any,
}

function ProductCard(props: Props) {

    const {
        thumbnail,
        price,
        title,
        id,
        description,
        rating,
        product
    } = props;

    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState<any>(1);
    const input = useRef();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(productPageAdd({ value: inputValue, product: product }));
    };

    const handleClick = () => {
        dispatch(productPageAdd({ value: inputValue, product: product }));
    };

    const currentPrice = () =>{
      return (
        Math.round(product?.price - (product?.price * product?.discountPercentage) / 100)
      )
    } 
    const getRating = (rating: number) => {
        if (rating > 4 && rating < 4.5) {
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
        if (rating > 4.5 && rating < 5) {
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
    return (
        <>
            <div className="col-md-6">
                <img
                    className="card-img-top mb-5 mb-md-0 card__image"
                    src={thumbnail}
                    alt="product"
                />
            </div>
            <div className="col-md-6">
                <div className="small mb-1">SKU: {id}</div>
                <h1 className="display-5 fw-bolder">{title}</h1>
                <div className="d-flex justify-content-start small text-warning mb-2">
                    {getRating(rating)}
                </div>
                <div className="fs-5 mb-5">
                    <span className="text-decoration-line-through product__old-price">{price}$</span>
                    <span className="product__current-price">{currentPrice()}$</span>{' '}
                    <span className="product__discount">{Math.round(product?.discountPercentage)}%</span>
                </div>
                <p className="lead">{description}</p>
                <div className="d-flex">
                    <form onSubmit={handleSubmit}>
                        <input
                            className="form-control text-center me-3"
                            id="inputQuantity"
                            type="num"
                            // ref={input}
                            value={inputValue}
                            onChange={(e) =>
                                setInputValue(e.target.value)
                            }
                            style={{ maxWidth: "3rem" }}
                        />
                    </form>
                    <button
                        className="add-basket btn btn-outline-dark flex-shrink-0"
                        type="button"
                        onClick={handleClick}
                    >
                        Add to cart{' '}
                        <FontAwesomeIcon icon={faBasketShopping}/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProductCard;
