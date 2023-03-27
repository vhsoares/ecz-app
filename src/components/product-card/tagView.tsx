import {Image, Text} from '@rneui/base';
import {View} from 'react-native';

type tagViewProps = {
  name: string;
};

const TagView = ({name}: tagViewProps) => {
  return (
    <View
      style={{
        backgroundColor: '#E4EDDE',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
      }}>
      <Image
        source={require('../../assets/images/Union.png')}
        style={{width: 20, height: 12, marginRight: 10, marginTop: 2}}
      />
      <Text style={{color: '#2F5F10', fontSize: 12}}>{name}</Text>
    </View>
  );
};

export default TagView;
