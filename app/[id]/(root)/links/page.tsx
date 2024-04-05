'use client'
import { currentUser, useAuth } from '@clerk/nextjs';
import styles from './links.module.css';
import { fetchUserLinks } from '@/lib/actions/link.actions';
import LinkCard from '@/components/cards/linkCard/LinkCard';
import { useRouter } from 'next/navigation';
import Link_Shortener from '@/components/shared/linkShortener/Link_Shortener';
import { useEffect, useState } from 'react';


export default  function Page() {
  const { userId } = useAuth();
  const router = useRouter();
  const [links, setLinks] = useState([]);
  if ( !userId ) router.push('/')

  useEffect(() => {
    const fetchLinksData = async () => {
      const data = await fetchUserLinks(userId);
      setLinks(data)
    }
    fetchLinksData();
  }, [userId])


  if ( links.length !== 0 ) {
    return (
      <div className={styles.main_container}>
        { links.map ((link:any, index:any) => (
          <LinkCard key={index} link={link} />
        ))}
      </div>
    )
  } else {
    return (
      <div className={styles.notice_container}>
        <h1 className={styles.notice}>You have not created any link so far!</h1>
        <Link_Shortener userId={userId}/>
      </div>
    )
  }


}