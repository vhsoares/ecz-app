import {Image} from '@rneui/base';
import {Text, View} from 'react-native';

type FilterStoreProps = {
  stores: Array<any>;
};

const FilterStore = ({stores}: FilterStoreProps) => {
  return (
    <View>
      <Text>{JSON.stringify(stores)}</Text>
      {stores.map(store => {
        return (
          <View>
            <Image
              source={{uri: 'https://economizei.com/api/' + store.image, width:20, height:20}}
              style={{width: 50, height: 50}}
            />
            <Text>{store.name}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default FilterStore;
