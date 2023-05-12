import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged, 
  signOut
} from "firebase/auth";
import { auth } from "../../firebase/config";

import {authSlice, authSignOut} from './authReducer';


export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
        const credentials = await signInWithEmailAndPassword(auth, email, password);
        // return credentials.user;
        console.log(credentials.user);
      } catch (error) {
        console.log(error.message);
      }
  };

export const authSignUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password);
      // dispatch(authSlice.actions.updateUserProfile({userId: user.uid}))

      const userCurrent = auth.currentUser;

     updateProfile(userCurrent, {
        displayName: login
      });

      const updateUserSuccess =  auth.currentUser;

      dispatch(
        authSlice.actions.updateUserProfile({
          userId: updateUserSuccess.uid,
          login: updateUserSuccess.displayName
        })
      )
    } catch (error) {
      console.log(error.message);
    }
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  await signOut(auth);
  dispatch(authSignOut())
};

export const authStateChangeUser = () => async (dispatch, getState) => {
 onAuthStateChanged (auth, (user)=>{
  if(user){
    const userUpdateProfile = {
      login: user.displayName,
      userId: user.uid
    }
    dispatch(authSlice.actions.updateUserProfile(userUpdateProfile))
    dispatch(authSlice.actions.authStateChange({stateChange: true}))
  }
})
};
