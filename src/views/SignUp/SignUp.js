import React, { useState } from "react";
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Container from "../../components/Container/Container";
import Content from "../../components/Content/Content";
import styles from '../../views/Login/Login.styles';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const navigate = useNavigation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const languages = ['English (United States)', 'Türkçe (Turkey)', 'Español (Spain)', 'Français (France)'];

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignUp = () => {
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
        // Handle the sign-up logic here
        console.log("SignUp:", { name, email, password });
    };

    const navigateToLogin = () => {
        navigate.navigate('Login');
    };

    return (
        <Container insets={{ top: true, bottom: true }}>
            <Content>
                <View style={{ flex: 1 }}>
                    <View style={styles.topContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                        </View>
                        <Image
                            style={styles.logo}
                            source={require('../../../assets/images/instagram_text_logo.png')}
                        />
                    </View>
                    <View style={styles.textcontainer}>
                        <Text style={styles.text}>Create an account</Text>
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
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={styles.login}
                            disabled={!name || !email || !password || !confirmPassword}>
                            <Text style={styles.loginText}>Sign Up</Text>
                        </TouchableOpacity>

                        <View style={{ alignItems: 'center', padding: 10 }}>
                            <View style={styles.text}>
                                <Text style={{ fontSize: 12, color: 'grey' }}>
                                    Already have an account?{' '}
                                </Text>
                                <TouchableOpacity onPress={navigateToLogin}>
                                    <Text style={styles.help}>Log in.</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 12, color: 'grey' }}>
                                    By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Content>
        </Container>
    );
};

export default SignUp;
