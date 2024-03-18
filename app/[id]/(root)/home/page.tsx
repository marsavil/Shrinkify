'use client'
import Link_Shortener from "@/components/shared/linkShortener/Link_Shortener";
import styles from './home.module.css';


export default  function Home() {

  return (
    <div className={styles.main_container}>
      <Link_Shortener userId="" />
    </div>
  )
}
