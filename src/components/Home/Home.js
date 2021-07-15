import React from "react";
import style from "./Home.module.css";

//assets import
import heroImg from "../../assets/heroImage.png";

//components imports
import HomeProduct from "../HomeProduct/HomeProduct";

const Home = () => {
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
      <div className={style.productSection}>
        <div className="container">
          <h1>NEW ARRIVALS</h1>
          <div className={style.productsShowcase}>
            <HomeProduct
              imageUrl="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p1-medium.png?alt=media&token=2e24dbc9-6a22-4cb4-ad60-abc7473407f9"
              name="Hoodie jacket hybrid"
              description="Exclusive designer hoodie for men, pullover
              style with unique red and dark green 
              combo color"
              price={12.8}
            />
            <HomeProduct
              imageUrl="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p1-medium.png?alt=media&token=2e24dbc9-6a22-4cb4-ad60-abc7473407f9"
              name="Hoodie jacket hybrid"
              description="Exclusive designer hoodie for men, pullover
              style with unique red and dark green 
              combo color"
              price={12.8}
            />
            <HomeProduct
              imageUrl="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p1-medium.png?alt=media&token=2e24dbc9-6a22-4cb4-ad60-abc7473407f9"
              name="Hoodie jacket hybrid"
              description="Exclusive designer hoodie for women, 
              pullover style with soft and warm cotton.
              light weight with classic solid color"
              price={12.8}
            />
          </div>
        </div>
      </div>
      <div className={style.productSection}>
        <div className="container">
          <h1>MOST POPULAR</h1>
          <div className={style.productsShowcase}>
            <HomeProduct
              imageUrl="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p1-medium.png?alt=media&token=2e24dbc9-6a22-4cb4-ad60-abc7473407f9"
              name="Hoodie jacket hybrid"
              description="Exclusive designer hoodie for men, pullover
              style with unique red and dark green 
              combo color"
              price={12.8}
            />
            <HomeProduct
              imageUrl="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p1-medium.png?alt=media&token=2e24dbc9-6a22-4cb4-ad60-abc7473407f9"
              name="Hoodie jacket hybrid"
              description="Exclusive designer hoodie for men, pullover
              style with unique red and dark green 
              combo color"
              price={12.8}
            />
            <HomeProduct
              imageUrl="https://firebasestorage.googleapis.com/v0/b/hoodie-94315.appspot.com/o/p1-medium.png?alt=media&token=2e24dbc9-6a22-4cb4-ad60-abc7473407f9"
              name="Hoodie jacket hybrid"
              description="Exclusive designer hoodie for women, 
              pullover style with soft and warm cotton.
              light weight with classic solid color"
              price={12.8}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
