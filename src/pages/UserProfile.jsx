import { useState, useContext, useEffect } from "react";
import { AuthContext, ModalContext } from "@/context/Context";
import DisplayProfile from "../assets/img/user-placeholder.png";
import LoaderSVG from "@/assets/img/loader.svg";
import UpdateProfileForm from "../components/UpdateProfileForm";
import UniversalModal from "../components/UniversalModal";
import { UserDataContext } from "../context/Context";

//! TODO: Check Validations, possible crashes (null values)
//! TODO: Check Error Handlers

//! TODO: Display workout splits per Day in the table that depends on the cxurrent active user workout plan (coming from backend)
//! TODO: Work on Photo functionality

//! TODO: Work on getting activeplan's exercises
//! Either filter activeplan in templates and display it or refactor backend
const UserProfile = () => {
  const { userInfo, isAuthenticated, loading } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const { activePlan, templates } = useContext(UserDataContext);
  // const [showLoader, setShowLoader] = useState(true);
  const [error, setError] = useState(null);
  const [form] = useState(false);

  useEffect(() => {
    console.log("userInfo: ", userInfo);
  }, [userInfo]);
  const handleClick = () => {
    openModal("Edit Profile", <UpdateProfileForm payload={userInfo} />);
  };
  if (!isAuthenticated || error) return <p>{error}</p>;
  if (loading) {
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
              {userInfo && <p>{userInfo.name}</p>}

              <h4>Email:</h4>
              {userInfo && <p>{userInfo.email}</p>}

              <h4>Age:</h4>
              {userInfo && <p>{userInfo.age}</p>}
            </div>

            {/* Workout Card */}

            <div className="card mt-4">
              <div className="card-header text-center text-md-start">
                <h5 className="mb-0">Workout</h5>
              </div>
              <div className="card-body">
                <h6>
                  <strong>
                    Current Workout Plan:{" "}
                    <span className="text-capitalize">
                      {activePlan && activePlan.planTemplate?.name}
                    </span>
                  </strong>
                </h6>
                <h6>
                  <strong>
                    Start Date:{" "}
                    <span className="text-capitalize">
                      {activePlan && activePlan.planTemplate?.name}
                    </span>
                  </strong>
                </h6>
                <h6>
                  <strong>
                    End Date:{" "}
                    <span className="text-capitalize">
                      {activePlan && activePlan.planTemplate?.name}
                    </span>
                  </strong>
                </h6>
                <p>
                  <strong>
                    Days :{" "}
                    <span className="text-capitalize">
                      {activePlan && activePlan.planTemplate?.daysPerWeek}
                    </span>{" "}
                  </strong>
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
