"use client";

import { useParams } from "next/navigation";

const Image = () => {
  const { id } = useParams();
  return <div>Image: {id}</div>;
};

export default Image;
