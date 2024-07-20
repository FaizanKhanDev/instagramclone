import React, { useRef } from 'react';
import { Animated, View, Text } from 'react-native';

import Bio from '../../components/AccountComponents/Bio';
import Highlighs from '../../components/AccountComponents/Highlighs';
import ProfilBar from '../../components/AccountComponents/ProfilBar';
import ProfileHeader from '../../components/AccountComponents/ProfilHeader';
import Container from '../../components/Container/Container';
import TopTabNavigator from '../../navigation/TopTabNavigator';

const Account = ({ route }) => {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Interpolate header translation
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 700],
    outputRange: [0, -2500],
    extrapolate: 'clamp',
  });

  return (
    <Container insets={{ top: true, right: true, bottom: true }}>
      <Animated.View style={{ transform: [{ translateY: headerTranslateY }] }}>
        <ProfilBar />
        <ProfileHeader route={route.params} />
        <Bio route={route.params} />
        <Highlighs />
      </Animated.View>

      <TopTabNavigator scrollY={scrollY} />
    </Container>
  );
};

export default Account;
