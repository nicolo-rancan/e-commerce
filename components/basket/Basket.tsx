"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useGlobals } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getBasket, removeArticleFromBasket, updateBasketArticleQuantity } from "../product/actions";
import { BasketRelation } from "@/lib/types";
import { Input } from "../ui/input";

import styles from "./Basket.module.scss";

const Basket = () => {
  const [basket, setBasket] = useState<Array<BasketRelation>>([]);
  const [total, setTotal] = useState<number>(0);
  const { data: session, status } = useSession();
  const { showBasketDialog, setShowBasketDialog } = useGlobals();

  useEffect(() => {
    refreshBasket();
  }, [showBasketDialog]);

  const refreshBasket = async () => {
    let data = await getBasket(session!.userId);
    if (data && Object.hasOwn(data, "data")) {
      setBasket(data.data);
      let sum = 0;

      data.data.forEach((el) => {
        let price = el.articles.price;
        let qta = el.basket.quantity;
        console.log(price, qta);
        sum += parseFloat(price) * qta;
        console.log(sum);
      });

      setTotal(sum);
    }
  };

  const updateArticleQuantity = async (basketId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    await updateBasketArticleQuantity(basketId, parseInt(e.target.value));
    await refreshBasket();
  };

  return (
    <Dialog open={showBasketDialog} onOpenChange={(open: boolean) => setShowBasketDialog(open)}>
      <DialogContent className="sm:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>Il tuo Carrello</DialogTitle>
          <DialogDescription>Controlla qui sotto i tuoi articoli salvati per dopo o continua a fare acquisti.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4 divide-y">
          {basket && basket.length > 0 ? (
            basket.map((basketRow: BasketRelation, i: number) => {
              return (
                <div key={i} className="grid grid-cols-10 items-center">
                  <img className="p-4 col-span-2" src={`data:image/png;base64,${basketRow.articles.image}`} alt="" />
                  <div style={{ paddingLeft: "30px" }} className="col-span-6 flex flex-col gap-1">
                    <h3 className="font-bold">{basketRow.articles.name}</h3>
                    <p>{basketRow.articles.description}</p>
                    <div className={styles.cnt}>
                      <Input
                        value={basketRow.basket.quantity > 0 ? basketRow.basket.quantity : 1}
                        className={`${styles.quantity} h-7`}
                        type="number"
                        onChange={(e) => updateArticleQuantity(basketRow.basket.basketId, e)}
                      />
                      <p
                        className={`${styles.remove} text-sm mt-1 text-red-600 cursor-pointer`}
                        onClick={() => {
                          removeArticleFromBasket(basketRow.articles, session!.userId);
                          refreshBasket();
                        }}
                      >
                        Rimuovi
                      </p>
                    </div>
                  </div>
                  <h2 style={{ paddingLeft: "30px" }} className="text-lg font-bold col-span-2 text-right">
                    {(parseFloat(basketRow.articles.price) * basketRow.basket.quantity).toFixed(2).toString().replace(".", ",")} €
                  </h2>
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
        <DialogFooter>
          <Button type="submit">Procedi con l'Ordine</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Basket;
