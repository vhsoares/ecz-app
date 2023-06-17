import {Text} from '@rneui/base';
import {Image, Linking, TouchableOpacity, View} from 'react-native';
import TagView from './tagView';
import * as RootNavigaton from '../../utils/RootNavigation';
import {fontFamily} from '../../styles/font';
import {apiUrl} from '../../utils/api';

type ProductCardProps = {
  id: string;
  title: string;
  priceFrom: string;
  price: string;
  image: string;
  isSemJuros?: boolean;
  isFreteGratis?: boolean;
  isConsumersWeek?: boolean;
  isCorre?: boolean;
  layout?: 'default' | 'promo';
};

const ProductCard = ({
  id,
  title,
  priceFrom,
  price,
  image,
  isSemJuros = false,
  isFreteGratis = false,
  isConsumersWeek = false,
  isCorre = false,
  layout = 'default',
}: ProductCardProps) => {
  const isPromo = layout === 'promo';

  return (
    <View
      style={{
        width: isPromo ? '90%' : '45%',
        paddingTop: 10,
      }}>
      <View
        style={{
          borderRadius: 15,
          margin: 'auto',
          backgroundColor: '#fefefe',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
        <TouchableOpacity
          onPress={() => RootNavigaton.navigate('Product', {id})}>
          <View
            style={
              isPromo
                ? {
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row',
                    width: '100%',
                    padding: 10,
                    gap: 12,
                    paddingVertical: 22,
                  }
                : {
                    alignContent: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    paddingVertical: 15,
                    paddingHorizontal: 10,
                  }
            }>
            <View
              style={{
                width: isPromo ? '35%' : '80%',
                height: 120,
                aspectRatio: 1 * 1.4,
                alignItems: 'center',
              }}>
              <Image
                source={{uri: apiUrl + image}}
                style={{
                  resizeMode: 'contain',
                  width: isPromo ? '100%' : '80%',
                  height: isPromo ? '100%' : '80%',
                }}
              />
            </View>
            <View
              style={
                isPromo
                  ? {
                      width: '60%',
                      maxWidth: '100%',
                      flexDirection: 'column',
                    }
                  : {
                      margin: '5%',
                      width: '90%',
                      flexDirection: 'column',
                    }
              }>
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
        </TouchableOpacity>
        {isPromo ? (
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              width: '100%',
              gap: 12,
              paddingVertical: 15,
              borderTopColor: '#F6F3F7',
              borderTopWidth: 1,
            }}
            onPress={() =>
              Linking.openURL(apiUrl + '/redireciona/produto/' + id)
            }>
            <Text
              style={{
                color: '#8612A7',
                fontFamily: fontFamily,
                fontWeight: '700',
              }}>
              Ver na Loja
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
};

export default ProductCard;
