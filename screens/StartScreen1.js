import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { Dimensions, PixelRatio } from 'react-native';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import lady_image from '../assets/resources/bfff1d77e6360819af2a66af8e9472e7.jpeg';

const { width, height } = Dimensions.get('window');
const StartScreen1 = ({ navigation }) => {
  return (
    <View>
      <ImageBackground
        source={lady_image}
        style={{ width: width, height: height }}
      >
        <View style={styles.overlay} />
        <Text
          h2
          style={{
            marginTop: `${height}` - 250,
            marginHorizontal: 20,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          You can buy clothes
        </Text>
        <Button
          type='outline'
          titleStyle={{
            color: '#fff',
          }}
          buttonStyle={{
            marginHorizontal: 20,
            marginVertical: 30,
            borderRadius: 20,
            borderColor: '#fff',
            height: 40,
            borderWidth: 2,
          }}
          title='Lets Get Started'
          onPress={() => navigation.navigate('Start2')}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 10,
              fontWeight: 'bold',
              color: 'white',
              fontSize: 25,
            }}
          >
            Skip
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default StartScreen1;

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(7,135,147,0.5)',
  },
});
