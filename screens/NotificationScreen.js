import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from 'react-native-vector-icons';
import { Avatar, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const NotificationScreen = ({ navigation }) => {
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
            <AntDesign name='notification' size={20} />
            <Text
              style={{
                fontSize: 25,
                marginLeft: 5,
                fontWeight: '400',
                color: 'gray',
              }}
            >
              Notifications{' '}
            </Text>
          </View>

          <View
            style={{
              height: 50,
              width: `${width}` * 0.9,
              backgroundColor: 'white',
              elevation: 15,
              borderRadius: 30,
              marginHorizontal: 15,
            }}
          >
            <Text
              style={{
                marginTop: 15,
                marginHorizontal: 20,
                fontSize: 15,
                color: '#707070',
              }}
            >
              Your order has been delievered{' '}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({});
