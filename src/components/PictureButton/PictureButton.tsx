import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ThemeColors from '../../styles/colors';
import IonicIcons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';

type Props = { onImage: (url: string) => void; disabled?: boolean };

const ImageButton = ({ onImage, disabled = false }: Props) => {
  const verifyPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
    }

    return status === 'granted';
  };

  const handleTakeImage = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    const pickerResult = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!pickerResult.cancelled) {
      onImage(pickerResult.uri);
    }
  };

  return (
    <Pressable
      style={[styles.root, disabled ? styles.disabled : null]}
      onPress={handleTakeImage}
      disabled={disabled}
    >
      <IonicIcons name="image-outline" size={25} color={ThemeColors.white} />
    </Pressable>
  );
};

export default ImageButton;

const styles = StyleSheet.create({
  root: {
    borderRadius: 100,
    backgroundColor: ThemeColors.pink,
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabled: {
    backgroundColor: ThemeColors.disabledText,
  },
});
