import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Text } from 'react-native-elements';
import { Dimensions, PixelRatio } from 'react-native';
import { ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import discount_image from '../assets/resources/ada6f23f6bb8294289f0e1eca31fa4c2.jpeg';

const { width, height } = Dimensions.get('window');
const StartScreen3 = ({ navigation }) => {
  return (
    <View>
      <ImageBackground
        source={discount_image}
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
          You can get Good Discount
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
          title='Go to Home'
          onPress={() => navigation.navigate('Home')}
        />
      </ImageBackground>
    </View>
  );
};

export default StartScreen3;

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
