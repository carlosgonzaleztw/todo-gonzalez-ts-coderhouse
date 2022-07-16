import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ThemeColors from '../../styles/colors';
import IonicIcons from '@expo/vector-icons/Ionicons';

const PictureButton = () => {
  return (
    <Pressable style={styles.root}>
      <IonicIcons name="image-outline" size={25} color={ThemeColors.white} />
    </Pressable>
  );
};

export default PictureButton;

const styles = StyleSheet.create({
  root: {
    borderRadius: 100,
    backgroundColor: ThemeColors.pink,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
