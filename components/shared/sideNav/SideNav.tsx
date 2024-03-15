"use client";
import { Button } from '@/components/ui/button';
import styles from './sideNav.module.css'
import { sideNavLinks } from "@/constants/index";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <section className={styles.side_nav}>
      <div className={styles.menu}>
        {sideNavLinks.map((link) => {
          return (
            <Link
              href={`/${userId}${link.route}`}
              key={link.label}
              className={styles.link}
            >
              <Image
                src={link.imgURL}
                width={24}
                height={24}
                alt={link.label}
              />
              <p className={styles.text} style={{textDecoration:'none !important'}}>{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}