import React from 'react';
import { View, Image, Text } from 'react-native';

const CreatePost = ({ route }) => {
  const { selectedImage } = route.params;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Image source={{ uri: selectedImage.path }} style={{ width: 300, height: 400 }} />
    </View>
  );
};

export default CreatePost;
