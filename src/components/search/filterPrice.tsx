import {Input} from '@rneui/base';
import {useState} from 'react';
import {Text, View} from 'react-native';

const FilterPrice = ({minimum, setMinimum, maximum, setMaximum}: any) => {
  return (
    <View>
      <View>
        <Text
          style={{
            color: '#4E4750',
            fontWeight: 'bold',
            fontSize: 20,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Preços
        </Text>
      </View>
      <View style={{justifyContent: 'center', flexDirection: 'row'}}>
        <View style={{width: '50%'}}>
          <Text style={{color: '#23052C', fontSize: 18, margin: 10}}>
            Mínimo
          </Text>
          <Input
            placeholder="R$ "
            keyboardType="numeric"
            value={minimum}
            onChangeText={e => setMinimum(e)}
            inputContainerStyle={{
              backgroundColor: `#F6F3F6`,
              borderRadius: 12,
              shadowColor: '#000',
              shadowOffset: {width: 10, height: 6},
              shadowOpacity: 0.35,
              shadowRadius: 20,

              elevation: 5,
              width: '90%',
              paddingHorizontal: 15,
              paddingVertical: 5,
              borderBottomColor: 'transparent',
            }}></Input>
        </View>

        <View style={{width: '48%'}}>
          <Text style={{color: '#23052C', fontSize: 18, margin: 10}}>
            Máximo
          </Text>
          <Input
            placeholder="R$"
            keyboardType="numeric"
            value={maximum}
            onChangeText={e => setMaximum(e)}
            inputContainerStyle={{
              backgroundColor: `#F6F3F6`,
              borderRadius: 12,
              shadowColor: '#000',
              elevation: 5,
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
