import Image from "next/image";
import React from "react";
import style from "../styles/Post.module.css";
import Moment from "react-moment";

const Posts = ({ content }) => {
  return (
    <div className={style.postContainer}>
      <h3>Your Structure</h3>
      <div className="">
        
        <Image
          className={style.content}
          src={
            content.content
              ? content.content
              : "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"
          }
          width="270"
          height="270"
          objectFit="cover"
          alt="Image"
        />
      </div>
      <Moment format="YYYY/MM/DD">{content.createdAt}</Moment>
      <hr />
    </div>
  );
};

export default Posts;
