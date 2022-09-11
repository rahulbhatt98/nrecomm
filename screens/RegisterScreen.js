import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from 'react-native-vector-icons';
import Dropd from 'react-dropd';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height, width } = Dimensions.get('window');
const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [gender, setGender] = useState('Male');
  const [phone, setPhone] = useState('');

  const register = async () => {
    if (password === confirmPassword) {
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
          'http://192.168.43.164:5000/api/users/',
          { name, email, password, gender, phone },
          config
        );
        navigation.navigate('Home', data);
      } catch (error) {
        alert(error.message);

        console.log(error);
      }
    } else {
      alert('Password dont match');
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={styles.registerText}>Register</Text>
          <View style={styles.inputView}>
            <Text style={styles.textInput}> Name</Text>
            <Input
              type='name'
              value={name}
              placeholder='Enter Name'
              onChangeText={(text) => setName(text)}
            />
            <Text style={styles.textInput}> Email</Text>
            <Input
              type='email'
              value={email}
              placeholder='Enter Email'
              onChangeText={(text) => setEmail(text)}
            />
            <Text style={styles.textInput}>Gender</Text>
            <Picker
              style={styles.picker}
              selectedValue={gender}
              onValueChange={(text) => setGender(text)}
            >
              <Picker.Item label='Male' value='Male' />
              <Picker.Item label='Female' value='Female' />
            </Picker>
            <Text style={styles.textInput}>Phone</Text>
            <Input
              type='text'
              value={phone}
              onChangeText={(text) => setPhone(text)}
              icon={<Icon name='arrow-right' size={15} color='black' />}
              placeholder='Enter Phone'
            />
            <Text style={styles.textInput}>Password</Text>
            <Input
              type='password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              icon={<Icon name='arrow-right' size={15} color='black' />}
              secureTextEntry
              placeholder='Enter Password'
            />
            <Text style={styles.textInput}>Confirm Password</Text>
            <Input
              type='password'
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              icon={<Icon name='arrow-right' size={15} color='black' />}
              secureTextEntry
              placeholder='Enter Password'
            />
          </View>

          <Button
            containerStyle={styles.button}
            title='Register'
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={() => register()}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 15,
          }}
        >
          <Text style={{ fontSize: 18, color: '#9DA3B4' }}>
            Already Have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: 'rgba(7,135,147,0.5)', fontSize: 18 }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 100 }}></View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  registerText: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 15,
    alignSelf: 'center',
  },
  picker: {
    width: 300,
    height: 30,
    color: '#9DA3B4',
    marginVertical: 10,
    borderColor: '#9DA3B4',
    borderWidth: 1,
  },
  inputView: {
    paddingTop: 35,
    color: '#9DA3B4',
    width: 300,
  },
  textInput: {
    color: '#9DA3B4',
  },

  button: {
    width: 200,
    marginTop: 20,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  forgotText: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#9DA3B4',
  },
});
