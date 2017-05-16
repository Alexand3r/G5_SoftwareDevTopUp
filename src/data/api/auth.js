import {dbRef, fAuth} from '../config/firebase'

export function authenticate(email, pass){
    return fAuth().createUserWithEmailAndPassword(email,pass).then(makeUser)
}

export function login(email,pass){
    return fAuth().signInWithEmailAndPassword(email,pass)
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