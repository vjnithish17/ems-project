import "./App.css";

import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Dashbord from "./component/Dashbord";
import Editemployee from "./component/Editemployee";
import EmployeeDetail from "./component/EmployeeDetail";
import Notfound from "./component/Notfound";
import Addemployee from "./component/Addemployee";
import Employeelist from "./component/Employeelist";
import api from "./api/axios";
import Login from "./component/Login";
// import Footer from "./component/Footer";

function App() {
  // console.log("App Render");
  const [employees, setEmployees] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [status, setStatus] = useState("All");

  const [fetchError, setfetchError] = useState(null);
  const [isloading, setIsloading] = useState(true);

  // --------------  Add employyee ---------------------

  const defaultimg = "https://img.magnific.com/premium-vector/business-man-avatar-profile_1133257-2431.jpg?semt=ais_hybrid&w=740&q=80";

  const initialemp = {
    name: "",
    email: "",
    phone: "",
    department: "",
    salary: "",
    status: "Active",
    image: "",
    date: new Date().toLocaleDateString(),
  };
  const [newEmployee, setnewEmployee] = useState(initialemp);
  const [editEmployee, seteditEmployee] = useState(initialemp);

  const handleAddChange = (e) => {
    setnewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditChange = (e) => {
    seteditEmployee({
      ...editEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newemployee = {
      ...newEmployee,
      image: newEmployee.image.trim() || defaultimg,
    };
    try {
      await api.post("/employee", newemployee);
      await getEmployees();
      alert("Employee Added Successfully");
      navigate("/employee");
    } catch (error) {
      console.log(error);
      alert("Failed to Add Employee");
    }
  };

  // -------------API call---------------
  const getEmployees = async () => {
    setIsloading(true);
    try {
      const res = await api.get("/employee");
        setEmployees(res.data);
        setfetchError(null);
        setIsloading(false);
    } catch (error) {
      setfetchError(error.message);
      setIsloading(false);
    }
  };
  // ----------------- Dashboard-----------------

  useEffect(() => {
      setTimeout(() => {
            getEmployees();
       }, 6000);
  }, []);

  /* GET → Read
    POST → Add
    PUT → Full Update
    PATCH → Partial Update
    DELETE → Delete  */

  // ----------------------------------------------

  const total = employees.length;
  const active = employees.filter((emp) => emp.status === "Active").length;
  const inactive = employees.filter((emp) => emp.status === "Inactive").length;
  const departmentCount = new Set(employees.map((emp) => emp.department)).size;
  // Set duplicate values remove panum

  //============== search @ filter ==============

  const departments = ["All",...new Set(employees.map((emp) => emp.department))];

  const filteredEmployees = employees.filter((emp) => {
    const searchMatch =
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.email.toLowerCase().includes(search.toLowerCase());

    const departmentMatch =
      department === "All" || emp.department === department;
    const statusMatch = status === "All" || emp.status === status;

    return searchMatch && departmentMatch && statusMatch;
  });

  // -------------------delete-----------------------
  const handledelete = async (id) => {
    try {
      await api.delete(`/employee/${id}`);
      const Employeelist = employees.filter((emp) => emp.id !== id);
      setEmployees(Employeelist);
      navigate("/employee");
      alert("Deleted this Employee Details");
    } catch (err) {
      console.log(err.message);
    }
  };

  // ----------------Update-----------------------------

  const handleedit = async (e, id) => {
    // console.log("Updating ID:", id);
    e.preventDefault();

    try {
      await api.put(`/employee/${id}`, editEmployee);
      await getEmployees();
      alert("Employee Updated Successfully");
      navigate("/employee");
    } catch (err) {
      console.log(err.message);
    }
  };
  // -----------------Login ---------------------------------

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginerr, setloginerr] = useState("");

  const islogin = localStorage.getItem("islogin");

  const admins = [
    {
      username: "admin1",
      password: "12345",
    },
    {
      username: "admin2",
      password: "123456",
    },
    {
      username: "admin3",
      password: "1234567",
    },
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const admin = admins.find((e) => e.username === username);

    if (admin) {
      if (admin.password === password) {
        localStorage.setItem("islogin", "true");
        localStorage.setItem("admin", admin.username);
        alert("Login successfully");
        navigate("/Dashboard");
      } else {
        setloginerr("Password is Incorrect");
      }
    } else {
      setloginerr("Username is Incorrect");
    }
  };

  return (
    <div className="container">
      {islogin && location.pathname !== "/" && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <Login
              handleLogin={handleLogin}
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              loginerr={loginerr}
            />
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <Dashbord
              total={total}
              active={active}
              inactive={inactive}
              departmentCount={departmentCount}
            />
          }
        />

        <Route
          path="/employee"
          element={
            <Employeelist
              employees={employees}
              filteredEmployees={filteredEmployees}
              search={search}
              setSearch={setSearch}
              department={department}
              setDepartment={setDepartment}
              status={status}
              setStatus={setStatus}
              departments={departments}
              isLoading={isloading}
              fetchError={fetchError}
            />
          }
        />
        <Route
          path="/add"
          element={
            <Addemployee
              employee={newEmployee}
              handleChange={handleAddChange}
              handleSubmit={handleSubmit}
            />
          }
        />
        <Route
          path="/employee/:id"
          element={
            <EmployeeDetail employees={employees} handledelete={handledelete} />
          }
        />
        <Route
          path="/employee/edit/:id"
          element={
            <Editemployee
              employees={employees}
              setEmployee={seteditEmployee}
              employee={editEmployee}
              getEmployees={getEmployees}
              handleedit={handleedit}
              handleChange={handleEditChange}
            />
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
       {/* <Footer/> */}
    </div>
  );
}

export default App;
