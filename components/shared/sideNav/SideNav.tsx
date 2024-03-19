"use client";
import { Button } from "@/components/ui/button";
import styles from "./sideNav.module.css";
import { sideNavLinks } from "@/constants/index";
import { SignOutButton, SignedIn, useAuth } from "@clerk/nextjs";
import { FiMenu } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

export default function SideNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const { userId } = useAuth();

  const handleClick = (e: any) => {
    setOpen(!open);
  };
  const handleRedirect = (route: string) => {
    setOpen(false); // Cerrar el menú al hacer clic en un enlace
    router.push(`/${userId}${route}`);
  };

  return (
    <>
      <section className={styles.side_nav}>
        <div className={styles.side_nav_head}>
          <Link href={"/"}>
            <Image
              src="/assets/shrinkify_gradient.svg"
              width={50}
              height={50}
              alt="Shrink Logo"
              className={styles.logo}
            />
          </Link>

          <Button
            className={styles.button}
            onClick={() => router.push(`/${userId}/links/create`)}
          >
            Create Link
          </Button>
        </div>
        <div className={styles.separator} />
        <div className={styles.menu}>
          <div className={styles.links_group}>
            {sideNavLinks.map((link) => {
              return (
                <Link href={`/${userId}${link.route}`} key={link.label}>
                  <div className={styles.link}>
                    <Image
                      src={link.imgURL}
                      width={25}
                      height={25}
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
        <div className={styles.menu_head}>
          <Button onClick={handleClick} className={styles.drop_btn}>
            <FiMenu size={30} color="#5bd375" />
          </Button>
          <Link href={"/"}>
            <Image
              src="/assets/shrinkify_gradient.svg"
              width={40}
              height={40}
              alt="Shrink Logo"
              className={styles.logo}
            />
          </Link>
        </div>
      </section>
      {open ? (
        <div className={styles.menu_options}>
          {sideNavLinks.map((link, index) => {
            return (
              
                <div 
                onClick={() => handleRedirect(link.route)}
                  key={index}
                  className={styles.drop_menu_link}>
                  <Image
                    src={link.imgURL}
                    width={15}
                    height={15}
                    alt={link.label}
                  />
                  <p className={styles.text}>{link.label}</p>
                </div>

            );
          })}
        </div>
      ) : null}
    </>
  );
}
