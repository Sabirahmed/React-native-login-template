import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const ProfileScreen = () => {
    return(
       
        <View style={styles.container}>
            <Text>Detail Screen</Text>
            <Button title="Click Here"
                onPress={() => alert('Profile Clicked!')}
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

export default ProfileScreen;