import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Container from '../../components/Container/Container';
import data from '../../storage/database/comment';
import styles from './Comment.style';
const Comment = ({ navigation, route }) => {
  const [commentText, setCommentText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  console.log("route: ", keyboardHeight);

  const [like, setLike] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(40);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);

    });

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Container insets={{ top: true, bottom: true }}>
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid
            keyboardShouldPersistTaps='handled'
          >
            <View style={styles.topContainer}>
              <View style={styles.top}>
                <View style={styles.left}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back" size={28} color="#414a4c" />
                  </TouchableOpacity>
                  <Text style={styles.label}> Comments</Text>
                </View>
                <View style={{ justifyContent: 'center', marginRight: 20 }}>
                  <Feather name="send" size={24} color="#414a4c" />
                </View>
              </View>

              {/* <View style={styles.topComment}>
                <Image style={styles.image} source={route.params.image} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={{ color: '#414a4c', fontWeight: 'bold' }}>
                    {route.params.user}
                  </Text>
                  <Text style={{ color: '#414a4c', marginTop: 7 }}>
                    {route.params.explanation}
                  </Text>
                </View>
              </View> */}

              <View style={styles.line} />
              {data.map((item, index) => (
                <View
                  key={index}
                  style={{ justifyContent: 'space-between', flexDirection: 'row' }}
                >
                  <View style={styles.comment}>
                    <Image style={styles.images} source={item.image} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ color: '#414a4c', fontWeight: 'bold', fontSize: 13 }}>
                        {item.user}
                      </Text>
                      <Text style={{ color: '#414a4c', marginTop: 5, fontSize: 15 }}>
                        {item.comment}
                      </Text>
                      <View style={{ flexDirection: 'row', marginTop: 5 }}>
                        <Text style={styles.answer}>Reply</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{ marginTop: 10, alignItems: 'center', marginRight: 20 }}>
                    <TouchableOpacity onPress={handleLike}>
                      <AntDesign
                        name={like ? 'heart' : 'hearto'}
                        size={20}
                        color={like ? 'red' : '#3b444b'}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </KeyboardAwareScrollView>

          <View style={[styles.bottom, { marginBottom: keyboardHeight }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={styles.image}
                source={require('../../../assets/images/profil.jpg')}
              />
              <TextInput
                placeholder="comment as faizankhan."
                placeholderTextColor={'#969696'}
                style={styles.input}
                value={commentText}
                onChangeText={setCommentText}
              />
            </View>
            <View>
              <Text style={{ color: 'white', marginRight: 15 }}>Share</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Container>
  );
};

export default Comment;
