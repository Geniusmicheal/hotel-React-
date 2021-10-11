import { authApp } from './Firebase';




const sendForPasswordLink = email => {
    return authApp.sendSignInLinkToEmail(email,{
        url: `${process.env.HOST_URL}/confirm`,
        handleCodeInApp:true,
    }).then(()=> {return true;});
}

const recoverSigninPassword = (email, code, setUser) => {
    return authApp.signInWithEmailLink(email, code).then(result => {
        setUser(result.user);
        return true;
    })
}

const hotelSignUp = (email, password) => {
    return authApp.createUserWithEmailAndPassword(email, password,);
}

const hotelLogin = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password);
      
}

const logout = (setUser) => {
    return authApp.signOut().then(() => { 
        localStorage.removeItem('dhjsduijcxj'); setUser(null); 
    })
}

export {sendForPasswordLink,recoverSigninPassword,hotelSignUp,hotelLogin,logout};

// .then(userData => {
//     userData.user.updateProfile({
//       displayName: fullname,
//       photoURL: ''
//     }).then(() => {
//       this.updateUserData(userData.user);

// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });