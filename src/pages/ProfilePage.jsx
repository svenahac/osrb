import Header from "../components/Header";
import Footer from "../components/Footer";

function ProfilePage() {
  return (
    <div>
      <Header />
      <div className="relative h-screen flex items-center justify-center bg-bg bg-center bg-cover">
        <div className="relative z-10 text-center px-4 md:px-8">Profile</div>
      </div>
      <Footer />
    </div>
  );
}
export default ProfilePage;
