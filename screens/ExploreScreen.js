import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

const ExploreScreen = () => {
    return(
       
        <View style={styles.container}>
            <Text>Explore Screen</Text>
            <Button title="Click Here"
                onPress={() => alert('Explore Clicked!')}
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

export default ExploreScreen;