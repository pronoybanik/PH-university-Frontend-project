import React from "react";
import { useGetAllOfferedCoursesQuery } from "../../redux/features/student/studentCourseManagement.api";

const StudentOfferedCourse = () => {
  const { data } = useGetAllOfferedCoursesQuery(undefined);

  console.log("click", data);
  return <div>student offered course page</div>;
};

export default StudentOfferedCourse;
