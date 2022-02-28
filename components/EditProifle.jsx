import axios from "axios";
import React, { useState } from "react";
import styles from "../styles/EditProfile.module.css";
import style from "../styles/Contact.module.css";
import Circle from "../components/Circle";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "../utils/firebase";
import Link from "next/link";

const EditProifle = ({
  id,
  token,
  setData,
  setEditing,
  data,
  userId,
  admin,
}) => {
  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState(data);

  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    console.log({ ...profile });
    try {
      const { data } = await axios.put(`api/admin/${id}`, profile, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData((prev) => ({ ...prev, ...data }));
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setEditing(false);
      console.log(data);
    } catch (error) {
      console.log(error);
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
          setProfile({ ...profile, picture: downloadURL });
          setLoading(false);
        });
      }
    );
  };

  return (
    <div className={styles.profileContainer}>
      <div className={style.container} style={{ overflowY: "scroll" }}>
        ..
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
        <h1 className={style.title}>Update Profile</h1>
        <form className={style.form}>
          {userId == id && (
            <>
              <input
                className={style.inputL}
                style={{ marginBottom: "10px" }}
                type="text"
                placeholder="Name"
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
              <input
                className={style.inputL}
                type="email"
                placeholder="Email"
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
                style={{ marginBottom: "10px" }}
              />
              <h2 style={{ fontWeight: "normal", color: "rgb(118,118,118)" }}>
                Profile Photo
              </h2>
              <input
                className={style.inputL}
                type="file"
                placeholder="Image"
                onChange={handleFile}
                style={{ marginBottom: "-10px", marginTop: "-15px" }}
              />
            </>
          )}

          {admin && (
            <>
              <input
                className={style.inputL}
                type="text"
                placeholder="NID"
                onChange={(e) =>
                  setProfile({ ...profile, Nid: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />
              <input
                className={style.inputL}
                type="text"
                placeholder="Joined"
                onChange={(e) =>
                  setProfile({ ...profile, Join: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />

              <input
                className={style.inputL}
                type="text"
                placeholder="Purchase"
                onChange={(e) =>
                  setProfile({ ...profile, Purchase: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />
              <input
                className={style.inputL}
                type="text"
                placeholder="Country"
                onChange={(e) =>
                  setProfile({ ...profile, country: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />

              <input
                className={style.inputL}
                type="text"
                placeholder="revenue"
                onChange={(e) =>
                  setProfile({ ...profile, revenue: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />

              <input
                className={style.inputL}
                type="text"
                placeholder="directMember"
                onChange={(e) =>
                  setProfile({ ...profile, directMember: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />

              <input
                className={style.inputL}
                type="text"
                placeholder="teamMembers"
                onChange={(e) =>
                  setProfile({ ...profile, teamMembers: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />

              <input
                className={style.inputL}
                type="text"
                placeholder="totalAsset"
                onChange={(e) =>
                  setProfile({ ...profile, totalAsset: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />

              <input
                className={style.inputL}
                type="text"
                placeholder="paymentHistory"
                onChange={(e) =>
                  setProfile({ ...profile, paymentHistory: e.target.value })
                }
                style={{ marginBottom: "5px" }}
              />
            </>
          )}
          {loading ? (
            <div>
              <h1>uploading image ...</h1>
            </div>
          ) : (
            // onClick={(e) => setEditing(false)}
            <>
              <button
                className={style.button}
                style={{ backgroundColor: "red" }}
                onClick={(e) => setEditing(false)}
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

export default EditProifle;
