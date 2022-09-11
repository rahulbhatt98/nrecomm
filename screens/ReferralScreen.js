import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from 'react-native-vector-icons';
import { Avatar, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const ReferralScreen = ({ navigation }) => {
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
          <View
            style={{ margin: 25, flexDirection: 'row', alignItems: 'center' }}
          >
            <MaterialCommunityIcons name='cash-refund' size={25} />
            <Text
              style={{
                fontSize: 25,
                marginLeft: 5,
                fontWeight: '400',
                color: 'gray',
              }}
            >
              Referrals{' '}
            </Text>
          </View>
          <View
            style={{
              height: 200,
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
              <Image
                source={{
                  uri: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fgifimage.net%2Fwp-content%2Fuploads%2F2017%2F11%2Fgift-gif-14.gif&f=1&nofb=1',
                }}
                style={{ height: 150, width: `${width}` * 0.4 }}
              />
              <View>
                <Text
                  style={{
                    fontSize: 25,
                    fontWeight: '800',
                    width: `${width}` * 0.5,
                    marginVertical: 15,
                  }}
                >
                  Refer your friend an app
                </Text>
                <Text style={{ width: `${width}` * 0.5 }}>
                  You'll earn $10 on its first order
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              height: 70,
              width: `${width}` * 0.9,
              backgroundColor: 'white',
              elevation: 15,
              borderRadius: 30,
              marginHorizontal: 15,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Text style={{ margin: 20, fontSize: 25, color: '#707070' }}>
                ABCDEF45
              </Text>
              <TouchableOpacity
                style={{ marginHorizontal: 25 }}
                onPress={() => copy()}
              >
                <Text style={{ color: 'rgba(7,95,147,0.8)' }}>Copy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReferralScreen;

const styles = StyleSheet.create({});
