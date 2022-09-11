import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  _ScrollView,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { AntDesign, Entypo } from 'react-native-vector-icons';
import { Avatar, Input, Button } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

const AddressScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);
  const [showAddress, setShowAddress] = useState(false);
  const [house_no, setHouse] = useState('');
  const [street_name, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
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

  const updateAddress = async () => {
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
        'http://192.168.43.164:5000/api/users/addAddress',
        { email, house_no, street_name, city, state },
        config
      );
      navigation.navigate('Cart');
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
          }}
        >
          <View
            style={{
              width: `${width}` * 0.9,
              backgroundColor: 'white',
              elevation: 15,
              marginVertical: 15,
              marginHorizontal: 20,
              borderRadius: 30,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: `${width}` * 0.85,
                marginTop: 10,
              }}
            >
              <View
                style={{
                  marginHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Entypo name='location-pin' size={30} color='red' />
                <Text style={{ fontSize: 18, color: 'rgba(7,135,95,0.8)' }}>
                  {loadUser ? <Text>Loading</Text> : user.name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => console.log('pressed')}>
                <Text style={{ color: 'rgba(7,95,147,0.8)' }}>Change</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 15, marginVertical: 5 }}>
              {loadUser ? (
                <Text>Loading</Text>
              ) : user.address.length === 0 ? (
                <Text style={{ marginBottom: 15 }}>
                  Your address will be updated here
                </Text>
              ) : (
                <View style={{ marginBottom: 15 }}>
                  <Text style={{ fontSize: 18 }}>
                    House NO:{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                      {user.address[0].house_no}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 18 }}>
                    Street Name:{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                      {user.address[0].street_name}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 18 }}>
                    City:{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                      {user.address[0].city}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 18 }}>
                    State:{' '}
                    <Text style={{ fontWeight: 'bold' }}>
                      {user.address[0].state}
                    </Text>
                  </Text>
                  <Text style={{ fontSize: 18 }}>
                    Country: <Text style={{ fontWeight: 'bold' }}>India</Text>
                  </Text>
                </View>
              )}
            </View>
          </View>

          <Text style={styles.registerText}>Update Address</Text>
          <View style={styles.inputView}>
            <Text style={styles.textInput}> House Number</Text>
            <Input
              type='text'
              value={house_no}
              placeholder='Enter House Number'
              onChangeText={(text) => setHouse(text)}
            />
            <Text style={styles.textInput}> Street Name</Text>
            <Input
              type='email'
              value={street_name}
              placeholder='Enter Email'
              onChangeText={(text) => setStreet(text)}
            />

            <Text style={styles.textInput}>City</Text>
            <Input
              type='text'
              value={city}
              onChangeText={(text) => setCity(text)}
              placeholder='Enter City'
            />

            <Text style={styles.textInput}>State</Text>
            <Input
              type='text'
              value={state}
              onChangeText={(text) => setState(text)}
              placeholder='Enter State'
            />
          </View>

          <Button
            containerStyle={styles.button}
            title='Update Address'
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={() => updateAddress()}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddressScreen;

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
    marginBottom: 40,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  forgotText: {
    marginTop: 20,
    textDecorationLine: 'underline',
    color: '#9DA3B4',
  },
});
