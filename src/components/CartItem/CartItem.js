import React, { useState, useContext } from "react";
import style from "./CartItem.module.css";

//cart context import
import { CartContext } from "../../context/CartContext";

//assets import
import placeholderImg from "../../assets/placeholder-img-sm.svg";

const CartItem = (props) => {
  //image load state
  const [imgLoading, setImgLoading] = useState(true);

  //cart context
  const [cart, setCart] = useContext(CartContext);

  //remove from cart
  const removeFromCart = () => {
    let itemInCart = false;
    cart.forEach((el) => {
      if (el.id === props.id) {
        itemInCart = true;
      }
    });

    if (itemInCart) {
      let newCart = cart.filter((el) => {
        if (el.id === props.id) {
          return false;
        } else return true;
      });

      setCart(newCart);
    }
  };

  //increase product
  const increaseProduct = () => {
    let increse = false;
    let editIndex = 0;

    cart.forEach((el, index) => {
      if (el.id === props.id) {
        if (el.quantity < 10) {
          increse = true;
          editIndex = index;
        }
      }
    });

    if (increse) {
      //copy the cart array
      let newCart = cart.map((el) => {
        return { ...el };
      });

      //update the copied array
      newCart[editIndex].quantity = newCart[editIndex].quantity + 1;

      let newPrice = newCart[editIndex].price + newCart[editIndex].unitPrice;

      //rounding number to two places
      newCart[editIndex].price =
        Math.round((newPrice + Number.EPSILON) * 100) / 100;

      //replace cart with new cart
      setCart(newCart);
    }
  };

  //decrease product
  const decreaseProduct = () => {
    let decrease = false;
    let editIndex = 0;

    cart.forEach((el, index) => {
      if (el.id === props.id) {
        if (el.quantity > 1) {
          decrease = true;
          editIndex = index;
        }
      }
    });

    if (decrease) {
      //copy the cart array
      let newCart = cart.map((el) => {
        return { ...el };
      });

      //update the copied array
      newCart[editIndex].quantity = newCart[editIndex].quantity - 1;

      let newPrice = newCart[editIndex].price - newCart[editIndex].unitPrice;

      //rounding number to two places
      newCart[editIndex].price =
        Math.round((newPrice + Number.EPSILON) * 100) / 100;

      //replace cart with new cart
      setCart(newCart);
    }
  };
  return (
    <div className={style.cartItem}>
      <div className={style.cartItemContent}>
        <img
          className={imgLoading ? style.hide : style.show}
          src={props.imgUrl}
          alt=""
          onLoad={() => {
            setImgLoading(false);
          }}
        />
        <img
          className={imgLoading ? style.show : style.hide}
          src={placeholderImg}
          alt=""
        />
        <div className={style.cartItemDetailsBox}>
          <div className={style.cartItemInfo}>
            <h4>{props.name}</h4>
            <h3>{props.price}</h3>
          </div>
          <p>Size: {props.size}</p>
          <div className={style.cartItemAction}>
            <div className={style.cartItemAddReduce}>
              <button onClick={decreaseProduct}>-</button>
              <h3>{props.quantity}</h3>
              <button onClick={increaseProduct}>+</button>
            </div>
            <p onClick={removeFromCart}>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
