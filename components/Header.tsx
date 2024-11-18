import Image from "next/image";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";

const Header = () => {
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
          <Button variant="outline">Accedi</Button>
          <Button size="icon">
            <ShoppingBag style={{ width: "65%", height: "65%", backgroundColor: "white", borderRadius: "999px", padding: "3px" }} color="black" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
