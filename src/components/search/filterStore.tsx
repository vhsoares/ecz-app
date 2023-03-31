import {useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';

type FilterStoreProps = {
  stores: Array<any>;
  selectedStore: string;
  setSelectedStore: Function;
};

const StoreIcon = ({
  image,
  name,
  id,
  selectedStoreId,
  setSelectedStore,
}: any) => {
  return (
    <>
      {selectedStoreId != id && (
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            justifyContent: 'center',
            width: 55,
          }}
          onPress={() => setSelectedStore(id)}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              backgroundColor: '#fff',
              overflow: 'hidden',
              borderRadius: 50,
              flex: 1,
              marginRight: 0,
              margin: 5,
            }}>
            <Image
              source={{uri: 'https://economizei.com/api/' + image}}
              style={{width: '90%', height: '90%'}}
              resizeMode={'contain'}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{textAlign: 'center', color: '#A69CA9', fontSize: 12}}>
            {name}
          </Text>
        </TouchableOpacity>
      )}

      {selectedStoreId == id && (
        <TouchableOpacity
          style={{
            marginHorizontal: 10,
            marginVertical: 10,
            justifyContent: 'center',
            width: 55,
          }}
          onPress={() => setSelectedStore('')}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 50,
              height: 50,
              backgroundColor: '#fef',
              borderColor: '#8612A7',
              borderWidth: 2,
              borderRadius: 50,
              flex: 1,
              marginRight: 0,
              margin: 5,
              overflow: 'hidden',
            }}>
            <Image
              source={{uri: 'https://economizei.com/api/' + image}}
              style={{width: '90%', height: '90%'}}
              resizeMode={'contain'}
            />
          </View>
          <Text
            numberOfLines={1}
            style={{textAlign: 'center', color: '#A69CA9', fontSize: 12}}>
            {name}
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const FilterStore = ({
  stores,
  selectedStore,
  setSelectedStore,
}: FilterStoreProps) => {
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
            <StoreIcon
              image={store.image}
              name={store.name}
              id={store.id}
              selectedStoreId={selectedStore}
              setSelectedStore={setSelectedStore}
            />
          );
        })}
      </View>
    </View>
  );
};

export default FilterStore;
