import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import { PiEyeBold, PiEyeClosedBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [showPassword,setShowPassword] = useState(false)
  const navigate = useNavigate()
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
  });

  return (
    <div className="mx-auto mt-12 w-fit">
      <Card color="transparent" shadow={false}>
        <Typography className="text-center" variant="h4" color="blue-gray">
          Sign in
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
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
              <div
                className={` cursor-pointer bottom-4 right-3 absolute `}
              >
               { !showPassword ?
                <PiEyeClosedBold
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="text-[20px]"
                /> :
                <PiEyeBold
                  onClick={() => setShowPassword((prevState) => !prevState)}
                  className="text-[20px]"
                />}
              </div>
            </div>
          </div>
          <Button className="mt-6" fullWidth>
            sign in
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            dont have an account?{" "}
            <span onClick={() => navigate("/Sign-up")} className="font-medium cursor-pointer text-blue-800">
              Sign up
            </span>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
