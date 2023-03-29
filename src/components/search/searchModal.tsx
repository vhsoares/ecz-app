import {Text} from '@rneui/base';
import {useState} from 'react';
import {View} from 'react-native';
import FilterPrice from './filterPrice';

const SearchModal = () => {
  const [orderBy, setOrderBy] = useState();
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [selectedStoreList, setSelectedStoreList] = useState([]);

  return (
    <View>
      <View>
        <Text>Filtro</Text>
      </View>

      <FilterPrice />
    </View>
  );
};

export default SearchModal
