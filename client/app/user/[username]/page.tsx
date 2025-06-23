"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const User = () => {
  const [user, setUser] = useState([]);
  const { username } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userRes = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/user/username/${username}`
        );
        const userData = await userRes.json();
        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);
  return (
    <div>
      User: <code>{JSON.stringify(user)}</code>
    </div>
  );
};

export default User;
