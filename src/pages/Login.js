import { useSelector } from "react-redux";
import LoginButton from "../components/LoginButton";
import { Fragment } from "react";

const Login = () => {
  const isLogined = useSelector((state) => state.ui.isLogined);
  return (
    <Fragment>
      <LoginButton />
    </Fragment>
  );
};
export default Login;
