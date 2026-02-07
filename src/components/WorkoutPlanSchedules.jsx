import { useState } from "react";
const WorkoutPlanSchedules = () => {
  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  const items = [
    { title: "Accordion Item #1", content: "This is the first content." },
    { title: "Accordion Item #2", content: "This is the second content." },
    { title: "Accordion Item #3", content: "This is the third content." },
  ];
  console.log("openIndex:", openIndex);
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      {items.map((item, index) => (
        <div key={index} className="border mb-2 rounded">
          <button
            className="btn btn-light w-100 text-start"
            onClick={() => toggle(index)}
          >
            {item.title}
          </button>

          <div
            className={`accordion-body-custom ${
              openIndex === index ? "open" : ""
            }`}
          >
            <div className="p-3">
              {item.content}

              <tr>
                {days &&
                  days.map((day) => (
                    <th className="text-capitalize border border-dark m-2 p-2">
                      {day}
                    </th>
                  ))}
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkoutPlanSchedules;
