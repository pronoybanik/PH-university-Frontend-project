import { Form, Select } from "antd";


const PHSelect = ({ label }) => {

  return (
    <Form.Item label={label}>
      <Select
        defaultValue="lucy"
        style={{ width: 120 }}
        options={[
          { value: "pronoy", label: "pronoy" },
          { value: "pronoy2", label: "pronoy2" },
        ]}
      />
    </Form.Item>
  );
};

export default PHSelect;
