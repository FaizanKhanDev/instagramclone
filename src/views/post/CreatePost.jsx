import React, { useState, useEffect } from 'react';
import { View, Image, Text, Dimensions, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import Container from "../../components/Container/Container";
import Content from "../../components/Content/Content";
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CreatePost = ({ route, navigation }) => {
    const { selectedImage } = route.params;
    const [title, setTitle] = useState('');
    const [keyboardOpened, setKeyboardOpened] = useState(false);
    const { width } = Dimensions.get('window');
    const imageOffset = new Animated.Value(0);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardOpened(true);
                Animated.timing(imageOffset, {
                    toValue: -100, // Adjust this value based on how much you want the image to float up
                    duration: 300, // Duration of the animation
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

    const handlePost = () => {
        navigation.navigate('Post', { title, selectedImage });
    };

    return (
        <Container>
            <Content>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <View style={{
                        paddingHorizontal: 10,
                        backgroundColor: '#212121',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        paddingVertical: 20,
                    }}>
                        <Image
                            style={{ width: 40, height: 20, borderRadius: 20, marginRight: 10 }}
                            source={{ uri: 'https://i.imgur.com/6MLlpX7.png' }}
                        />
                        <Text style={{ fontSize: 20, color: 'white' }}>New Post</Text>
                    </View>
                </TouchableOpacity>

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                >
                    <Animated.View style={{
                        flex: keyboardOpened ? 0 : 3,
                        justifyContent: 'center',
                        alignItems: 'center',
                        transform: [{ translateY: imageOffset }],
                    }}>
                        <Image source={{ uri: selectedImage.path }} style={{ width: width, height: 300 }} resizeMode="contain" />
                    </Animated.View>

                    <View style={{ width: '100%', backgroundColor: '#212121', paddingVertical: 10 }}>
                        <TextInput
                            placeholder="Write a caption..."
                            value={title}
                            onChangeText={setTitle}
                            style={{ fontSize: 16, width: '100%', paddingHorizontal: 10, color: 'white' }}
                        />
                    </View>
                </KeyboardAvoidingView>

                <TouchableOpacity onPress={handlePost}>
                    <View style={{
                        marginTop: 10,
                        width: '100%',
                        height: 50,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#cffa41',
                        flexDirection: 'row',
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        shadowColor: '#000',
                        shadowOpacity: 0.1,
                        shadowRadius: 4,
                        elevation: 5,
                    }}>
                        <Text style={{ fontSize: 16, fontWeight: '500', color: '#000' }}>Share</Text>
                    </View>
                </TouchableOpacity>
            </Content>
        </Container>
    );
};

export default CreatePost;
