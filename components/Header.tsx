"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useGlobals } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LifeBuoy, LogOut, User, ShoppingCart } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Basket from "./basket/Basket";

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { data: session } = useSession();
  const { setPopupComponent, setShowPopup } = useGlobals();

  const handleLogin = () => {
    redirect("/api/auth/signin");
  };

  const handleLogout = () => {
    redirect("/api/auth/signout");
  };

  return (
    <header>
      <div className="wrapper">
        <div className="item left">
          {/*<Image src="/logo.png" width={214} height={15} alt="" />*/}
          <h1>ZANARRA</h1>
        </div>
        <div className="item center">
          <ul>
            <li>Home</li>
            <li>Prodotti</li>
            <li>Chi siamo</li>
            <li>Contatti</li>
          </ul>
        </div>
        <div className="item right">
          {!session ? (
            <Button onClick={handleLogin} variant="outline">
              Accedi
            </Button>
          ) : null}
          {session ? (
            <DropdownMenu open={dialogOpen} onOpenChange={(open: boolean) => setDialogOpen(open)}>
              <DropdownMenuTrigger asChild>
                <Avatar onClick={() => setDialogOpen(!dialogOpen)} style={{ margin: "auto 0 auto auto", cursor: "pointer" }}>
                  <AvatarImage src={session?.user?.image!} referrerPolicy="no-referrer" />
                  <AvatarFallback>{session?.user?.name![0]}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 dropmenu" style={{ marginRight: "120px", marginTop: "10px" }}>
                <DropdownMenuLabel>Il mio Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem style={{ cursor: "pointer" }}>
                    <User />
                    <span>Profilo</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      setPopupComponent(<Basket />);
                      setShowPopup(true);
                      console.log("click");
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <ShoppingCart />
                    <span>Carrello</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem style={{ cursor: "pointer" }}>
                  <LifeBuoy />
                  <span>Supporto</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} style={{ color: "red", cursor: "pointer" }}>
                  <LogOut />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default Header;
