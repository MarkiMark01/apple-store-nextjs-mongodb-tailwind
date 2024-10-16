'use client';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import OvalLoader from "./loader/OvalLoader";

const ProtectedRoute = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  if (status === "loading") {
    return <OvalLoader/>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;



