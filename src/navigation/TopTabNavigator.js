import React from 'react';
import { Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import ProfilPost from '../views/ProfilPost/ProfilPost';
import Reels from '../views/ProfilReels/ProfilReels';
import Tag from '../views/Tag/Tag';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = ({ scrollY }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: () => {
          if (route.name === 'ProfilPost') {
            return <Image style={{ tintColor: 'black'  }} source={require('../../assets/images/grid.png')} />;

          }
          if (route.name === 'ProfilReels') {
            return <Image style={{ tintColor: 'black'  }} source={require('../../assets/images/video.png')} />;

          }
          if (route.name === 'Tag') {
            return <Image style={{ tintColor: 'black'  }} source={require('../../assets/images/avatar.png')} />

          }
        },
        tabBarIndicatorStyle: { backgroundColor: '#cffa41', height: 3 },
        tabBarLabel: '',
        tabBarStyle: {
          // backgroundColor: 'black',
        },
      })}
    >
      <Tab.Screen name="ProfilPost">
        {props => <ProfilPost {...props} scrollY={scrollY} />}
      </Tab.Screen>
      <Tab.Screen name="ProfilReels" component={Reels} />
      <Tab.Screen name="Tag" component={Tag} />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
