import { useLayoutEffect, useState } from "react";
import { handleLogout } from "../api/auth";
import { useUserStore } from "../stores/user";

import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userData = useUserStore((state) => state.userData);
  const [loading, setLoading] = useState(true);
  console.log(userData);

  if (!user) {
    return <div>loading...</div>;
  }

  return (
    <div className=" min-h-screen flex flex-col justify-center items-center bg-bg1 bg-center ">
      <div className="flex flex-row text-6xl text-white">
        <h1 className="mr-2">OSR</h1> <p>Brewery</p>
      </div>
      <div>{userData.user_metadata.display_name}</div>
      <div className="text-white">
        <button
          onClick={() => {
            handleLogout();
            navigate("/login");
          }}
        >
          LogOut
        </button>
      </div>
    </div>
  );
}
