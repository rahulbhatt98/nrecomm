import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import { AntDesign, Entypo } from 'react-native-vector-icons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [logEmail, setLogEmail] = useState('');
  const [logPassword, setLogPassword] = useState('');
  const login = async () => {
    try {
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('password');

      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios.post(
        'http://192.168.43.164:5000/api/users/login',
        {
          email,
          password,
        },
        config
      );
      navigation.navigate('Home', data);
    } catch (error) {
      alert(error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const log_email = await AsyncStorage.getItem('email');
      setLogEmail(log_email);
      const log_password = await AsyncStorage.getItem('password');
      setLogPassword(log_password);
    };
    getData();
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'rgb(248,248,248)', height: height }}
      behavior='padding'
    >
      <View
        style={{
          height: 200,
          width: width,
          backgroundColor: 'rgba(7,95,147,0.8)',
          borderBottomLeftRadius: 200,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <AntDesign name='shoppingcart' color='white' size={40} />
          <Text
            style={{
              fontWeight: '900',
              fontSize: 25,
              color: 'white',
              paddingHorizontal: 5,
            }}
          >
            Vaib Ecom
          </Text>
        </View>
      </View>

      <View
        style={{
          marginHorizontal: 15,
          marginVertical: 40,
        }}
      >
        <View style={styles.inputView}>
          <Text style={styles.textInput}> Email</Text>
          <Input
            type='email'
            value={email}
            leftIcon={<Entypo name='email' size={20} color='gold' />}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={styles.inputView}>
          <Text style={styles.textInput}> Password</Text>
          <Input
            type='password'
            value={password}
            onChangeText={(text) => setPassword(text)}
            leftIcon={<Entypo name='key' size={20} color='gold' />}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password</Text>
        </TouchableOpacity>

        <Button
          containerStyle={styles.button}
          title='Login'
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          onPress={() => login()}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 18, color: '#9DA3B4' }}>
          Don't Have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ color: 'rgba(7,135,147,0.5)', fontSize: 18 }}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputView: {
    paddingLeft: 15,
    paddingTop: 15,
    color: '#9DA3B4',
    width: 300,
  },
  textInput: {
    color: '#9DA3B4',
    padding: 5,
  },
  button: {
    width: 200,
    marginTop: 20,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  forgotText: {
    marginHorizontal: 25,
    alignSelf: 'flex-end',
    textDecorationLine: 'underline',
    color: '#9DA3B4',
  },
});
