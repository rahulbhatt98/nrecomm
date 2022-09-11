import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import { BoxShadow } from 'react-native-shadow';
import { Image, Avatar, Input } from 'react-native-elements';
import { dummyData } from '../Data/data';
import Home1 from '../assets/resources/Home1.jpeg';
import Home2 from '../assets/resources/Home2.jpeg';
import Home3 from '../assets/resources/Home3.jpeg';
import { AntDesign } from 'react-native-vector-icons';
import product1 from '../assets/resources/product1.jpeg';
import product2 from '../assets/resources/product2.jpeg';
import product3 from '../assets/resources/product3.jpeg';
import product4 from '../assets/resources/product4.jpeg';
import slider1 from '../assets/resources/slider1.jpeg';
import slider2 from '../assets/resources/slider2.jpeg';
import slider3 from '../assets/resources/slider3.jpeg';
import axios from 'axios';
import ProductScreen from './ProductScreen';
import { Card, Paragraph } from 'react-native-paper';
import { Button } from 'react-native-elements/dist/buttons/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

const images = [Home1, Home2, Home3];
let product_images = [product1, product2, product3, product4];
const slider_images = [slider1, slider2, slider3];

const { width, height } = Dimensions.get('window');
const shadowOpt = {
  width: 160,
  height: 170,
  color: '#000',
  border: 2,
  radius: 3,
  opacity: 0.2,
  x: 0,
  y: 3,
  style: { marginVertical: 5 },
};

const HomeScreen = ({ navigation, route }) => {
  const [active, setActive] = useState('');
  const [search, setSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(true);
  const review = Math.random() * 5;
  const [sliderImages, setSliderImages] = useState(null);
  const [sliderLoading, setSliderLoading] = useState(false);
  const [email, setEmail] = useState('');

  // const { name, email, gender, phone, isAdmin, wishlist } = route.params;
  // console.log('Inside HomeScreen ', name);
  useEffect(() => {
    const set_user = () => {
      try {
        if (route.params) {
          setUser(route.params);
          setLoadUser(!loadUser);
        }
      } catch (error) {
        console.log(error);
      }
    };
    set_user();
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
    const getProducts = async () => {
      try {
        const products = await axios
          .get('http://192.168.43.164:5000/api/products')
          .then((res) => {
            setProducts(res.data);
            setLoading(true);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    const getSliderImages = async () => {
      try {
        const sliderImages = await axios
          .get('http://192.168.43.164:5000/api/products')
          .then((res) => {
            setSliderImages(res.data);
            setSliderLoading(true);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getProducts();
    getSliderImages();
  }, []);

  const logOff = async () => {
    try {
      console.log('Inside LogOff');
      await AsyncStorage.removeItem('email');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
    }
  };
  function change(nativeEvent) {
    // console.log("nativeEvent:", nativeEvent)
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide !== active) {
        setActive(slide);
      }
    }
  }
  const load_images = () => {
    return (
      <View
        style={{
          margin: 10,
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        {loading &&
          products.map((e, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => navigation.navigate('Product', { ...user, ...e })}
            >
              <Card
                style={{
                  height: 150,
                  border: 1,
                  borderRadius: 20,
                  marginVertical: 10,
                  marginHorizontal: 5,
                  elevation: 5,
                  width: 150,
                }}
              >
                <Card.Cover
                  source={{ uri: e.product_image }}
                  style={{
                    height: 100,
                    width: `${width}` / 2 - 40,
                    marginHorizontal: 5,
                    marginTop: 5,
                  }}
                />
                <Card.Content>
                  <Paragraph style={{ color: 'rgba(7,95,147,0.8)' }}>
                    Buy at ${e.product_price}
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          ))}
      </View>
    );
  };

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
              <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Avatar
                  rounded
                  source={require('../assets/resources/avatar.jpeg')}
                />
              </TouchableOpacity>
              <Text
                style={{
                  margin: 8,
                  color: 'white',
                  fontSize: 20,
                  textTransform: 'capitalize',
                }}
              >
                {loadUser ? <Text>Guest</Text> : user.name}
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

      <ScrollView
        style={{
          backgroundColor: 'rgb(248,248,248)',
          marginTop: -50,
          borderRadius: 30,
        }}
      >
        <View style={{ alignItems: 'center', margin: 15 }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '700',
              color: 'rgba(7,135,147,0.5)',
              textTransform: 'capitalize',
            }}
          >
            Hi {loadUser ? <Text>Guest</Text> : user.name}
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Here are some products that according to your interests
          </Text>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          {/* <Image
            source={hero_image}
            style={{ width: `${width}` - 50, height: 200, borderRadius: 10 }}
            resizeMode='center'
          /> */}
          <ScrollView
            onScroll={({ nativeEvent }) => change(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
          >
            {images.map((e, index) => (
              <Image
                key={e}
                resizeMode='contain'
                style={styles.wrap}
                source={e}
              />
            ))}
          </ScrollView>
        </View>
        <View style={styles.wrapDot}>
          {images.map((e, index) => (
            <Text
              key={e}
              style={active === index ? styles.dotActive : styles.dot}
            >
              ●
            </Text>
          ))}
        </View>

        {load_images()}

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: 90,
            marginHorizontal: 15,
          }}
        >
          <View>
            <Text style={{ color: 'rgba(7,135,147,0.5)', fontSize: 20 }}>
              Find the Best products
            </Text>
            <Text style={{ color: 'gray' }}>Category 1</Text>
          </View>
          <Button
            title='View All'
            titleStyle={{
              color: 'gray',
            }}
            buttonStyle={{
              backgroundColor: 'white',
              borderRadius: 1,
              borderRadius: 30,
              borderColor: 'gray',
              elevation: 3,
              height: 50,
              width: 100,
              marginBottom: 5,
            }}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            marginHorizontal: 5,
            marginVertical: 20,
            elevation: 5,
            height: 350,
          }}
        >
          {sliderLoading &&
            sliderImages.map((e, index) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Product', { ...user, ...e })
                }
                style={{ height: 330 }}
              >
                <Card
                  key={index}
                  style={{
                    height: 325,
                    width: `${width}` * 0.75,
                    marginHorizontal: 10,
                    elevation: 5,
                    borderRadius: 20,
                  }}
                >
                  <Card.Cover
                    source={{ uri: e.product_image }}
                    style={{ height: 225, width: `${width}` * 0.75 }}
                  ></Card.Cover>
                  <Text
                    style={{
                      fontSize: 17,
                      color: 'rgba(7,95,147,0.8)',
                      paddingLeft: 20,
                    }}
                  >
                    {e.product_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 15,
                      margin: 5,
                      paddingLeft: 20,
                      color: 'rgba(7,95,147,0.8)',
                    }}
                  >
                    <Text
                      style={{
                        color: '#707070',
                        textDecorationLine: 'line-through',
                      }}
                    >
                      ${e.product_price + 40}
                    </Text>{' '}
                    ${e.product_price}
                  </Text>
                  <View style={{ flexDirection: 'row', paddingLeft: 20 }}>
                    {[...Array(5).keys()].map((x) =>
                      x <= e.product_rating - 1 ? (
                        <AntDesign key={x} name='star' size={25} color='gold' />
                      ) : (
                        <AntDesign
                          name='staro'
                          key={x}
                          size={25}
                          color='gray'
                        />
                      )
                    )}
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
        </ScrollView>
        <View style={{ marginHorizontal: 20 }}>
          <Image
            source={images[0]}
            style={{ width: `${width}` * 0.9, height: 200, borderRadius: 30 }}
            resizeMode='contain'
          />
        </View>
        <View style={{ height: 200 }}></View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  wrap: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').height * 0.25,
    borderRadius: 20, // 25% window
  },
  wrapDot: {
    margin: 10,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
});
