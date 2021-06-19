import React, {useState} from 'react';
import { Text, View, StyleSheet, Button, Dimensions, TouchableOpacity, Platform, TextInput, StatusBar, Alert } from 'react-native';
import {LinearGradient} from 'expo-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import {AuthContext} from '../components/AuthContext';
import Users from '../modal/users';
import {useTheme} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {

    const {colors} = useTheme();
    const theme = useTheme();

    const [data, setData] = useState({
        email: '',
        password:'',
        secureTextEntry: true,
        check_textInputChange: false,
        isValidUser: true,
        isValidPassword: true
    })

    const {signIn} = React.useContext(AuthContext);

    const emailChangeHandler = (val) => {
        if(val.trim().length >= 4) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidUser:true

            })
        }else {
            setData({
                ...data,
                check_textInputChange: false,
                isValidUser:false
            })
        }
    };

    const passChangeHandler = val => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword:true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword:false
            });
        }
        
    }

    const togglePasswordField = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        })
    }

    const loginHandler = (email, password) => {
       const foundUser = Users.filter(user=> {
           return user.username === email && user.password === password
       });

       if(data.email.length === 0 || data.password.length === 0 ){
           Alert.alert('Wrong Input!', 'Username or password can not be blank.', [{
               text:'OK'
           }])
           return;
       }

       if(foundUser.length === 0 ){
        Alert.alert('Invalid user!', 'Username or password in incorrect.', [{
            text:'OK'
        }])
        return;
        }

        signIn(email, password);
       
    }

    const validateUserHandler = (val) => {
        if(val.trim().length >=4){
            setData({
                ...data,
                check_textInputChange: true,
                isValidUser:true
            })
        }else {
            setData({
                ...data,
                check_textInputChange: true,
                isValidUser:false
            })
        }
       
    }

    return(
       
        <View style={styles.container}>
            <StatusBar backgroundColor='#009387' barStyle="light-content"/>  
            <View style={styles.header}>
                <Text style={styles.text_header}>Login!</Text>
            </View>
            <Animatable.View 
             animation="fadeInUpBig"
            style={[styles.footer,{
                backgroundColor:colors.background
            }]}
            >
                <Text style={[styles.text_footer,{
                    color:colors.text
                }]}>User Name</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name='user-o'
                    color='#05375a'
                    size={20}
                    />
                    <TextInput
                    placeholder='Username'
                    style={[styles.textInput,{
                        color:colors.text
                    }]}
                    autoCapitalize='none'
                    onChangeText={(val)=> emailChangeHandler(val)}
                    // onEndEditing={(e)=> validateUserHandler(e.nativeEvent.text)}
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
                {data.isValidUser? null :
                    <Animatable.View animation='fadeInLeft' duration={500}>     
                        <Text style={styles.errorMsg}>Username must be 4 character long!</Text>
                    </Animatable.View>  
                }

                <Text style={[styles.text_footer,
                {marginTop: 35, color:colors.text}]}>Password</Text>
                <View style={styles.action}>
                    <FontAwesome
                    name='lock'
                    color='#05375a'
                    size={20}
                    />
                    <TextInput
                    placeholder='Your Password'
                    secureTextEntry={data.secureTextEntry? true: false}
                    style={[styles.textInput,{
                        color:colors.text
                    }]}
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

                 {data.isValidPassword?  null:     
                    <Animatable.View animation='fadeInLeft' duration={500}>     
                        <Text style={styles.errorMsg}>Password must be 8 character long!</Text>
                    </Animatable.View>
                 }

            <TouchableOpacity onPress={()=> navigation.navigate('ForgotPassword')}>
                <Text style={{color: '#009387', marginTop:15}}>Forgot password?</Text>
            </TouchableOpacity>

                <View style={styles.button}>
                <TouchableOpacity style={styles.signIn}
                    onPress={()=> loginHandler(data.email, data.password )}
                >
                    <LinearGradient
                     colors={['#08d4c4', '#01ab9d']}
                     style={styles.signIn}
                    >
                        <Text style={[styles.textSign, {
                            color:'#fff'
                        }]}>Sign In</Text>

                    </LinearGradient>
                </TouchableOpacity> 
                    <TouchableOpacity
                     onPress={()=> navigation.navigate('SignUpScreen')}
                     style={[styles.signIn, {
                         borderColor:'#009387',
                         borderWidth: 1,
                         marginTop: 15
                     }]}
                    >
                        <Text style={[styles.textSign, {
                            color:'#009387'
                        }]}>Sign Up</Text>

                    </TouchableOpacity>
                </View>
            </Animatable.View> 
            
        </View>
          
    )
}

export default LoginScreen;

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
