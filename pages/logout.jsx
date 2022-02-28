import { useRouter } from "next/router";
import Circle from "../components/Circle";
import style from "../styles/Contact.module.css";
import React from "react";

const logout = () => {
  const router = useRouter();
  const handleLogout = async (e) => {
    e.preventDefault();
    localStorage.removeItem("userInfo");
    router.push("/login");
  };

  const cancelLogout = async (e) => {
    e.preventDefault();
    const { _id } = JSON.parse(localStorage.getItem("userInfo"));
    console.log(_id);
    router.push(`/${_id}`);
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
      <h1 className={style.title} style={{textAlign: 'center'}}>Are You Sure to Login ?</h1>
      <form className={style.form}>
        <button className={style.button} onClick={handleLogout} style={{height:"50px" ,backgroundColor:"red"}}>
          Yes
        </button>

        <button className={style.button} onClick={cancelLogout} style={{height:"50px"}}>
          No
        </button>
      </form>
    </div>

    // <div>
    //     <div>Are Your sure to Logout?</div>
    //     <div onClick={handleLogout}>Yes</div>
    // </div>
  );
};

export default logout;
