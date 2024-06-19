import React, { useRef, useState } from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import DefaultImage from '../../../assets/images/profil.jpg';   
import styles from './ProfilEdit.style';           

const ProfileEdit = () => {
  const [name, setName] = useState('CEYLAN');
  const [bio, setBio] = useState('Marmara University');
  const [image, setImage] = useState();
  const navigation = useNavigation();
  const bottomSheet = useRef();

  const chooseFromLibrary = () => {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
    }).then(images => {
      setImage(images?.path);
      bottomSheet.current.close();
    });
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={{ margin: 10 }}>
        <View style={styles.topContainer}>
          <View style={styles.left}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign
                name="close"
                size={32}
                color="white"
                style={styles.icon}
              />
            </TouchableOpacity>
            <Text style={styles.label}>Edit Profile</Text>
          </View>

          <View style={styles.right}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate({
                  name: 'Account',
                  params: {
                    name: name,
                    bio: bio,
                    image: image,
                  },
                })
              }>
              <AntDesign
                name="check"
                size={32}
                color="#0098fd"
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profile}>
          <Image
            style={styles.image}
            source={image ? { uri: image } : DefaultImage}
          />

          <TouchableOpacity onPress={() => bottomSheet.current.show()}>
            <Text style={styles.change}> Change Profile Photo</Text>
          </TouchableOpacity>

          <BottomSheet
            hasDraggableIcon
            ref={bottomSheet}
            height={350}
            sheetBackgroundColor="#262626">
            <View style={{ marginLeft: 10 }}>
              <View style={{ marginTop: 25, marginBottom: 15 }}>
                <Text style={styles.sheetText}>
                  Change Profile Photo
                </Text>
              </View>

              <View style={styles.lineGrey} />

              <TouchableOpacity
                style={{ marginVertical: 20 }}
                onPress={chooseFromLibrary}>
                <Text style={styles.sheetText}>New Profile Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginVertical: 15 }}
                onPress={() => {
                  Linking.openURL('https://www.facebook.com/login/');
                }}>
                <Text style={styles.sheetText}>Import from Facebook</Text>
              </TouchableOpacity>
              <View style={{ marginVertical: 15 }}>
                <Text style={styles.sheetText}>Use Avatar</Text>
              </View>
              <View style={{ marginVertical: 15 }}>
                <Text
                  style={{ color: '#be363f', fontWeight: '500', fontSize: 18 }}>
                  Remove Profile Photo
                </Text>
              </View>
            </View>
          </BottomSheet>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Name</Text>
          <TextInput style={styles.input} onChangeText={item => setName(item)}>
            {name}
          </TextInput>
          <View style={styles.line} />
          <Text style={styles.inputLabel}>Username</Text>
          <Text style={styles.input}>ezgiceylan</Text>
          <View style={styles.line} />
          <Text style={styles.inputLabel}>Bio</Text>
          <TextInput style={styles.input} onChangeText={item => setBio(item)}>
            {bio}
          </TextInput>
          <View style={styles.line} />
        </View>
        <View style={styles.lineGrey}>
          <Text
            style={{
              color: 'white',
              marginTop: 15,
              fontSize: 19,
              marginLeft: 10,
              marginBottom: 5,
            }}>
            Add Connection
          </Text>
        </View>

        <View style={styles.blueContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('OnboardingScreen')}>
            <Text style={styles.blueText}>Switch to Professional Account</Text>
          </TouchableOpacity>

          <Text style={styles.blueText}>Edit Avatar</Text>

          <Text style={styles.blueText}>Personal Information Settings</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProfileEdit;
