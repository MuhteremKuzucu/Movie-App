import React, { createContext, useEffect, useState } from 'react'
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile,
} from "firebase/auth";
import { auth } from "../auth/firebase";
import { errorToast, successToast } from '../helpers/ToastNotify';
import { useNavigate } from 'react-router-dom';

//!context alanı aç
export const YetkiContext=createContext()

const AuthContext = ({children}) => {
  const navigate = useNavigate();

  const [currentUser,setCurrentUser]=useState()

  useEffect(() => {
    userTakip();
  }, []);

  //!register için (sitede zincir yapılı fetch işlemi var biz burada async await i tercih ettik)
  // https://firebase.google.com/docs/auth/web/start?hl=tr

  const createKullanici = async (email, password,displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      successToast("Kayıt başarılı");
  
      navigate("/");

      //? USERTAKİPTEN SONRA -----kullanıcı profilini güncellemek için kullanılan firebase metodu, login logout da userTakip sayesinde güncelleniyor ama register da isim güncellemesi yok, o da bu şekilde oluyor.alttakini yazmazsam (register ile girdiğimde) navbarda displayName i göremem. alttakini yazmazsam sadece google ile girersem görürüm

      await updateProfile(auth.currentUser,{displayName:displayName});

    } catch (error) {
      errorToast(error.message)
    }
  
  };

  //!login için daha önce oluşturulmuş kullanıcı adıyla giriş yapmak için firebase kodu
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    successToast("giriş başarılı");

    navigate("/");

    } catch (error) {
      errorToast(error.message)
    }
    
  };

  //!google ile giriş

  //* https://firebase.google.com/docs/auth/web/google-signin?hl=tr

const signUpGooglE=()=>{

//?google hesaplarıma ulaşmak için firebase kodu
const provider = new GoogleAuthProvider();

//?açılır pencerede google hesaplarının gelmesi icin firebase metodu

signInWithPopup(auth, provider).then((res)=>{
  successToast("google ile giriş başarılı");

  navigate("/")
});

};

//!siteden çıkış

const cikis=()=>{
  signOut(auth);

  successToast("çıkış başarılı");
}


const userTakip=()=>{
   onAuthStateChanged(auth, (user) => {
    if (user) {
      const {email,displayName,photoURL}=user
      setCurrentUser({email,displayName,photoURL})
    } else {
      
    }
  });
}




  return (
    <YetkiContext.Provider value={{ createKullanici, login, signUpGooglE,cikis,currentUser}}>
      {children}
    </YetkiContext.Provider>
  );
}

export default AuthContext