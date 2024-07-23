import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Container from '../../components/Container/Container';
import { useGetPostByIdMutation, useLikePostMutation } from '../../redux/services/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import styles from './Post.styles';
const MAX_TITLE_LENGTH = 100;

const SinglePost = ({ navigation }) => {
  const [fetchPostById, { isLoading, error, data }] = useGetPostByIdMutation();
  const [isFilled, setIsFilled] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const [likePost, { isLoading: likePostLoading, error: likePostError, data: likePostData }] = useLikePostMutation();

  let [token, setToken] = useState(null);
  const route = useRoute();
  const { postId } = route.params;

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

  useEffect(() => {
    if (data) {
      const post = data?.data;
      const likes = post?.postMetaData?.find((item) => item.key === "LIKES")?.content || 0;
      setIsFilled(likes > 1);
    }
  }, [data]);

  const handlePress = async () => {
    setIsFilled(prev => !prev);
    let payload = {
      postId: postId,
      token: token,
      key: 'LIKE'
    };
    let response = await likePost(payload);
  };

  const getText = (text, maxLength) => {
    if (isExpanded || text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '... ';
  };

  const handleReadMore = () => {
    setIsExpanded(prev => !prev);
  };

  const post = data?.data;
  let user = post?.user;
  let postMetaData = post?.postMetaData;
  let likes = postMetaData?.find((item) => item.key === "LIKES")?.content || 0;
  const images = post?.images || [];

  const formatDate = (date) => {
    const d = new Date(date);
    const options = { month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
  }

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
              <View key={image.id} style={{ position: 'relative' }}>
                <Image
                  source={{ uri: image.url }}
                  style={styles.image}
                  onLoadEnd={() => setImageLoading(false)}
                  onLoad={() => setImageLoading(false)}
                  onError={() => setImageLoading(false)}
                />
              </View>
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
            {isFilled ? 'Liked' : 'Not Liked'} {likes} likes
          </Text>

          <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
            {
              data ? (
                <>
                  <Text style={styles.titleText}>
                    {getText(data?.data?.title, 20)}
                  </Text>
                  <TouchableOpacity onPress={handleReadMore}>
                    <Text style={{ color: 'white', fontWeight: 'bold', marginLeft: 5 }}>
                      {isExpanded ? 'Show less' : 'Read more'}
                    </Text>
                  </TouchableOpacity>
                </>
              ) :
                (
                  <>
                    <Text>
                      Loading.....
                    </Text>
                  </>
                )
            }
          </View>

          <Text style={styles.comment}>View all 2 comments</Text>

          <Text style={styles.time}>
            {formatDate(data?.data?.createdAt)}
          </Text>
        </View>
      </View>
    </Container>
  );
};

export default SinglePost;
