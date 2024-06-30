import React, { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Linking } from 'react-native';
import { TextInput, Menu, ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Container from '../../components/Container/Container';
import Content from '../../components/Content/Content';
import { useLoginMutation } from '../../redux/services/auth';
import styles from './Login.styles';
import SnackBar from '../../components/common/SnackBar';
import { loginSuccess, setToken } from '../../redux/store/actions/authActions';
import { useDispatch, useSelector } from 'react-redux';



const Login = ({ navigation }) => {
  /* -------- Hooks and variables -------- */
  const [passwordVisible, setPasswordVisible] = useState(true);
  const navigate = useNavigation();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  /* ----------- Dispatch -----------*/
  const dispatch = useDispatch();

  /* -------------- SnackBar --------------- */
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');

  /* ------------------- Login Mutation ------------------- */
  let [login, { isLoading, data }] = useLoginMutation();


  /* --------- Navigate to SignUp ------------ */
  const navigateToSignup = () => {
    navigation.navigate('SignUp');

  }
  /* --------- Close SnackBar ---------- */
  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };
  const navigateToApp = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BottomTab' }],
    });
  }
  /* --------- Sign In ---------- */
  const signIn = async () => {
    if (name == "" && password == "") {
      Alert.alert('Please enter your name and password');
      return;
    }
    const loginResponse = await login({ identifier: name, password });
    if (loginResponse?.data?.status === "success") {
      let { token, user } = loginResponse.data.data
      dispatch(loginSuccess(user));
      dispatch(setToken(token));
      setSnackBarVisible(true);
      setSnackBarMessage("Login successfully");
      setTimeout(() => {
        setSnackBarVisible(false);
        setSnackBarMessage("");
        navigation.reset({
          index: 0,
          routes: [{ name: 'BottomTab' }],
        });
      }, 1000)
    } else {
      Alert.alert('Incorrect username or password');
      return;
    }
  };
  return (
    <Container insets={{ top: true, bottom: true }}>
      <Content>
        <View style={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
              onPress={signIn}
              style={styles.login}
            >
              {
                isLoading ? (
                  <ActivityIndicator color="#3a3a3a" size='small'></ActivityIndicator>
                ) : <Text style={styles.loginText}>Log In</Text>
              }

              {/* disabled={name === null && password === null ? true : false} */}
            </TouchableOpacity>

            <View style={{ alignItems: 'center', padding: 10 }}>
              <View style={styles.text}>
                <TouchableOpacity onPress={() => navigateToApp()}>
                  <Text style={{ fontSize: 12, color: 'grey' }}>
                    Forgot your login details?{' '}
                  </Text>
                </TouchableOpacity>
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

      <SnackBar visible={snackBarVisible} snackBarMessage={snackBarMessage} onDismissSnackBar={dismissSnackBar}></SnackBar>

    </Container>
  );
};
export default Login;
