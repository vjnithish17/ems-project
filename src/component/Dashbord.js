// import { useEffect, useState } from "react";

function Dashbord(  {total,
                      active,
                      inactive,
                      departmentCount}) {

  return (
    <div className="dashboard">

      <h1 className="title">Employee Dashboard</h1>

      <div className="card-container">

        <div className="card">
          <h2>Total Employees</h2>
          <h1>{total}</h1>
        </div>

        <div className="card">
          <h2>Active Employees</h2>
          <h1>{active}</h1>
        </div>

        <div className="card">
          <h2>Inactive Employees</h2>
          <h1>{inactive}</h1>
        </div>

        <div className="card">
          <h2>Departments</h2>
          <h1>{departmentCount}</h1>
        </div>

      </div>

    </div>
  );
}

export default Dashbord;
