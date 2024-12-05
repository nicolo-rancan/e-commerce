"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { articles as articleSchema } from "@/drizzle/schema";
import { addArticleToBasket } from "./actions";
import styles from "./Product.module.scss";

const Product = ({ article }: { article: typeof articleSchema }) => {
  const { data: session, status } = useSession();

  const addToCart = async () => {
    if (status === "authenticated") {
      await addArticleToBasket(article, session.userId);
    } else {
      console.log(article.name);
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <div className={styles.pic}>
          <img src={`data:image/png;base64,${article.image}`} alt="" />
        </div>
        <div className={styles.description}>
          <h4>ASHTRAY</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam minus earum</p>
        </div>
        <div className={styles.buy}>
          <p>
            <Button onClick={addToCart} variant={"ghost"} style={{ height: "27px" }}>
              Aggiunti al Carrello
            </Button>{" "}
            | <span>$46,60</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
