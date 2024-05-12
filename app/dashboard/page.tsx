"use client";
import userAtom from "@/src/atoms/userAtom";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";

const Dashboard = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  useLayoutEffect(() => {
    // Check if user is an empty object and redirect to "/" route if true
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      router.push("/");
    }
  }, [user]);

  console.log("User name", user);

  return <h1>Dashboard</h1>;
};

export default Dashboard;
