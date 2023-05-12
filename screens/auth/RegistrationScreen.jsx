import React, {useState, useRef} from 'react';
import CrossIcon from '../../assets/images/svg/CrossIcon';
import { useNavigation } from '@react-navigation/native';

import { 
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ImageBackground,
  Image } from 'react-native';

import { useDispatch } from 'react-redux';
import {authSignUpUser } from '../../redux/auth/authOperations';

  const initialState = {
    login: '',
    email:'',
    password: '',
  };

export default function RegistrationScreen() {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isAvatarShown, setIsAvatarShown] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(true);

  const emailRef = useRef();
  const passwordRef = useRef();

  const avatarToggle = () => {
    setIsAvatarShown((value) => !value);
  };

  const passwordToggle = () => {
    setIsPasswordShown((value) => !value);
  };

  const [auth, setAuth] = useState(initialState);
  const loginHandler = (value)=>setAuth((prevState)=>({...prevState, login: value}));
  const passwordHandler = (value)=>setAuth((prevState)=>({...prevState, password: value}));
  const emailHandler = (value)=>setAuth((prevState)=>({...prevState, email: value}));

  const keyboardHide = ()=>{
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };
  
  const onHandleSubmit = ()=>{
    console.log(auth)
    dispatch(authSignUpUser(auth));
    setAuth(initialState)

  };

    return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
       <ImageBackground style={styles.image} source={require('../../assets/images/mountains-bg.png')}>
          <KeyboardAvoidingView 
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
            <View style={{...styles.form, marginBottom: isShowKeyboard ? -90 : 78}}>
              <View style={styles.avatar}>
                <View style={styles.avatarBg}>
                {isAvatarShown && (
                <Image style={styles.avatarImg} source={require('../../assets/images/avatar.jpg')}/>)}
                <TouchableOpacity style={styles.addBtn} onPress={()=>avatarToggle()}>
                  <CrossIcon  isShown={isAvatarShown} />
                </TouchableOpacity>
                </View>
              </View>

              <Text style={styles.title}>Registration</Text>
              <TextInput
                  value={auth.login}
                  onChangeText={loginHandler}
                  placeholder="Login"
                  style={styles.input}
                  textAlign={'left'}
                  onFocus={()=>{setIsShowKeyboard(true)}}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    emailRef.current.focus();
                  }}
                  blurOnSubmit={false}
                />
              <TextInput
                  value={auth.email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  keyboardType="email-address"
                  style={styles.input}
                  textAlign={'left'}
                  onFocus={()=>{setIsShowKeyboard(true)}}
                  ref={emailRef}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordRef.current.focus();
                  }}
                  blurOnSubmit={false}

                />
               <View style={styles.input}>
                <TextInput
                   value={auth.password}
                   onChangeText={passwordHandler}
                   placeholder="Password"
                   secureTextEntry={isPasswordShown}
                   textAlign={'left'}
                   onFocus={()=>{setIsShowKeyboard(true)}}
                   ref={passwordRef}
                   onSubmitEditing={() => {setIsShowKeyboard(false)}}
                 />
                 <TouchableOpacity activeOpacity={0.5} style={styles.showBtn} onPress={passwordToggle}>
                    <Text style={styles.showTitle}>{isPasswordShown ? 'Show' : 'Hide'}</Text>
                 </TouchableOpacity>
               </View>
                <View>
                  <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onHandleSubmit}>
                    <Text style={styles.btnTitle}>Register</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={{marginTop: 16}} onPress={()=>navigation.navigate('Login',{auth})}>
                    <Text style={styles.link}>Already have an account? Sign in</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
    </TouchableWithoutFeedback>
    );
  }
  
  const styles = StyleSheet.create({
    image: {
      flex: 1 ,
      resizeMode: "cover",
      justifyContent: "flex-end",
    },
    container: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 16,
      paddingTop: 92,
      // paddingBottom: 78,
   },
    title: {
      fontSize: 30,
      // fontWeight: 500,
      fontWeight: 'Medium',
      lineHeight: 35,
      textAlign: "center",
      letterSpacing: 0.01,
      color: "#212121",
      marginBottom: 20,

    },
    form: {
      // marginBottom: 27,
    },
    input: {
      height: 50,
      marginTop: 16,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      borderRadius: 8,
      padding: 16,
      backgroundColor: "#F6F6F6",
      justifyContent:'center'
    },
    showBtn:{
      position: 'absolute',
      alignSelf: 'flex-end',
      right: 16,
    },
    showTitle: {
      color: '#1B4371',
      fontSize: 16,
      // fontWeight: 400,
      fontWeight: 'Regular',
      lineHeight: 19
    },
    btn: {
      backgroundColor: "#FF6C00",
      borderRadius: 100,
      height: 50,
      alignItems: "center",
      justifyContent: "center",
      marginTop: 43,
    },
    btnTitle: {
      fontSize: 16,
      lineHeight: 19,
      color: "#FFFFFF",
    },
    link:{
      fontSize: 16,
      lineHeight: 19,
      textAlign: "center",
      color: "#1B4371",
      // marginBottom: 78,
    },
    avatar:{
      position: "absolute",
      left: 0,
      right: 0,
      transform: [{ translateY: -150 }],
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    avatarBg: {
      position: "relative",
      minWidth: 120,
      minHeight: 120,
      backgroundColor: "#F6F6F6",
      borderRadius: 16,
    },
    avatarImg: {
      borderRadius: 16,
    },
    addBtn: {
    position: "absolute",
    bottom: 14,
    right: -13,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 25,
    height: 25,
    backgroundColor: "#fff",
    borderRadius: 13,
    },
  });
