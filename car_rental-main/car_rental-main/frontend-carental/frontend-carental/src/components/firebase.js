import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

// Initialize Firebase
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyCCWZvOJRKvZL7cKfWxsW0FHwnMsduGdNI",
  authDomain: "car-rental-web-feb96.firebaseapp.com",
  projectId: "car-rental-web-feb96",
  storageBucket: "car-rental-web-feb96.appspot.com",
  messagingSenderId: "130486168631",
  appId: "1:130486168631:web:26082cc3ef5d1804b423b2",
  measurementId: "G-J80HH28H33"
};

firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
