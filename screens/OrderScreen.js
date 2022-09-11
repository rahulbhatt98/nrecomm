import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { AntDesign, Octicons } from 'react-native-vector-icons';
import { Avatar, Input, Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const { height, width } = Dimensions.get('window');
const OrderScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);
  const [search, setSearch] = useState(false);
  const [searchString, setSearchString] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Inside get data');
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
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: height }}
      >
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
                    style={{ paddingLeft: 0, paddingRight: 10 }}
                  />
                </TouchableOpacity>
                <Avatar
                  rounded
                  source={require('../assets/resources/avatar.jpeg')}
                />
                <Text
                  style={{
                    margin: 8,
                    color: 'white',
                    fontSize: 20,
                    textTransform: 'capitalize',
                  }}
                >
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
            marginTop: -25,
            backgroundColor: 'rgb(248,248,248)',
            borderRadius: 30,
          }}
        >
          <View
            style={{ flexDirection: 'row', alignItems: 'center', margin: 20 }}
          >
            <Octicons name='list-ordered' size={30} color='green' />

            <Text
              style={{ fontSize: 20, paddingHorizontal: 15, color: '#707070' }}
            >
              Orders
            </Text>
          </View>

          {loadUser ? (
            <Text>Loading</Text>
          ) : (
            user.order.map((e, index) => (
              <TouchableOpacity key={index} onPress={() => {}}>
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
                      width: 150,
                      height: 150,
                      marginHorizontal: 5,
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{ color: '#707070', fontSize: 15, width: 160 }}
                    >
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
                        marginVertical: 5,
                        borderRadius: 10,
                      }}
                    >
                      <AntDesign name='star' size={20} color='white' />
                      <Text style={{ color: 'white' }}>{e.product_rating}</Text>
                    </View>
                    <Text style={{ fontSize: 12, color: '#707070' }}>
                      Delivery on Jun {(Math.random() * 30).toFixed(0)}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default OrderScreen;

const styles = StyleSheet.create({
  container: {},
});
