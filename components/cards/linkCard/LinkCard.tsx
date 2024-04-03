"use client";

import { fetchLinkById } from "@/lib/actions/link.actions";
import styles from "./linkCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { PiCursorClick } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { AiOutlineCopy } from "react-icons/ai";
import Copy_Button from "@/components/shared/copyButton/Copy_Button";
import { useEffect, useState } from "react";
import { getBaseUrl, getInitial } from "@/lib/utils";

const LinkCard = ({ link }: any) => {
  const baseUrl = process.env.NEXT_PUBLIC_SHRINK;
  const [lnk, setLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedContent, setCopiedContent] = useState("");

  useEffect(() => {
    const fetchLinkData = async () => {
      try {
        const linkData = await fetchLinkById(link);
        setLink(linkData);
        setCopiedContent(`${baseUrl}${linkData.shortUrl}`);
        setCopied(false);
      } catch (error) {
        console.error("Error fetching link data:", error);
      }
    };
    if (link) {
      fetchLinkData();
    }
  }, [link, baseUrl]);

  if (lnk) {
    const dateDB = new Date(lnk.created);
    const day = dateDB.getDate();
    const month = dateDB.toLocaleString("default", { month: "short" });
    const year = dateDB.getFullYear();
    const formatedDate = `${month} ${day}, ${year}`;
    const baseDestination = getBaseUrl(lnk.url);
    const favicon = `${baseDestination}/favicon.ico`;
    const initial = getInitial(lnk.url);
    const handleCopy = () => {
      navigator.clipboard.writeText(`${baseUrl}${lnk?.shortUrl}`);
      setCopied(true);
    };
    return (
      <div className={styles.main_container}>
        <div className={styles.column1}>
          <img
            src={favicon}
            width={40}
            height={40}
            alt="site favicon"
            loading="lazy"
            className={styles.favicon}
          />
        </div>
        <div className={styles.column2}>
          <h2 className="">{lnk.title || ""}</h2>
          <Link href={baseUrl + lnk.shortUrl} className={styles.short_link} />

          <Link href={lnk.url} className={styles.url}>
            {lnk.url}
          </Link>
          <Link href={baseUrl + lnk.shortUrl} className={styles.short_url}>
            {baseUrl + lnk.shortUrl}
          </Link>
          <div className={styles.info}>
            <div className={styles.clicks}>
              <PiCursorClick />
              <h5>{`${lnk.clicks} clicks`}</h5>
            </div>
            <div className={styles.created}>
              <IoCalendarNumberOutline />
              <h5>{formatedDate}</h5>
            </div>
          </div>
        </div>
        <div className={styles.column3}>
          <div
            className={styles.btn}
            onClick={handleCopy}
            content={baseUrl + lnk.shortUrl}
          >
            <AiOutlineCopy color={copied ? "blue" : "white"} size={25} />
            <h3 className={styles.copy_text}>Copy</h3>
          </div>
        </div>
      </div>
    );
  }
  return null;
};
export default LinkCard;
