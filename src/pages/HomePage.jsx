import { useEffect, useState } from "react";
import { useUserStore } from "../stores/user";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import CardComponent from "../components/Card";
import SearchBar from "../components/SearchBar";
import { supabase } from "../supabase/supabase";

export default function HomePage() {
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const userData = useUserStore((state) => state.userData);
  const [posts, setPosts] = useState([]);

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
      <div className="relative h-screen flex flex-col items-center justify-center bg-bg bg-center bg-cover">
        <SearchBar />
        <div className="relative z-10 text-center px-4 md:px-8">
          <div className="flex justify-center gap-4 flex-wrap p-4">
            {renderPosts()}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
