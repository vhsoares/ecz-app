import {Input} from '@rneui/base';
import {Text, View} from 'react-native';

const FilterPrice = () => {
  return (
    <View>
      <View>
        <Text>Preço</Text>
      </View>
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <View>
          <Input
            placeholder="R$ "
            inputContainerStyle={{
              backgroundColor: `#F6F3F6`,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: {width: 10, height: 6},
              shadowOpacity: 0.35,
              shadowRadius: 20,
              width: '90%',
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderBottomColor: 'transparent',
            }}></Input>
        </View>

        <View>
          <Input
            placeholder="R$"
            inputContainerStyle={{
              backgroundColor: `#F6F3F6`,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: {width: 10, height: 6},
              shadowOpacity: 0.35,
              shadowRadius: 20,
              width: '90%',
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderBottomColor: 'transparent',
            }}></Input>
        </View>
      </View>
    </View>
  );
};

export default FilterPrice;
