import React,{useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../router";
import { useSelector, useDispatch } from "react-redux";
import { authStateChangeUser } from "../redux/auth/authOperations";

const Main = () => {
    const {stateChange} = useSelector(state => state.auth);
    const dispath = useDispatch();

     useEffect(()=>{
        dispath(authStateChangeUser())
     },[]);

    const routing = useRoute(stateChange);

    return <NavigationContainer>{routing}</NavigationContainer>
};

export default Main;
