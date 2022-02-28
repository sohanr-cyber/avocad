import axios from "axios";
import React, { useEffect, useState } from "react";
import style from "../styles/Contact.module.css";
import Circle from "../components/Circle";
import styles from '../styles/EditProfile.module.css'

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../utils/firebase";


const AddPost = ({ id, token, setContents, setOpen }) => {
  const [error, setError] = useState("");
  const [imageUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitLogin = async (e) => {
    console.log(imageUrl);
    e.preventDefault();

    try {
      const { data } = await axios.post(
        `api/admin/${id}`,
        { content: imageUrl },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log({ data });

      setContents((prev) => [...prev, data]);
      setOpen(false);
    } catch (err) {
      setError(err);
    }
  };

  const handleFile = (e) => {
    setLoading(true);
    const file = e.target.files[0];
    console.log(file);

    // const storage = getStorage();
    const imagesRef = ref(db, `/images/${file.name}`);

    const uploadTask = uploadBytesResumable(imagesRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        console.log(error);
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          setImgUrl(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  return (
    <div className={styles.profileContainer}>
      <div className={style.container}>
        {/* <Circle
          backgroundColor="green"
          left="-40vh"
          top="-20vh"
          className={style.circle}
        /> */}
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
            type="file"
            placeholder="Subject"
            onChange={handleFile}
          />
          {loading ? (
            <div>
              <h1>uploading image ...</h1>
            </div>
          ) : (
            <>
              <button
                className={style.button}
                style={{ backgroundColor: "red" }}
                onClick={(e) => setOpen(false)}
              >
                CANCEL
              </button>
              <button className={style.button} onClick={handleSubmitLogin}>
                UPDATE
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddPost;
