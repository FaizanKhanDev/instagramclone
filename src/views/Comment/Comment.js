import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SnackBar from '../../components/common/SnackBar';

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
import { useCommentPostMutation } from '../../redux/services/post';
import { useSelector } from 'react-redux';
const Comment = ({ navigation, route }) => {
  const user = useSelector((state) => state.auth.user);
  const [commentText, setCommentText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [like, setLike] = useState(false);
  const [commentPost, { isLoading, data: comment }] = useCommentPostMutation();
  const [commentsList, setCommentsList] = useState([]);

  useEffect(() => {
    if (route.params) {
      setCommentsList(route.params.commentList);
    }
  }, [route.params]);
  /* -------------- SnackBar --------------- */
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [snackBarMessage, setSnackBarMessage] = React.useState('');
  const dismissSnackBar = () => {
    setSnackBarVisible(false);
  };

  const commentPostHandler = async () => {
    let payload = {
      postId: route.params.postId,
      comment: commentText,
      token: route.params.token
    }

    let response = await commentPost(payload);
    if (response.data.status == "success") {
      let newComments = {
        ...response.data.data,
        user:user
      }
      console.log("New Comments: user ", JSON.stringify(user));
      setCommentsList([...commentsList, newComments]);
      setCommentText("");
      setSnackBarVisible(true);
      setSnackBarMessage("Comment added successfully");
      setTimeout(() => {
        setSnackBarVisible(false);
        setSnackBarMessage("");
      }, 1000)
    }
  }



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
      <View style={{ flex: 1, backgroundColor: 'white' }}>
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
              </View>


              <View style={styles.line} />
              {commentsList.map((item, index) => (
                <View
                  key={index}
                  style={{ justifyContent: 'space-between', flexDirection: 'row' }}
                >
                  <View style={styles.comment}>
                    <Image style={styles.images} source={require('../../../assets/images/profil.jpg')} />
                    <View style={{ marginLeft: 10 }}>
                      <Text style={{ color: '#414a4c', fontWeight: 'bold', fontSize: 13 }}>
                        {item?.user?.username}
                      </Text>
                      <Text style={{ color: '#414a4c', marginTop: 5, fontSize: 15 }}>
                        {item.content}
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
              <TouchableOpacity onPress={() => commentPostHandler()}>
                <Feather
                  name="send"
                  size={24}
                  color={commentText ? 'white' : '#414a4c'}
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
      <SnackBar
        visible={snackBarVisible}
        snackBarMessage={snackBarMessage}
        onDismissSnackBar={dismissSnackBar}></SnackBar>

    </Container>
  );
};

export default Comment;
