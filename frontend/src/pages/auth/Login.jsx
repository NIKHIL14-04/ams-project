import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../../validation/auth.validation";
import { loginUser } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const handleSubmit = async (values) => {
    try {
      const response = await loginUser(values);
    //   console.log(response)

      const { token, user } = response.data;

      localStorage.setItem("token", token);

      localStorage.setItem("user", JSON.stringify(user));

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">
            Attendance Management
          </h1>

          <p className="text-slate-500 mt-2">Login to continue</p>
        </div>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email
              </label>

              <Field
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>

              <Field
                type="password"
                name="password"
                placeholder="Enter your password"
                className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
