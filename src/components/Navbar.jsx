// import React  from "react";
// import { signOut } from "firebase/auth";
// const Navbar = () => {
//     return(
//         <div className="navbar">
//             <span className="logo">Muskii chat</span>
//             <div className="user">
//             <img src="https://images.pexels.com/photos/19452752/pexels-photo-19452752/free-photo-of-brunette-woman-with-sunglasses-in-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
//             <span>John</span>
//             <button onClick={() => signOut(auth)}> logout</button>
//              </div>
//         </div>
//     )
// }
// export default Navbar;
import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  return (
    <div className="navbar">
      <span className="logo">Muskii chat</span>
      <div className="user">
         {/* <img
          src="https://images.pexels.com/photos/19452752/pexels-photo-19452752/free-photo-of-brunette-woman-with-sunglasses-in-hand.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
        /> */}
        <img src = {currentUser.photoURL} alt=""/>
        <span>{currentUser.displayName}</span>  
        <button onClick={() => signOut(auth)}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
