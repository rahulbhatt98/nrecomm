import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from 'react-native-vector-icons';
import { Avatar, Image, Button, Input } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const ChangePasswordScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [search, setSearch] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const lgemail = await AsyncStorage.getItem('email');
        if (lgemail == null) {
          navigation.navigate('Login');
        }
        const email = lgemail;
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.post(
          'http://192.168.43.164:5000/api/users/user',
          { email },
          config
        );

        setUser(data);
        setLoadUser(!loadUser);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const changePassword = async () => {
    try {
      const lgemail = await AsyncStorage.getItem('email');
      if (lgemail == null) {
        navigation.navigate('Login');
      }
      const email = lgemail;
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
      alert('Your password has been updated');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            height: 130,
            width: width,
            backgroundColor: 'rgba(7,95,147,0.8)',
          }}
        >
          {search ? (
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 30,
                alignItems: 'center',
                justifyContent: 'space-between',
                marginHorizontal: 20,
              }}
            >
              <Avatar
                rounded
                source={require('../assets/resources/avatar.jpeg')}
              />
              <Input
                type='text'
                value={searchString}
                onChangeText={(text) => setSearchString(text)}
                containerStyle={{
                  width: `${width}` - 100,
                  height: 35,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  outline: false,
                  marginHorizontal: 10,
                }}
              />
              <TouchableOpacity onPress={() => setSearch(false)}>
                <AntDesign name='search1' size={20} color='white' />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: 30,
                marginHorizontal: 15,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <AntDesign
                    name='arrowleft'
                    size={30}
                    color='white'
                    style={{ paddingLeft: 10, paddingRight: 5 }}
                  />
                </TouchableOpacity>
                <Avatar
                  rounded
                  source={require('../assets/resources/avatar.jpeg')}
                />
                <Text style={{ margin: 8, color: 'white', fontSize: 20 }}>
                  {loadUser ? <Text>Loading</Text> : user.name}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                }}
              >
                <TouchableOpacity onPress={() => setSearch(true)}>
                  <AntDesign
                    name='search1'
                    size={30}
                    color='white'
                    style={{ paddingHorizontal: 10 }}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                  <AntDesign name='shoppingcart' size={30} color='white' />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            marginTop: -40,
            backgroundColor: 'white',
            borderRadius: 50,
            alignItems: 'center',
            height: height,
          }}
        >
          <Text style={styles.registerText}>Change Password</Text>
          <View style={styles.inputView}>
            <Text style={styles.textInput}> Password</Text>
            <Input
              type='password'
              value={password}
              placeholder='Enter Password'
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
            />
            <Text style={styles.textInput}> Confirm Password</Text>
            <Input
              type='password'
              value={confirmPassword}
              placeholder='Enter Confirm Password'
              onChangeText={(text) => setConfirmPassword(text)}
              secureTextEntry
            />
          </View>

          <Button
            containerStyle={styles.button}
            title='Change Password'
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={() => changePassword()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
  registerText: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 15,
    alignSelf: 'center',
  },

  inputView: {
    paddingTop: 15,
    color: '#9DA3B4',
    width: 300,
    alignSelf: 'center',
  },
  textInput: {
    color: '#9DA3B4',
  },

  button: {
    width: 200,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  container: {
    flex: 1,
  },
});
