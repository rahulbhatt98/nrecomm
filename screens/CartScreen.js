import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
} from 'react-native';
import { AntDesign, Entypo } from 'react-native-vector-icons';
import { Image } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import success from '../assets/success.png';
import x from '../assets/x.png';

const { height, width } = Dimensions.get('window');

const ModalPoup = ({ visible, children }) => {
  const [showModal, setShowModal] = React.useState(visible);
  const scaleValue = React.useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    toggleModal();
  }, [visible]);
  const toggleModal = () => {
    if (visible) {
      setShowModal(true);
      Animated.spring(scaleValue, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      setTimeout(() => setShowModal(false), 200);
      Animated.timing(scaleValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };
  return (
    <Modal transparent visible={showModal}>
      <View style={styles.modalBackGround}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
};

const CartScreen = ({ navigation }) => {
  const [address, setAddress] = useState('');
  const [card, setCard] = useState('');
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        console.log('Inside useeffect');

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

  const api_usage = async (email, product_name, qty) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    return await axios.put(
      'http://192.168.43.164:5000/api/users/addOrder',
      { email, product_name, qty },
      config
    );
  };
  const clearCart = async (email) => {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };
    return await axios.put(
      'http://192.168.43.164:5000/api/users/removeCart',
      { email },
      config
    );
  };
  const pay = async () => {
    if (user.address.length === 0) {
      alert('Please Enter Address');
    } else if (user.card === 0) {
      alert('Please Enter card');
    } else {
      let email = user.email;
      user.cartItems.map((e, index) => {
        let product_name = e.product_name;
        let qty = e.qty;

        api_usage(email, product_name, qty);
      });
      setVisible(!visible);

      clearCart(email);
      navigation.navigate('Order');
    }
  };
  return (
    <View>
      <ModalPoup visible={visible}>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => setVisible(false)}>
              <Image source={x} style={{ height: 30, width: 30 }} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={success}
            style={{ height: 150, width: 150, marginVertical: 10 }}
          />
        </View>

        <Text style={{ marginVertical: 30, fontSize: 20, textAlign: 'center' }}>
          Congratulations Your order has been placed
        </Text>
      </ModalPoup>
      <View
        style={{
          height: 110,
          width: width,
          backgroundColor: 'rgba(7,95,147,0.8)',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 30,
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
                size={25}
                color='white'
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <AntDesign name='shoppingcart' size={30} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ScrollView
        style={{
          marginTop: -25,
          backgroundColor: 'rgb(248,248,248)',
          borderRadius: 30,
          height: height,
        }}
      >
        {loadUser ? (
          <Text>Loading</Text>
        ) : user.cartItems.length == 0 ? (
          <View style={{ flex: 1, alignItems: 'center', marginVertical: 100 }}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1619191163420-4a7c0798b8a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTgwOTN8MHwxfHNlYXJjaHwxfHxlbXB0eSUyMGNhcnR8ZW58MHx8fHwxNjIyMDA2NDM0&ixlib=rb-1.2.1&q=80&w=1080',
              }}
              style={{ height: 200, width: 200 }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 30,
                color: '#707070',
                marginTop: 25,
              }}
            >
              Your cart is empty
            </Text>
            <Button
              containerStyle={{
                width: `${width}` * 0.6,
                borderRadius: 30,
                height: 40,
                marginTop: 25,
              }}
              title='Go To Home'
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              onPress={() => navigation.navigate('Home')}
            />
          </View>
        ) : (
          <>
            <View style={{ marginTop: 15, marginHorizontal: 20 }}>
              <Text
                style={{
                  color: 'rgba(7,135,95,0.8)',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}
              >
                CART
              </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('Address')}>
              <View
                style={{
                  height: 100,
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
                <View
                  style={{
                    marginHorizontal: 15,
                    marginVertical: 5,
                  }}
                >
                  {loadUser ? (
                    <Text>Loading</Text>
                  ) : user.address.length === 0 ? (
                    <Text style={{ color: '#707070' }}>
                      Please Enter Address
                    </Text>
                  ) : (
                    <View>
                      <Text style={{ color: '#707070' }}>
                        {user.address[0].house_no +
                          ' ' +
                          user.address[0].street_name}
                      </Text>
                      <Text style={{ color: '#707070' }}>
                        {user.address[0].city + ' ' + user.address[0].state}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Card')}>
              <View
                style={{
                  height: 80,
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
                    <AntDesign name='creditcard' size={25} color='black' />
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'rgba(7,135,95,0.8)',
                        marginLeft: 10,
                      }}
                    >
                      Card
                    </Text>
                  </View>
                  <TouchableOpacity onPress={() => console.log('pressed')}>
                    <Text style={{ color: 'rgba(7,95,147,0.8)' }}>Change</Text>
                  </TouchableOpacity>
                </View>
                <View style={{ marginHorizontal: 15, marginVertical: 5 }}>
                  <Text style={{ color: '#707070' }}>
                    {' '}
                    {loadUser ? (
                      <Text>Loading</Text>
                    ) : user.card.length === 0 ? (
                      <Text>Please Enter Card Details</Text>
                    ) : (
                      user.card[0]
                    )}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            {loadUser ? (
              <Text>Loading...</Text>
            ) : (
              user.cartItems.map((e, index) => (
                <View
                  key={index}
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
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
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
                          marginHorizontal: 10,
                        }}
                      >
                        <AntDesign name='star' size={20} color='white' />
                        <Text style={{ color: 'white' }}>
                          {e.product_rating}
                        </Text>
                      </View>
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
                        <TouchableOpacity onPress={() => setCount()}>
                          <Text style={{ marginHorizontal: 5, fontSize: 25 }}>
                            -
                          </Text>
                        </TouchableOpacity>
                        <Text>{e.qty}</Text>
                        <TouchableOpacity onPress={() => setCount()}>
                          <Text style={{ marginHorizontal: 5, fontSize: 20 }}>
                            +
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            )}
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
              <Text style={{ marginTop: 15, marginHorizontal: 30 }}>
                PRICE DETAIL
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  marginHorizontal: 20,
                  marginBottom: 10,
                }}
              >
                Price
                {!loadUser &&
                  (user.cartItems.length > 1 ? (
                    <Text> ({user.cartItems.length} items)</Text>
                  ) : (
                    <Text> ( {user.cartItems.length} item)</Text>
                  ))}
              </Text>

              {loadUser ? (
                <Text>Loading</Text>
              ) : (
                user.cartItems.map((e, index) => (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginHorizontal: 20,
                    }}
                  >
                    <Text>{e.product_name}</Text>
                    <Text>${e.product_price * e.qty}</Text>
                  </View>
                ))
              )}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginHorizontal: 20,
                  marginVertical: 40,
                }}
              >
                <Text style={{ fontWeight: 'bold' }}>Total</Text>
                <Text style={{ fontWeight: 'bold' }}>
                  $
                  {loadUser ? (
                    <Text>Loading..</Text>
                  ) : (
                    user.cartItems
                      .reduce(
                        (acc, item) => acc + item.product_price * item.qty,
                        0
                      )
                      .toFixed(2)
                  )}
                </Text>
              </View>
            </View>
            <View
              style={{ height: 70, marginVertical: 20, alignItems: 'center' }}
            >
              <Button
                containerStyle={{
                  width: `${width}` * 0.6,
                  borderRadius: 30,
                  height: 40,
                  marginTop: 5,
                }}
                title='Pay Now'
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                  colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 },
                }}
                onPress={() => pay()}
              />
            </View>
            <View style={{ height: 100 }}></View>
          </>
        )}
      </ScrollView>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
