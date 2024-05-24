"use client";
import { MyDashboard } from "@/components/component/joinClassroom";
import userAtom from "@/src/atoms/userAtom";
import { useRouter } from "next/navigation";
import React, { useLayoutEffect } from "react";
import { useRecoilValue } from "recoil";

const Dashboard = () => {
  const router = useRouter();
  const user = useRecoilValue(userAtom);

  useLayoutEffect(() => {
    if (Object.keys(user).length === 0 && user.constructor === Object) {
      router.push("/");
    }
  }, [user]);

  console.log("User name", user);

  return (
    <div className="flex items-center justify-center h-screen">
      <MyDashboard />
    </div>
  );
};

export default Dashboard;
