"use client";

import { fetchLinkById } from "@/lib/actions/link.actions";
import styles from "./linkCard.module.css";
import Image from "next/image";
import Link from "next/link";
import { PiCursorClick } from "react-icons/pi";
import { IoCalendarNumberOutline } from "react-icons/io5";
import { AiOutlineCopy } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getBaseUrl, getInitial } from "@/lib/utils";
import { redirect, usePathname, useRouter } from "next/navigation";
import { verify } from "crypto";

const LinkCard = ({ link }: any) => {
  const pathname = usePathname();
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SHRINK;
  const [lnk, setLink] = useState(null);
  const [copied, setCopied] = useState(false);
  const [copiedContent, setCopiedContent] = useState("");
  const [verified, setVerified]= useState(false)

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
  // useEffect(() => {
  //   const verifyFavicon = async () => {
  //     if (lnk) {
  //       const favicon = await fetch(`${getBaseUrl(lnk.url)}/favicon.ico`);
  //       if (favicon.status === 200) {
  //         console.log(favicon.status);
  //         setVerified(true);
  //       }
  //     }
  //   };
  //   verifyFavicon();
  // }, [lnk]);

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
      navigator.clipboard.writeText(`${copiedContent}`);
      setCopied(true);
    };
    const handleRedirect = () => {
      router.push(`/${lnk._id}/edit`);
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
          {/* {verified ? (<img
            src={favicon}
            width={40}
            height={40}
            alt="site favicon"
            loading="lazy"
            className={styles.favicon}
          />):
          (<Image 
              src={`/assets/${initial}.png`}
              width={40}
              height={40}
              alt="Site initial"
              className={styles.no_favicon}
            />)
        } */}
          
        </div>
        <div className={styles.column2}>
          <div className="">
            <h2>{lnk.title || ""}</h2>
          </div>
          <div >
            <Link href={lnk.url} className={styles.url}>{lnk.url}</Link>
          </div>
          <div >
            <Link href={baseUrl + lnk.shortUrl} className={styles.short_url}>{baseUrl + lnk.shortUrl}</Link>
          </div>

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
            className={styles.copy_btn}
            onClick={handleCopy}
            content={baseUrl + lnk.shortUrl}
          >
            <AiOutlineCopy color={copied ? "blue" : "white"} size={25} />
            <h3 className={styles.copy_text}>Copy</h3>
          </div>
          <div className={styles.edit_btn} onClick={handleRedirect}>
            <FaRegEdit color={"white"} size={25} />
          </div>
        </div>
      </div>
    );
  }
  return null;
};
export default LinkCard;
