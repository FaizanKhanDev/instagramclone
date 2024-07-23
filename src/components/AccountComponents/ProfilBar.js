import React, { useRef } from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ImagePicker from 'react-native-image-crop-picker';
import { useUploadFileMutation } from '../../redux/services/files';

const ProfileBar = () => {
  const bottomSheet = useRef();
  const bottomSheet2 = useRef();
  const navigation = useNavigation();

  const [uploadFile, { data, loading }] = useUploadFileMutation();



  const navigateToOpenGallery = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      cropperCircleOverlay: false,
      includeExif: true,
      mediaType: 'photo',
    }).then(async image => {
      console.log('Selected image:', image);
      let formData = new FormData();
      formData.append('files', image);
      navigation.navigate('CreatePost', { selectedImage: image });
    }).catch(error => {
      console.log('ImagePicker Error: ', error);
    });
  };

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.left}>
        <Feather name="lock" size={18} color="#0e1111" />
        <Text style={styles.header}>Faizan </Text>
        {/* <Image
          source={require('../../../assets/images/down.png')}
          style={{ width: 18, height: 18 }}
        /> */}
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={() => bottomSheet2.current.show()}>
          <FontAwesome
            name="plus-square-o"
            size={28}
            color="#0e1111"
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet2}
          height={450}
          sheetBackgroundColor="#262626">
          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={{ color: '#0e1111', fontSize: 18, fontWeight: 'bold' }}>
              Create
            </Text>
          </View>
          <View style={styles.line} />

          <View style={{ marginLeft: 15, marginTop: 15 }}>
            <View style={styles.sheet2}>
              <Image source={require('../../../assets/images/video.png')} />
              <Text style={styles.label}>Reels Video</Text>
            </View>

            <View style={styles.sheet2}>
              <TouchableOpacity style={styles.sheetTextParent} onPress={navigateToOpenGallery}>
                <Image source={require('../../../assets/images/grid.png')} />
                <Text style={styles.label}>Post</Text>

              </TouchableOpacity>
            </View>

            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/stories.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Story</Text>
            </View>
            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/highlight-story.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Highlight</Text>
            </View>

            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/live.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Live</Text>
            </View>

            <View style={styles.sheet2}>
              <Image
                source={require('../../../assets/images/book.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Guide</Text>
            </View>
          </View>
        </BottomSheet>

        <BottomSheet
          hasDraggableIcon
          ref={bottomSheet}
          height={400}
          sheetBackgroundColor="#262626">
          <View style={{ marginTop: 15, marginLeft: 5 }}>
            <TouchableOpacity
              style={styles.sheet}
              onPress={() => {
                navigation.navigate('Settings');
                bottomSheet.current.close();
              }}>
              <Ionicons name="settings-sharp" size={28} color="#0e1111" />
              <Text style={styles.label}>Settings</Text>
            </TouchableOpacity>

            <View style={styles.sheet}>
              <Image
                source={require('../../../assets/images/timer.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Your Activity</Text>
            </View>

            <View style={styles.sheet}>
              <Image
                source={require('../../../assets/images/time.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>Archive</Text>
            </View>

            <View style={styles.sheet}>
              <Image
                source={require('../../../assets/images/qr-code.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>QR Code</Text>
            </View>

            <View style={styles.sheet}>
              <Feather name="bookmark" size={28} color="#33333" />
              <Text style={styles.label}>Saved</Text>
            </View>

            <View style={styles.sheet}>
              <AntDesign name="bars" size={28} color="#33333" />
              <Text style={styles.label}>Close Friends</Text>
            </View>

            <View style={styles.sheet}>
              <Image
                source={require('../../../assets/images/heart.png')}
                style={styles.icon}
              />
              <Text style={styles.label}>COVID-19 Information Center</Text>
            </View>
          </View>
        </BottomSheet>

        <TouchableOpacity onPress={() => bottomSheet.current.show()}>
          <FontAwesome name="bars" size={28} color="#0e1111" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  body: {
    height: '7%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '43%',
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '25%',
    marginRight: 10,
  },
  header: {
    color: '#0e1111',
    fontWeight: 'bold',
    fontSize: 22,
  },
  icon: {
    width: 28,
    height: 28,
  },
  line: {
    borderBottomWidth: 0.8,
    borderBottomColor: '#3a3a3a',
    marginTop: 10,
  },
  sheet: {
    backgroundColor: '#262626',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sheet2: {
    backgroundColor: '#262626',
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    color: '#0e1111',
    fontSize: 18,
    fontWeight: '500',
    paddingLeft: 15,
  },
  sheetTextParent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ProfileBar;
