import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import { AntDesign, FontAwesome5 } from 'react-native-vector-icons';
import { TextInput, Card } from 'react-native-paper';
import { Divider, Button } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios';
import { useRoute } from '@react-navigation/core';
const { height, width } = Dimensions.get('window');

const ProductScreen = ({ navigation, route }) => {
  const [wish, setWish] = useState(false);
  const [text, setText] = React.useState('');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);
  const [user, setUser] = useState(null);
  const [wishList, setWishList] = useState(null);
  const [qty, setQty] = useState(1);
  const {
    name,
    email,
    gender,
    isAdmin,
    phone,
    wishlist,
    product_name,
    product_image,
    product_id,
    product_description,
    product_brand,
    product_category,
    product_price,
    product_countInStock,
    product_rating,
    product_numReviews,
  } = route.params;

  const check = async (pro) => {
    try {
      console.log('pro is', pro);
      let counter = 0;
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
      if (data['wishlist'] == []) {
        counter++;
      } else {
        data['wishlist'].map((abc) => {
          if (abc.product_name == pro) {
            counter++;
          }
        });
      }

      if (counter > 0) {
        return true;
      } else {
        return false;
      }
      // console.log(' Inside check');
      // console.log('pro is ', pro);
      // console.log('data wishlis', data['wishlist']);
      // console.log('inside data is ', data['wishlist'].includes(pro));
      // console.log(
      //   data['wishlist'].map((abc) => {
      //     let ab = { product_name };
      //     console.log('abc is ', ab.product_name);
      //     console.log('pro is ', pro.product_name);
      //     if (abc.product_name === pro) {
      //       return true;
      //     }
      //   })
      // );
    } catch (error) {
      console.error(error);
    }
  };
  const addToCart = async () => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const { data } = await axios
        .put(
          'http://192.168.43.164:5000/api/users/addCart',
          { email, product_name, qty },
          config
        )
        .then((res) => {
          setUser(res.data);
          alert(`${product_name} is added to Cart`);
        });
    } catch (error) {}
  };

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await axios
          .get('http://192.168.43.164:5000/api/products')
          .then((res) => {
            setProducts(res.data);
            setLoading(!loading);
          });
      } catch (error) {
        console.log(error.message);
      }
    };
    getProducts();
    wishlist.map((pro) => {
      console.log('Inside useEffect wishlist');
      console.log(pro.product_name);
      console.log(product_name);
      if (pro.product_name === product_name) {
        setWish(true);
      }
    });
  }, []);

  const addToWishlist = async () => {
    try {
      const available = await check(product_name);
      if (!available) {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        };
        const { data } = await axios.put(
          'http://192.168.43.164:5000/api/users/addWishList',
          { email, product_name },
          config
        );
        setWish(!wish);
        console.log('pressed');
      } else {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        };
        const productName = product_name;
        const { data } = await axios.put(
          'http://192.168.43.164:5000/api/users/removeWishList',
          { email, productName },
          config
        );
        setWish(!wish);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View>
      <View
        style={{
          height: 100,
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
                size={25}
                color='white'
                style={{ paddingHorizontal: 10 }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <AntDesign name='shoppingcart' size={25} color='white' />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView
        style={{
          backgroundColor: 'rgb(248,248,248)',
          marginTop: -25,
          borderRadius: 30,
        }}
      >
        <ImageBackground
          source={{ uri: product_image }}
          style={{
            height: `${height}` * 0.6,
            width: `${width}` * 0.9,
            alignSelf: 'center',
            marginVertical: 15,
            alignItems: 'flex-end',
          }}
          imageStyle={{ borderRadius: 30 }}
        >
          <View
            style={{
              marginRight: 20,
              marginTop: 20,
              backgroundColor: 'white',
              height: 50,
              width: 50,
              elevation: 5,
              borderRadius: 100,
            }}
          >
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => addToWishlist()}
            >
              {wish ? (
                <AntDesign
                  name='heart'
                  color='red'
                  size={25}
                  style={{ marginVertical: 12 }}
                />
              ) : (
                <AntDesign
                  name='hearto'
                  color='gray'
                  size={25}
                  style={{ marginVertical: 12 }}
                />
              )}
            </TouchableOpacity>
          </View>
        </ImageBackground>

        <View style={{ marginHorizontal: 20 }}>
          <Text
            style={{
              color: '#707070',
              fontSize: 20,
              fontWeight: '400',
            }}
          >
            {product_name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 50,
                height: 30,
                backgroundColor: 'rgba(7,95,147,0.8)',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 5,
                borderRadius: 10,
              }}
            >
              <AntDesign name='star' size={20} color='white' />
              <Text style={{ color: 'white' }}>{product_rating}</Text>
            </View>
            <Text style={{ color: 'gray', fontSize: 19, marginHorizontal: 5 }}>
              {(Math.random() * 1000).toFixed(0)} ratings
            </Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            {[...Array(5).keys()].map((x) =>
              x <= product_rating - 1 ? (
                <AntDesign key={x} name='star' size={30} color='gold' />
              ) : (
                <AntDesign name='staro' key={x} size={30} color='#707070' />
              )
            )}
          </View>
        </View>

        <View
          style={{
            height: 400,
            width: `${width}` * 0.9,
            backgroundColor: 'white',
            elevation: 20,
            marginHorizontal: 20,
            borderRadius: 30,
            marginVertical: 10,
          }}
        >
          <View style={{ marginHorizontal: 15, marginVertical: 20 }}>
            <Text style={{ color: '#707070', fontSize: 18 }}>
              Free delivery on order above $100
            </Text>
            <Text style={{ color: '#707070', fontSize: 18 }}>
              Pay on delivery might be available
            </Text>
          </View>

          <View style={{ marginHorizontal: 20, marginVertical: 20 }}>
            <Text style={{ color: '#707070', fontSize: 18 }}>
              Free delivery on order above $100
            </Text>
            <Text style={{ color: '#707070', fontSize: 18 }}>
              Pay on delivery might be available
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginTop: 20,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Best Price:
            </Text>
            <Text style={{ fontSize: 18, color: '#707070' }}>
              ${product_price}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 20,
              marginVertical: 5,
            }}
          >
            <Text style={{ fontSize: 18, color: '#707070' }}>Coupon Code:</Text>
            <Text style={{ fontSize: 18, color: '#707070' }}> ABCDEF10 </Text>
          </View>
          <Text
            style={{ color: '#707070', fontSize: 18, marginHorizontal: 20 }}
          >
            Check cart for final saving
          </Text>

          <Divider
            style={{
              color: 'black',
              marginVertical: 25,
              marginHorizontal: 15,
              height: 2,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 15,
            }}
          >
            <FontAwesome5 name='medal' size={35} color='red' />
            <Text style={{ fontWeight: '400', fontSize: 20, color: '#707070' }}>
              90-DAY Buyer Protection
            </Text>
          </View>
        </View>
        <View
          style={{
            height: 200,
            width: `${width}` * 0.9,
            backgroundColor: 'white',
            elevation: 15,
            marginHorizontal: 20,
            borderRadius: 30,
            marginVertical: 10,
          }}
        >
          <View style={{ marginHorizontal: 15, marginTop: 15 }}>
            <Text
              style={{
                fontSize: 25,
                color: 'rgba(7,135,147,0.5)',
                marginTop: 5,
                marginBottom: 10,
              }}
            >
              Product Details
            </Text>
            <Text style={{ fontSize: 15, color: '#707070' }}>
              {product_description}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 100,
            width: `${width}` * 0.9,
            backgroundColor: 'white',
            elevation: 15,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 30,
          }}
        >
          <View style={{ marginVertical: 20, marginHorizontal: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-evenly',
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderColor: '#707070',
                  borderRadius: 30,
                  width: `${width}` * 0.37,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => addToWishlist()}
              >
                {wish ? (
                  <AntDesign
                    name='heart'
                    color='red'
                    size={25}
                    style={{ marginVertical: 12 }}
                  />
                ) : (
                  <AntDesign
                    name='hearto'
                    color='gray'
                    size={25}
                    style={{ marginVertical: 12 }}
                  />
                )}
                <Text> WishList</Text>
              </TouchableOpacity>

              <View>
                <Button
                  containerStyle={{
                    width: `${width}` * 0.4,
                    borderRadius: 50,
                  }}
                  title='Add To Cart'
                  ViewComponent={LinearGradient} // Don't forget this!
                  linearGradientProps={{
                    colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
                    start: { x: 0, y: 0.5 },
                    end: { x: 1, y: 0.5 },
                  }}
                  onPress={() => addToCart()}
                />
              </View>
            </View>
          </View>
        </View>

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
            marginVertical: 20,
            marginHorizontal: 5,
            elevation: 5,
            height: 350,
          }}
        >
          {loading ? (
            <Text>Loading</Text>
          ) : (
            products.map((e, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Product', e)}
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
            ))
          )}
        </ScrollView>

        <View
          style={{
            height: 200,
            width: `${width}` * 0.9,
            backgroundColor: 'white',
            elevation: 15,
            marginVertical: 10,
            marginHorizontal: 20,
            borderRadius: 30,
          }}
        >
          <View style={{ margin: 15 }}>
            <Text style={{ color: 'rgba(7,95,147,0.8)', fontSize: 25 }}>
              FeedBack & Reviews
            </Text>
          </View>

          <View
            style={{
              marginHorizontal: 15,
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 30 }}>{product_rating}</Text>
              <View style={{ flexDirection: 'row' }}>
                {[...Array(5).keys()].map((x) =>
                  x <= product_rating - 1 ? (
                    <AntDesign key={x} name='star' size={40} color='gold' />
                  ) : (
                    <AntDesign name='staro' key={x} size={40} color='gray' />
                  )
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={{ height: 200 }}></View>
      </ScrollView>
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({});
