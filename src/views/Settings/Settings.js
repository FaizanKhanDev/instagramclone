import React from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import Container from '../../components/Container/Container';
import SearchBar from '../../components/SearchBar/SearchBar';
import setting from '../../storage/database/setting';

import styles from './Setting.style';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingComponent = () => {
  return (
    <View>
      {setting.map((data, index) => {
        return (
          <View key={index} style={styles.container}>
            <Image source={data.icon} style={styles.icon} />
            <Text style={styles.iconText}>{data.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

const Settings = () => {
  const navigation = useNavigation();
  const logout = () => {
    navigation.navigate('Login');
    AsyncStorage.clear();
  }
  return (
    <Container insets={{ top: true }}>
      <View style={styles.topHeader}>
        <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableWithoutFeedback>
        <Text style={styles.headerText}>Settings</Text>
      </View>

      <SearchBar />

      <ScrollView>
        <SettingComponent />

        <View style={{ flexDirection: 'row', marginTop: 30, marginBottom: 5 }}>
          <Image
            source={require('../../storage/images/meta.png')}
            style={{ marginLeft: 10, width: 20, height: 20 }}
          />
          <Text style={{ color: 'white', fontSize: 18, marginLeft: 5 }}>
            Meta
          </Text>
        </View>

        <Text
          style={{
            color: '#0098fd',
            fontSize: 18,
            margin: 10,
            marginBottom: 15,
            fontWeight: '500',
          }}>
          Account Center
        </Text>

        <Text style={styles.p}>
          Manage settings for sharing stories, posts, and logging in across
          Instagram, Facebook app, and Messenger for connected experiences.
        </Text>

        <View style={{ marginTop: 30 }}>
          <Text style={styles.entry}>Logins</Text>
          <Text style={styles.blueText}>Add or Change Accounts</Text>
          <TouchableWithoutFeedback onPress={logout}>
            <Text style={styles.blueText}>Log Out from ezgiceylan</Text>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress={logout}>
          <Text style={styles.blueText}>Log Out from All Accounts</Text>

          </TouchableOpacity>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Settings;
