import { Button } from "@/components/ui/button";
import styles from "./page.module.scss";
import Product from "@/components/product/Product";

const Home = () => {
  return (
    <main>
      <section className={styles.section}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <h1>
              Lorem
              <br />
              ipsum dolor.
            </h1>
          </div>
          <div className={styles.description}>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nam nemo culpa minus veritatis omnis. Placeat tempora obcaecati tenetur porro vero iusto rerum dolore
              nulla?
            </h2>
          </div>
          <div className={styles.callto}>
            <Button>ESPLORA</Button>
            <Button variant={"ghost"}>Come acquistare?</Button>
          </div>
          <div className={styles.protip}>
            <img src="/test.png" alt="" />
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem sequi reprehenderit unde suscipit autem tempore commodi asperiores maxime perferendis quas?</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.centerCard}>
          <div className={styles.left}>
            <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          </div>
          <div className={styles.right}>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis veritatis animi amet aliquam, ab sit modi voluptatibus facilis dolor dicta!</p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.title}>
          <h3>I nostri Prodotti</h3>
        </div>
        <div className={styles.products}>
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </section>
    </main>
  );
};

export default Home;
