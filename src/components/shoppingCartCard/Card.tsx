import React from "react";
import { useDispatch } from "react-redux";
import {
    deleteFromCart,
    buttonPlus,
    buttonMinus,
    inputOnChange,
} from "../../store/slice/basketSlice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useRef } from "react";
import { useAppDispatch} from "../../store/hooks";

type Props = {
    images: [string],
    title: string,
    price: number,
    quantity: any,
    discountPercentage: number,
    id: number,
    product: any,
}

function Card(props: Props) {

    const {
        images,
        title,
        price,
        quantity,
        discountPercentage,
        id,
        product,
    } = props;

    const [inputValue, setInputValue] = useState(quantity);
    const input = useRef('');
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        dispatch(deleteFromCart(product));
    };

    const addOne = () => {
        dispatch(buttonPlus(product));
        // setInputValue(+inputValue + 1);
        window.location.reload();
    };

    const minusOne = () => {
        dispatch(buttonMinus(product));
        // setInputValue(+inputValue - 1);
        window.location.reload();
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(inputOnChange({ value: inputValue, product }));
    };

    let currentPrice = Math.round(price - (price * discountPercentage) / 100);
    return (
        <div className="cart">
            <div className="cart__item">
                <div className="col-5 text-center">
                    <img className="cart-item__img" src={images[0]} alt={title} />
                </div>
                <div className="col-6 mt-2 overflow-visible">
                    <h6 className="product-name">{title}</h6>
                    <div>
                        <span className="text-decoration-line-through price">
                            {price * quantity}$
                        </span>{" "}
                        <span className="cart-item__current-price">
                            {currentPrice * quantity}$
                        </span>
                    </div>
                    <div className="cart-item__quantity gy-2">
                        <div className="cart__qty">
                            <span
                                className="quantity-minus"
                                role="button"
                                onClick={minusOne}
                            >
                                <FontAwesomeIcon icon={faMinus} />
                            </span>
                            <form onSubmit={handleSubmit}>
                                {!quantity ? null : 
                                <input
                                    className="product-quantity-input"
                                    value={inputValue}
                                    key={`product-input${id}`}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                />
                                }
                            </form>
                            <span
                                className="quantity-plus"
                                role="button"
                                onClick={addOne}
                            >
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </div>
                    </div>
                </div>
                <FontAwesomeIcon
                    onClick={handleDelete}
                    icon={faTrash}
                    className="cart-item__delete"
                />
            </div>
        </div>
    );
}

export default Card;
