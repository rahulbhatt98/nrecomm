import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const forgot = async () => {
    if (password === confirmPassword) {
      try {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.put(
          'http://192.168.43.164:5000/api/users/forgotPassword',
          { email, password },
          config
        );
        console.log('forgot ', data);
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
        <Text style={styles.forgotText}>Change Your password</Text>
        <View style={styles.inputView}>
          <Text style={styles.textInput}> Email</Text>
          <Input
            type='email'
            value={email}
            placeholder='Enter Email'
            onChangeText={(text) => setEmail(text)}
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
          title='Update Password'
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          onPress={() => forgot()}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 25,
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
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  forgotText: {
    marginTop: 50,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 15,
    alignSelf: 'center',
  },
  inputView: {
    paddingLeft: 15,
    paddingTop: 35,
    color: '#9DA3B4',
    width: 300,
  },
  textInput: {
    color: '#9DA3B4',
    padding: 5,
  },
  button: {
    width: 200,
    height: 40,
    marginTop: 20,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
});
