import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import CustomGoogleButton from "../component/GoogleButton";
import axios from "axios";
import { useDispatch } from "react-redux";
import { actionType } from "../constants/actionType";
import { signIn } from "../actions/auth";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [usercediantials, setUsercediantials] = useState();

  const dispatch = useDispatch();
  // initialize useNvigate
  const navigate = useNavigate();
  // validate from fields
  const formik = useFormik({
    initialValues: {
      Email: "",
      password: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.Email) {
        errors.emtpyUser = "this field can not be empty";
      } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.Email)) {
        errors.Email = "invalid Email";
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
        type: actionType.logIN,
        data: { ...response.data, Token: accessToken },
      });
      console.log(response.data);
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
          <div className="mb-4 flex flex-col gap-6">
            <div>
              <p className="text-red-600 text-[14px] font-semibold mb-2 ml-3">
                {formik.touched.Email && formik.errors.emtpyUser}
              </p>
              <p className="text-red-600 text-[14px] font-semibold mb-2 ml-3">
                {formik.errors.Email}
              </p>
              <Input
                id="Email"
                name="Email"
                size="lg"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Email}
                label="Email"
              />
            </div>
            <div className="relative">
              <p className="text-red-600 text-[14px] font-semibold mb-2 ml-3">
                {formik.touched.password && formik.errors.emtpyPassword}
              </p>
              <p className="text-red-600 text-[14px] font-semibold mb-2 ml-3">
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
                label="Password"
              />
              <div className={` cursor-pointer bottom-4 right-3 absolute `}>
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
          </div>
          <Button type="submit" className="mt-6" fullWidth>
            sign in
          </Button>
          <CustomGoogleButton login={loginWithGoogle} />
          <Typography color="gray" className="mt-4 text-center font-normal">
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
