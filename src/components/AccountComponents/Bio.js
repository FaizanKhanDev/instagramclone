import React from 'react';
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './AccountComponents.style';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Bio = ({ route }) => {
  const navigation = useNavigation();

  return (
    <SafeAreaView>
      <View style={styles.bioContainer}>
        <Text style={styles.userName}> {route ? route.name : 'CEYLAN'}</Text>
        <Text style={styles.bio}>
          {route ? route.bio : 'Virtual University of Barcelona'}

        </Text>
      </View>

      <View
        style={{
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={styles.edit}
          onPress={() => navigation.navigate('EditProfile')}>
          <View style={styles.editTextView}>
            <Text style={styles.editText}>Edit Profile</Text>
          </View>
        </TouchableOpacity>

        {/* <View style={styles.icon}> */}
          {/* <Image
            source={require('../../../assets/images/invite.png')}
            style={{ width: 16, height: 16 }}
          /> */}
          {/* <FontAwesome
             name="user-plus"
            size={20}
            solid={false}
            color="#414a4c"
            style={{ marginRight: 0 }}
          /> */}
        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Bio;
