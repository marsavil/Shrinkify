
"use client";
/// <reference path="types.d.ts" />
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { PiSignIn, PiSignOut } from "react-icons/pi";
import Link from "next/link";
import UserIcon from "../userIcon/UserIcon";
import { fetchUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import styles from "./topbar.module.css";

const Topbar = ({ userId }: { userId: string }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [showSearchInput, setShowSearchInput] = useState(false); // Estado para controlar la visibilidad del input de búsqueda

  console.log(user)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await fetchUser(userId);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearchClick = () => {
    setShowSearchInput(true); // Mostrar el input de búsqueda al hacer clic en el icono de búsqueda

    setTimeout(() => {
      setShowSearchInput(false);
    }, 5000);
  };


  return (
    <nav className={styles.topbar}>
      <div className={styles.topbar_items}>
        {showSearchInput ? (
          <input
            type="text"
            placeholder="Search..."
            className={styles.search_input}
          />
        ) : (
          <FiSearch
            size={20}
            color="#5bd375"
            onClick={handleSearchClick} // Agregar onClick para mostrar el input de búsqueda al hacer clic en el icono de búsqueda
          />
        )}
        {userId ? (
          <>
            <div className={styles.user}>
              <UserIcon userImage={user?.image} size={30} />
              <span className={styles.username}>{user?.username}</span>
              <SignOutButton signOutCallback={() => router.push('/')}>
                <div className={styles.user}>
                  <PiSignOut size={30} color="#5bd375" />
                  <p className={styles.logout}>Logout</p>
                </div>
              </SignOutButton>
            </div>
          </>
        ) : (
          <div >
            <Link href="/sign-up" className={styles.user}>
              <PiSignIn size={30} color="#5bd375" />
              <span className={styles.login}>Log in</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Topbar;
