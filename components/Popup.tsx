"use client";

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useGlobals } from "@/lib/utils";
import { useEffect } from "react";

const Popup = () => {
  const { popupComponent, showPopup, setShowPopup, popupFull } = useGlobals();

  return (
    <Dialog open={showPopup} onOpenChange={(open: boolean) => setShowPopup(open)}>
      <DialogContent className={`${popupFull ? "popup-full" : "sm:max-w-screen-lg"} `}>
        {!popupFull ? (
          <DialogHeader>
            <DialogTitle>Il tuo Carrello</DialogTitle>
            <DialogDescription>Controlla qui sotto i tuoi articoli salvati per dopo o continua a fare acquisti.</DialogDescription>
          </DialogHeader>
        ) : (
          <DialogTitle></DialogTitle>
        )}
        <div style={{ maxHeight: "80vh" }}>{popupComponent ? popupComponent : null}</div>
      </DialogContent>
    </Dialog>
  );
};

export default Popup;
