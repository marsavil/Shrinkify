import { generateLink } from "@/lib/actions/link.actions";
import styles from "./linkShortener.module.css";
import { AiOutlineCopy } from "react-icons/ai";
import { FormEvent, useRef, useState } from "react";
import Copy_Button from "../copyButton/Copy_Button";

const Link_Shortener = ({ userId }: { userId: string }) => {

  const inputRef = useRef<HTMLInputElement>(null); // Inicializa inputRef con null
  const [shortUrl, setShortUrl] = useState("");
  const [copiedContent, setCopiedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_SHRINK;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = inputRef.current?.value; // Asegúrate de manejar el caso en que inputRef.current sea null
    if (!url) return; 
    if (shortUrl) return
    //Peticion a la API
    const newUrl = await generateLink(url, userId || "");
    setShortUrl(newUrl.shortUrl);
    setCopiedContent(`${baseUrl}${newUrl.shortUrl}`)
    setCopied(false);
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(`${baseUrl}${shortUrl}`);
    setCopied(true);
    //window.location.reload(); // Refrescar la página después de copiar
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          className={styles.input} // Corrige el nombre de la clase aquí
          placeholder="U R L"
        />
        <button className={styles.button}>Shrink</button>{" "}
        {/* Corrige el nombre de la clase aquí */}
        {shortUrl ? (
          <section className={styles.result}>
            <h2 className={styles.message}>Here is your Link 😉</h2>
            <span id='content' >{`${baseUrl}${shortUrl}`}</span>
            <Copy_Button content={copiedContent} onCopy={handleCopy} copied={copied}>
              <AiOutlineCopy color={copied ? 'green' : 'white'} className={styles.copy}/>
            </Copy_Button>
          </section>
        ) : (
          <span className={styles.input}>{shortUrl}</span>
        )}
      </form>
    </div>
  );
};
export default Link_Shortener;
