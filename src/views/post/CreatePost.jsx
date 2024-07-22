import React, { useState, useEffect, useRef } from 'react';
import { View, Image, StyleSheet, Text, Dimensions, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import Container from "../../components/Container/Container";
import Content from "../../components/Content/Content";
import BottomNavigation from '../../components/common/BottomNavigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from './CreatePostStyles';
import RNFS from 'react-native-fs';
import { useCreatePostMutation } from '../../redux/services/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SnackBar from '../../components/common/SnackBar';
import { useNavigation } from '@react-navigation/native';

const CreatePost = ({ route, navigation }) => {
    const { selectedImage } = route.params;
    const [createPost, { loading, error }] = useCreatePostMutation();
    const [title, setTitle] = useState('');
    const [keyboardOpened, setKeyboardOpened] = useState(false);
    const { width } = Dimensions.get('window');
    const imageOffset = new Animated.Value(0);
    const [selectedOption, setSelectedOption] = useState('Public');
    const [privacyId, setPrivacyId] = useState(1);
    const bottomSheetRef = useRef();
    const navigate = useNavigation();
    
    const [snackBarVisible, setSnackBarVisible] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const MAX_TITLE_LENGTH = 100;

    const dismissSnackBar = () => {
        setSnackBarVisible(false);
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
    };

    const openToSelectPostPrivacy = async () => {
        bottomSheetRef.current.open();
    };

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpened(true);
                Animated.timing(imageOffset, {
                    toValue: -100,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        );

        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardOpened(false);
                Animated.timing(imageOffset, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const handlePost = async () => {
        if (selectedOption === 'Public') {
            setPrivacyId(1);
        } else if (selectedOption === 'Only Me') {
            setPrivacyId(2);
        } else if (selectedOption === 'Friends') {
            setPrivacyId(3);
        }
        const storedToken = await AsyncStorage.getItem('token');
        let payload = {
            token: storedToken,
            title: title,
            type: "POST",
            privacyId: privacyId,
            fileType: "IMAGE",
            "images": [
                "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
            ]
        }
        console.log("payload: ", JSON.stringify(payload));

        let response = await createPost(payload);
        if (response.data.status == "success") {
            setSnackBarVisible(true);
            setSnackBarMessage("Post created successfully");
            setTimeout(() => {
                setSnackBarVisible(false);
                navigate.navigate('BottomTab', { screen: 'AccountScreen' });
                setSnackBarMessage("");
            }, 1500);
        }
    };

    const privacyIcon = (option) => {
        if (option === 'Public') {
            return 'globe';
        } else if (option === 'Only Me') {
            return 'lock';
        } else if (option === 'Friends') {
            return 'users';
        }
    };

    const getDisplayTitle = (text) => {
        if (text.length <= MAX_TITLE_LENGTH || isExpanded) {
            return text;
        }
        return text.slice(0, MAX_TITLE_LENGTH) + '...';
    };

    const handleReadMore = () => {
        setIsExpanded(prev => !prev);
    };

    return (
        <Container>
            <Content>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={styles.header}>
                        <Image
                            style={styles.backIcon}
                            source={{ uri: 'https://i.imgur.com/6MLlpX7.png' }}
                        />
                        <Text style={styles.headerText}>New Post</Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.privacyOptions}>
                    <View>
                        <Text style={{ fontWeight: 'bold', fontSize: 16, color: '#cffa41', marginBottom: 10 }}>
                            Who can see this?
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <FontAwesome
                                name={privacyIcon(selectedOption)}
                                size={24}
                                style={{ marginRight: 10 }}
                            />
                            <Text>{selectedOption}</Text>
                            <TouchableOpacity onPress={openToSelectPostPrivacy} style={{ position: 'absolute', right: 0 }}>
                                <Image
                                    source={require('../../../assets/images/down.png')}
                                    style={{ width: 18, height: 18 }}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <Animated.View style={[styles.imageContainer,
                    { transform: [{ translateY: imageOffset }] }]}>
                        <Image source={{ uri: selectedImage.path }}
                            style={styles.image} resizeMode="contain" />
                    </Animated.View>

                    <View style={styles.captionContainer}>
                        <TextInput
                            placeholder="Write a caption..."
                            value={title}
                            onChangeText={setTitle}
                            style={styles.captionInput}
                            placeholderTextColor="gray"
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
                        <Text style={styles.titleText}>
                            {getDisplayTitle(title)}
                        </Text>
                        {title.length > MAX_TITLE_LENGTH && (
                            <TouchableOpacity onPress={handleReadMore}>
                                <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>
                                    {isExpanded ? 'Show less' : 'Read more'}
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity onPress={handlePost}>
                    <View style={styles.shareButton}>
                        <Text style={styles.shareButtonText}>Share</Text>
                    </View>
                </TouchableOpacity>

                <BottomNavigation ref={bottomSheetRef} onOptionSelect={handleOptionChange} />
            </Content>

            <SnackBar visible={snackBarVisible} snackBarMessage={snackBarMessage} onDismissSnackBar={dismissSnackBar} />
        </Container>
    );
};

export default CreatePost;
