import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebase.init";

import { GoogleAuthProvider } from "firebase/auth";

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  //register
  const register = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //login
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // name photo upload
  const updateUser = (displayName, photoURL) => {
    return updateProfile(auth.currentUser, { displayName, photoURL });
  };

  //logout
  const logOut = () => {
    return signOut(auth);
  };

  //google signin
  const googleSignIn = () => {
    return signInWithPopup(auth, provider);
  };

  //user Informetion seter
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUserInfo(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, [userInfo]);

  //  data store and share all component
  const authData = {
    register,
    login,
    loading,
    userInfo,
    setUserInfo,
    updateUser,
    logOut,
    googleSignIn,
  };

  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
