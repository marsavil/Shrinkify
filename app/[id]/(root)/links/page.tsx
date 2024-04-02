'use server'
import { currentUser } from '@clerk/nextjs';
import styles from './links.module.css';
import { fetchUserLinks } from '@/lib/actions/link.actions';
import LinkCard from '@/components/cards/linkCard/LinkCard';


export default  async function Links() {
  const user = await currentUser();
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