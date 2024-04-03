'use client'
import { useAuth } from '@clerk/nextjs';
import styles from './qr-codes.module.css';
import { redirect } from 'next/navigation';


export default  function Home() {
  const { userId } = useAuth(); 
  
  if ( !userId ) redirect('/')
  return (
    <div className={styles.main_container}>
      <h1>QR Codes Page</h1>
    </div>
  )
}