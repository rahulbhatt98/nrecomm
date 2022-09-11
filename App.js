import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import StartScreen1 from './screens/StartScreen1';
import StartScreen2 from './screens/StartScreen2';
import StartScreen3 from './screens/StartScreen3';
import Tabs from './navigation/tab';
import CurrencyScreen from './screens/CurrencyScreen';
import ChangePasswordScreen from './screens/ChangePasswordScreen';
import CountryScreen from './screens/CountryScreen';
import LanguageScreen from './screens/LanguageScreen';
import FeedBackScreen from './screens/FeedBackScreen';
import PrivacyScreen from './screens/PrivacyScreen';
import LegalScreen from './screens/LegalScreen';
import LoginScreen from './screens/LoginScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import ProductScreen from './screens/ProductScreen';
import RegisterScreen from './screens/RegisterScreen';
import CartScreen from './screens/CartScreen';
import AddressScreen from './screens/AddressScreen';
import CardScreen from './screens/CardScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProfileDetailsScreen from './screens/ProfileDetailsScreen';
import ReferralScreen from './screens/ReferralScreen';
import OrderScreen from './screens/OrderScreen';
import SupportScreen from './screens/SupportScreen';
import NotificationScreen from './screens/NotificationScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Start1' component={StartScreen1} />
        <Stack.Screen name='Start2' component={StartScreen2} />
        <Stack.Screen name='Start3' component={StartScreen3} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={Tabs} />
        <Stack.Screen name='Product' component={ProductScreen} />
        <Stack.Screen name='Cart' component={CartScreen} />
        <Stack.Screen name='ChangePassword' component={ChangePasswordScreen} />
        <Stack.Screen name='Country' component={CountryScreen} />
        <Stack.Screen name='Currency' component={CurrencyScreen} />
        <Stack.Screen name='Language' component={LanguageScreen} />
        <Stack.Screen name='FeedBack' component={FeedBackScreen} />
        <Stack.Screen name='Privacy' component={PrivacyScreen} />
        <Stack.Screen name='Legal' component={LegalScreen} />
        <Stack.Screen name='Address' component={AddressScreen} />
        <Stack.Screen name='Card' component={CardScreen} />
        <Stack.Screen name='Profile' component={ProfileScreen} />
        <Stack.Screen name='ProfileDetails' component={ProfileDetailsScreen} />
        <Stack.Screen name='Referral' component={ReferralScreen} />
        <Stack.Screen name='Order' component={OrderScreen} />
        <Stack.Screen name='Support' component={SupportScreen} />
        <Stack.Screen name='Notification' component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
