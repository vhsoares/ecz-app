import {useEffect, useState} from 'react';
import {getCategory, getProduct, getProducts} from '../services/get';
import {Text, View} from 'react-native';
import ProductCard from '../components/product-card/productCard';
import Layout from '../components/layout/layout';
import SearchBar from '../components/search/search';

const Category = ({route = {}}: any) => {
  const [products, setProducts] = useState([] as Array<any>);
  const [category, setCategory] = useState({} as any);
  const [stores, setStores] = useState([] as Array<any>);

  const {id} = route.params || {};

  useEffect(() => {
    const getInfo = async (id: string) => {
      const result = await getCategory(id);
      setProducts(result.data.products);
      setStores(result.data.stores);
      setCategory(result.data.category);
    };

    getInfo(id);
  }, [id]);

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
          {category.name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: '#A69CA9',
            fontWeight: '400',
            marginLeft: '5%',
          }}>
          {category.description}
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

          {products.length < 1 && <Text style={{marginVertical: 200, fontSize: 18, color: '#A69CA9', textAlign: 'center'}}>Não foram encontrados produtos nessa categoria</Text>}
        </View>
      </View>
    </Layout>
  );
};

export default Category;
