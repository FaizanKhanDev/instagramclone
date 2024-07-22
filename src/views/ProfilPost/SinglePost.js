import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Container from '../../components/Container/Container';

import styles from './Post.styles';

const SinglePost = ({ navigation }) => {
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
                source={{ uri: 'https://i.imgur.com/aVlDXZ9.png' }}
                style={styles.profilImage}
              />
              <Text style={styles.title}>ezgiceylan</Text>
            </View>

            <TouchableOpacity style={{ alignSelf: 'center', marginRight: 10 }}>
              <Feather name="more-vertical" size={20} color="#F5F5F5" />
            </TouchableOpacity>
          </View>

          <View style={{ height: 400 }}>
            <Image
              source={{ uri: 'https://i.imgur.com/aVlDXZ9.png' }}

              style={styles.image}
            />
          </View>

          <View style={styles.iconContainer}>
            <View style={styles.leftIcon}>
              <TouchableOpacity>
                <AntDesign name={'hearto'} size={24} color={'white'} />
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

          <Text style={styles.likeText}>700 likes</Text>

          <View style={{ flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
            <Text style={styles.postName}>ezgiceylan</Text>
            <Text style={{ color: 'white', marginTop: 2 }}> smile..</Text>
          </View>

          <Text style={styles.comment}>View all 2 comments</Text>

          <Text style={styles.time}>October 10th</Text>
        </View>
      </View>
    </Container>
  );
};

export default SinglePost;
