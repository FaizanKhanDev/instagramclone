import React, { useRef } from 'react';
import { Animated, ScrollView, View, StyleSheet } from 'react-native';

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
          { useNativeDriver: false } // Use false for non-transform properties
        )}
        scrollEventThrottle={16}
      >
        <View>
          <ProfilBar />
          <ProfileHeader route={route.params} />
          <Bio route={route.params} />
          <Highlighs />
        </View>
        <View style={styles.tabNavigatorContainer}>
          <TopTabNavigator scrollY={scrollY} />
        </View>
      </Animated.ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  tabNavigatorContainer: {
    height: 800,
  },
});

export default Account;
