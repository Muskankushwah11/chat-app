// import React, { useState }  from "react";
// import { collection, query, where } from "firebase/firestore";
// import {db} from "../firebase"
// const Search = () => {
//     const [username,setUsername] = useState("")
//     const [user,setUser]= useState(null)
//     const [err,setErr] = useState(false)

//     const handleSearch = async () => {
//     const q = query(
//         collection(db, "users"),
//         where ("displayName" , " == ",username)
//     ); 

//     try {
//     const querySnapshot = await getDocs(q);
//     querySnapshot.foreach((doc) => {
//         // console.log(doc.id, " => ", doc.data());
//         setUser(doc.data());
//     });
//     } catch(err)
//     setErr(true);
// };

//     const handlekey = e => {
//         e.code === "Enter" && handleSearch();
//     };
//     return(
//         <div className="search">
//             <div className="searchForm">
//             <input type="text" placeholder="Find a user"  onKeyDown={handlekey}onChange={e=>setUsername(e.target.value)}/>
//              </div>
//               <div className="userChat">
//                 <img src="https://images.pexels.com/photos/11509450/pexels-photo-11509450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
//                 <div className="userChatInfo">
//                     <span>Jane</span>
                
//                 </div>
//              </div>  
//         </div> 
//     )
// }
// export default Search

import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

// const Search = () => {
//   const [username, setUsername] = useState("");
//   const [user, setUser] = useState(null);
//   const [err, setErr] = useState(false);

//   const { currentUser } = useContext(AuthContext);

//   const handleSearch = async () => {
//     const q = query(
//       collection(db, "users"),
//       where("displayName", "==", username)
//     );

//     try {
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         setUser(doc.data());
//       });
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   const handleKey = (e) => {
//     e.code === "Enter" && handleSearch();
//   };

//   const handleSelect = async () => {
//     //check whether the group(chats in firestore) exists, if not create
//     const combinedId =
//       currentUser.uid > user.uid
//         ? currentUser.uid + user.uid
//         : user.uid + currentUser.uid;
//     try {
//       const res = await getDoc(doc(db, "chats", combinedId));

//       if (!res.exists()) {
//         //create a chat in chats collection
//         await setDoc(doc(db, "chats", combinedId), { messages: [] });

//         //create user chats
//         await updateDoc(doc(db, "userChats", currentUser.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: user.uid,
//             displayName: user.displayName,
//             photoURL: user.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });

//         await updateDoc(doc(db, "userChats", user.uid), {
//           [combinedId + ".userInfo"]: {
//             uid: currentUser.uid,
//             displayName: currentUser.displayName,
//             photoURL: currentUser.photoURL,
//           },
//           [combinedId + ".date"]: serverTimestamp(),
//         });
//       }
//     } catch (err) {}

//     setUser(null);
//     setUsername("")
//   };
//   return (
//     <div className="search">
//       <div className="searchForm">
//         <input
//           type="text"
//           placeholder="Find a user"
//           onKeyDown={handleKey}
//           onChange={(e) => setUsername(e.target.value)}
//           value={username}
//         />
//       </div>
//       {err && <span>User not found!</span>}
//       {user && (
//         <div className="userChat" onClick={handleSelect}>
//           <img src={user.photoURL} alt="" />
//           <div className="userChatInfo">
//             <span>{user.displayName}</span>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;
// ... (imports)

const Search = () => {
    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [userNotFound, setUserNotFound] = useState(false);
    const [loading, setLoading] = useState(false);
  
    const { currentUser } = useContext(AuthContext);
  
    const handleSearch = async () => {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
      );
  
      try {
        const querySnapshot = await getDocs(q);
        const foundUser = querySnapshot.docs[0]?.data();
  
        if (foundUser) {
          setUser(foundUser);
          setUserNotFound(false);
        } else {
          setUser(null);
          setUserNotFound(true);
        }
      } catch (err) {
        console.error(err);
        setUserNotFound(true);
      }
    };
  
    const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    };
  
    const handleSelect = async () => {
      setLoading(true);
  
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;
  
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
  
        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
  
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
  
          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }
      } catch (err) {
        console.error(err);
        // Handle error if needed
      } finally {
        setLoading(false);
        setUser(null);
        setUsername("");
      }
    };
  
    return (
      <div className="search">
        <div className="searchForm">
          <input
            type="text"
            placeholder="Find a user"
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </div>
        {userNotFound && <span>User not found!</span>}
        {user && (
          <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )}
        {loading && <span>Loading...</span>}
      </div>
    );
  };
  
  export default Search;
  