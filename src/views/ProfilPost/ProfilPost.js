import React from 'react';
import { Image, TouchableOpacity, ScrollView, View, StyleSheet } from 'react-native';
import Container from '../../components/Container/Container';

const ProfilPost = ({ navigation }) => {
  return (
    <Container>
      <ScrollView>
        <View style={styles.imageRow}>
          {[...Array(6)].map((_, index) => (
            <TouchableOpacity
              key={index}
              style={styles.imageContainer}
              onPress={() => navigation.navigate('SinglePost')}
            >
              <Image
                style={styles.image}
                source={require('../../storage/images/post.jpg')}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
