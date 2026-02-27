import { useEffect, useState } from "react";

import ExerciseDetails from "@/components/ExerciseDetails";
import UniversalModal from "@/components/UniversalModal";
import ExerciseForm from "@/components/ExerciseForm";
import LoaderSVG from "@/assets/img/loader.svg";
import {
  useExercises,
  useModal,
  useUserData,
} from "../hooks/accessor/ContextAccessors";

import { useWorkoutTypes } from "../hooks/useWorkoutTypes";
//! TODO: Work on Dropdown filtering
const Home = () => {
  const { exercises } = useExercises();
  const { workoutTypes } = useWorkoutTypes();

  const { openModal } = useModal();
  const { currentLoading: loading } = useUserData();

  const [dropdown, setDropdown] = useState(false);

  //! Search Bar
  const [searchTerm, setSearchTerm] = useState("");

  //! Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  //! Dropdown
  const [selectedType, setSelectedType] = useState("");

  let result = exercises || [];

  if (searchTerm) {
    result = result.filter((ex) =>
      ex.title?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }

  if (selectedType) {
    result = result.filter((ex) => ex.workoutType?.name === selectedType);
  }

  const filteredExercises = result;

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
              value={selectedType}
              style={{ width: selectedType != "" ? "120px" : "" }}
              onClick={(e) => {
                e.stopPropagation();
                setDropdown((x) => !x);
              }}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {selectedType || "All"}
            </button>

            {dropdown && (
              <ul className="dropdown-menu dropdown-menu-end show">
                {selectedType !== "" && (
                  <>
                    <li>
                      <button
                        onClick={(e) => {
                          setDropdown((x) => !x);
                          setSelectedType(e.target.value);
                        }}
                        value=""
                        className="dropdown-item"
                      >
                        All
                      </button>
                    </li>
                  </>
                )}
                {workoutTypes
                  .filter((type) => type.value !== selectedType)
                  .map((type) => {
                    return (
                      <li key={type._id}>
                        <button
                          onClick={(e) => {
                            setDropdown((x) => !x);
                            setSelectedType(e.target.value);
                          }}
                          value={type.name}
                          className="dropdown-item"
                        >
                          {type.name}
                        </button>
                      </li>
                    );
                  })}
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
