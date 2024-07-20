import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Account from '../views/Account/Account';
import SinglePost from '../views/ProfilPost/SinglePost';
import Settings from '../views/Settings/Settings';

const Stack = createNativeStackNavigator();

const AccountScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={({ route }) => ({
          headerShown: route.params?.headerShown ?? false,
        })}
      />
    </Stack.Navigator>
  );
};

export default AccountScreen;
