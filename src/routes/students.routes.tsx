import StudentDashboard from '../pages/student/StudentDashboard';
import StudentOfferedCourse from '../pages/student/StudentOfferedCourse';

export const studentPaths = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    element: <StudentDashboard />,
  },
  {
    name: 'Student Offered Course',
    path: 'student-offered-course',
    element: <StudentOfferedCourse />,
  },
];
