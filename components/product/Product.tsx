"use client";

import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { redirect } from "next/navigation";
import { addArticleToBasket } from "./actions";
import styles from "./Product.module.scss";
import Stripe from "stripe";
import { convertToCurrency, stripe } from "@/lib/utils";
import { useEffect, useState } from "react";

const Product = ({ article }: { article: Stripe.Product }) => {
	const [price, setPrice] = useState(0);
	const { data: session, status } = useSession();
	const { toast } = useToast();

	useEffect(() => {
		(async () => {
			if (article.default_price != null && article.default_price != undefined) {
				let response = await stripe.prices.retrieve(article.default_price.toString());
				setPrice(response.unit_amount!);
			}
		})();
	}, [article]);

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
					<img src={`${article.images[0]}`} alt="" />
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
						| <span>{convertToCurrency(price)?.toFixed(2).toString().replace(".", ",")} €</span>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Product;
