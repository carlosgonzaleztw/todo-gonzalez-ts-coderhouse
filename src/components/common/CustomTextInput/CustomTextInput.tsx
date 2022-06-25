import { StyleSheet, TextInput } from 'react-native';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  [x: string]: any;
};

const CustomTextInput: React.FC<Props> = ({ style, ...props }: Props) => {
  return <TextInput {...props} style={[styles.text, style]} />;
};

export default CustomTextInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins-regular',
  },
});
