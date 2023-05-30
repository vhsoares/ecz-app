import {Platform, StyleSheet} from 'react-native';

export const textStyles = StyleSheet.create({
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Montserrat' : 'Montserrat-Regular',
  },
});
