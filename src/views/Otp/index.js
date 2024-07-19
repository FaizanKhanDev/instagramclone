import React, { useState, useRef } from "react";
import { Alert, Image, TouchableWithoutFeedback, Text, TouchableOpacity, View } from 'react-native';
import { TextInput, ActivityIndicator } from 'react-native-paper';
import Container from "../../components/Container/Container";
import Content from "../../components/Content/Content";
import styles from '../../views/Login/Login.styles';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useVerifyOtpMutation } from "../../redux/services/auth";
import SnackBar from "../../components/common/SnackBar";
import { useSelector } from 'react-redux';

const OTPVerification = () => {
    /* ---- useDispatch ---- */
    const dispatch = useDispatch();

    /* ---- useNavigation ---- */
    const navigate = useNavigation();
    
    /* ---- user Object ---- */
    const user = useSelector((state) => state.auth.user);

    /* ---- useVerifyOtpMutation ---- */
    const [verifyOtp, { isLoading, data }] = useVerifyOtpMutation();

    /* --- snack bar --- */
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState('');

    /* ---- Dismiss ---- */
    const dismissSnackBar = () => {
        setSnackBarVisible(false);
    };

    /* ---- OTP Verification ---- */
    const [otp, setOtp] = useState('');

    const handleVerifyOtp = async () => {
        if (isLoading) {
            Alert.alert('Please wait...');
            return;
        }
        if (!otp) {
            Alert.alert('Please enter OTP');
            return;
        }
        let email = user.email;
        let verifyOtpResponse = await verifyOtp({ email, otp });
        console.log("verifyOtpResponse: ", verifyOtpResponse);
        if (verifyOtpResponse?.data?.status === "success") {
            setSnackBarMessage('OTP verified successfully');
            setSnackBarVisible(true);
            setTimeout(() => {
                navigateToLogin();
            },2000)
        } else {
            setSnackBarVisible(true);
            setSnackBarMessage(verifyOtpResponse?.error?.data?.message || 'Invalid OTP');
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
                    <View style={styles.keyboardView}>
                        <TextInput
                            theme={{ colors: { text: 'white' } }}
                            placeholder="Enter OTP"
                            onChangeText={setOtp}
                            placeholderTextColor="grey"
                            selectionColor="grey"
                            keyboardType="numeric"
                            style={styles.textInput}
                            activeOutlineColor="grey"
                            activeUnderlineColor="#3a3a3a"
                        />
                        <TouchableOpacity
                            onPress={handleVerifyOtp}
                            style={[styles.signupButton, { opacity: otp ? 1 : 0.5 }]}
                        >
                             {
                                        isLoading ? (
                                            <ActivityIndicator size="small" color="#3a3a3a" />

                                        ) : <Text style={styles.signupText}>Verify OTP</Text>
                                    }
                            
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signUpBottomContainer}>
                        <View style={styles.bottom}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ fontSize: 12, color: 'grey', marginTop: 20 }}>
                                    Didn't receive the OTP?{' '}
                                </Text>
                                <TouchableOpacity>
                                   <Text style={{ ...styles.help, marginTop: 20 }}>
                                            Resend OTP</Text>
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
            <SnackBar visible={snackBarVisible} snackBarMessage={snackBarMessage} onDismissSnackBar={dismissSnackBar}></SnackBar>
        </Container>
    );
};

export default OTPVerification;
