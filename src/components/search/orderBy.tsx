import {Button} from '@rneui/base';
import {Image, StyleSheet, Text, View} from 'react-native';

const OrderBy = () => {
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
        <View>
          <View style={styles.selectRadio}>
            <Image
              source={require('../../assets/images/Love.png')}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <Text style={styles.subtitle}>Padrão</Text>
        </View>
        <View>
          <View style={styles.selectedRadio}>
            <Image
              source={require('../../assets/images/Love.png')}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <Text style={styles.subtitle}>Preço</Text>
        </View>
        <View>
          <View style={styles.selectRadio}>
            <Image
              source={require('../../assets/images/Love.png')}
              resizeMode={'contain'}
              style={styles.image}
            />
          </View>
          <Text style={styles.subtitle}>Avaliações</Text>
        </View>
      </View>
    </View>
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
  },
});

export default OrderBy;
