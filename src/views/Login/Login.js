import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Linking } from 'react-native';
import { TextInput, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';

import styles from './Login.styles';

const trueEmail = 'faizankhan@gmail.com';
const truePassword = 'faizankhan';

const Login = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigate = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const languages = ['English (United States)', 'Türkçe (Turkey)', 'Español (Spain)', 'Français (France)'];

  
  const  navigateToSignup = () => {
    console.log("navigateToSignup");
    navigation.navigate('SignUp');

  }
  const signUp = () => {
    if(name == "" && password == ""){
      Alert.alert('Please enter your name and password');
      return;
    }
    trueEmail === name && truePassword === password
    ? navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    })
    : Alert.alert('Incorrect username or password');
  };
  return (
    <Container insets={{ top: true, bottom: true }}>
      <Content>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {/* <Text style={{color: 'white', opacity: 0.6, fontSize: 14}}>
                English (United States)
              </Text>
              <Image
                source={require('../../../assets/images/down.png')}
                style={{width: 12, height: 12}}
            style={styles.logo}
              /> */}
            </View>
            <Image
              style={styles.signUpLogo}
              source={{ uri: 'https://i.imgur.com/aVlDXZ9.png' }}
            />
          </View>

          <View style={styles.keyboardView}>
            <TextInput
              theme={{ colors: { text: 'white' } }}
              placeholder="Phone number, email, or username"
              onChangeText={item => setName(item)}
              placeholderTextColor="grey"
              selectionColor="grey"
              style={styles.textInput}
              activeOutlineColor="grey"
              activeUnderlineColor="#3a3a3a"
            />

            <TextInput
              theme={{ colors: { text: 'white' } }}
              placeholder="Password"
              placeholderTextColor="grey"
              onChangeText={itemP => setPassword(itemP)}
              style={styles.textInput}
              selectionColor="grey"
              secureTextEntry={passwordVisible}
              activeUnderlineColor="#3a3a3a"
              activeOutlineColor="#3a3a3a"
              right={
                <TextInput.Icon
                  color={'grey'}
                  name={passwordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              }
            />
            <TouchableOpacity
              onPress={signUp}
              style={styles.login}
              disabled={name === null && password === null ? true : false}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>

            <View style={{ alignItems: 'center', padding: 10 }}>
              <View style={styles.text}>
                <Text style={{ fontSize: 12, color: 'grey' }}>
                  Forgot your login details?{' '}
                </Text>
                <Text style={styles.help}> Get help logging in.</Text>
              </View>

              <View style={styles.seperatorStyle}>
                <View style={styles.seperator} />
                <Text style={{ color: 'grey' }}> OR </Text>
                <View style={styles.seperator} />
              </View>

              <View style={styles.facebook}>
                <Image
                  source={require('../../../assets/images/facebook.png')}
                />
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://www.facebook.com/login/');
                  }}>
                  <Text style={styles.faceText}>Log in with Facebook</Text>
                </TouchableOpacity>
              </View>



            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.bottom}>
              <View style={{ flexDirection: 'row' }}>
                  <Text style={{ fontSize: 12, color: 'grey', marginTop: 15 }}>
                    Don't have an account?{'  '}
                  </Text>
                <TouchableOpacity onPress={navigateToSignup}>
                  <Text style={{ ...styles.help, marginTop: 15 }}> Sign up.</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.line} />
            </View>
          </View>
        </View>
      </Content>
    </Container>
  );
};
export default Login;
