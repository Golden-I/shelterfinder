import { initializeApp } from "firebase/app";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout, signInWithGoogle } from "./firebase/auth";
import { query, collection, getDocs, addDoc, getFirestore, where, } from "firebase/firestore/lite";
import { GoogleAuthProvider, getAuth, signInWithPopup, fetchUserName, signOut, signInWithEmailAndPassword, } from "firebase/auth";
import firebaseConfig, { logInWithEmailAndPassword, registerWithEmailAndPassword } from "./firebase"
import { from } from "core-js/core/array";


function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = async () => {
       res = await signInWithPopup(auth, GoogleAuthProvider);
       user =res.user;
       q = q(collection(db, "users"), where("uid", "==", user?.uid));
       docs = await getDocs(q);
      // const data = doc.docs[0].data();
      if (docs.docs.length == 0)
      await addDoc(collection(db,"users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider:"google",
        email: user.email,
      });
    
    };

    const logInWithEmailAndPassword = async (email, password) => {
      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };

    const logout = () => {
      signOut(auth);
    };

    // export{
    //   db,
    //   auth,
    //   logInWithEmailAndPassword,
    //   signInWithGoogle,
    //   registerWithEmailAndPassword,
    //   logout,
    // };

//   useEffect(() => {
//     if (loading) return;
//     if (!user) return navigate("/");
//     fetchUserName();
//   }, [user, loading]);

//   const logout = () => {
//     signOut(auth);
//   };

//   return (
//     <div className="dashboard">
//       <div className="dashboard__container">
//         Logged in as
//         <div>{name}</div>
//         <div>{user?.email}</div>
//         <button className="dashboard__btn" onClick={logout}>
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }
// }
// export default Dashboard