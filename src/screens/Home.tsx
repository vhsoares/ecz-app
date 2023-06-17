import {Text, View, ScrollView, Dimensions} from 'react-native';
import Categories, {Category} from '../components/categories/categories';
import ProductCard from '../components/product-card/productCard';
import {useState, useEffect} from 'react';
import Layout from '../components/layout/layout';
import Stories from '../components/stories/stories';
import SearchBar from '../components/search/search';
import LoadingComponent from '../components/loading/loading';
import {getProducts} from '../services/get';

const HomeScreen = ({}) => {
  const [products, setProducts] = useState([] as Array<any>);
  const [categories, setCategories] = useState([] as Array<Category>);
  const [stores, setStores] = useState([] as Array<any>);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const handleScroll = (event: any) => {
    console.log('scrolling', event.nativeEvent.contentOffset.y);

    const windowHeight = Dimensions.get('window').height;
    const height = event.nativeEvent.contentSize.height;
    const offset = event.nativeEvent.contentOffset.y;

    if (windowHeight + offset >= height) {
      setShowMore(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    const getAll = async () => {
      setProducts([]);
      try {
        const result = await getProducts();
        setProducts(result.data.products);
        setStores(result.data.stores);
        setCategories(result.data.categories);
      } finally {
        setLoading(false);
      }
    };
    getAll();
  }, []);

  useEffect(() => {
    if (showMore) {
      setShowMore(false);
      setCurrentPage(prevPage => prevPage + 1);
    }
  }, [showMore]);

  return (
    <Layout handleScroll={handleScroll}>
      <SearchBar />
      <ScrollView style={{flexGrow: 1}}>
        <View>
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
            {products.slice(0, currentPage * 20).map(product => {
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
          {loading && <LoadingComponent />}
        </View>
      </ScrollView>
    </Layout>
  );
};

export default HomeScreen;
