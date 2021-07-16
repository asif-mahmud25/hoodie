import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import { db } from "../../firebase";

//assets import
import heroImg from "../../assets/heroImage.png";

//components imports
import HomeProduct from "../HomeProduct/HomeProduct";
import MainLoader from "../Loaders/MainLoader/MainLoader";

const Home = () => {
  //product state
  const [products, setProducts] = useState([]);

  //loading state
  const [loading, setLoading] = useState(true);

  //for holding the products
  let allProducts = [];

  useEffect(() => {
    db.collection("products")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          allProducts.push(doc.data());
        });
        setProducts(allProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  //for test
  console.log(products);

  //for rendering products on dom
  let newArrivalsRender = [];
  let mostPopularRender = [];
  let productsRender = [];

  if (products.length > 0) {
    productsRender = products.map((el) => {
      return (
        <HomeProduct
          key={el.id}
          id={el.id}
          imageUrl={el.imgM}
          name={el.name}
          description={el.description}
          price={el.price}
        />
      );
    });

    newArrivalsRender = productsRender.slice(0, 3);
    mostPopularRender = productsRender.slice(3);
  }
  return (
    <div className={style.home}>
      <div className={style.heroSection}>
        <div className="container">
          <div className={style.heroSectionContent}>
            <div className={style.tagLineBox}>
              <h1 className={style.tagLineWords}>CLASSIC</h1>
              <h1 className={style.tagLineWords}>WITH</h1>
              <h1 className={style.tagLineWordHighlight}>MODERN</h1>
              <h1 className={style.tagLineWords}>TWIST</h1>
              <p>Hoodies, jackets & sweaters</p>
            </div>
            <div className={style.heroImage}>
              <img src={heroImg} alt=""></img>
            </div>
          </div>
        </div>
      </div>
      <div className={loading ? style.hide : style.show}>
        <div className={style.productSection}>
          <div className="container">
            <h1>NEW ARRIVALS</h1>
            <div className={style.productsShowcase}>{newArrivalsRender}</div>
          </div>
        </div>
        <div className={style.productSection}>
          <div className="container">
            <h1>MOST POPULAR</h1>
            <div className={style.productsShowcase}>{mostPopularRender}</div>
          </div>
        </div>
      </div>
      <div className={loading ? style.show : style.hide}>
        <MainLoader />
      </div>
    </div>
  );
};

export default Home;
