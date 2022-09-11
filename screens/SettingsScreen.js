import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import {
  AntDesign,
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
} from 'react-native-vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const SettingsScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);

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
  return (
    <View>
      <View
        style={{
          height: 200,
          width: width,
          backgroundColor: 'rgba(7,95,147,0.8)',
          dropShadow: 20,
          paddingTop: 20,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}
        >
          <View>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name='arrowleft'
                size={30}
                color='white'
                style={{ paddingLeft: 15 }}
              />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 5,
              marginHorizontal: 10,
            }}
          >
            <TouchableOpacity onPress={() => {}}>
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

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 5,
            marginHorizontal: 15,
          }}
        >
          <Avatar
            rounded
            source={require('../assets/resources/avatar.jpeg')}
            size={70}
          />
          <View style={{ textAlign: 'start' }}>
            <Text
              style={{
                margin: 8,
                color: 'white',
                fontSize: 24,
                fontWeight: '900',
              }}
            >
              {loadUser ? <Text>Loading</Text> : user.name}
            </Text>
            <Text
              style={{ color: 'white', fontSize: 12, paddingHorizontal: 10 }}
            >
              {loadUser ? <Text>Loading</Text> : user.email}
            </Text>
          </View>
        </View>

        <View
          style={{
            marginTop: 2,
            backgroundColor: 'rgb(248,248,248)',
            borderRadius: 30,
            height: height,
          }}
        >
          <View style={{ margin: 15 }}>
            <Text style={{ fontSize: 10, fontWeight: '900' }}>SETTINGS</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ChangePassword')}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Change Password
                </Text>
                <Entypo name='key' size={20} color='gold' />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('Country')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Country
                </Text>
                <FontAwesome5 name='flag-usa' size={20} color='red' />
              </View>
              </TouchableOpacity>*/}

            {/* <TouchableHighlight onPress={() => console.log('pressed')}> */}
            {/*<TouchableOpacity onPress={() => navigation.navigate('Currency')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Currency
                </Text>
                <MaterialCommunityIcons
                  name='currency-inr'
                  size={20}
                  color='green'
                />
              </View>
            </TouchableOpacity> */}

            {/* </TouchableHighlight> */}
            <TouchableOpacity onPress={() => navigation.navigate('Language')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Language
                </Text>
                <MaterialCommunityIcons name='google-translate' size={20} />
              </View>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => navigation.navigate('FeedBack')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  FeedBack
                </Text>
                <FontAwesome name='feed' size={20} />
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity onPress={() => navigation.navigate('Privacy')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Privacy Policy
                </Text>
                <MaterialIcons name='privacy-tip' size={20} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Legal')}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginVertical: 10,
                }}
              >
                <Text
                  style={{ fontSize: 18, fontWeight: '400', color: 'gray' }}
                >
                  Legal Information
                </Text>
                <AntDesign name='API' size={20} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({});
