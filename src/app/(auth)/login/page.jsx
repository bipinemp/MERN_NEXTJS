"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "@/app/GlobalRedux/features/api/usersApiSlice";
import { setCredentials } from "@/app/GlobalRedux/features/auth/authSlice";

import { useRouter } from "next/navigation";
// import { toast } from "react-toastify";
import styles from "../loginregister.module.css";

const page = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [login, { isLoading, error }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      dispatch(setCredentials({ ...res }));
      if (res.data.status === 201) {
        router.push("/");
      }
    } catch (err) {
      alert(err?.data?.message || err.error);
      // toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className={styles.form}>
      <h1>Login</h1>

      <form onSubmit={submitHandler}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          placeholder="Password"
        />
        {isLoading && <h2>Loading...</h2>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default page;
