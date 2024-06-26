import React, { useState } from "react";
import { Alert, Image, TouchableWithoutFeedback, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Container from "../../components/Container/Container";
import Content from "../../components/Content/Content";
import styles from '../../views/Login/Login.styles';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';
// import { signupRequest, signupSuccess, signupFailure } from '../../s/tore/actions/authActions.js';
import { useDispatch } from 'react-redux';

const SignUp = () => {
    const [email, setEmail] = useState('');
    // const dispatch = useDispatch();
    const [passwordVisible, setPasswordVisible] = useState(true);
    const navigate = useNavigation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = React.useState(true);

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignUp = () => {
        navigate.navigate('Otp');
        if (!name) {
            Alert.alert('Please enter your name');
            return;
        }
        if (!validateEmail(email)) {
            Alert.alert('Please enter a valid email address');
            return;
        }
        if (password.length < 6) {
            Alert.alert('Password must be at least 6 characters');
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match');
            return;
        }
        dispatch(signupRequest());
        setTimeout(() => {
            const newUser = { name, email }; 
            dispatch(signupSuccess(newUser));
            navigateToLogin();
        }, 1500);
    };

    const navigateToLogin = () => {
        navigate.navigate('Login');
    };

    return (
        <Container insets={{ top: true, bottom: true }}>
            <Content>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <View style={{ alignItems: 'center', marginTop: 20, marginBottom: 20, }}>
                        <Image
                            style={styles.signUpLogo}
                            source={{ uri: 'https://i.imgur.com/aVlDXZ9.png' }}
                        />
                        <Text style={{ fontSize: 15, fontWeight: '', marginTop: 10 }}>Create an Account</Text>
                    </View>


                    <View style={styles.keyboardView}>
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Name"
                            onChangeText={setName}
                            placeholderTextColor="grey"
                            selectionColor="grey"
                            style={styles.textInput}
                            activeOutlineColor="grey"
                            activeUnderlineColor="#3a3a3a"
                        />
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Email"
                            onChangeText={setEmail}
                            placeholderTextColor="grey"
                            selectionColor="grey"
                            style={styles.textInput}
                            activeOutlineColor="grey"
                            activeUnderlineColor="#3a3a3a"
                        />
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Password"
                            onChangeText={setPassword}
                            placeholderTextColor="grey"
                            selectionColor="grey"
                            secureTextEntry={passwordVisible}
                            style={styles.textInput}
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
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Confirm Password"
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="grey"
                            selectionColor="grey"
                            secureTextEntry={passwordVisible}
                            style={styles.textInput}
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
                        {/* disabled={!name || !email z|| !password || !confirmPassword} */}
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.signupButton, { opacity: !name || !email || !password || !confirmPassword ? 0.5 : 1 }]}
                            >
                            <Text style={styles.signupText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={{ alignItems: 'center', padding: 20 }}>

                            <TouchableWithoutFeedback onPress={() => setChecked(!checked)}>
                                <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox
                                        status={checked ? 'checked' : 'unchecked'}
                                        color="#cffa41"
                                        onPress={() => setChecked(!checked)}
                                    />
                                    <Text style={{ fontSize: 12, color: 'grey', marginLeft: 8 }}>
                                        By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>

                            <View style={styles.signUpBottomContainer}>
                                <View style={styles.bottom}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ fontSize: 12, color: 'grey', marginTop: 5 }}>
                                            Already have an account?{'  '}
                                        </Text>
                                        <TouchableOpacity onPress={navigateToLogin}>
                                            <Text style={{ ...styles.help, marginTop: 3 }}> Login.</Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={styles.line} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Content>
        </Container>
    );
};

export default SignUp;
