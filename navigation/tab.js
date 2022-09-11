import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CategoryScreen from '../screens/CategoryScreen';
import WishlistScreen from '../screens/WishlistScreen';
import { IonIcons } from 'react-native-vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons/';

const Tab = createMaterialBottomTabNavigator();
const tab = ({ route }) => {
  const data = route.params;
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#fff'
      barStyle={{ backgroundColor: 'rgba(7,135,147,0.5)' }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        initialParams={data}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='home' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Category'
        component={CategoryScreen}
        initialParams={data}
        options={{
          tabBarLabel: 'Category',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name='category' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Store'
        initialParams={data}
        component={StoreScreen}
        options={{
          tabBarLabel: 'Store',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='store' color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name='Settings'
        initialParams={data}
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name='account-settings-outline'
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Wishlist'
        initialParams={data}
        component={WishlistScreen}
        options={{
          tabBarLabel: 'Wishlist',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name='heart' color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default tab;
