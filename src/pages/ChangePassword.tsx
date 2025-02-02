import { Button, Row } from "antd";
import PHForm from "../components/forms/PHForm";
import PHInput from "../components/forms/PHInput";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useChangePassWordMutation } from "../redux/features/admin/userManagementApi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { TResponse } from "../types/global";

const ChangePassword = () => {
  const [changePassword] = useChangePassWordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type="text" name="oldPassword" label="Old Password" />
        <PHInput type="text" name="newPassword" label="New Password" />
        <Button htmlType="submit">Login</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
