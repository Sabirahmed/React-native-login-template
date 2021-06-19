import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Platform, TextInput, StatusBar, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import MaterialIcons from'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import { color } from 'react-native-reanimated';
import { NavigationContainer } from '@react-navigation/native';
import {AuthContext} from '../components/AuthContext';

const SignUpScreen = ({navigation}) => {

    const {signUp} = React.useContext(AuthContext);

    const [data, setData] = useState({
        email: '',
        password:'',
        confirmPassword: '',
        secureTextEntry: true,
        check_textInputChange: false,
        confirm_secureTextEntry: true,
        isValidEmail: true,
        isValidPass: true,
        isValidConfirmPass: true
    })

    const emailChangeHandler = (val) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(val) === false) {
            setData({
                ...data,
                email:val,
                isValidEmail:false
            });
            return;
        }
        else {
            setData({
                ...data,
                email:val,
                isValidEmail:true
            });
        }
    };

    const passChangeHandler = val => {
        var reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        console.log(reg.test(val));
         if(reg.test(val) === true) {
             setData({
                 ...data,
                 isValidPass: true,
                 password: val

             })
         }else {
            setData({
                ...data,
                isValidPass: false,
                password: val
            })
         }
        
    }

    const confirmPassChangeHandler = (val) => {
        if(data.password === val) {
            setData({
                ...data,
                isValidConfirmPass: true,
                confirmPassword: val
            })
        }else {
            setData({
                ...data,
                isValidConfirmPass: false,
                confirmPassword: val
            })
        }
    }

    const togglePasswordField = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const toggleConfirmPasswordField = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        })
    }

    const registerHandler = () => {
        
        if(data.email.length === 0 || data.password.length === 0 || data.email.trim() === '' || data.password.trim() === ''){
            Alert.alert('Wrong Input!', 'Username or password can not be blank.', [{
                text:'OK'
            }])
            return;
        }
        if(data.isValidEmail && data.isValidPass && data.isValidConfirmPass && data.confirmPassword.trim() !== ''){
            signUp(data.email, data.password);
        }else {
            Alert.alert('Wrong Input!', 'Confirm password did not match', [{
                text:'OK'
            }])
            return;
        }
        
    }

    return(
       
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle='light-content' />
            <View style={styles.header}>
                <Text style={styles.text_header}>Register!</Text>
            </View>
            <Animatable.View 
             animation="fadeInUpBig"
            style={styles.footer}
            >
                <Text style={styles.text_footer}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name='user-o'
                    color='#05375a'
                    size={20}
                    />
                    <TextInput
                    placeholder='Your Email'
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={(val)=> emailChangeHandler(val)}
                    />
                    {data.check_textInputChange ?
                    <Animatable.View
                        animation="bounceIn"
                    >

                
                    <Feather
                    name='check-circle'
                    color='green'
                    size={20}
                    />
                    </Animatable.View>: null}
                </View>
                {data.isValidEmail? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>     
                        <Text style={styles.errorMsg}>Please enter valid email address!</Text>
                    </Animatable.View>  
                }

                <Text style={[styles.text_footer,
                {marginTop: 35}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name='lock'
                    color='#05375a'
                    size={20}
                    />
                    <TextInput
                    placeholder='Your Password'
                    secureTextEntry={data.secureTextEntry? true: false}
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={(val)=> passChangeHandler(val)}
                    />
                    <TouchableOpacity
                        onPress={togglePasswordField}
                    >
                        {data.secureTextEntry?
                            <Feather
                            name='eye-off'
                            color='grey'
                            size={20}
                            /> :
                            <Feather
                            name='eye'
                            color='grey'
                            size={20}
                            />
                        }
                        
                    </TouchableOpacity>
                   
                </View>

                {data.isValidPass? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>     
                        <Text style={styles.errorMsg}>Please enter strong password!</Text>
                    </Animatable.View>  
                }

                <Text style={[styles.text_footer,
                {marginTop: 35}]}>Confirm Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name='lock'
                    color='#05375a'
                    size={20}
                    />
                    <TextInput
                    placeholder='Confirm Password'
                    secureTextEntry={data.confirm_secureTextEntry? true: false}
                    style={styles.textInput}
                    autoCapitalize='none'
                    onChangeText={(val)=> confirmPassChangeHandler(val)}
                    />
                    <TouchableOpacity
                        onPress={toggleConfirmPasswordField}
                    >
                        {data.confirm_secureTextEntry?
                            <Feather
                            name='eye-off'
                            color='grey'
                            size={20}
                            /> :
                            <Feather
                            name='eye'
                            color='grey'
                            size={20}
                            />
                        }
                        
                    </TouchableOpacity>
                   
                </View>

                {data.isValidConfirmPass? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>     
                        <Text style={styles.errorMsg}>Confirm password didn't match!</Text>
                    </Animatable.View>  
                }

                <View style={styles.button}>
                    <TouchableOpacity
                     style={styles.signIn}
                     onPress={()=> registerHandler(data.email, data.password)}
                     >
                        <LinearGradient
                        colors={['#08d4c4', '#01ab9d']}
                        style={styles.signIn}
                        >
                            <Text style={[styles.textSign, {
                                color:'#fff'
                            }]}>Sign Up</Text>

                        </LinearGradient>
                    </TouchableOpacity> 
                    <TouchableOpacity
                     onPress={()=> navigation.goBack()}
                     style={[styles.signIn, {
                         borderColor:'#009387',
                         borderWidth: 1,
                         marginTop: 15
                     }]}
                    >
                        <Text style={[styles.textSign, {
                            color:'#009387'
                        }]}>Sign In</Text>

                    </TouchableOpacity>
                </View>
            </Animatable.View> 
            
        </View>
          
    )
}

export default SignUpScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      backgroundColor: '#009387'
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    actionError: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#FF0000',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a',
    },
    errorMsg: {
        color: '#FF0000',
        fontSize: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
  });
