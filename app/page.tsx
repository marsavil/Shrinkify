"use client";
import { generateLink } from "@/lib/actions/link.actions";
import styles from "./page.module.css";
import { useState, useRef, useEffect, FormEvent } from "react";
import { useAuth } from "@clerk/nextjs";
import { redirect, useRouter } from "next/navigation";
import Link_Shortener from "@/components/shared/linkShortener/Link_Shortener";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();
  const { userId } = useAuth();
  if (userId) redirect(`/${userId}/home`)
  return (
    <main className={styles.main}>
      <div className={styles.introduction}>
        <h3 className={styles.introduction_text}>
          Create your own short links to share your content 🔗🚀
        </h3>
      </div>
      <div className={styles.brand}>
        <Image
          src={"/assets/shrinkify.png"}
          width={220}
          height={87}
          alt="Brand"
        />
        <h1 className={styles.brand_text}>Free link shortener</h1>
      </div>
      <div className={styles.options}>
        <div className={styles.message}></div>
        <p className={styles.message_text}>
          {" "}
          Feel free to start creating your links immediately, or log in to save
          every link you create. By logging in, you can maintain control over
          your links, access their performance metrics, and manage them more
          effectively.
        </p>
        <div className={styles.login}>
          <Button
            type="submit"
            className={styles.btn}
            onClick={() => router.push("/sign-up")}
          >
            Log-in
          </Button>
        </div>
      </div>
      <div className={styles.shortener}>
        <Link_Shortener userId={userId} />
      </div>
    </main>
  );
}
