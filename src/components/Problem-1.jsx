import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [allData, setDataStore] = useState([]);
  const [tableData, setTableData] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const merge = allData.concat(data);
    setDataStore(merge);
    reset();
  };

  console.log("allData", allData);

  React.useEffect(()=>{
    if(allData?.length > 0 && (show === "active" || show === "completed")){
      const filtering = allData && allData?.filter((item)=> (item?.status).toLowerCase() === show.toLowerCase());
      console.log("filtering", filtering, show);
      setTableData(filtering);
    }else{
      allData?.sort((a, b)=>{
        console.log("sorting", a.status, b.status, "boolean", a.status < b.status, a.status > b.status);
        if(a.status < b.status) return -1;
        if(a.status > b.status) return 1;
        return 0;
      })
      setTableData(allData);
      console.log("alldata30", allData);
    }   

  },[show, allData])

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
              
              {tableData?.length > 0
                ? tableData?.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td scope="col">{item?.name}</td>
                        <td scope="col">{item?.status}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
