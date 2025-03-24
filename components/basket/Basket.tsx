"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { convertToCurrency, useGlobals } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Basket as BasketType } from "@/lib/types";
import { getBasket, removeArticleFromBasket, updateBasketArticleQuantity } from "../product/actions";
import { Input } from "../ui/input";
import { stripe } from "@/lib/utils";
import Checkout from "../payment/Checkout";

import styles from "./Basket.module.scss";
import Stripe from "stripe";
import { useToast } from "@/hooks/use-toast";

type ArticlesPrice = {
  article: Stripe.Product;
  price: number;
};

const Basket = () => {
  const [basket, setBasket] = useState<Array<BasketType>>([]);
  const [total, setTotal] = useState<number>(0);
  const [articlesPrice, setArticlesPrice] = useState<Array<ArticlesPrice>>([]);
  const { data: session, status } = useSession();
  const { setPopupComponent, setPaymentAmount, showPopup, setPopupFull, stripeProducts } = useGlobals();
  const { toast } = useToast();

  useEffect(() => {
    refreshBasket();
    setPopupFull(false);
  }, [showPopup]);

  const refreshBasket = async () => {
    let data = await getBasket(session!.userId);
    if (data && Object.hasOwn(data, "data")) {
      let sum = 0;
      let prices: Array<ArticlesPrice> = [];

      for (const el of data.data) {
        let id = el.articleId;
        let article = stripeProducts?.find((pr) => pr.id == id);

        if (article && article.default_price) {
          let response = await stripe.prices.retrieve(article.default_price.toString());
          let price = response.unit_amount;

          if (price) {
            let qta = el.quantity;
            sum += convertToCurrency(price) * qta;
            prices.push({
              article,
              price,
            });
          } else {
            console.log("A2");
          }
        } else {
          console.log("A1");
        }
      }

      setArticlesPrice(prices);
      setTotal(sum);
      setBasket(data.data);
    }
  };

  const updateArticleQuantity = async (basketId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    await updateBasketArticleQuantity(basketId, parseInt(e.target.value));
    await refreshBasket();
  };

  const continueCheckout = () => {
    if (basket.length > 0) {
      setPopupFull(true);
      setPopupComponent(<Checkout />);
      setPaymentAmount(total);
    } else {
      toast({
        variant: "destructive",
        title: "Nessun articolo.",
        description: "Aggiungi almeno un articolo per poter procedere.",
        duration: 3000,
      });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div className={`${styles.container} grid gap-4 py-4 divide-y`}>
        {basket && basket.length > 0 ? (
          basket.map((basketRow: BasketType, i: number) => {
            return (
              <div key={i} className="grid grid-cols-10 items-center">
                <img className="p-4 col-span-2" src={`${articlesPrice.find((el) => el.article.id == basketRow.articleId)?.article.images[0]}`} alt="" />
                <div style={{ paddingLeft: "30px" }} className="col-span-6 flex flex-col gap-1">
                  <h3 className="font-bold">{articlesPrice.find((el) => el.article.id == basketRow.articleId)?.article.name}</h3>
                  <p>{articlesPrice.find((el) => el.article.id == basketRow.articleId)?.article.description}</p>
                  <div className={styles.cnt}>
                    <Input
                      value={basketRow.quantity > 0 ? basketRow.quantity : 1}
                      className={`${styles.quantity} h-7`}
                      type="number"
                      onChange={(e) => updateArticleQuantity(basketRow.basketId, e)}
                    />
                    <p
                      className={`${styles.remove} text-sm mt-1 text-red-600 cursor-pointer`}
                      onClick={() => {
                        removeArticleFromBasket(articlesPrice.find((el) => el.article.id == basketRow.articleId)?.article!, session!.userId);
                        refreshBasket();
                      }}
                    >
                      Rimuovi
                    </p>
                  </div>
                </div>
                <div style={{ paddingLeft: "30px" }} className="col-span-2 text-right">
                  <p>
                    {convertToCurrency(articlesPrice.find((el) => el.article.id == basketRow.articleId)?.price!)
                      .toFixed(2)
                      .toString()
                      .replace(".", ",")}{" "}
                    €
                  </p>
                  <h2 className="text-lg font-bold">
                    {(convertToCurrency(articlesPrice.find((el) => el.article.id == basketRow.articleId)?.price!) * basketRow.quantity)
                      .toFixed(2)
                      .toString()
                      .replace(".", ",")}{" "}
                    €
                  </h2>
                </div>
              </div>
            );
          })
        ) : (
          <p style={{ margin: "auto", padding: "10px 0" }}>Nessun articolo</p>
        )}
      </div>

      <div className="grid gap-4 py-4 divide-y">
        <div className={styles.total}>
          <p>TOTALE PROVVISORIO</p>
          <h4>{total.toFixed(2).toString().replace(".", ",")} €</h4>
        </div>
      </div>
      <Button style={{ marginLeft: "auto" }} onClick={continueCheckout}>
        Procedi con l'Ordine
      </Button>
    </div>
  );
};

export default Basket;
