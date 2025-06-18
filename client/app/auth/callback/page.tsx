"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const code = searchParams.get("code");

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      if (code) {
        router.replace("/");
      }
    };

    handleOAuthRedirect();
  }, [code]);

  return <div>Signing you in ...</div>;
};

export default Callback;
