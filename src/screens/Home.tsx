import {Text, View} from 'react-native';
import Categories, { Category } from '../components/categories/categories';
import ProductCard from '../components/product-card/productCard';
import { useState, useEffect } from 'react';
import { getProducts } from '../services/get';

const HomeScreen = () => {
  const [products, setProducts] = useState([] as Array<any>);
  const [categories, setCategories] = useState([] as Array<Category>);

  useEffect(() => {
    const getAll = async () => {
      const result = await getProducts();
      setProducts(result.data.products);
      setCategories(result.data.categories);
    };
    getAll();
  }, []);

  return (
    <View>
      <Categories categories={categories} />
      <Text>

        {JSON.stringify(products)}
      </Text>
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
        }}>
        {products.map((product, index) => {
          return (
            <ProductCard
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
  );
};

export default HomeScreen
