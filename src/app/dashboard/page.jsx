"use client";
import React from "react";
import { useSelector } from "react-redux";

function page() {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <h1>DashBoard</h1>
      <h3>{userInfo?.data?.name}</h3>
    </div>
  );
}

export default page;
