// import React  from "react";
// const Chats = () => {
//     return(
//         <div className="chats">
//         <div className="userChat">
//                 <img src="https://images.pexels.com/photos/11509450/pexels-photo-11509450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
//                 <div className="userChatInfo">
//                     <span>Jane</span>
//                     <p>I'll let you know</p>
//                 </div>
//              </div> 
//             <div className="userChat">
//                 <img src="https://images.pexels.com/photos/19577237/pexels-photo-19577237/free-photo-of-young-women-with-ribbons-in-hair-sitting-back-to-back.jpeg"/>
//                 <div className="userChatInfo">
//                     <span>Twins</span>
//                     <p>Nope</p>
//                 </div>
//              </div>
//              <div className="userChat">
//                 <img src="https://images.pexels.com/photos/8530923/pexels-photo-8530923.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"/>
//                 <div className="userChatInfo">
//                     <span>Tyler</span>
//                     <p>okay Thankyou</p>
//                 </div>
//              </div>
//              <div className="userChat">
//                 <img src="https://images.pexels.com/photos/13093467/pexels-photo-13093467.png?auto=compress&cs=tinysrgb&w=600&lazy=load"/>
//                 <div className="userChatInfo">
//                     <span>carol</span>
//                     <p>yeah</p>
//                 </div>
//              </div>
//              <div className="userChat">
//                 <img src="https://images.pexels.com/photos/19483163/pexels-photo-19483163/free-photo-of-woman-wearing-a-cap.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"/>
//                 <div className="userChatInfo">
//                     <span>Halsey</span>
//                     <p>see you tommorrow</p>
//                 </div>
//              </div>
//         </div>
//     )
// }
// export default Chats;
// import { doc, onSnapshot } from "firebase/firestore";
// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// import { ChatContext } from "../context/ChatContext";
// import { db } from "../firebase";

// const Chats = () => {
//   const [chats, setChats] = useState({}); // Set default value as an object

//   const { currentUser } = useContext(AuthContext);
//   const { dispatch } = useContext(ChatContext);

//   useEffect(() => {
//     const getChats = () => {
//       const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
//         setChats(doc.data() || {}); // Provide a default value
//       });

//       return () => {
//         unsub();
//       };
//     };

//     currentUser.uid && getChats();
//   }, [currentUser.uid]);

//   const handleSelect = (u) => {
//     dispatch({ type: "CHANGE_USER", payload: u });
//   };

//   return (
//     <div className="chats">
//       {Object.entries(chats)
//         .sort(([, a], [, b]) => b.date - a.date)
//         .map(([chatId, chat]) => (
//           <div
//             className="userChat"
//             key={chatId}
//             onClick={() => handleSelect(chat.userInfo)}
//           >
//             <img src={chat.userInfo.photoURL} alt="" />
//             <div className="userChatInfo">
//               <span>{chat.userInfo.displayName}</span>
//               <p>{chat.lastMessage?.text}</p>
//             </div>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default Chats;
import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";



const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className="userChat"
          key={chat[0]}
          onClick={() => handleSelect(chat[1].userInfo)}
        >
          <img src={chat[1].userInfo.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;