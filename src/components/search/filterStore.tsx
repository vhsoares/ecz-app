import {Text, View, Image} from 'react-native';

type FilterStoreProps = {
  stores: Array<any>;
};

const FilterStore = ({stores}: FilterStoreProps) => {
  return (
    <View>
      <Text
        style={{
          color: '#4E4750',
          fontWeight: 'bold',
          fontSize: 20,
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        Lojas
      </Text>
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        {stores.map(store => {
          return (
            <View
              style={{
                marginHorizontal: 10,
                marginVertical: 10,
                justifyContent: 'center',
                width: 55,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 50,
                  height: 50,
                  backgroundColor: '#fff',
                  borderRadius: 50,
                  flex: 1,
                  marginRight: 0,
                  margin: 5,
                }}>
                <Image
                  source={{uri: 'https://economizei.com/api/' + store.image}}
                  style={{width: '90%', height: '90%'}}
                  resizeMode={'contain'}
                />
              </View>
              <Text
                numberOfLines={1}
                style={{textAlign: 'center', color: '#A69CA9', fontSize: 12}}>
                {store.name}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default FilterStore;
