import {dbRef, fAuth,facebookAuth} from '../config/firebase'
export var user=''
export function authenticate(email, pass){
    return fAuth().createUserWithEmailAndPassword(email,pass).then(makeUser)
}

export function login(email,pass){
    return user=fAuth().signInWithEmailAndPassword(email,pass)
}

export function logout (){
    return fAuth().signOut()
}

export function resetPassword(email){
    return fAuth().sendPasswordResetEmail(email)
}

export function makeUser(user) {
    return dbRef.child(`users/${user.uid}/info`).set({
        email: user.email,
        uid: user.uid
    })
    .then(()=>user)
}

//* FACEBOOK AUTH *//

export function loginWithFb() {
    fAuth().signInWithPopup(facebookAuth).then(function(result){
        // var token = result.credential.accessToken;
        return result.user;
    })
}
export function logoutWithFb(){
    fAuth().signOut()
}
