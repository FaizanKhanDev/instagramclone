import React, { useState, useEffect } from "react";
import { Alert, Image, TouchableWithoutFeedback, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Container from "../../components/Container/Container";
import Content from "../../components/Content/Content";
import styles from '../Login/Login.styles';
import { useNavigation } from '@react-navigation/native';
import { Checkbox, ActivityIndicator } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { useCreateAccountMutation } from "../../redux/services/auth";
import SnackBar from "../../components/common/SnackBar";
import { loginSuccess } from "../../redux/store/actions/authActions";
import { useSelector } from 'react-redux';
const SignUp = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [createAccount, { isLoading, data }] = useCreateAccountMutation();
    const [email, setEmail] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(true);
    const navigate = useNavigation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checked, setChecked] = React.useState(true);
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    useEffect(() => {

    }, [user]);

    const handleSignUp = async () => {
        try {
            if (isLoading) {
                Alert.alert('Please wait...');
                return;
            }
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
            let newUser = await createAccount({ name, email, password, confirm_password: confirmPassword, role: 'USER' });
            console.log("newUser: ", newUser);
            if (newUser?.data?.status === "success") {
                dispatch(loginSuccess(newUser.data.data));
                setSnackBarVisible(true);
                setSnackBarMessage("Account created successfully");


                setTimeout(() => {
                    navigate.navigate('Otp');
                    setSnackBarVisible(false);

                }, 1000);
            } else {
                setSnackBarVisible(true);
                setSnackBarMessage(newUser.error.data.message || "Something went wrong");
                setTimeout(() => {
                    setSnackBarVisible(false);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }

    };

    const navigateToLogin = () => {
        navigate.navigate('Login');
    };

    const dismissSnackBar = () => {
        setSnackBarVisible(false);
    };


    return (
        <Container insets={{ top: true, bottom: true }}>
            <Content>
                <View style={{ flex: 1, justifyContent: 'center',backgroundColor:"white" }}>
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
                            placeholderTextColor="white"
                            selectionColor="grey"
                            style={styles.textInput}
                            activeOutlineColor="grey"
                            activeUnderlineColor="#3a3a3a"
                        />
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Email"
                            onChangeText={setEmail}
                            placeholderTextColor="white"
                            selectionColor="grey"
                            style={styles.textInput}
                            activeOutlineColor="grey"
                            activeUnderlineColor="#3a3a3a"
                        />
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Password"
                            onChangeText={setPassword}
                            placeholderTextColor="white"
                            selectionColor="grey"
                            secureTextEntry={passwordVisible}
                            style={styles.textInput}
                            activeUnderlineColor="#3a3a3a"
                            activeOutlineColor="#3a3a3a"
                            right={
                                <TextInput.Icon
                                    color={'white'}
                                    name={passwordVisible ? 'eye-off' : 'eye'}
                                    onPress={() => setPasswordVisible(!passwordVisible)}
                                />
                            }
                        />
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Confirm Password"
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="white"
                            selectionColor="grey"
                            secureTextEntry={passwordVisible}
                            style={styles.textInput}
                            activeUnderlineColor="#3a3a3a"
                            activeOutlineColor="#3a3a3a"
                            right={
                                <TextInput.Icon
                                    color={'white'}
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
                            {isLoading ? (
                                <ActivityIndicator size="small" color="#3a3a3a" />
                            ) : (
                                <Text style={styles.signupText}>Sign Up</Text>
                            )}
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
            <SnackBar visible={snackBarVisible} snackBarMessage={snackBarMessage} onDismissSnackBar={dismissSnackBar}></SnackBar>
        </Container>
    );
};

export default SignUp;
