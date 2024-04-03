'use client'
import Link_Shortener from "@/components/shared/linkShortener/Link_Shortener";
import styles from './createLink.module.css';
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";


export default  function Home() {
  const { userId } = useAuth(); 
  
  if ( !userId ) redirect('/') 

  return (
    <div className={styles.main_container}>
      <Link_Shortener userId={userId} />
    </div>
  )
}