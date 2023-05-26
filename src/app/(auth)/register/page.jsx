"use client";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useRegisterMutation } from "@/app/GlobalRedux/features/api/usersApiSlice";
import styles from "../loginregister.module.css";
import { setCredentials } from "@/app/GlobalRedux/features/auth/authSlice";

const page = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [register, { isLoading, error }] = useRegisterMutation();

  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Password and ConfirmPassword donot match");
    } else {
      try {
        const res = await register({ name, email, password });
        dispatch(setCredentials({ ...res }));
        if (res.data.status === 201) {
          router.push("/login");
        }
      } catch (err) {
        alert(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className={styles.form}>
      <h1>Register</h1>
      <button>redirect</button>
      <form onSubmit={submitHandler}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          placeholder="Name"
        />
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
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          name="confirmpassword"
          placeholder="Confirm Password"
        />
        {isLoading && <h2>Loading...</h2>}
        <button>Register</button>
      </form>
    </div>
  );
};

export default page;
