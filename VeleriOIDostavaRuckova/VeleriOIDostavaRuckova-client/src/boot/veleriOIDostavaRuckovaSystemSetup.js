import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyC3Tzw8HqJxnsdqE5a2G-xBBv97divEDxw",
    authDomain: "velerioidostavaruckova.firebaseapp.com",
    projectId: "velerioidostavaruckova",
    storageBucket: "velerioidostavaruckova.appspot.com",
    messagingSenderId: "154887609425",
    appId: "1:154887609425:web:a0f5eeac6b06739788ec70",
    measurementId: "G-D0P8SDVSQ2"
}
firebase.initializeApp(firebaseConfig)
export default ({ Vue }) => {
 Vue.prototype.$auth = firebase.auth()
 Vue.prototype.$db = firebase.firestore()
 Vue.prototype.$storage = firebase.storage()
}
