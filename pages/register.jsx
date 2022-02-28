import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import style from "../styles/Contact.module.css";
import Circle from "../components/Circle";
import Link from "next/link";

const login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [pic, setPic] = useState("");
  const [payMentMethod, setPaymentMethod] = useState("");
  const [country, setCountry] = useState("");
  const [Nid, setNid] = useState("");

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      console.log({ email, password, country });
      const { data } = await axios.post("/api/register", {
        email,
        password,
        country,
        payMentMethod,
        Nid,
        name,
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      router.push(`/${data._id}`);
      console.log(data);
    } catch (error) {
      console.log(error);
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
          style={{marginBottom:"10px"}}
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className={style.inputL}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          style={{marginBottom:"10px"}}
        />
        <input
          className={style.inputL}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{marginBottom:"10px"}}
        />
        <input
          className={style.inputL}
          type="text"
          placeholder="NID"
          onChange={(e) => setNid(e.target.value)}
          style={{marginBottom:"10px"}}
          
        />
        <input
          className={style.inputL}
          type="text"
          placeholder="Submit Binance Trc20 (usdt)"
          onChange={(e) => setPaymentMethod(e.target.value)}
          style={{marginBottom:"10px"}}
        />
        <input
          className={style.inputL}
          type="text"
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
        />
        {/* <input className={style.inputS} type="file" placeholder="Your Image" /> */}

        <button className={style.button} onClick={handleSubmitLogin}>
          SUBMIT
        </button>
        <h3>
          Already have Account ?
          <span style={{ marginLeft: "10px",color:"green" }}>
            <Link href="/login">LOGIN</Link>
          </span>
        </h3>
      </form>
    </div>
    // <div className={styles.inner_container}>
    //   <Navbar />
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
    //       <label htmlFor="name">Name</label>
    //       <input
    //         type="name"
    //         name="name"
    //         className={styles.login_input}
    //         placeholder="Name"
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //     </div>

    //     <div className={styles.input_group}>
    //       <label htmlFor="Nid">NID</label>
    //       <input
    //         type="name"
    //         name="Nid"
    //         className={styles.login_input}
    //         placeholder="NID"
    //         onChange={(e) => setNid(e.target.value)}
    //       />
    //     </div>
    //     <div className={styles.input_group}>
    //       <label htmlFor="payMentMethod">paymentMethod()</label>
    //       <input
    //         type="name"
    //         name="payMentMethod"
    //         className={styles.login_input}
    //         placeholder="Your PayMent Method"
    //         onChange={(e) => setPaymentMethod(e.target.value)}
    //       />
    //     </div>
    //     <div className={styles.input_group}>
    //       <label htmlFor="country">coutnry</label>
    //       <input
    //         type="name"
    //         name="country"
    //         className={styles.login_input}
    //         placeholder="Your Country"
    //         onChange={(e) => setCountry(e.target.value)}
    //       />
    //     </div>

    //     <div className={styles.input_group}>
    //       <label htmlFor="country">Make passwords</label>
    //       <input
    //         type="password"
    //         name="country"
    //         className={styles.login_input}
    //         placeholder="Your Password"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </div>
    //     <button
    //       type="button"
    //       className={styles.login_btn}
    //       onClick={handleSubmitLogin}
    //     >
    //       register
    //     </button>
    //   </div>
    // </div>
  );
};

export default login;
