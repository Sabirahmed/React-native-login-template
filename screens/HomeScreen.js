import React from 'react';
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native';
import {useTheme} from '@react-navigation/native';

const HomeScreen = ({navigation}) => {

    const {colors} = useTheme();
    const theme = useTheme();

    return(
       
        <View style={[styles.container,{
            backgroundColor:colors.background
        }]}>
            <StatusBar barStyle={theme.dark? 'light-content' : 'dark-content'} />
            <Text style={{color:colors.text}}>Home Screen</Text>
            <Button title="Go to details screen"
                onPress={() => navigation.navigate("Detail")}
            />
        </View>
          
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default HomeScreen;