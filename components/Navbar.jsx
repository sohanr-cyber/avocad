import React, { useEffect, useState } from "react";
import Link from "next/link";
import style from "../styles/Navbar.module.css";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    userInfo && setUser(userInfo);
  }, []);
  return (
    <div className={style.container}>
      <Link href="/">AV0CAD0</Link>
      <ul className={style.list}>
  
        <li className={style.listItem}>
          <Link href="/">HOME</Link>
        </li>
        <li className={style.listItem}>
          <Link href="/contact">CONTACT</Link>
        </li>
        {user ? (
          <>
           
            <li className={style.listItem} style = {{padding:"20px"}}>
              <Link href={user._id}>PROFILE</Link>
            </li>
            <li className={style.listItem}>
              <Link href="/logout">LOGOUT</Link>
            </li>
          </>
        ) : (
          <>
            <li className={style.listItem}>
              <Link href="/register">REGISTER</Link>
            </li>
            <li className={style.listItem}>
              <Link href="/login">LOGIN</Link>
            </li>
          </>
        )}
       
      </ul>
      <div className={style.hamburger} onClick={() => setOpen(!open)}>
        <div className={style.line} />
        <div className={style.line} />
        <div className={style.line} />
      </div>
      <ul
        onClick={() => setOpen(false)}
        className={style.menu}
        style={{ right: open ? "0px" : "-50vw" }}
      >
        <li className={style.menuItem}>
          <Link href="/">HOME</Link>
        </li>
        <li className={style.menuItem}>
          <Link href="/contact">CONTACT</Link>
        </li>

        {user ? (
          <>
            <li className={style.menuItem}>
              <Link href={user._id}>PROFILE</Link>
            </li>
            <li className={style.menuItem}>
              <Link href="/logout">LOGOUT</Link>
            </li>
          </>
        ) : (
          <>
            <li className={style.menuItem}>
              <Link href="/register">REGISTER</Link>
            </li>
            <li className={style.menuItem}>
              <Link href="/login">LOGOUT</Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
