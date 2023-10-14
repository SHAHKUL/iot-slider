import React from "react";
import "../App.css";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

function Register() {
  let nav = useNavigate();

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      pass: "",
    },
    onSubmit: async (val) => {
      try {
        await axios.post("http://localhost:3005/reg", val);

        nav("/log");
      } catch (error) {}
    },
  });

  return (
    <div>
      <center>
        {" "}
        <h1> Student Register Form </h1>{" "}
      </center>
      <form onSubmit={formik.handleSubmit}>
        <div class="conta">
          <label>Name : </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
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
          <button type="submit">Register</button>
        </div>
        <button className="btn btn-info" onClick={() => nav("/log")}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Register;
