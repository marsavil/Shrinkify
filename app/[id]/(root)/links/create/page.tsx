'use client'
import Link_Shortener from "@/components/shared/linkShortener/Link_Shortener";
import styles from './createLink.module.css';
import { useAuth } from "@clerk/nextjs";


export default  function Home() {
  const { userId } = useAuth(); 

  return (
    <div className={styles.main_container}>
      <Link_Shortener userId={userId} />
    </div>
  )
}