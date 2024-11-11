import styles from "./Product.module.scss";

const Product = () => {
  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <div className={styles.pic}>
          <img src="https://static.vecteezy.com/system/resources/previews/026/676/313/non_2x/3d-rendering-of-promo-ashtray-free-png.png" alt="" />
        </div>
        <div className={styles.description}>
          <h4>ASHTRAY</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam minus earum</p>
        </div>
        <div className={styles.buy}>
          <p>
            Acquista Ora | <span>$46,60</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
