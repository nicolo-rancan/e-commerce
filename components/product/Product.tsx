"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { addArticleToBasket } from "./actions";
import styles from "./Product.module.scss";
import { Articles } from "@/lib/types";

const Product = ({ article }: { article: Articles }) => {
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const addToCart = async () => {
    if (status === "authenticated") {
      let success = await addArticleToBasket(article, session.userId);

      if (success) {
        toast({
          variant: "success",
          title: "Articolo aggiunto al Carrello!",
          description: "Per incrementare la quantità, apri il carrello.",
          duration: 3000,
        });
      } else {
        toast({
          variant: "warning",
          title: "Articolo già presente nel Carrello.",
          description: "Per incrementare la quantità, apri il carrello.",
          duration: 3000,
        });
      }
    } else {
      redirect("/api/auth/signin");
    }
  };

  return (
    <div className={styles.product}>
      <div className={styles.container}>
        <div className={styles.pic}>
          <img src={`data:image/png;base64,${article.image}`} alt="" />
        </div>
        <div className={styles.description}>
          <h4>{article.name}</h4>
          <p>{article.description}</p>
        </div>
        <div className={styles.buy}>
          <p>
            <Button onClick={addToCart} variant={"ghost"} style={{ height: "27px" }}>
              Aggiunti al Carrello
            </Button>
            | <span>{article.price?.toString().replace(".", ",")} €</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;
