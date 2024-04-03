import { generateLink } from "@/lib/actions/link.actions";
import styles from "./linkShortener.module.css";
import { AiOutlineCopy } from "react-icons/ai";
import { FormEvent, useRef, useState } from "react";
import Copy_Button from "../copyButton/Copy_Button";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { formatUrl } from "@/lib/utils";

const Link_Shortener = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null); // Inicializa inputRef con null
  const [shortUrl, setShortUrl] = useState("");
  const [copiedContent, setCopiedContent] = useState("");
  const [copied, setCopied] = useState(false);
  const baseUrl = process.env.NEXT_PUBLIC_SHRINK;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = inputRef.current?.value; // Asegúrate de manejar el caso en que inputRef.current sea null
    
    if (!url) return;
    if (url){
      const completeUrl = formatUrl(url)
      const newUrl = await generateLink(completeUrl, userId || "");
      setShortUrl(newUrl.shortUrl);
      setCopiedContent(`${baseUrl}${newUrl.shortUrl}`);
      setCopied(false);
    }
    if (shortUrl) return;
    //Peticion a la API
    
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(`${baseUrl}${shortUrl}`);
    setCopied(true);
  };
  const handleClick = (e: any) => {
    setShortUrl("");
    router.refresh();
  };

  return (
    <div className={styles.main}>
      <form onSubmit={handleSubmit}>
        {!shortUrl ? (
          <div className={styles.client}>
            <input
              ref={inputRef}
              type="text"
              className={styles.input} // Corrige el nombre de la clase aquí
              placeholder="https://example.com/insanely-long-url"
            />
            <button className={styles.button}>Shrink</button>{" "}
          </div>
        ) : null}
        {shortUrl ? (
          <section className={styles.result}>
            <h2 className={styles.message}>Here is your Link 😉 👇</h2>
            <div className={styles.link}>
              <h4 id="content">{`${baseUrl}${shortUrl}`}</h4>
              <Copy_Button
                content={copiedContent}
                onCopy={handleCopy}
                copied={copied}
              >
                <AiOutlineCopy
                  color={copied ? "blue" : "white"}
                  className={styles.copy}
                  size={25}
                />
              </Copy_Button>
            </div>

            <Button onClick={handleClick} className={styles.button_create}>
              Create new link
            </Button>
          </section>
        ) : (
          <span className={styles.input}>{shortUrl}</span>
        )}
      </form>
    </div>
  );
};
export default Link_Shortener;
