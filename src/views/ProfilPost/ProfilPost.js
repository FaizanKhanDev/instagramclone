import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import Container from '../../components/Container/Container';
import { useGetAllPostMutation } from '../../redux/services/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllPosts } from '../../redux/store/actions/postActions';
import { useDispatch, useSelector } from 'react-redux';

const ProfilPost = ({ navigation }) => {
  const [fetchAllPost, { isLoading, error, data }] = useGetAllPostMutation();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.post.posts);

  useEffect(() => {
    const fetchTokenAndPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          fetchAllPost({ type: "POST", token }).then((response) => {
            if (response.data) {
              dispatch(getAllPosts(response.data));
            }
          });
        } else {
          console.error("Token not found");
        }
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };
    fetchTokenAndPosts();
  }, [fetchAllPost, dispatch]);

  if (isLoading) {
    return (
      <Container>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading posts...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <View style={styles.centered}>
          <Text style={styles.errorText}>Error fetching posts. Please try again later.</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.imageRow}>
        {posts?.data && posts.data.length > 0 ? (
          posts.data.map(post => post.images && post.images.map(image => (
            <TouchableOpacity
              onPress={() => navigation.navigate('SinglePost', { postId: post.id })}
              key={image.id}
              style={styles.imageContainer}
            >
              <Image style={styles.image} source={{ uri: image.url }} />
            </TouchableOpacity>
          )))
        ) : (
          <View style={styles.centered}>
            <Text style={styles.noPostsText}>No posts available.</Text>
          </View>
        )}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: 135,
  },
  imageContainer: {
    width: '33%',
    height: 135,
    padding: 2,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
  noPostsText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ProfilPost;
