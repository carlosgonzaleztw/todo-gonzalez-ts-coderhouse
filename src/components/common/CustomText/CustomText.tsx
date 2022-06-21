import { StyleSheet, Text, ViewStyle } from 'react-native';
import React from 'react';

type Props = {
  children?: React.ReactNode;
  [x: string]: any;
};

const CustomText = ({ style, children, ...props }: Props) => {
  return (
    <Text {...props} style={[styles.text, style]}>
      {children}
    </Text>
  );
};

export default CustomText;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'poppins-regular',
  },
});
