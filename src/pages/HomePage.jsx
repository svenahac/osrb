import { useLayoutEffect, useState } from "react";
import { handleLogout } from "../api/auth";
import { useUserStore } from "../stores/user";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingMidsection from "../components/LandingMidsection";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userData = useUserStore((state) => state.userData);
  console.log(userData);

  if (!user) {
    return (
      <div className="relative bg-gray-100 h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <Header />
      <LandingMidsection />
      <Footer />
    </div>
  );
}
