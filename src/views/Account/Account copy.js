import React, { useRef } from 'react';
import { Animated, View,Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Bio from '../../components/AccountComponents/Bio';
import Highlighs from '../../components/AccountComponents/Highlighs';
import ProfilBar from '../../components/AccountComponents/ProfilBar';
import ProfileHeader from '../../components/AccountComponents/ProfilHeader';
import Container from '../../components/Container/Container';
import TopTabNavigator from '../../navigation/TopTabNavigator';

const Account = ({ route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <Container insets={{ top: true, right: true, bottom: true }}>
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >

        <ProfilBar />
        <ProfileHeader route={route.params} />
        <Bio route={route.params} />
        <Highlighs />
        <TopTabNavigator />
      </Animated.ScrollView>
    </Container>
  );
};

export default Account;

