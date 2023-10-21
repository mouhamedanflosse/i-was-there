import {
  Card,
  Input,
  Button,
  Typography,
  Spinner,
} from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import CustomGoogleButton from "../component/GoogleButton";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { actionType } from "../constants/actionType";
import { signIn } from "../actions/auth";
import { googleAuth } from "../actions/auth";

export default function SignIn({ darkMode }) {
  const [showPassword, setShowPassword] = useState(false);
  const { loading } = useSelector((state) => state.auth);

  // submiting state
  const [submiting, setSubmiting] = useState(false);

  const dispatch = useDispatch();
  // initialize useNvigate
  const navigate = useNavigate();
  // validate from fields
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.emtpyUser = "this field can not be empty";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.email)) {
        errors.email = "invalid email";
      } else if (!values.password) {
        errors.emtpyPassword = "this field can not be empty";
      } else if (!/^[^-\s][a-zA-Z0-9_\s-]{7,}$/.test(values.password)) {
        errors.password = "8 element at least";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        dispatch(signIn(values, navigate));
      } catch (err) {
        console.log(err);
      }
    },
  });
  // authenticate with google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      const profile = await fetchUserData(response.access_token);
      navigate("/");
    },
  });

  // get the user data profile
  const fetchUserData = async (accessToken) => {
    try {
      // const response = await axios.get(
      //   `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
      //   {
      //     headers: {
      //       Authorization: `Bearer ${accessToken}`,
      //       Accept: "application/json",
      //     },
      //   }
      // );
      dispatch(googleAuth({accessToken}));
      // dispatch(googleAuth({user : {...response.data, token: accessToken}}));
      // console.log({ ...response.data, token: accessToken});
      // dispatch({
      //   type: actionType.AUTH,
      //   data: { result: response.data, token: accessToken },
      // });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mx-auto mt-12 w-fit">
      <Card color="transparent" shadow={false}>
        <Typography
          className="text-center dark:text-[#eee]"
          variant="h4"
          color={darkMode ? "" : "blue-gray"}
        >
          Sign in
        </Typography>
        <form
          onSubmit={formik.handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <p className="text-pink-600 dark:text-pink-800 text-[14px] font-semibold mb-2 ml-3">
                {formik.touched.email && formik.errors.emtpyUser}
              </p>
              <p className="text-pink-600 dark:text-pink-800 text-[14px] font-semibold mb-2 ml-3">
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
                className="dark:text-[#eee]"
                color={darkMode ? "blue-gray" : ""}
              />
            </div>
            <div className="relative">
              <p className="text-pink-600 dark:text-pink-800 text-[14px] font-semibold mb-2 ml-3">
                {formik.touched.password && formik.errors.emtpyPassword}
              </p>
              <p className="text-pink-600 dark:text-pink-800 text-[14px] font-semibold mb-2 ml-3">
                {formik.errors.password}
              </p>
              <Input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                size="lg"
                className="dark:text-[#eee]"
                label="Password"
                color={darkMode ? "blue-gray" : ""}
              />
              <div className={` cursor-pointer bottom-4 right-3 absolute `}>
                {!showPassword ? (
                  <PiEyeClosedBold
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="text-[20px] dark:text-[#eee]"
                  />
                ) : (
                  <PiEyeBold
                    onClick={() => setShowPassword((prevState) => !prevState)}
                    className="text-[20px] dark:text-[#eee]"
                  />
                )}
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            {loading ? (
              <Spinner className="w-6 mx-auto" color="white" />
            ) : (
              "sign in"
            )}
          </Button>
          <CustomGoogleButton login={loginWithGoogle} />
          <Typography
            color={darkMode ? "" : "gray"}
            className="mt-4 text-center dark:text-[#cccaca] font-normal"
          >
            dont have an account?{" "}
            <span
              onClick={() => navigate("/Sign-up")}
              className="font-medium cursor-pointer text-blue-800"
            >
              Sign up
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
