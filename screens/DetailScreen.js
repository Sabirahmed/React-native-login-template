import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const DetailScreen = ({navigation}) => {
    return(
       
        <View style={styles.container}>
            <Text>Detail Screen</Text>
            <Button title= 'Go To Detail Screen...again' onPress= {()=> navigation.push('Detail')} />
            <Button title= 'Go To Home' onPress= {()=> navigation.navigate('Home')} />
            <Button title= 'Go Back' onPress= {()=> navigation.goBack()} />
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

export default DetailScreen;