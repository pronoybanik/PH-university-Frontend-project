import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/forms/PHForm";
import PHSelect from "../../../components/forms/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useAddAcademicSemestersMutation } from "../../../redux/features/admin/academicmanagementApi";
import { toast } from "sonner";
import { TResponse } from "../../../types/global";

// create current year and next 5 year data function
const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemestersMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse;

      if (res?.data?.success === true) {
        toast.success(res?.data?.message, { id: toastId });
      } else if (res?.error?.data?.success === false) {
        toast.error(res?.error?.data?.message || "An error occurred", {
          id: toastId,
        });
      } else {
        toast.error("Unexpected response from the server", { id: toastId });
      }
      console.log(res);
      
    } catch (error) {
      console.error("Error in API call:", error);
      toast.error(error?.response?.data?.message || "Something went wrong", {
        id: toastId,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PHSelect label="Name" name="name" options={semesterOptions} />
          <PHSelect label="Year" name="year" options={yearOptions} />
          <PHSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PHSelect label="End Month" name="endMonth" options={monthOptions} />

          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
