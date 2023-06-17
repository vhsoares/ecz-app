import {StyleSheet} from 'react-native';
import {fontFamily} from './font';

export const button = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    gap: 10,
    flexGrow: 1,
    backgroundColor: '#F6F3F7',
    shadowColor: '#45254E',
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 8,
    fontFamily,
  },
});
