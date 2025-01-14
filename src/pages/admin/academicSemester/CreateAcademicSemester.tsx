import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/forms/PHForm";
import PHSelect from "../../../components/forms/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <PHSelect label="name" />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
