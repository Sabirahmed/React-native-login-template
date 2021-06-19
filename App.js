
import 'react-native-gesture-handler';
import React, {useEffect, useMemo, useState} from 'react';
import { ActivityIndicator, StyleSheet} from 'react-native';
import { NavigationContainer, DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MainTabScreen from './screens/MainTabScreen';
import {DrawerContent} from './components/DrawerContent';
import SupportScreen from './screens/SupportScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import RootStackScreen from './screens/RootStackScreen';
import { View } from 'react-native-animatable';
import {AuthContext} from './components/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DarkTheme as PaperDarkTheme, Provider as PaperProvider, DefaultTheme as PaperDefaultTheme} from 'react-native-paper';




const Drawer = createDrawerNavigator();



const App = (props) => {

  // const [isLoading, setIsLoading] = useState(true);
  // const [userToken, setUserToken] = useState(null);
 
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333'
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff'
    }
  }

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  const initialState = {
    isLoading: true,
    userName: null,
    userToken: null,
  }

  const loginReducer = (prevState, action) => {
    switch(action.type) {
      case 'RETRIEVE_TOKEN':
        return{
          ...prevState,
          userToken: action.token,
          isLoading:false
        };
      case 'LOGIN':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading:false
        }  ;
      case 'LOGOUT':
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading:false
        };
      case 'REGISTER':
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading:false
        }   

    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialState)

  const authContext = useMemo(() => ({
    signIn: async(foundUser) => {
     
      let userToken = foundUser[0].userToken;
      const userName = foundUser.username;
      
        try {
          userToken = 'dfgdfg';
          await AsyncStorage.setItem('userToken', userToken)
        } catch (e) {
          console.log(e);
        }
      
      dispatch({type:'LOGIN', id:userName, token:userToken});
    },
    signOut: async() => {
      try {        
        await AsyncStorage.removeItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({type:'LOGOUT'});
    },
    signUp: (userName, pass) => {
      userToken = 'dfgdfg';
      dispatch({type:'REGISTER', id:userName, token:userToken, password:pass})
    },
    toggleTheme: () => {

      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    const timer = setTimeout(async()=> {
      //setIsLoading(false);
      let userToken = null;
      try {        
        await AsyncStorage.getItem('userToken')
      } catch (e) {
        console.log(e);
      }
      dispatch({type:'REGISTER', token:userToken});
    }, 1000)

    // if(timer) {
    //   return ()=> {clearTimer(timer)} ;
    // }
    
  }, [])


  if(loginState.isLoading) {
    return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator size='large' />
    </View>
    )
  }



  return (
    <PaperProvider there= {theme}>
      <AuthContext.Provider value={authContext}>
          <NavigationContainer theme={theme}>
            {loginState.userToken === null? 
            <RootStackScreen /> :

              <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
              <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
              <Drawer.Screen name="SupportScreen" component={SupportScreen} />
              <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
              </Drawer.Navigator> 
            
            }
            
          
            
          </NavigationContainer>
      </AuthContext.Provider>
     </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;