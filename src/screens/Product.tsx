import {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {getProduct} from '../services/get';
import {Button, Text} from '@rneui/base';
import MenuButton from '../components/menu/menuButton';

const ProductScreen = () => {
  const [product, setProduct]: any = useState();

  useEffect(() => {
    const getProducto = async () => {
      const result = await getProduct('0752342a-d108-4d72-b518-6ddf1ab79633');
      setProduct(result.data.product);
    };
    getProducto();
  }, []);
  return (
    <View>
      <View style={{paddingTop: 20}}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            backgroundColor: '#ffffff',
            width: '100%',
            paddingVertical: 10,
          }}>
          <Image
            source={{uri: 'https://economizei.com/api/' + product?.image}}
            style={{maxWidth: '80%', height: 275, minWidth: 250}}
          />
        </View>
        <View style={{padding: 20}}>
          <Text
            style={{
              color: '#23052C',
              fontSize: 21,
              lineHeight: 21,
              marginBottom: 5,
            }}>
            {product?.name}
          </Text>
          <Text
            style={{
              textDecorationLine: 'line-through',
              color: '#A69CA9',
              fontSize: 14,
              lineHeight: 20,
            }}>
            De R${product?.previousPrice}
          </Text>
          <Text
            style={{
              color: '#8612A7',
              fontSize: 24,
              fontWeight: 'bold',
              lineHeight: 30,
              marginBottom: 15,
            }}>
            R$ {product?.price}
          </Text>
          <Button
            buttonStyle={{
              backgroundColor: '#8612A7',
              borderRadius: 12,
              paddingVertical: 14,
            }}
            titleStyle={{fontWeight: 'bold', fontSize: 14}}>
            Ver na Loja
          </Button>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: -10,
              justifyContent: 'space-between',
            }}>
            <MenuButton
              onPress={() => {}}
              image={require('../assets/images/Share.png')}
              title={'share'}
              imageWidth={20}
              imageHeight={20}
              linearGradient={{
                colors: ['#E8E8E8', '#FFFFFF'],
                start: {x: 0, y: 0.5},
                end: {x: 1, y: 1.5},
              }}
            />

            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  lineHeight: 74,
                }}>
                {product?.clickCount}
              </Text>
              <MenuButton
                onPress={() => {}}
                image={require('../assets/images/Love.png')}
                imageWidth={20}
                imageHeight={17.5}
                title={'like'}
                linearGradient={{
                  colors: ['#E8E8E8', '#FFFFFF'],
                  start: {x: 0, y: 0.5},
                  end: {x: 1, y: 1.5},
                }}
              />
            </View>
            {/* icon button
          save love */}
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 16,
                paddingVertical: 15,
                color: '#23052C',
              }}>
              Descrição do Produto
            </Text>
            <Text style={{color: '#4E4750'}}>{product?.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductScreen;