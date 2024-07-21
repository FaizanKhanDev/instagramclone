import React from 'react';
import { Animated, Image, TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import Container from '../../components/Container/Container';

const ProfilPost = () => {
  return (
    <Container>
      <View style={styles.imageRow}>
        {[...Array(20)].map((_, index) => (
          <TouchableOpacity key={index} style={styles.imageContainer}>
            <Image style={styles.image} source={require('../../storage/images/post.jpg')} />
          </TouchableOpacity>
        ))}
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  image: {
    width: '100%',
    height: 135,
  },
  imageContainer: {
    width: '33%',
    height: 135,
  },
});

export default ProfilPost;
