'use server'
import { currentUser } from '@clerk/nextjs';
import styles from './links.module.css';
import { fetchUserLinks } from '@/lib/actions/link.actions';
import LinkCard from '@/components/cards/linkCard/LinkCard';
import { redirect } from 'next/navigation';


export default  async function Links() {
  const user = await currentUser();
  if ( !user ) redirect('/')
  const { id } = user;
  const links = await fetchUserLinks(id);

  return (
    <div className={styles.main_container}>
      { links.map ((link:any, index:any) => (
        <LinkCard key={index} link={link} />
      ))}
    </div>
  )
}