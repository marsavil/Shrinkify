"use client";
import { Button } from "@/components/ui/button";
import styles from "./sideNav.module.css";
import { sideNavLinks } from "@/constants/index";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { userId } = useAuth();

  return (
    <>
      <section className={styles.side_nav}>
        <div className={styles.menu}>
          <Image
            src="/assets/shrinkify.svg"
            width={90}
            height={90}
            alt="Shrink Logo"
            className={styles.logo}
          />
          <div className={styles.separator} />
          <div className={styles.links_group}>
            {sideNavLinks.map((link) => {
              return (
                <Link href={`/${userId}${link.route}`} key={link.label}>
                  <div className={styles.link}>
                    <Image
                      src={link.imgURL}
                      width={30}
                      height={30}
                      alt={link.label}
                    />
                    <p className={styles.text}>{link.label}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <section className={styles.side_nav_mobile}>
        <div className={styles.menu_dropdown}>
          <FiMenu size={30} color="#5bd375" />
        </div>
        <Image
          src="/assets/shrinkify.svg"
          width={70}
          height={70}
          alt="Shrink Logo"
          className={styles.logo}
        />
      </section>
    </>
  );
}
