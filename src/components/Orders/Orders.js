import React, { useContext, useEffect, useState } from "react";
import style from "./Orders.module.css";

//componets import
import OrderedListItem from "../OrderedListItem/OrderedListItem";
import MainLoader from "../Loaders/MainLoader/MainLoader";

//firebase db
import { db } from "../../firebase";

//auth context import
import { AuthContext } from "../../context/AuthContext";

const Orders = () => {
  //orders state
  const [orders, setOrders] = useState([]);

  //loading state
  const [loading, setLoading] = useState(true);

  //auth context
  const [user] = useContext(AuthContext);

  //fetch orders when component loads
  useEffect(() => {
    fetchOrders();

    // eslint-disable-next-line
  }, []);

  //fetch orders
  const fetchOrders = () => {
    let allOrders = [];

    db.collection("users")
      .doc(user.userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          db.collection("users")
            .doc(user.userId)
            .collection("orders")
            .orderBy("timeStamp", "desc")
            .get()
            .then((res) => {
              //if the collection exist in database
              if (res.empty === false) {
                res.forEach((doc) => {
                  allOrders.push({ orderId: doc.id, ...doc.data() });
                });
              }

              setLoading(false);
              setOrders(allOrders);
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  //show order items
  let orderList = (
    <p className={style.noOrdersText}>You haven't ordered anything yet!</p>
  );
  if (orders.length > 0) {
    orderList = orders.map((el) => {
      return (
        <OrderedListItem
          key={el.orderId}
          orderId={el.orderId}
          time={el.timeStamp}
          price={el.orderTotalPrice}
          userName={el.userName}
          userAddress={el.userAddress}
          orderItems={el.orderItems}
        />
      );
    });
  }
  return (
    <div className={style.orders}>
      <div className="container">
        <h1 className={style.pageHeader}>ORDERS</h1>
        {loading ? <MainLoader /> : <div>{orderList}</div>}
      </div>
    </div>
  );
};

export default Orders;
