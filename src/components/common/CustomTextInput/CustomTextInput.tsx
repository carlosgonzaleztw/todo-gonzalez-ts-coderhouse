import { StyleSheet, TextInput, ViewStyle } from 'react-native';
import React, { FC } from 'react';

type Props = {
  children?: React.ReactNode;
  [x: string]: any;
};

const CustomTextInput: React.FC<Props> = ({
  style,
  children,
  ...props
}: Props) => {
  return (
    <TextInput {...props} style={[styles.text, style]}>
      {children}
    </TextInput>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins-regular',
  },
});
