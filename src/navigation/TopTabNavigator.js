import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfilPost from '../views/ProfilPost/ProfilPost';
import Reels from '../views/ProfilReels/ProfilReels';
import Tag from '../views/Tag/Tag';
import { Image, TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = ({ scrollY }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'ProfilPost') {
            return <Image source={require('../../assets/images/grid.png')} />;
          }
          if (route.name === 'ProfilReels') {
            return <Image source={require('../../assets/images/video.png')} />;
          }
          if (route.name === 'Tag') {
            return <Image source={require('../../assets/images/avatar.png')} />;
          }
        },
        tabBarIndicatorStyle: { backgroundColor: 'white', height: 2 },
        tabBarLabel: '',
        tabBarStyle: {
          backgroundColor: 'black',
        },
      })}
    >
      <Tab.Screen name="ProfilPost">
        {(props) => <ProfilPost {...props} scrollY={scrollY} />}
      </Tab.Screen>
      <Tab.Screen name="ProfilReels">
        {(props) => <Reels {...props} scrollY={scrollY} />}
      </Tab.Screen>
      <Tab.Screen name="Tag">
        {(props) => <Tag {...props} scrollY={scrollY} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
