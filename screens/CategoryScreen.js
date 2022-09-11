import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Touchable,
  FlatList,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Avatar } from 'react-native-elements';
import { AntDesign } from 'react-native-vector-icons';
import { Input } from 'react-native-elements';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const category = [
  'Electronic',
  'Fashion',
  'Toys',
  'Grocery',
  'Books',
  'Furniture',
];

const renderItem = ({ c }) => {
  return (
    <TouchableOpacity>
      <Text>{c}</Text>
    </TouchableOpacity>
  );
};
const CategoryScreen = ({ route }) => {
  const [search, setSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);

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
          height: 150,
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
              <Text style={{ margin: 8, color: 'white', fontSize: 20 }}>
                {loadUser ? <Text>Loading</Text> : user.name}
              </Text>
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
      <View
        style={{
          height: height,
          backgroundColor: 'rgb(248,248,248)',
          marginTop: -50,
          borderRadius: 30,
        }}
      >
        <Text style={{ margin: 15, fontWeight: '700' }}>CATEGORY</Text>
        <FlatList
          data={category}
          renderItem={({ index, item }) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                console.log('pressed');
              }}
              style={{ width: width, height: 30, margin: 5 }}
            >
              <Text>{item}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});
