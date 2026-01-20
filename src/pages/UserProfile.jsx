import { useState, useContext, useEffect } from "react";
import { AuthContext } from "@/context/AuthContext";
import DisplayProfile from "../assets/img/user-placeholder.png";
import LoaderSVG from "@/assets/img/loader.svg";
import { ModalContext } from "../context/ModalContext";
import UpdateProfileForm from "../components/UpdateProfileForm";
import UniversalModal from "../components/UniversalModal";

const UserProfile = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const [showLoader, setShowLoader] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [form] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);
    const fetchUser = async () => {
      try {
        const resp = await fetch("/api/auth/profile", {
          method: "GET",
          credentials: "include",
        });

        if (!resp.ok) {
          throw new Error(`HTTP Error: ${resp.status}`);
        }

        const result = await resp.json();
        console.log("Fetch User Result:", result);
        setUser(result);
      } catch (error) {
        console.error("Error in User Profile:", error);
        setError(error.message);
      }
    };
    fetchUser();
    return () => clearTimeout(timer);
  }, []);
  const handleClick = () => {
    openModal("Edit Profile", <UpdateProfileForm />);
  };
  if (!isAuthenticated || error) return <p>{error}</p>;
  if (loading || showLoader) {
    return (
      <div className="user-loading">
        <img
        src={LoaderSVG}
          className="loader-icon"
          style={{ width: "60px", height: "60px" }}
        />
      </div>
    );
  }

  return (
    <div className="container border user-profile py-3 ">
      <div className="container py-4">
        {/* Header / Profile Image */}
        <div className="row justify-content-center text-center mb-4">
          <div className="col-12 col-md-8">
            <h1 className="mb-3">User Profile Page</h1>
            <h2 className="h5 mb-3">Profile Photo</h2>
            <img
              src={DisplayProfile}
              className="rounded-circle img-fluid"
              alt="profile user"
              style={{ maxWidth: "200px" }}
            />
          </div>
        </div>

        {/* User Info */}
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            <div className="mb-3">
              <h4>Name:</h4>
              <p>{user.name}</p>

              <h4>Email:</h4>
              <p>{user.email}</p>

              <h4>Age:</h4>
              <p>{user.age}</p>
            </div>

            {/* Workout Card */}
            <div className="card mt-4">
              <div className="card-header text-center text-md-start">
                <h5 className="mb-0">Workout</h5>
              </div>
              <div className="card-body">
                <p>
                  <strong>Day:</strong> {user.address}
                </p>
                <p>
                  <strong>Split:</strong> {user.phone}
                </p>
                <p>
                  <strong>Rest</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="row justify-content-center mt-4">
          <div className="col-12 col-md-6 d-grid">
            <button className="btn btn-primary btn-lg" onClick={handleClick}>
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <UniversalModal />
      {form && <UpdateProfileForm show={form} />}
    </div>
  );
};

export default UserProfile;
