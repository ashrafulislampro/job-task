import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [tableData, setTableData] = useState(null);

  const handleClick = (val) => {
    setShow(val);
  };

  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => setTableData(data);
  console.log("tableData", tableData);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
                {...register("name")}
              />
            </div>
            <div className="col-auto">
              <input
                type="text"
                name="status"
                className="form-control"
                placeholder="Status"
                {...register("status")}
              />
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content"></div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {show === "active" ? (
                <tr>
                  <td scope="col">{}</td>
                  <td scope="col">Active</td>
                </tr>
              ) : null}
              {show === "completed" ? (
                <tr>
                  <td scope="col">{}</td>
                  <td scope="col">Completed</td>
                </tr>
              ) : null}
              {show === "all" ? (
                  <tr>
                    <td scope="col">{}</td>
                    <td scope="col">Active</td>
                  </tr>
              ) : null}
              {show === "all" ? (
                <tr>
                  <td scope="col">{}</td>
                  <td scope="col">Completed</td>
                </tr>
            ) : null}
              {show === "all" && tableData !== null ? 
              <tr>
                <td scope="col">{tableData?.name}</td>
                <td scope="col">{tableData?.status}</td>
              </tr>
                : null  
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
