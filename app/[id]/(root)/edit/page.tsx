'use client'
import { useAuth } from '@clerk/nextjs';
import styles from './edit.module.css';
import { redirect, useRouter } from 'next/navigation';
import { fetchUser } from '@/lib/actions/user.actions';
import { useEffect, useState } from 'react';
import { fetchLinkById } from '@/lib/actions/link.actions';


export default  function Page({ params }: { params: { id: string } }) {
  const { userId } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState('') 
  const [link, setLink] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetchUser(userId || '');
      setUser(userData);
      const linkData = await fetchLinkById(params.id);
      setLink(linkData);
      if ( ! linkData ) redirect('/')
      if ( ! userData.links.includes(params.id)) router.push('/')
    };

    if (!userId) {
      redirect('/');
    } else {
      fetchData();
    }
  }, [userId, params.id]);

  

  if ( !userId ) redirect('/')

  return (
    <div className={styles.main_container}>
      <h1>edit link</h1>
    </div>
  )
}