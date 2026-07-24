import { Link } from "react-router-dom";

function Employeelist({
  employees,
  filteredEmployees,
  search,
  setSearch,
  department,
  setDepartment,
  departments,
  status,
  setStatus,
  isLoading,
  fetchError,
}) 
{
  if (isLoading) {

    return <h2 className="loading">Loading...</h2>;
  }
  if (fetchError) {
    return <h2 className="error">Error : {fetchError}</h2>;
  }

  return (
    <div className="employee-list">
      <h1>Employee List</h1>
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>
      <div className="table-container">
              <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((emp, idx) => (
              <tr key={emp.id}>
                <td>{idx + 1}</td>

                <td>
                  <img
                    src={emp.image}
                    alt={emp.name}
                    width="60"
                    height="60"
                    onError={(e) => {
                      e.target.src =
                        "https://img.magnific.com/premium-vector/business-man-avatar-profile_1133257-2431.jpg?semt=ais_hybrid&w=740&q=80";
                    }}
                  />
                </td>

                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.phone}</td>
                <td>{emp.department}</td>
                <td>₹{emp.salary}</td>
                <td>{emp.status}</td>

                <td className="view">
                  <Link to={`/employee/${emp.id}`}>View</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9">No Employee Found</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>

    </div>
  );
}

export default Employeelist;
