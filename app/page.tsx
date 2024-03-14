'use client'
import { generateLink } from "@/lib/actions/link.actions";
import styles from "./page.module.css";
import { useState, useRef, useEffect, FormEvent } from "react";
import { useAuth } from "@clerk/nextjs";

export default  function Home() {
  const { userId } = useAuth()
  const inputRef = useRef<HTMLInputElement>(null); // Inicializa inputRef con null
  const [shortUrl, setShortUrl] = useState("");
  const baseUrl = process.env.NEXT_PUBLIC_SHRINK

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    console.log(userId)
    e.preventDefault();
    const url = inputRef.current?.value; // Asegúrate de manejar el caso en que inputRef.current sea null
    if (!url) return; // Sal de la función si la URL es falsy

    //Peticion a la API
    const newUrl = await generateLink(url, userId || '')
    setShortUrl(newUrl.shortUrl)
  }

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Shrinkify - Url Shortener</p>
        <div>
          <form className={styles.input} onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input} // Corrige el nombre de la clase aquí
              placeholder="U R L"
            />
            <button className={styles.button}>Shrink</button> {/* Corrige el nombre de la clase aquí */}
            {shortUrl? (<span className={styles.input}>{`${baseUrl}${shortUrl}`}</span>)
            : <span className={styles.input}>{shortUrl}</span>}
            
          </form>
        </div>
      </div>
    </main>
  );
}
