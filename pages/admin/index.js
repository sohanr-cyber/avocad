import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import style from "../../styles/Admin.module.css";
import Image from "next/image";

import { uploadString } from "firebase/storage";

const index = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();

  useEffect(async () => {
    const { token } = JSON.parse(localStorage.getItem("userInfo"));
    try {
      const { data } = await axios.get("/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(data);
    } catch (err) {
      setError(err);
    }
  }, []);
  return (
    <>
      <h1 className={style.heading}> Admin Dashboard</h1>
      <div className={style.container}>
        <table>
          <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Revenue</th>
          </tr>

          {users?.map((user) => (
            <>
              <tr>
                <td>
                  <Link href={user._id}>{user.name}</Link>
                </td>
                <td>{user.email}</td>
                <td>{user.revenue}</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </>
  );
};

export default index;
