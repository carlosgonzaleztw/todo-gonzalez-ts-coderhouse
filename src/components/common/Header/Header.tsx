import React from 'react';
import { View, StyleSheet } from 'react-native';
import ThemeColors from '../../../styles/colors';
import CustomText from '../CustomText/CustomText';

type Props = {
  title: string;
};

const Header = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>{title}</CustomText>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: ThemeColors.textColor,
    fontSize: 40,
    fontFamily: 'poppins-bold',
  },
});
