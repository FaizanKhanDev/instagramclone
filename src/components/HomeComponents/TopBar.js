import React from 'react';
import {Image, StatusBar, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

import styles from './HomeComponents.style';

const TopBar = () => {
  const navigation = useNavigation();

  const openCamera = React.useCallback(async () => {
    await ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    });
  }, []);

  return (
    <View style={styles.body}>
      <StatusBar backgroundColor="white" />
   <Image
              style={{
                width: 140,
                height:50,
                resizeMode: 'contain',
              }}
              source={{ uri: 'https://i.imgur.com/aVlDXZ9.png' }}
            />
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => openCamera()}>
          <FontAwesome name="plus-square-o" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
          <Feather name="heart" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('MessageScreen')}>
        
           <Feather name="message-circle" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
