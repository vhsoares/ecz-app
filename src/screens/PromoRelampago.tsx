import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Layout from '../components/layout/layout';
import ProductCard from '../components/product-card/productCard';
import {getProduct, getProducts, getPromoRelampago} from '../services/get';
import LinearGradient from 'react-native-linear-gradient';
import {fontFamily} from '../styles/font';
import {MaterialIcon} from '../components/icon/icon';
import Counter from '../components/counter/counter';
import LoadingComponent from '../components/loading/loading';

const PromoRelampago = () => {
  const [products, setProducts] = useState([] as Array<any>);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getInfo = async () => {
      try {
        setProducts([]);
        const result = await getPromoRelampago();
        setProducts(result.data.products);
      } finally {
        setLoading(false);
      }
    };

    getInfo();
  }, []);

  return (
    <Layout>
      <>
        <LinearGradient
          style={{
            width: '100%',
            height: 'auto',
            alignItems: 'center',
            paddingTop: 10,
            paddingBottom: 20,
            gap: 7,
            marginBottom: 22,
          }}
          colors={['#7135B1', '#CA4EE2']}
          start={{x: 1, y: 1}}
          end={{x: 0, y: 1}}>
          <Text
            style={{
              color: 'white',
              fontFamily,
              fontWeight: '600',
              fontSize: 23,
              flexDirection: 'row',
              gap: 0,
            }}>
            Promos Re
            <View style={{maxWidth: 20, width: 20}}>
              <MaterialIcon
                name="flash"
                size="extraLarge"
                color="white"
                style={{
                  margin: 0,
                  transform: [{rotate: '10deg'}],
                  left: -5,
                  top: 5,
                }}
              />
            </View>
            âmpago
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily,
              fontWeight: '600',
              fontSize: 14,
            }}>
            Corre! Aproveita que acaba rápido!
          </Text>
        </LinearGradient>
      </>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          {products.length < 1 ? (
            <Text
              style={{
                marginVertical: 50,
                marginHorizontal: 55,
                fontSize: 18,
                color: '#A69CA9',
                textAlign: 'center',
              }}>
              Nenhum produto na promoção relâmpago atualmente.
            </Text>
          ) : (
            <>
              <Counter />
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
                        layout={'promo'}
                      />
                    );
                  })}
                </View>
              </View>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default PromoRelampago;
