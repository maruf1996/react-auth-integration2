import { useEffect, useState } from "react"
import initializeAuthentication from "../Firebase/Firebase.init";
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged,signOut,GithubAuthProvider } from "firebase/auth";

initializeAuthentication();
const useFirebase=()=>{
    const [user,setUser]=useState({});
    const [error,setError]=useState('');

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const signInUsingGoogle=()=>{
        signInWithPopup(auth, googleProvider)
        .then(result=>{
            console.log(result.user);
            setUser(result.user);
        })
        .catch(error=>{
            setError(error.massage);
        })
    }

    const signInUsingGithub=()=>{
        signInWithPopup(auth, githubProvider)
        .then(result=>{
            setUser(result.user);
        })
        .catch(error=>{
            setError(error.massage);
        })
    }

    const logOut=()=>{
        signOut(auth)
        .then(() => {
            setUser({})
          })
          .catch((error) => {
              setError(error.massage);
          });
    }

    useEffect(()=>{
        onAuthStateChanged(auth,user=>{
            if(user){
                setUser(user);
            }
        }) 
    },[])

    return {
        user,
        error,
        signInUsingGoogle,
        signInUsingGithub,
        logOut
    }

}
export default useFirebase;