"use client";

import { redirect } from "next/navigation";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";
import { useState } from "react";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Cloud, CreditCard, Github, Keyboard, LifeBuoy, LogOut, Mail, MessageSquare, Plus, PlusCircle, Settings, User, UserPlus, Users, ShoppingCart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { data: session } = useSession();

  const handleLogin = () => {
    redirect("/api/auth/signin");
  };

  const handleLogout = () => {
    redirect("/api/auth/signout");
  };

  const handleDialog = () => {
    console.log("OPEN");
    setDialogOpen(!dialogOpen);
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
              <DropdownMenuContent className="w-56" style={{ marginRight: "120px", marginTop: "10px" }}>
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
                  <DropdownMenuItem style={{ cursor: "pointer" }}>
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
