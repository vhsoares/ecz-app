import {Button} from '@rneui/base';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const OrderBy = ({orderedBy, setOrderedBy}: any) => {
  const handlePress = (value: string) => {
    setOrderedBy(value);
  };

  return (
    <View>
      <Text
        style={{
          color: '#4E4750',
          fontWeight: 'bold',
          fontSize: 20,
          marginHorizontal: 10,
          marginVertical: 5,
        }}>
        Ordenar por
      </Text>
      <View
        style={{
          height: 100,
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <OrderButton
          value="time-desc"
          onPress={() => handlePress('time-desc')}
          label="Últimos"
          image={require('../../assets/images/Order.png')}
          orderedBy={orderedBy}
        />

        <OrderButton
          value="price-desc"
          orderedBy={orderedBy}
          image={require('../../assets/images/Money.png')}
          onPress={() => handlePress('price-desc')}
          label="Mais Valiosos"
        />

        <OrderButton
          value="price-asc"
          orderedBy={orderedBy}
          image={require('../../assets/images/Money.png')}
          onPress={() => handlePress('price-asc')}
          label="Mais Baratos"
        />
      </View>
    </View>
  );
};

type OrderButtonProps = {
  orderedBy: string;
  onPress: Function;
  label: string;
  value: string;
  image: string;
};

const OrderButton = ({orderedBy, onPress, label, value, image = require('../../assets/images/Order.png')}: any) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      {orderedBy == value && (
        <>
          <View style={styles.selectedRadio}>
            <Image
              source={image}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <Text style={styles.subtitle}>{label}</Text>
        </>
      )}

      {orderedBy != value && (
        <>
          <View style={styles.selectRadio}>
            <Image
              source={image}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <Text style={styles.subtitle}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selectRadio: {
    width: 80,
    height: 80,
    borderRadius: 80,
    border: 'solid',
    borderWidth: 1,
    borderColor: '#A69CA9',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  selectedRadio: {
    width: 80,
    height: 80,
    borderRadius: 80,
    border: 'solid',
    borderWidth: 1,
    borderColor: '#8612A7',
    backgroundColor: '#F4E8F8',
    justifyContent: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  subtitle: {textAlign: 'center', fontSize: 12, color: '#A69CA9', marginTop: 5},
  image: {
    width: 30,
    height: 30,
    opacity: 0.5,
  },
});

export default OrderBy;
