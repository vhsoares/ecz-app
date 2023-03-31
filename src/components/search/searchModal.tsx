import {Text} from '@rneui/base';
import {useState} from 'react';
import {View} from 'react-native';
import FilterPrice from './filterPrice';
import FilterStore from './filterStore';

type SearchModalProps = {
  stores?: Array<any>;
};

const SearchModal = ({stores}: SearchModalProps) => {
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
      <FilterStore stores={stores ?? []} />
    </View>
  );
};

export default SearchModal;
