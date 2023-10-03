import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useRef } from "react";
import { useState } from "react";
import { MdCancel, MdOutlineCheckCircle } from "react-icons/md";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import CustomGoogleButton from "../component/GoogleButton";
import { useDispatch } from "react-redux";
import axios from "axios";
import { actionType } from "../constants/actionType";
import { signUp } from "../actions/auth"

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [matchedpwd, setMatchedpwd] = useState("");

  // submiting state
  const [submiting, setSubmiting] = useState(false);

  const navigate = useNavigate();

  //   initializing dispatch
  const dispatch = useDispatch();

  const cofRef = useRef();
  function clearInp() {
    setMatchedpwd();
    formik.values.passwordConfirm = "";
  }
  // validate from fields
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      firstName: "",
      lastName: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.firstName) {
        errors.emtpyfirstName = "this field can not be empty";
      } else if (!/^[^-\s][a-zA-Z0-9_\s-]{2,}$/.test(values.firstName)) {
        errors.firstNameError = "3 element at least";
      } else if (!values.lastName) {
        errors.emtpylastName = "this field can not be empty";
      } else if (!/^[^-\s][a-zA-Z0-9_\s-]{2,}$/.test(values.lastName)) {
        errors.lastNameError = "3 element at least";
      } else if (!values.email) {
        errors.emtpyUser = "this field can not be empty";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
        errors.email = "invalid Email";
      } else if (!values.password) {
        errors.emtpyPassword = "this field can not be empty";
      } else if (!/^[^-\s][a-zA-Z0-9_\s-]{7,}$/.test(values.password)) {
        errors.passwordError = "8 element at least";
      } else if (!values.passwordConfirm) {
        errors.emtpypasswordConfirm = "this field can not be empty";
      } else if (values.password !== values.passwordConfirm) {
        errors.passwordConfirmError = "8 element at least";
        setMatchedpwd(false);
      } else if (values.password === values.passwordConfirm) {
        setMatchedpwd(true);
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        setSubmiting(true);
        dispatch(signUp(values, navigate));
        setSubmiting(false);
      } catch (err) {
        console.log(err);
      }
    },
  });

  // authenticate with google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      console.log(response.access_token);
      const profile = await fetchUserData(response.access_token);
    },
  });

  // get the user data profile
  const fetchUserData = async (accessToken) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      dispatch({
        type: actionType.AUTH,
        data: { ...response.data, Token: accessToken },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="mx-auto mt-12 w-fit">
      <Card color="transparent" shadow={false}>
        <Typography className="text-center" variant="h4" color="blue-gray">
          Sign in
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="flex flex-col justify-center gap-2">
            <div className="flex  gap-4">
              <div className="flex flex-col justify-between">
                <p className="text-red-600 text-[12px] mb-[2px]  font-semibold ml-1">
                  {formik.touched.firstName && formik.errors.emtpyfirstName}
                </p>
                <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                  {formik.errors.firstNameError}
                </p>
                <Input
                  id="firstName"
                  name="firstName"
                  className="input"
                  size="md"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  label="frist Name"
                />
              </div>
              <div className="flex flex-col justify-between">
                <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                  {formik.touched.lastName && formik.errors.emtpylastName}
                </p>
                <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                  {formik.errors.lastNameError}
                </p>
                <Input
                  id="lastName"
                  name="lastName"
                  size="md"
                  className="input"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  label="last Name"
                />
              </div>
            </div>
            <div>
              <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                {formik.touched.email && formik.errors.emtpyUser}
              </p>
              <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                {formik.errors.email}
              </p>
              <Input
                id="email"
                name="email"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                label="Email"
              />
            </div>
            <div className="relative">
              <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                {formik.touched.password && formik.errors.emtpyPassword}
              </p>
              <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                {formik.errors.passwordError}
              </p>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                size="lg"
                label="Password"
              />
              <div className={`cursor-pointer bottom-4 right-3 absolute `}>
                {!showPassword ? (
                  <PiEyeClosedBold
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="text-[20px]"
                  />
                ) : (
                  <PiEyeBold
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="text-[20px]"
                  />
                )}
              </div>
            </div>
            <div className="relative">
              <p className="text-red-600 text-[12px] mb-[2px] font-semibold ml-1">
                {formik.touched.passwordConfirm &&
                  formik.errors.emtpypasswordConfirm}
              </p>
              <Input
                id="passwordConfirm"
                name="passwordConfirm"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.passwordConfirm}
                label="Confirm"
                type="password"
                ref={cofRef}
              />
              <div className="w-4 h-4 bottom-4 right-3 absolute">
                {matchedpwd === true && formik.values.passwordConfirm ? (
                  <MdOutlineCheckCircle className="text-[20px] scale-110 duration-500 ease-in text-green-600" />
                ) : matchedpwd === false && formik.values.passwordConfirm ? (
                  <MdCancel
                    className="text-[20px] cursor-pointer duration-300 ease-in-out text-red-600"
                    onClick={clearInp}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            {submiting ? <Spinner className="w-6" color="white" /> : "sign up"}
          </Button>
          <CustomGoogleButton login={loginWithGoogle} />
          <Typography color="gray" className="mt-4 text-center font-normal">
            already have an account?{" "}
            <span
              onClick={() => navigate("/Sign-in")}
              className="font-medium cursor-pointer text-blue-800"
            >
              Sign in
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
