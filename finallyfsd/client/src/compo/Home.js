import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
function Home() {
  let nav = useNavigate();
  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(false);
  const [ide, setIde] = useState("");

  const fetch = async () => {
    try {
      var res = await axios.get("http://localhost:3005/get", {
        headers: {
          auth: window.localStorage.getItem("sha"),
        },
      });
      setData(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  let formik = useFormik({
    initialValues: {
      name: "",
      post: "",
    },
    validate: () => {},
    onSubmit: async (val) => {
      try {
        if (edit) {
          await axios.put(`http://localhost:3005/put/${ide}`, val, {
            headers: {
              auth: window.localStorage.getItem("sha"),
            },
          });
          formik.setValues({
            name: "",
            post: "",
          });
          fetch();
          setEdit(false);
        } else {
          await axios.post("http://localhost:3005/post", val, {
            headers: {
              auth: window.localStorage.getItem("sha"),
            },
          });
          formik.setValues({
            name: "",
            post: "",
          });
          fetch();
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const remo = (id) => {
    axios.delete(`http://localhost:3005/del/${id}`, {
      headers: {
        auth: window.localStorage.getItem("sha"),
      },
    });
    formik.setValues({
      name: "",
      post: "",
    });
    fetch();
  };

  const edits = async (id) => {
    try {
      var res = await axios.get(`http://localhost:3005/get/${id}`, {
        headers: {
          auth: window.localStorage.getItem("sha"),
        },
      });
      formik.setValues({
        name: res.data.name,
        post: res.data.post,
      });
      setIde(res.data._id);
      setEdit(true);
    } catch (error) {
      console.log(error);
    }
  };

  const lgouut = () => {
    window.localStorage.removeItem("sha");
    nav("/reg");
  };

  return (
    <div className="container">
      <button type="submit" class="btn btn-warning" onClick={lgouut}>
        logout
      </button>
      <div className="row">
        <div className="col-6">
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mb-3">
              <label for="exampleFormControlInput1" className="form-label">
                Post
              </label>
              <input
                type="text"
                className="form-control"
                name="post"
                value={formik.values.post}
                onChange={formik.handleChange}
              />
            </div>
            {edit ? (
              <button type="submit" class="btn btn-warning">
                Edit
              </button>
            ) : (
              <button type="submit" class="btn btn-success">
                Create
              </button>
            )}
          </form>
        </div>

        <div className="col-6">
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Post</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((cur, idx) => {
                return (
                  <tr key={cur._id}>
                    <th scope="row">{idx + 1}</th>
                    <td>{cur.name}</td>
                    <td>{cur.post}</td>
                    <td>
                      <div>
                        <button
                          type="button"
                          class="btn btn-danger"
                          onClick={() => remo(cur._id)}
                        >
                          Delete
                        </button>
                        <button
                          type="button"
                          class="btn btn-warning"
                          onClick={() => edits(cur._id)}
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
