// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   onAuthStateChanged,
//   updateProfile,
// } from "firebase/auth";
// import { auth } from "../../firebase/config";
// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { signOut } from "firebase/auth";
// import { authSlice } from "./authReducer";

// export const userSignUp = createAsyncThunk(
//   "auth/signup",
//   async ({ login, email, password }, thunkAPI) => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);

//       const user = auth.currentUser;

//       await updateProfile(user, { displayName: login, email: user.email });
//       console.log("user", user);

//       authSlice.actions.updateUserProfile({
//         userId: user.uid,
//         login: user.displayName,
//         email: user.email,
//       });
//       console.log("userId", user.uid);
//       console.log("login", user.displayName);
//       console.log("email", user.email);
//       // return user;
//     } catch (error) {
//       console.log("error", error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const userLogIn = createAsyncThunk(
//   "auth/login",
//   async ({ email, password }, thunkAPI) => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       const user = auth.currentUser;

//       if (user) {
//         await updateProfile(user, { email: user.email });
//         authSlice.actions.updateUserProfile({
//           userId: user.uid,
//           login: user.displayName,
//           email: user.email,
//         });

//         authSlice.actions.authStateChange({ stateChange: true });
//         console.log("user", user);
//         // return credentials.user;
//       }
//     } catch (error) {
//       console.log("error", error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const userLogOut = createAsyncThunk(
//   "auth/logout",
//   async (_, thunkAPI) => {
//     try {
//       await signOut(auth);
//       // await auth.signOut();
//     } catch (error) {
//       console.log("error", error);
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const authStateChanged = createAsyncThunk(
//   "auth/refresh",
//   async (_, thunkAPI) => {
//     onAuthStateChanged(auth, (user) => {
//       if (user) {
//         authSlice.actions.updateUserProfile({
//           userId: user.uid,
//           login: user.displayName,
//         });
//         authSlice.actions.authStateChange({ stateChange: true });
//       }
//       // return thunkAPI.rejectWithValue(error.message);
//     });
//   }
// );

// // onAuthStateChanged(auth, (user) => {
// //   if (user) {
// //     // User is signed in, see docs for a list of available properties
// //     // https://firebase.google.com/docs/reference/js/auth.user
// //     const uid = user.uid;
// //     // ...
// //   } else {
// //     // User is signed out
// //     // ...
// //   }
// // });

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../../firebase/config";
import { authSlice } from "./authReducer";

export const userSignUp =
  ({ login, email, password }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = auth.currentUser;

      await updateProfile(user, {
        displayName: login,
        email: user.email,
        //  console.log("user", user);
      });
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
      // console.log("userId", user.uid);
      //       console.log("login", user.displayName);
      //       console.log("email", user.email);
    } catch (error) {
      console.log("error", error);
      console.log("error.messag", error.message);
    }
  };

export const userLogIn =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;

      await updateProfile(user, {
        email: user.email,
      });
      console.log("loginUser", user);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.uid,
          login: user.displayName,
          email: user.email,
        })
      );
      dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    } catch (error) {
      console.log("error", error);
      console.log("error.messag", error.message);
    }
  };

export const userLogOut = () => async (dispatch) => {
  await auth.signOut();
  dispatch(authSlice.actions.authSignOut());
  // dispatch(authSignOut());
};

export const authStateChanged = () => async (dispatch) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      dispatch(
        authSlice.actions.updateUserProfile({
          useId: user.uid,
          login: user.displayName,
        })
      ),
        dispatch(authSlice.actions.authStateChange({ stateChange: true }));
    }
  });
};
