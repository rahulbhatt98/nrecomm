import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { Dimensions, PixelRatio } from 'react-native';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import watch_image from '../assets/resources/f3ea951565274dafe8b3b3280fa46242.jpeg';

const { width, height } = Dimensions.get('window');
const StartScreen2 = ({ navigation }) => {
  return (
    <View>
      <ImageBackground
        source={watch_image}
        style={{ width: width, height: height }}
      >
        <View style={styles.overlay} />
        <Text
          h2
          style={{
            marginTop: `${height}` - 250,
            marginHorizontal: 10,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          You can buy Watches & Accessories
        </Text>
        <Button
          type='outline'
          titleStyle={{
            color: '#fff',
            fontSize: 20,
          }}
          buttonStyle={{
            marginHorizontal: 20,
            marginVertical: 30,
            borderRadius: 20,
            borderColor: '#fff',
            borderWidth: 2,
          }}
          title='Click Here'
          onPress={() => navigation.navigate('Start3')}
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

export default StartScreen2;

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
