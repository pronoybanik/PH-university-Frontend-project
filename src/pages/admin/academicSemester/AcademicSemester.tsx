import React from "react";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicmanagementApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log(data);

  return <div>academic Semester semester</div>;
};

export default AcademicSemester;
