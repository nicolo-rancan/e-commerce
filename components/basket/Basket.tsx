"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSession } from "next-auth/react";
import { useGlobals } from "@/lib/utils";
import { useEffect, useState } from "react";
import { getBasket, removeArticleFromBasket } from "../product/actions";

import { BasketRelation } from "@/lib/types";

const Basket = () => {
  const [basket, setBasket] = useState<any>([]);
  const { data: session, status } = useSession();
  const { showBasketDialog, setShowBasketDialog } = useGlobals();

  useEffect(() => {
    refreshBasket();
  }, [showBasketDialog]);

  const refreshBasket = async () => {
    let data = await getBasket(session?.userId);
    if (data && Object.hasOwn(data, "data")) {
      setBasket(data.data);
    }
  };

  return (
    <Dialog open={showBasketDialog} onOpenChange={(open: boolean) => setShowBasketDialog(open)}>
      <DialogContent className="sm:max-w-screen-md">
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
                    <p
                      onClick={() => {
                        removeArticleFromBasket(basketRow.articles, session?.userId);
                        refreshBasket();
                      }}
                      className="text-sm mt-1 text-red-600 cursor-pointer"
                    >
                      Rimuovi
                    </p>
                  </div>
                  <h2 style={{ paddingLeft: "30px" }} className="text-lg font-bold col-span-2 text-right">
                    {basketRow.articles.price?.toString().replace(".", ",")} €
                  </h2>
                </div>
              );
            })
          ) : (
            <p style={{ margin: "auto", padding: "10px 0" }}>Nessun articolo</p>
          )}
        </div>
        <DialogFooter>
          <Button type="submit">Procedi con l'Ordine</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Basket;
