import {Text} from '@rneui/base';
import {Image, View} from 'react-native';
import TagView from './tagView';

type ProductCardProps = {
  title: string;
  priceFrom: string;
  price: string;
  image: string;
  isSemJuros?: boolean;
  isFreteGratis?: boolean;
  isConsumersWeek?: boolean;
  isCorre?: boolean;
};

const ProductCard = ({
  title,
  priceFrom,
  price,
  image,
  isSemJuros = false,
  isFreteGratis = false,
  isConsumersWeek = false,
  isCorre = false,
}: ProductCardProps) => {
  return (
    <View
      style={{
        width: '45%',
        paddingTop: 10,
      }}>
      <View
        style={{
          borderRadius: 15,
          margin: 'auto',
          backgroundColor: '#fefefe',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <View
          style={{
            alignContent: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          <View
            style={{
              width: '85%',
              marginLeft: '7.5%',
              marginTop: '5%',
              marginBottom: '5%',
              display: 'flex',
              justifyContent: 'center',
              position: 'relative',
            }}>
            <Image
              source={{uri: 'https://economizei.com/api/' + image}}
              style={{maxWidth: '100%', height: 130}}
            />
          </View>
          <View style={{margin: '5%', width: '90%', flexDirection: 'column'}}>
            <Text
              numberOfLines={1}
              style={{
                color: '#1D1D1D',
                fontSize: 14,
                fontWeight: '500',
                lineHeight: 20,
                marginBottom: 4,
              }}>
              {title}
            </Text>
            <Text
              style={{
                color: '#A69CA9',
                textDecorationLine: 'line-through',
                fontSize: 13,
                width: '100%',
              }}>
              {priceFrom != '0.00' ? <>De {priceFrom}</> : <> </>}
            </Text>
            <Text
              style={{
                color: '#8612A7',
                fontSize: 20,
                fontWeight: 'bold',
                lineHeight: 35,
              }}>
              R$ {price}
            </Text>
            <View style={{flexDirection: 'row'}}>
              {isSemJuros && <TagView name="Sem juros" />}
              {isCorre && <TagView name="Corre" />}
              {isFreteGratis && <TagView name="Frete grátis" />}
              {isConsumersWeek && <TagView name="Semana do Consumidor" />}
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;
