"use client";
import Link from "next/link";
import styles from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useLogoutMutation } from "../GlobalRedux/features/api/usersApiSlice";
import { logout } from "../GlobalRedux/features/auth/authSlice";
import { useRouter } from "next/navigation";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const [dropdown, setDropdown] = useState(false);
  const router = useRouter();

  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className={styles.nav}>
      <h2>
        <Link href="/">MERN-AUTH</Link>
      </h2>
      <ul>
        {userInfo ? (
          <div className={styles.dropdownmain}>
            <p className={styles.name} onClick={() => setDropdown(!dropdown)}>
              {userInfo.data.name} 👇
            </p>
            {dropdown && (
              <div className={styles.dropdown}>
                <Link href="/profile">Profile</Link>
                <p onClick={logoutHandler}>Logout</p>
              </div>
            )}
          </div>
        ) : (
          <>
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Header;
