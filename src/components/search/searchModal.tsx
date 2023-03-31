import {Text} from '@rneui/base';
import {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import FilterPrice from './filterPrice';
import FilterStore from './filterStore';
import OrderBy from './orderBy';

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
        <Text
          style={{
            color: '#8612A7',
            fontWeight: 'bold',
            fontSize: 22,
            marginHorizontal: 10,
            marginBottom: 20
          }}>
          Filtro
        </Text>
      </View>
      <OrderBy />
      <FilterPrice />
      <FilterStore stores={stores ?? []} />
      <View style={{margin: 10, backgroundColor: '#8612A7', padding: 15, borderRadius: 15}}>
        <Text style={{color: '#F4E8F8', fontWeight: 'bold', textAlign: 'center'}}>Aplicar Filtro</Text>
      </View>
    </View>
  );
};

export default SearchModal;
