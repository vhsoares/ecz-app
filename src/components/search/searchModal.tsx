import {Text} from '@rneui/base';
import {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import FilterPrice from './filterPrice';
import FilterStore from './filterStore';
import OrderBy from './orderBy';

import * as RootNavigaton from '../../utils/RootNavigation';

type SearchModalProps = {
  stores?: Array<any>;
};

const SearchModal = ({stores}: SearchModalProps) => {
  const [orderBy, setOrderBy] = useState('time-desc');
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(0);
  const [selectedStoreList, setSelectedStoreList] = useState('');

  const doFilter = () => {
    RootNavigaton.navigate('ProductsFiltered', {
      orderBy,
      priceMin,
      priceMax,
      selectedStoreList,
    });
  };

  return (
    <View style={{paddingHorizontal: 10}}>
      <View>
        <Text
          style={{
            color: '#8612A7',
            fontWeight: 'bold',
            fontSize: 22,
            marginHorizontal: 10,
            marginBottom: 20,
          }}>
          Filtro
        </Text>
      </View>
      <OrderBy
        orderedBy={orderBy}
        setOrderedBy={(value: string) => setOrderBy(value)}
      />
      <FilterPrice
        minimum={priceMin}
        maximum={priceMax}
        setMinimum={setPriceMin}
        setMaximum={setPriceMax}
      />
      <FilterStore
        stores={stores ?? []}
        selectedStore={selectedStoreList}
        setSelectedStore={setSelectedStoreList}
      />
      <TouchableOpacity
        style={{
          margin: 10,
          backgroundColor: '#8612A7',
          padding: 15,
          borderRadius: 15,
        }}
        onPress={() => doFilter()}>
        <Text
          style={{color: '#F4E8F8', fontWeight: 'bold', textAlign: 'center'}}>
          Aplicar Filtro
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchModal;
