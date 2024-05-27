import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useUserStore } from "../stores/user";
import CardComponent from "../components/Card";
import ProfileHeader from "../components/ProfileHeader";
function ProfilePage() {
  const [posts, setPosts] = useState([]);

  const user = useUserStore((state) => state.user);
  const userData = useUserStore((state) => state.userData);

  useEffect(() => {
    getPosts();
  }, []);

  async function getPosts() {
    try {
      const { data, error } = await supabase
        .from("content")
        .select("*")
        .eq("user_id", userData.id)
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
        <ProfileHeader userData={userData} />

        <div className="flex justify-center text-center gap-4 flex-wrap p-4">
          {renderPosts()}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ProfilePage;
