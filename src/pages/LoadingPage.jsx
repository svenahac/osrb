import LoginPage from "./LoginPage";
import HomePage from "./HomePage";
import { useState, useEffect } from "react";
import { useUserStore } from "../stores/user";
import { supabase } from "../supabase/supabase";

export default function LoadingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  async function getUser() {
    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    setIsLoggedIn(user);
  }

  useEffect(() => {
    getUser();
  }, []);

  if (!isLoggedIn) return <LoginPage />;

  return <HomePage />;
}
