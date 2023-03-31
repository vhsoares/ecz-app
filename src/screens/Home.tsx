import {Text, View} from 'react-native';
import Categories, {Category} from '../components/categories/categories';
import ProductCard from '../components/product-card/productCard';
import {useState, useEffect} from 'react';
import {getProducts} from '../services/get';
import Layout from '../components/layout/layout';
import Stories from '../components/stories/stories';
import SearchBar from '../components/search/search';
const HomeScreen = ({}) => {
  const [products, setProducts] = useState([] as Array<any>);
  const [categories, setCategories] = useState([] as Array<Category>);
  const [stores, setStores] = useState([] as Array<any>);

  useEffect(() => {
    const getAll = async () => {
      const result = await getProducts();
      setProducts(result.data.products);
      setStores(result.data.stores);
      setCategories(result.data.categories);
    };
    getAll();
  }, []);

  return (
    <Layout>
      <SearchBar />
      <View style={{flexGrow: 1}}>
        <Stories stores={stores} />
        <Categories categories={categories} />
        <Text
          style={{
            fontSize: 22,
            color: '#8612A7',
            fontWeight: '600',
            marginLeft: '5%',
          }}>
          Ofertas para você
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
        </View>
      </View>
    </Layout>
  );
};

export default HomeScreen;
