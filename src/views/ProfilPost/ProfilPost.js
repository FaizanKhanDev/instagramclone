import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, ActivityIndicator } from 'react-native';
import Container from '../../components/Container/Container';
import { useGetAllPostMutation } from '../../redux/services/post';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfilPost = ({ navigation }) => {
  const [fetchAllPost, { isLoading, error, data }] = useGetAllPostMutation();

  useEffect(() => {
    const fetchTokenAndPosts = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token) {
          fetchAllPost({ type: "POST", token });
        } else {
          console.error("Token not found");
        }
      } catch (err) {
        console.error("Error fetching token:", err);
      }
    };
    fetchTokenAndPosts();
  }, [fetchAllPost]);

  if (isLoading) {
    return (
      <Container>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <View style={styles.centered}>
          <Text>Error fetching posts</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View style={styles.imageRow}>
        {data?.data?.map(post => post.images.map(image => (
          <TouchableOpacity
            onPress={() => navigation.navigate('SinglePost', { postId: post.id })}
            key={image.id}
            style={styles.imageContainer}
          >
            <Image style={styles.image} source={{ uri: image.url }} />
          </TouchableOpacity>
        )))}
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
});

export default ProfilPost;
