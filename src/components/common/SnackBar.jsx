import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

const SnackBar = ({ visible, onDismissSnackBar, snackBarMessage }) => {
  const onDismiss = () => {
    onDismissSnackBar(); 
  };

  return (
      <Snackbar
        visible={visible}
        onDismiss={onDismiss}
        action={{
          label: 'Close',
          onPress: () => {
          },
          color: '#cffa41', 
          style: { backgroundColor: 'transparent' },
        }}>
        {snackBarMessage}
      </Snackbar>
  );
};

export default SnackBar;