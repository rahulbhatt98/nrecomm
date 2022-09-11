import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AntDesign } from 'react-native-vector-icons';
import { Avatar, Input, Button } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const { height, width } = Dimensions.get('window');
const CardScreen = ({ navigation }) => {
  const [search, setSearch] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [card_no, setCard] = useState('');
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
        setCard(user.card[0]);
        setLoadUser(!loadUser);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);
  const updateCard = async () => {
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
        'http://192.168.43.164:5000/api/users/addCard',
        { email, card_no },
        config
      );
      navigation.navigate('Cart');
    } catch (error) {
      console.log(error);
    }
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
        <Text style={styles.registerText}>Card Details</Text>
        <View style={styles.inputView}>
          <Input
            type='text'
            value={card_no}
            placeholder='Enter card Details'
            onChangeText={(text) => setCard(text)}
          />
        </View>

        <Button
          containerStyle={styles.button}
          title='Update Card Info'
          ViewComponent={LinearGradient} // Don't forget this!
          linearGradientProps={{
            colors: ['rgba(7,135,147,0.5)', 'rgba(7,95,147,0.8)'],
            start: { x: 0, y: 0.5 },
            end: { x: 1, y: 0.5 },
          }}
          onPress={() => updateCard()}
        />
      </View>
    </View>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  inputView: {
    paddingTop: 35,
    color: '#9DA3B4',
    width: 300,
    alignSelf: 'center',
  },
  textInput: {
    color: '#9DA3B4',
    margin: 20,
  },
  registerText: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: 'bold',
    padding: 15,
    alignSelf: 'center',
  },
  button: {
    width: 200,
    marginTop: 20,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
});
