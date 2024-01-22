// import React, { useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../firebase";

// const Login = () => {
//   const [err, setErr] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     if (auth) {
//       console.log(email, password);
//     }

//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   return (
//     <div className="formContainer">
//       <div className="formWrapper">
//         <span className="logo">Muskii Chat</span>
//         <span className="title">Login</span>
//         <form onSubmit={handleSubmit}>
//           <input type="email" name="email" placeholder="email" />
//           <input type="password" name="password" placeholder="password" />
//           <button>Sign in</button>
//           {err && <span>Something went wrong</span>}
//         </form>
//         <p>
//           You don't have an account? <Link to="/register">Register</Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama Chat</span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
          {error && <span className="error">{error}</span>}
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
