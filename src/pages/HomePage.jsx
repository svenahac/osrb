import { useEffect, useLayoutEffect, useState } from "react";
import { handleLogout } from "../api/auth";
import { useUserStore } from "../stores/user";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LandingMidsection from "../components/LandingMidsection";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/Card";
import { supabase } from "../supabase/supabase";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userData = useUserStore((state) => state.userData);
  const [posts, setPosts] = useState([]);

  const data = {
    title: "Sample Title",
    description: "Sample Description",
    type: "Sample Type",
    file_path: "390d9a5d-897d-45df-89f7-7908200c9511-Forsen",
  };

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        throw error;
      }
      if (data != null) {
        setPosts(data);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }

  function renderPosts() {
    return posts.map((post) => {
      return <CardComponent data={post} key={post.id} />;
    });
  }

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
      <div className="relative h-screen flex items-center justify-center bg-bg bg-center bg-cover">
        <div className="relative z-10 text-center px-4 md:px-8">
          {renderPosts()}
        </div>
      </div>
      <Footer />
    </div>
  );
}
