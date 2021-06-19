import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from './HomeScreen';
import DetailScreen from './DetailScreen';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => {
    return (
        <Tab.Navigator
          initialRouteName="Home"
          activeColor="#fff"
        >
          <Tab.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
              tabBarLabel: 'Home',
              tabBarColor: '#009387',
              tabBarIcon: ({ color }) => (
                <Icon name="ios-home" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Detail"
            component={DetailStackScreen}
            options={{
              tabBarLabel: 'Updates',
              tabBarColor: '#1f65ff',
              tabBarIcon: ({ color }) => (
                <Icon name="ios-notifications" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'Profile',
              tabBarColor: '#694fad',
              tabBarIcon: ({ color }) => (
                <Icon name="ios-person" color={color} size={26} />
              ),
            }}
          />
          <Tab.Screen
            name="ExploreScreen"
            component={ExploreScreen}
            options={{
              tabBarLabel: 'Settings',
              tabBarColor: '#d02860',
              tabBarIcon: ({ color }) => (
                <Icon name="ios-aperture" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
    )
};



const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
      <HomeStack.Screen name= 'Home' component={HomeScreen} options= {{
        title: 'OverView',
        headerLeft: () => (
          <Icon.Button name='menu' size={25}
          backgroundColor='#009387' onPress={()=> {
            navigation.openDrawer()
          }} />
        )
      }} />
  
    </HomeStack.Navigator>
  );

  export default MainTabScreen;
  
  const DetailStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#1f65ff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }}>
  
    <DetailStack.Screen name= 'Detail' component={DetailScreen} options= {{
        title: 'Details',
        headerLeft: () => (
          <Icon.Button name='menu' size={25}
          backgroundColor='#1f65ff' onPress={()=> {
            navigation.openDrawer()
          }} />
        )
        
      }} />
      
    </HomeStack.Navigator>
  );
