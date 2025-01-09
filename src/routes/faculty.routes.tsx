import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import FacultyOfferedCourse from "../pages/faculty/FacultyOfferedCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "faculty Offered Course",
    path: "faculty-offered-course",
    element: <FacultyOfferedCourse />,
  },
];
