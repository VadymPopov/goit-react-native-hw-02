import React, {useState, useRef} from 'react';

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
} from 'react-native';

import { useDispatch } from 'react-redux';
import { authSignInUser } from '../../redux/auth/authOperations';

  const initialState = {
    email:'',
    password: '',
  };

export default function LoginScreen({ navigation }) {
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);

  const dispatch = useDispatch();

  const emailRef = useRef();

  const passwordToggle = () => {
    setIsPasswordShown((value) => !value);
  };

  const [auth, setAuth] = useState(initialState);
  const passwordHandler = (value)=>setAuth((prevState)=>({...prevState, password: value}));
  const emailHandler = (value)=>setAuth((prevState)=>({...prevState, email: value}));

  const keyboardHide = ()=>{
    setIsShownKeyboard(false);
    Keyboard.dismiss();
  };
  
  const onHandleSubmit = ()=>{
    setAuth(initialState)
    dispatch(authSignInUser(auth))
  };

    return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
       <ImageBackground style={styles.image} source={require('../../assets/images/mountains-bg.png')}>
          <KeyboardAvoidingView 
          behavior={Platform.OS == "ios" ? "padding" : "height"}
          style={styles.container}
        >
            <View style={{...styles.form, marginBottom: isShownKeyboard ? -94 : 144}}>
              <Text style={styles.title}>Log In</Text>
              <TextInput
                  value={auth.email}
                  onChangeText={emailHandler}
                  placeholder="Email"
                  keyboardType="email-address"
                  style={[styles.input,  {borderColor: isEmailFocused ? "#FF6C00" : "#E8E8E8" , backgroundColor:  isEmailFocused ?  "#fff" :"#F6F6F6"} ]}
                  textAlign={'left'}
                  onFocus={()=>{setIsShownKeyboard(true), setIsEmailFocused(true)}}
                  onBlur={() => setIsEmailFocused(false)}
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    emailRef.current.focus();
                  }}
                  blurOnSubmit={false}

                />
               <View style={[styles.input,  {borderColor: isPasswordFocused ? "#FF6C00" : "#E8E8E8" , backgroundColor:  isPasswordFocused ?  "#fff" :"#F6F6F6"} ]}>
                <TextInput
                  value={auth.password}
                  onChangeText={passwordHandler}
                  placeholder="Password"
                  secureTextEntry={isPasswordShown}
                  textAlign={'left'}
                  onFocus={()=>{setIsShownKeyboard(true), setIsPasswordFocused(true)}}
                  onBlur={() => setIsPasswordFocused(false)}
                  ref={emailRef}
                  onSubmitEditing={() => {setIsShownKeyboard(false)}}
                 />
                 <TouchableOpacity activeOpacity={0.5} style={styles.showBtn} onPress={passwordToggle}>
                    <Text style={styles.showTitle}>{isPasswordShown ? 'Show' : 'Hide'}</Text>
                 </TouchableOpacity>
               </View>
                <View>
                  <TouchableOpacity activeOpacity={0.8} style={styles.btn} onPress={onHandleSubmit}>
                    <Text style={styles.btnTitle}>Log In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} style={{marginTop: 16}} onPress={()=>navigation.navigate('Registration')}>
                    <Text style={styles.link}>Don't have an account? Register</Text>
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
      paddingTop: 32,
   },
    title: {
      fontSize: 30,
      fontWeight: 'Medium',
      lineHeight: 35,
      textAlign: "center",
      letterSpacing: 0.01,
      color: "#212121",
      marginBottom: 20,

    },
    input: {
      height: 50,
      marginTop: 16,
      borderWidth: 1,
      borderRadius: 8,
      padding: 16,
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
    },
  });
