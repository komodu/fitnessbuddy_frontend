import { useEffect, useState, useContext } from "react";
import {
  ExercisesContext,
  ModalContext,
  CurrentContext,
} from "@/context/Context";
import ExerciseDetails from "@/components/ExerciseDetails";
import UniversalModal from "@/components/UniversalModal";
import ExerciseForm from "@/components/ExerciseForm";
import LoaderSVG from "@/assets/img/loader.svg";

//! TODO: Work on Dropdown filtering
const Home = () => {
  const { exercises } = useContext(ExercisesContext);
  const { openModal } = useContext(ModalContext);

  const { currentLoading: loading } = useContext(CurrentContext);

  const [dropdown, setDropdown] = useState(false);

  //! Search Bar
  const [searchTerm, setSearchTerm] = useState("");

  //! Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Filter based on search
  const filteredExercises = (exercises || []).filter((ex) =>
    (ex.title || "").toLowerCase().includes((searchTerm || "").toLowerCase()),
  );

  // Reset to page 1 whenever user searches
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Pagination logic
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentExercises = filteredExercises.slice(indexOfFirst, indexOfLast);

  // Total pages for pagination
  const totalPages = Math.ceil(filteredExercises.length / itemsPerPage);

  if (loading) {
    return (
      <div className="container-fluid home d-flex justify-content-center align-items-center min-vh-100">
        <img src={LoaderSVG} style={{ width: 60, height: 60 }} />
      </div>
    );
  }

  return (
    <div className="container-fluid home px-3 px-md-5">
      <UniversalModal />

      {/* Action Button */}
      <div className="row mb-4 ">
        <div className="col d-flex justify-content-center justify-content-md-end">
          <button
            className="btn btn-primary btn-lg w-100 w-md-auto"
            onClick={() => openModal("Exercise Form", <ExerciseForm />)}
          >
            Add Exercise
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className="card p-4 shadow-md">
        <div className="input-group w-100">
          <input
            type="text"
            className="form-control flex-grow-1"
            placeholder="Search exercise..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="dropdown">
            <button
              className="btn btn-outline-secondary dropdown-toggle"
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setDropdown((x) => !x);
              }}
            >
              Dropdown
            </button>

            {dropdown && (
              <ul className="dropdown-menu dropdown-menu-end show">
                <li>
                  <button className="dropdown-item">Action</button>
                </li>
                <li>
                  <button className="dropdown-item">Another action</button>
                </li>
                <li>
                  <button className="dropdown-item">Something else here</button>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <button className="dropdown-item">Separated link</button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Exercise Grid */}
      <div className="card p-4 shadow-sm">
        {!filteredExercises || filteredExercises.length === 0 ? (
          <div className="row text-center">
            <div className="col">
              <img src="./images/warning.png" height="80" alt="No data" />
              <p className="mt-2">No Data fetched</p>
            </div>
          </div>
        ) : (
          <div className="row g-3">
            {currentExercises.map((ex) => (
              <div key={ex._id} className="col-12 col-sm-6 col-lg-4 col-xl-3">
                <ExerciseDetails exercise={ex} />
              </div>
            ))}

            {/* Pagination Buttons */}
            <div className="mt-4 d-flex justify-content-center align-items-center">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`btn btn-outline-primary me-2 ${
                    currentPage === i + 1 ? "active" : ""
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
