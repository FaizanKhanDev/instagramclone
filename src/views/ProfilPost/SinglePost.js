import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Container from '../../components/Container/Container';
import { useGetPostByIdMutation, useLikePostMutation } from '../../redux/services/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import styles from './Post.styles';

const SinglePost = ({ navigation }) => {
  /* ----- GET POST ----- */
  const [fetchPostById, { isLoading, error, data }] = useGetPostByIdMutation();

  /* ----- LIKE POST ----- */
  const [likePost,
    { isLoading: likePostLoading,
      error: likePostError, data: likePostData
    }
  ] = useLikePostMutation();

  let [token, setToken] = useState(null);
  useEffect(() => {
    const fetchTokenAndPost = async () => {
      const token = await AsyncStorage.getItem('token');
      setToken(token);

      if (token) {
        try {
          await fetchPostById({ id: postId, token });
        } catch (err) {
          console.error("Error fetching post:", err);
        }
      } else {
        console.error("Token not found");
      }
    };
    fetchTokenAndPost();
  }, [fetchPostById, postId]);


  const route = useRoute();
  const { postId } = route.params;
  const [isFilled, setIsFilled] = useState(false);

  const handlePress = async () => {
    setIsFilled(!isFilled);
    let payload = {
      postId: postId,
      token: token,
      key: 'LIKES'
    }
   let response = await likePost(payload);
   console.log("response: ", JSON.stringify(response));
   
  };



  const post = data?.data;
  let user = post?.user
  let postMetaData = post?.postMetaData;
  let likes = postMetaData?.filter((Item) => {
    if (Item.key === "LIKES") {
      return Item
    }
  });
  const images = post?.images || [];

  return (
    <Container insets={{ top: true, bottom: true }}>
      <View>
        <View style={styles.left}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={28} color="white" />
          </TouchableOpacity>
          <Text style={styles.label}> Posts</Text>
        </View>
        <View style={{ marginBottom: 10, marginTop: 15 }}>
          <View style={styles.top}>
            <View style={styles.topleft}>
              <Image
                source={require('../../storage/images/profil.jpg')}
                style={styles.profilImage}
              />
              <Text style={styles.title}>{user?.username}</Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center', marginRight: 10 }}>
              <Feather name="more-vertical" size={20} color="#F5F5F5" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 400 }}>
            {images.map(image => (
              <Image
                key={image.id}
                source={{ uri: image.url }}
                style={styles.image}
              />
            ))}
          </View>

          <View style={styles.iconContainer}>
            <View style={styles.leftIcon}>
              <TouchableOpacity onPress={handlePress}>
                <AntDesign name={isFilled ? 'heart' : 'hearto'} size={24} color={isFilled ? 'red' : 'white'} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Feather name="message-circle" size={24} color="white" />
              </TouchableOpacity>

              <Feather name="send" size={24} color="white" />
            </View>

            <View style={{ marginRight: 20 }}>
              <FontAwesome name="bookmark-o" size={24} color="white" />
            </View>
          </View>

          <Text style={styles.likeText}>

            {likes && likes[0].content + " likes"}
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
            <Text style={styles.postName}>{user?.username}</Text>
            <Text style={{ color: 'white', marginTop: 2 }}
              numberOfLines={1}
              ellipsizeMode="tail">


              {data?.data?.title}
            </Text>
          </View>

          <Text style={styles.comment}>View all 2 comments</Text>

          <Text style={styles.time}>October 10th</Text>
        </View>
      </View>
    </Container>
  );
};

export default SinglePost;