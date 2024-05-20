import { useLayoutEffect, useState } from "react";
import { handleLogout } from "../api/auth";
import { useUserStore } from "../stores/user";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroComponent from "../components/HeroComponent";
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
    <div>
      <Header />
      <HeroComponent />
      <Footer />
    </div>
  );
}
