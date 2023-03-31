import {useEffect, useState} from 'react';
import {getCategory, getProduct, getProducts, getSearch} from '../services/get';
import {Text, View} from 'react-native';
import ProductCard from '../components/product-card/productCard';
import Layout from '../components/layout/layout';
import SearchBar from '../components/search/search';

const Search = ({route = {}}: any) => {
  const [products, setProducts] = useState([] as Array<any>);
  const [category, setCategory] = useState({} as any);
  const [stores, setStores] = useState([] as Array<any>);

  const {searchParams} = route.params || {};

  useEffect(() => {
    const getInfo = async (search: string) => {
      const result = await getSearch(search);
      setProducts(result.data.products);
      setStores(result.data.stores);
      setCategory(result.data.category);
    };

    getInfo(searchParams);
  }, [searchParams]);

  return (
    <Layout>
      <SearchBar />
      <View>
        <Text
          style={{
            fontSize: 22,
            color: '#8612A7',
            fontWeight: '600',
            marginLeft: '5%',
          }}>
          Resultados da Busca
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#A69CA9',
            fontWeight: '400',
            marginLeft: '5%',
          }}>
          O termo buscado foi: {searchParams}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
            flexGrow: 1,
          }}>
          {products.map(product => {
            return (
              <ProductCard
                id={product.id}
                title={product.name}
                priceFrom={product.previousPrice}
                price={product.price}
                image={product.image}
                isConsumersWeek={product.isConsumersWeek}
                isCorre={product.isCorre}
                isSemJuros={product.isSemJuros}
                isFreteGratis={product.isFreteGratis}
                key={product.id}
              />
            );
          })}

          {products.length < 1 && (
            <Text
              style={{
                marginVertical: 200,
                fontSize: 18,
                color: '#A69CA9',
                textAlign: 'center',
              }}>
              Não encontramos nenhuma oferta para: <Text style={{fontWeight: 'bold'}}>{searchParams}</Text>
            </Text>
          )}
        </View>
      </View>
    </Layout>
  );
};

export default Search;
