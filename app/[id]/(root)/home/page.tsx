'use client'
import Link_Shortener from "@/components/shared/linkShortener/Link_Shortener";
import styles from './home.module.css';
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";


export default  function Home() {
  const { userId } = useAuth(); 

  return (
    <div className={styles.main_container}>
      <div className={styles.service_group}>
        <div className={styles.service}>
          <Image 
            src='/assets/link.png'
            width={200}
            height={68}
            alt='links'
          />
          <h2 className={styles.description}>Create your own shareable short links</h2>
        </div>
        <div className={styles.service}>
          <Image 
            src='/assets/qr-link.png'
            width={200}
            height={68}
            alt='links'
          />
          <h2 className={styles.description}>Create your own printable QR code to stick it on the fridge</h2>
        </div>
        <div className={styles.service}>
          <Image 
            src='/assets/analytic.png'
            width={250}
            height={85}
            alt='links'
          />
          <h2 className={styles.description}>Keep track of your links</h2>
        </div>
      </div>
    </div>
  )
}
