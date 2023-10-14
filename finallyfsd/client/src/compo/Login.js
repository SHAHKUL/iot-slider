import React, { useState } from "react";
import "../App.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function Login() {
  let nav = useNavigate();
  const [err, setErr] = useState("");

  let formik = useFormik({
    initialValues: {
      email: "",
      pass: "",
    },
    onSubmit: async (val) => {
      try {
        var log = await axios.post("http://localhost:3005/log", val);
        window.localStorage.setItem("sha", log.data.token);
        if (log.data.token) {
          nav("/");
        } else {
          console.log(log.data.message);
          setErr(log.data.message);
        }
      } catch (error) {}
    },
  });
  return (
    <div>
      <center>
        {" "}
        <h1> Login </h1>{" "}
      </center>
      <form onSubmit={formik.handleSubmit}>
        <div class="conta">
          <label>Email : </label>
          <input
            type="text"
            placeholder="Name"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <label>Password : </label>
          <input
            type="text"
            placeholder="Password"
            name="pass"
            value={formik.values.pass}
            onChange={formik.handleChange}
          />
          <button type="submit">Login</button>
          <h3 style={{ color: "red" }}>{err}</h3>
        </div>
        <button className="btn btn-primary" onClick={() => nav("/reg")}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Login;
