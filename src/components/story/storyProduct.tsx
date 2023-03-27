import { Button } from '@rneui/base';
import {View, Image, Text} from 'react-native';

type StoryProductProps = {
  image: string;
  name: string;
  priceFrom: string;
  price: string;
  shareLink: string;
};

const StoryProduct = ({
  image,
  name,
  priceFrom,
  price,
  shareLink,
}: StoryProductProps) => {



  return (
    <View style={{justifyContent: 'space-between', marginHorizontal: 15}}>
      <View
        style={{
          justifyContent: 'center',
          flexDirection: 'row',
          marginVertical: 30,
        }}>
        <Image
          source={{uri: 'https://economizei.com/api/' + image}}
          style={{width: 200, height: 300, margin: 'auto'}}
        />
      </View>
      <Text
        style={{
          color: '#23052C',
          fontSize: 18,
          fontWeight: 'bold',
          lineHeight: 26,
        }}>
        {name}
      </Text>
      <Text style={{color: '#A69CA9', fontSize: 16, textDecorationLine: 'line-through', marginVertical: 10, fontWeight: '300'}}>De R$ {priceFrom}</Text>
      <Text style={{color: '#8612A7', fontWeight: 'bold', fontSize: 30}}>R$ {price}</Text>
      <Button buttonStyle={{borderRadius: 10, backgroundColor: '#8612A7', marginTop: 15, paddingVertical: 13}} >
        Ver na Loja
      </Button>
    </View>
  );
};

export default StoryProduct;
