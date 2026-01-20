import { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { AuthContext } from "../context/AuthContext";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
const ProfileDropDown = () => {
  const { user } = useContext(UserContext);
  const { logout } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) return <p style={{ color: "white", margin: 0 }}>Not logged in</p>;

  const handleLogout = () => logout();

  // Desktop hover
  const handleMouseEnter = () => !isMobile && setShow(true);
  const handleMouseLeave = () => !isMobile && setShow(false);

  // Mobile click
  const toggleMobile = () => isMobile && setShow((prev) => !prev);

  return (
    <Dropdown
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      show={show}
      align="end"
    >
      <Dropdown.Toggle
        id="dropdown-profile"
        className="icon-btn d-flex align-items-center"
        variant="link"
        onClick={toggleMobile}
      >
        <span
          className="material-symbols-outlined"
          style={{ color: "white", fontSize: "32px" }}
        >
          account_circle
        </span>
        {/* Remove caret */}
      </Dropdown.Toggle>

      <Dropdown.Menu container="body">
        <Dropdown.Item as={Link} to="/user-profile">
          User Profile
        </Dropdown.Item>
        <Dropdown.Item as={Link} to="/faq">
          FAQ
        </Dropdown.Item>
        <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default ProfileDropDown;
