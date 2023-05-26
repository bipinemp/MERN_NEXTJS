import { useSelector } from "react-redux";

const page = () => {
  const { userInfo } = useSelector((state) => state.auth);
  return (
    <div>
      <p>
        <b>Name:</b>
        {userInfo.name}
      </p>
      <p>
        <b>Email:</b>
        {userInfo.email}
      </p>
    </div>
  );
};

export default page;
