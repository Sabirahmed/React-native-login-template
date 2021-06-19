import React,{useState} from 'react';
import { Text, View, StyleSheet, TextInput, StatusBar, TouchableOpacity, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {LinearGradient} from 'expo-linear-gradient';

const ForgotPassword = ({navigation}) => {
    
    const [data, setData] = useState({
        email: '',
        isValidEmail:true
    });

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

    const submitHandler = () => {
        if(data.email === '' || data.email === undefined){
            return Alert.alert('Reset Password', 'Please enter your email.', [{text:'OK'}]);
        }
        if(data.isValidEmail) {
            Alert.alert('Reset Password', 'The password link is sent to the corresponding email.',[
                {text:'OK'}
            ]);
            setTimeout(()=>{
                navigation.navigate('LoginScreen');
            }, 500)
            
        }
    }

    return(
       
        <View style={styles.container}>
        <StatusBar backgroundColor='#009387' barStyle='light-content' />
        <View style={styles.header}>
            <Text style={styles.text_header}>Forgot Password!</Text>
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
                
            </View>
        
            {data.isValidEmail? null :
                <Animatable.View animation='fadeInLeft' duration={500}>     
                    <Text style={styles.errorMsg}>Please fill correct email id!</Text>
                </Animatable.View>  
            }

            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Text style={{color: '#009387', marginTop:15}}>Back To Login!</Text>
            </TouchableOpacity>


            <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}
                onPress={()=> submitHandler()}
            >
                <LinearGradient
                 colors={['#08d4c4', '#01ab9d']}
                 style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Submit</Text>

                </LinearGradient>
            </TouchableOpacity> 
                
            </View>
        </Animatable.View> 
        
    </View>
      
)
}

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

export default ForgotPassword;