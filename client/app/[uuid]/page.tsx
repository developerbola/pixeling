"use client";

import { useParams } from "next/navigation";

const Image = () => {
  const { uuid } = useParams();
  return <div>Image: {uuid}</div>;
};

export default Image;
