import React, { useState } from "react";
import styles from "../styles/Login.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import style from "../styles/Contact.module.css";
import Circle from "../components/Circle";
import Link from "next/link";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, password });
      const { data } = await axios.post("/api/login", {
        email,
        password,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push(`/${data._id}`);
      console.log(data);
    } catch (err) {
      console.log(err);
      setError(
        "Something went wrong,Make sure Your have written correct password and email"
      );
    }
  };
  return (
    <div className={style.container}>
      <Circle
        backgroundColor="green"
        left="-40vh"
        top="-20vh"
        className={style.circle}
      />
      <Circle
        backgroundColor="yellow"
        right="-30vh"
        bottom="-60vh"
        className={style.circle}
      />
      <h1 className={style.title}>Get in Touch</h1>
      <form className={style.form}>
        <input
          className={style.inputL}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={style.inputL}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className={style.error}>{error}</div>
        <button className={style.button} onClick={handleSubmitLogin}>
          SUBMIT
        </button>
        <h3>
          Don't have Account ?
          <span style={{ marginLeft: "10px",color:"green" }}>
            <Link href="/register">REGISTER</Link>
          </span>
        </h3>
      </form>
    </div>

    // <div className={styles.inner_container}>

    //   <div className={styles.header}>Login</div>
    //   <div className={styles.box}>
    //     <div className={styles.input_group}>
    //       <label htmlFor="emial">Email</label>
    //       <input
    //         type="email"
    //         name="email"
    //         className={styles.login_input}
    //         placeholder="Email"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </div>

    //     <div className={styles.input_group}>
    //       <label htmlFor="password">Password</label>
    //       <input
    //         type="password"
    //         name="password"
    //         className={styles.login_input}
    //         placeholder="Password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>

    //     <button
    //       type="button"
    //       className={styles.login_btn}
    //       onClick={handleSubmitLogin}
    //     >
    //       Login
    //     </button>
    //   </div>
    // </div>
  );
};

export default login;
