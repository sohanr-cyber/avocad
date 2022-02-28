import React, { useEffect, useState } from "react";
import axios from "axios";
import AddPost from "../components/AddPost";
import styles from "../styles/Profile.module.css";
import style from "../styles/Contact.module.css";

import EditProifle from "../components/EditProifle";
import Navbar from "../components/Navbar";
import Circle from "../components/Circle";
import Image from "next/image";
import Posts from "../components/Post";

const Profile = ({ params }) => {
  console.log(params.id);
  const [token, setToken] = useState("");
  const [data, setData] = useState({});
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [contents, setContents] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [userId, setUserId] = useState({});

  useEffect(async () => {
    const { token, isAdmin, _id } = JSON.parse(
      localStorage.getItem("userInfo")
    );
    setToken(token);
    setAdmin(isAdmin);
    setUserId(_id);
    try {
      const { data } = await axios.get(`/api/admin/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(data);

      const resp = await axios.get(`/api/${params.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setContents(resp.data);
    } catch (error) {
      console.log(error);
    }
  }, [params.id]);

  return (
    <>
      <div className={style.container} style={{ minHeight: "100vh" }}>
        <Circle
          backgroundColor="green"
          left="-40vh"
          top="-20vh"
          className={style.circle}
        />
        <h1 className={style.title}>Profile</h1>
        <div className={styles.profileContainer}>
          <div className={styles.profileData}>
            {data && (
              <>
                <h2>Name: {data.name}</h2>
                
                <h3>Email: {data.email}</h3>
                <h3>Join: {data.Join}</h3>
                <h3>PaymentHistory: {data.paymentHistory}</h3>
                <h3>Country: {data.country}</h3>
                <h3>NID:{data.Nid}</h3>
                <h3>Purchase: {data.Purchase}</h3>
                
                <h3>Revenue: {data.revenue}</h3>
                <h3>DirectMember: {data.directMember}</h3>
                <h3>TeamMembers: {data.teamMembers}</h3>
                <h3>TotalAsset: {data.totalAsset}</h3>

              </>
            )}
          </div>

          <div className={styles.profilePic}>
          
            <Image
              className={style.avatar}
              src={
                data.picture
                  ? data.picture
                  : "https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_1280.png"
              }
              width="270"
              height="270"
              objectFit="cover"
           
            />
          </div>
        </div>
        <Circle
          backgroundColor="yellow"
          right="-30vh"
          bottom="-60vh"
          className={style.circle}
        />       
      </div>
      <hr/>

     <div className={styles.posts}>
     {contents && contents.map((content) => 
      <Posts key={content._id} content={content} />
     )}
     </div>

    

      {editing && (
        <EditProifle
          key={params.id}
          setEditing={setEditing}
          id={params.id}
          token={token}
          setData={setData}
          data={data}
          admin={admin}
          userId={userId}
        />
      )}

      {open && (
        <AddPost
          setOpen={setOpen}
          id={params.id}
          token={token}
          setContents={setContents}
        />
      )}

      {admin && (
        <button
          type="button"
          className={styles.login_btn}
          style={{position: 'fixed', bottom: '100px',right:"7px"}}

          onClick={(e) => setOpen(true)}
        >
          add post
        </button>
      )}

      {(admin || params.id == userId) && (
        <button
          type="button"
          className={styles.login_btn}
          style={{position: 'fixed', bottom: '7px',right:"7px"}}
          onClick={(e) => setEditing(true)}
        >
          UPDATE PROFILE
        </button>
      )}
    </>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;

  console.log(params);
  return {
    props: { params }, // will be passed to the page component as props
  };
}
export default Profile;
