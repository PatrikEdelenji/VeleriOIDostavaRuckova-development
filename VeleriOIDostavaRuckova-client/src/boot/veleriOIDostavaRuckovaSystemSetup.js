/* eslint-disable */
import { boot } from 'quasar/wrappers'
import { initializeApp } from 'firebase/app';
//import { getAnalytics } from "firebase/analytics";
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC3Tzw8HqJxnsdqE5a2G-xBBv97divEDxw',
  authDomain: 'velerioidostavaruckova.firebaseapp.com',
  projectId: 'velerioidostavaruckova',
  storageBucket: 'velerioidostavaruckova.appspot.com',
  messagingSenderId: '154887609425',
  appId: '1:154887609425:web:a0f5eeac6b06739788ec70',
  measurementId: 'G-D0P8SDVSQ2'
}; 

const firebase = initializeApp(firebaseConfig);
console.log(firebase) //const analytics = getAnalytics(firebase);

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  })
};

export default boot(({ app, router, store }) => {
  app.config.globalProperties.$firebase = firebase;
  //app.config.globalProperties.$analytics = analytics;
  app.config.globalProperties.$auth = getAuth(firebase)
  app.config.globalProperties.$db = getFirestore(firebase)
  app.config.globalProperties.$storage = getStorage(firebase)

  router.beforeEach(async (to, from, next) => {
    const auth = to.meta.requiresAuth
    if (auth && !await firebase.getCurrentUser()) {
      next('/');
    } else {
      next();
    }
  })
})

//export { firebase, analytics };