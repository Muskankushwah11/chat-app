// import React  from "react";
// import Img from "../img/img.png";
// import Attach from "../img/attach.png";
// const Input = () => {
//     return(
//         <div className="input">
//         <input type="text" placeholder="Type something..."/>
//         <div className="send" >
//         <img src={Attach} alt=""/>
//         <input type="file" style={{display:"none"}} id="file"/>
//         <label htmlFor="file">
//             <img src={Img} alt="" />
//         </label>
//         <button>Send</button>
//         </div>
//          </div>  
//     )
// }
// export default Input;
import React, { useContext, useState } from "react";
import Img from "../img/img.png";
import Attach from "../img/attach.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
  FieldValue, // Correct the import here
} from "firebase/firestore";

import { db, storage } from "../firebase"; 
// ... (your imports)

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [uploading, setUploading] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      await handleSendImageMessage();
    } else {
      await handleSendTextMessage();
    }
  };

  const handleSendTextMessage = async () => {
    const newMessage = {
      id: uuid(),
      text,
      senderId: currentUser.uid,
    };

    const timestamp = serverTimestamp();

    const updateObj = {
      messages: arrayUnion({ ...newMessage, date: timestamp }),
      lastMessage: {
        text,
        date: timestamp,
      },
    };

    await updateDoc(doc(db, "chats", data.chatId), updateObj);
    await updateUserChats();
  };

  const handleSendImageMessage = async () => {
    const storageRef = ref(storage, uuid());
    const uploadTask = uploadBytesResumable(storageRef, img);

    setUploading(true);

    try {
      const snapshot = await uploadTask;
      const downloadURL = await getDownloadURL(snapshot.ref);

      const newMessage = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        img: downloadURL,
      };

      const timestamp = serverTimestamp();

      const updateObj = {
        messages: arrayUnion({ ...newMessage, date: timestamp }),
        lastMessage: {
          text,
          date: timestamp,
        },
      };

      await updateDoc(doc(db, "chats", data.chatId), updateObj);
      await updateUserChats();
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  const updateUserChats = async () => {
    const userChatsUpdateObj = {
      [data.chatId]: {
        lastMessage: {
          text,
          date: serverTimestamp(),
        },
      },
    };

    await updateDoc(doc(db, "userChats", currentUser.uid), userChatsUpdateObj);
    await updateDoc(doc(db, "userChats", data.user.uid), userChatsUpdateObj);

    setText("");
    setImg(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend} disabled={uploading}>
          {uploading ? "Uploading..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Input;
