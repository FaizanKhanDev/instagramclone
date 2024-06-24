import React, { useState, useRef } from "react";
import { Alert, Image, TouchableWithoutFeedback, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import Container from "../../components/Container/Container";
import Content from "../../components/Content/Content";
import styles from '../../views/Login/Login.styles';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'react-native-paper';

const OTPVerification = () => {
    const navigate = useNavigation();
    const [otp, setOtp] = useState('');
    const inputs = Array(4).fill(0);
    const inputRefs = inputs.map((_, index) => useRef(null));
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSignUp = () => {
        const correctOTP = '123456';

        if (otp === correctOTP) {
            navigate.navigate('Login');
        } else {
            Alert.alert('Invalid OTP', 'Please enter the correct OTP to proceed.');
        }
    };

    const navigateToLogin = () => {
        navigate.navigate('Login');
    };

    return (
        <Container insets={{ top: true, bottom: true }}>
            <Content>
                <View style={{ flex: 1, justifyContent: 'center', }}>
                    <View style={{ alignItems: 'center', marginBottom: 40, }}>
                        <Image
                            style={styles.signUpLogo}
                            source={{ uri: 'https://i.imgur.com/aVlDXZ9.png' }}
                        />
                        <Text style={{ fontSize: 20, fontWeight: '700', marginTop: 10, marginBottom: 30, textAlign: 'center' }}>Verify Your Email</Text>
                        <Text style={{ fontSize: 15, fontWeight: '', textAlign: 'center' }}>
                            Please Check Your Email for the OTP we've sent to verify your account.</Text>
                    </View>
{/* 
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        {inputs.map((_, index) => (
                            <TextInput
                                key={index}
                                ref={inputRefs[index]}
                                style={{
                                    borderWidth: 1,
                                    borderColor: 'grey',
                                    borderRadius: 5,
                                    textAlign: 'center',
                                    marginHorizontal: 5,
                                    width: 40,
                                    height: 40, 
                                }}
                                keyboardType="numeric"
                                maxLength={1}
                            />
                        ))}
                    </View> */}

                    <View style={styles.keyboardView}>
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Enter OTP"
                            onChangeText={setOtp}
                            placeholderTextColor="grey"
                            selectionColor="grey"
                            style={styles.textInput}
                            activeOutlineColor="grey"
                            activeUnderlineColor="#3a3a3a"
                        />
                        <TouchableOpacity
                            onPress={handleSignUp}
                            style={[styles.signupButton, { opacity: otp ? 1 : 0.5 }]}
                        >
                            <Text style={styles.signupText}>Verify OTP</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signUpBottomContainer}>
                        <View style={styles.bottom}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, color: 'grey', marginTop: 20 }}>
                                    Didn't receive the OTP?{' '}
                                </Text>
                                <TouchableOpacity>
                                    <Text style={{ ...styles.help, marginTop: 20 }}>Resend OTP</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.line} />
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, color: 'grey', marginTop: 10 }}>
                                    Go Back to{'  '}
                                </Text>
                                <TouchableOpacity onPress={navigateToLogin}>
                                    <Text style={{ ...styles.help, marginTop: 10 }}>Login.</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Content>
        </Container>
    );
};

export default OTPVerification;
