
import AccountProfile from "@/components/shared/accoutProfile/AccountProfile";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import styles from "./page.module.css";

export default async function Page() {
  const user = await currentUser();
  const userDB = await fetchUser(user.id);
  const userData = {
    id: user?.id,
    objectId: userDB?._id,
    username: userDB?.username || user?.username,
    name: userDB?.name || user?.firstName || '',
    image: userDB?.image ||user?.imageUrl
  };
  if (userDB?.onboarded ) redirect( '/')

  return (
    <main className={styles.mainContainer}>
      <h1 className={styles.heading}>Onboarding</h1>
      <p className={styles.description}>Complete your profile to continue</p>
      <section className={styles.container}>
        <AccountProfile 
          user={ userData }
          btnTitle='Continue'
        />
      </section>
    </main>
  );
}