import { useSelector } from "react-redux";
import LoginButton from "../components/LoginButton";
import { Fragment } from "react";
import LogoutButton from "../components/LogoutButton";

const Login = () => {
  const isLogined = useSelector((state) => state.ui.isLogined);
  console.log(isLogined);
  return (
    <Fragment>
      {isLogined === true ? <LogoutButton /> : <LoginButton />}
    </Fragment>
  );
};
export default Login;
