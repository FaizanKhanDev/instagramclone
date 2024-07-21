import React from 'react';
import { Image, Text, Animated, TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import Container from '../../components/Container/Container';

const ProfilPost = ({ scrollY }) => {
  return (
    <Container style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <View style={styles.imageRow}>
          {[...Array(30)].map((_, index) => (
            <TouchableOpacity key={index} style={styles.imageContainer}>
              <Image style={styles.image} source={require('../../storage/images/post.jpg')} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 0,
  },
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
