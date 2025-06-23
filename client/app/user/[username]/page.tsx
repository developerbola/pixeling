"use client";

import { useParams } from "next/navigation";

const User = () => {
  const { username } = useParams();
  return <div>User: {username}</div>;
};

export default User;
