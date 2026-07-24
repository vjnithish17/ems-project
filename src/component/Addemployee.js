import { useState } from "react";
function Addemployee({
  employee,
  handleChange,
  handleSubmit,
}) {


  return (
    
    <div className="add-container">
      <h2>Add Employee</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={employee.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={employee.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={employee.phone}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={employee.department}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={employee.salary}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL (Optional)"
          value={employee.image}
          onChange={handleChange}
        />

        <select
          name="status"
          value={employee.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option >Inactive</option>
        </select>
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default Addemployee;
