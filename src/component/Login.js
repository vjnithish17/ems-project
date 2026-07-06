import React from 'react'

const Login = (props) => {
  return (
      <div className="login-container">
      <form className="login-card"onSubmit={props.handleLogin} >
        <h1>Admin Login</h1>
        <input
          type="text"
          placeholder="Admin"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}
          required
        />
        {props.loginerr === "Username is Incorrect" &&
        <span>{props.loginerr}</span>
        }

        <input
        //   type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}
          required
        />
          {props.loginerr === "Password is Incorrect" &&
        <span>{props.loginerr}</span>
        }
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
