import React from "react";
import { Link, useParams } from "react-router-dom";

const EmployeeDetail = (props) => {
  const { id } = useParams();
  const employee = props.employees.find((emp) => emp.id === id);

  const defaultimg ="https://img.magnific.com/premium-vector/business-man-avatar-profile_1133257-2431.jpg?semt=ais_hybrid&w=740&q=80";

  return (
    <div className="employee-detail">
      {employee ? (
        <>
          <div className="employee-card">
            <div className="employee-header">
              <img
                src={employee.image}
                 alt={employee.name || "Employee"}
                onError={(e) => {
                  e.target.src = defaultimg;
                }}
              />
              <div>
                <h2>{employee.name}</h2>
                <p>{employee.department}</p>
              </div>
            </div>

            <div className="employee-info">
              <div className="info-box">
                <h4>Email</h4>
                <p>{employee.email}</p>
              </div>
              <div className="info-box">
                <h4>Phone</h4>
                <p>{employee.phone}</p>
              </div>

              {/* <div className="info-box">
              <h4>Address</h4>
              <p>{employee.address}</p>
            </div> */}
              {/* <div className="info-box">
              <h4>Experience</h4>
              <p>{employee.experience}</p>
            </div> */}
              <div className="info-box">
                <h4>joining Date</h4>
                <p>{employee.date}</p>
              </div>

              <div className="info-box">
                <h4>Salary</h4>
                <p>{employee.salary}</p>
              </div>

              <div className="info-box">
                <h4>Status</h4>
                <p>{employee.status}</p>
              </div>

              <div className="actions">
                <Link to={`/employee/edit/${employee.id}`}>
                  <button className="edit">Update</button>
                </Link>
                <button
                  className="delete"
                  onClick={() => props.handledelete(employee.id)}>
                  Delete
                </button>
              </div>

            </div>
            <Link className="back-btn" to="/employee">
              back to employee
            </Link>
          </div>
        </>
      ) : (
        <>
          <div className="not-found">
            <h2>Employee Not Found</h2>
            <p>Well, that's disappointing.</p>
            <Link to={"/"}> Visit Our Home Page →</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeDetail;
