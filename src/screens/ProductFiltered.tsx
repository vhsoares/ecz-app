import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import SearchBar from '../components/search/search';
import Layout from '../components/layout/layout';
import ProductCard from '../components/product-card/productCard';
import {getFiltered} from '../services/get';

const ProductFiltered = ({route = {}}: any) => {
  const [products, setProducts] = useState([] as Array<any>);

  const {orderBy, priceMin, priceMax, selectedStoreList} = route.params || {};

  useEffect(() => {
    const getInfo = async () => {
      const result = await getFiltered(
        orderBy,
        priceMin,
        priceMax,
        selectedStoreList,
      );
      setProducts(result.data.products);
    };

    getInfo();
  }, []);

  return (
    <Layout>
      <SearchBar />
      <View>
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
                marginHorizontal: 55,
                fontSize: 18,
                color: '#A69CA9',
                textAlign: 'center',
              }}>
              Não foram encontrados produtos para este filtro
            </Text>
          )}
        </View>
      </View>
    </Layout>
  );
};

export default ProductFiltered;
