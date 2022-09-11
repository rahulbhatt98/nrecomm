import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Avatar, Input, Button } from 'react-native-elements';
import { AntDesign } from 'react-native-vector-icons';
import product1 from '../assets/resources/product1.jpeg';
import product2 from '../assets/resources/product2.jpeg';
import product3 from '../assets/resources/product3.jpeg';
import product4 from '../assets/resources/product4.jpeg';
import { Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');

const WishlistScreen = ({ navigation }) => {
  const [search, setSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState('');

  const addToCart = async () => {};
  const wishlist_products = [];
  useEffect(() => {
    const getData = async () => {
      try {
        const lgemail = await AsyncStorage.getItem('email');
        if (lgemail == null) {
          navigation.navigate('Login');
        }
        console.log(lgemail);
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
        console.log('data us', data);
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
          height: 120,
          width: width,
          backgroundColor: 'rgba(7,95,147,0.8)',
          dropShadow: 20,
          paddingTop: 20,
        }}
      >
        {search ? (
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 30,
              alignItems: 'center',
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
              justifyContent: 'space-between',
              margin: 10,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Avatar
                rounded
                source={require('../assets/resources/avatar.jpeg')}
              />
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={{ margin: 8, color: 'white', fontSize: 20 }}>
                  {!loadUser && user.name}
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}
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

      <ScrollView
        style={{
          backgroundColor: 'rgb(248,248,248)',
          marginTop: -25,
          borderRadius: 30,
          height: height,
        }}
      >
        {loadUser ? (
          <Text>Loading</Text>
        ) : (
          user.wishlist.map((e, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Product', { ...user, ...e })}
            >
              <View
                style={{
                  marginVertical: 15,
                  marginHorizontal: 20,
                  backgroundColor: 'white',
                  width: `${width}` * 0.9,
                  height: 150,
                  elevation: 10,
                  borderRadius: 30,
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Image
                  source={{
                    uri: e.product_image,
                  }}
                  style={{ width: 150, height: 150, borderRadius: 30 }}
                />
                <View
                  style={{
                    width: 140,
                    height: 150,
                    marginHorizontal: 5,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: '#707070', fontSize: 15 }}>
                    {e.product_name}
                  </Text>
                  <Text
                    style={{
                      marginVertical: 5,
                      fontSize: 20,
                      color: 'rgba(7,135,147,0.5)',
                    }}
                  >
                    ${e.product_price}
                  </Text>
                  <View
                    style={{
                      width: 50,
                      height: 30,
                      backgroundColor: 'rgba(7,95,147,0.8)',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginVertical: 10,
                      borderRadius: 10,
                    }}
                  >
                    <AntDesign name='star' size={20} color='white' />
                    <Text style={{ color: 'white' }}>{e.product_rating}</Text>
                  </View>
                </View>
                <View
                  style={{ alignSelf: 'flex-start', width: 15, marginTop: 15 }}
                >
                  <AntDesign name='heart' size={15} color='red' />
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        <View>
          <Button
            containerStyle={styles.button}
            title='Go To Cart'
            ViewComponent={LinearGradient} // Don't forget this!
            linearGradientProps={{
              colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
              start: { x: 0, y: 0.5 },
              end: { x: 1, y: 0.5 },
            }}
            onPress={() => navigation.navigate('Cart')}
          />
        </View>

        <View style={{ height: 150 }}></View>
      </ScrollView>
    </View>
  );
};

export default WishlistScreen;

const styles = StyleSheet.create({
  button: {
    width: `${width}` * 0.5,
    borderRadius: 50,
    alignSelf: 'center',
    margin: 20,
  },
});
