"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.scss";
import Product from "@/components/product/Product";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getArticles } from "./actions";
import { Articles } from "@/lib/types";

const Home = () => {
  const [articles, setArticles] = useState<Array<Articles>>([]);
  const { data: session } = useSession();

  useEffect(() => {
    (async () => {
      let data = await getArticles();
      if (data && Object.hasOwn(data, "data")) {
        setArticles(data.data);
      }
    })();
  }, []);

  return (
    <main>
      <section className={styles.section}>
        <div className={styles.hero}>
          <div className={styles.title}>
            <h1>
              Lorem
              <br />
              ipsum dolor.
            </h1>
          </div>
          <div className={styles.description}>
            <h2>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit nam nemo culpa minus veritatis omnis. Placeat tempora obcaecati tenetur porro
              vero iusto rerum dolore nulla?
            </h2>
          </div>
          <div className={styles.callto}>
            <Button>ESPLORA</Button>
            <Button variant={"ghost"}>Come acquistare?</Button>
          </div>
          <div className={styles.protip}>
            <img src="/test.png" alt="" />
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Rem sequi reprehenderit unde suscipit autem tempore commodi asperiores maxime
              perferendis quas?
            </p>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.centerCard}>
          <div className={styles.left}>
            <h2>Lorem ipsum dolor sit amet consectetur.</h2>
          </div>
          <div className={styles.right}>
            <div className={styles.wrapper}>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perferendis veritatis animi amet aliquam, ab sit modi voluptatibus facilis dolor
                dicta!
              </p>
              <Button variant="outline" size="icon">
                <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.title}>
          <h3>I nostri Prodotti</h3>
        </div>
        <div className={styles.products}>
          {articles &&
            articles.map((article: Articles, i: number) => {
              return <Product key={i} article={article} />;
            })}
        </div>
      </section>
      <section className={`${styles.section} ${styles.inline}`}>
        <div className={styles.impression}>
          <img src="https://i.pinimg.com/originals/59/92/5d/59925d3e4e40ebe644284ac343fd7f6f.jpg" alt="" />
        </div>
        <div className={styles.about}>
          <div className={styles.wrapper}>
            <h3>Chi siamo</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ea architecto aut atque repellat ullam. Molestias hic iusto sint impedit,
              necessitatibus ratione doloribus quos officia earum labore totam consequatur alias.
            </p>
            <br />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam, ea architecto aut atque repellat ullam. Molestias hic iusto sint impedit,
              necessitatibus ratione doloribus quos officia earum labore totam consequatur alias.
            </p>
            <button></button>
          </div>
        </div>
      </section>
      <section className={styles.section}>
        <div className={styles.expander}></div>
        <div className={styles.newsletter}>
          <div className={styles.left}>
            <h1>Iscriviti alla Newsletter</h1>
            <p>Lorem ipsum dolor sit amet consectetur.</p>
          </div>
          <div className={styles.right}>
            <div className="flex w-full max-w-bg items-center space-x-2">
              <Input type="email" placeholder="Email" />
              <Button type="submit">Iscriviti</Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
