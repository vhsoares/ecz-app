import {Button, Text} from '@rneui/base';
import {Image, View} from 'react-native';

type StoryHeaderProps = {
  storeImage: string;
  storeName: string;
  productAmount: number;
  activeProduct: number;
  onClose: any;
};

const StoryHeader = ({
  storeImage,
  storeName,
  productAmount,
  activeProduct,
  onClose,
}: StoryHeaderProps) => {
  const storyAmout = new Array(productAmount).fill(0);

  return (
    <View>
      <View
        style={{
          paddingHorizontal: 10,
          justifyContent: 'space-between',
          flexDirection: 'row',
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
          <View
            style={{
              borderRadius: 100,
              overflow: 'hidden',
              borderColor: '#CCC',
              borderStyle: 'solid',
              borderWidth: 1,
            }}>
            <Image
              source={{
                uri: 'https://economizei.com/api/' + storeImage,
                width: 45,
              }}
              resizeMode={'contain'}
              style={{maxWidth: '80%', height: 45, minWidth: 45}}
            />
          </View>
          <Text style={{paddingLeft: 10, lineHeight: 45, fontWeight: 'bold'}}>
            {storeName}
          </Text>
        </View>
        <View>
          <Button
            style={{marginLeft: 'auto', marginRight: 0}}
            buttonStyle={{
              backgroundColor: 'transparent',
              height: 45,
              paddingHorizontal: 0,
            }}
            onPress={onClose}>
            <Image
              source={require('../../assets/images/Close.png')}
              style={{height: 15, minWidth: 15}}
            />
          </Button>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          paddingHorizontal: 5,
        }}>
        {storyAmout.map((element, index) => {
          if (index < activeProduct) {
            return (
              <View
                style={{
                  backgroundColor: '#8612A7',
                  flex: 1,
                  height: 2,
                  margin: 4,
                }}
                key={index}>
                <Text>{element}</Text>
              </View>
            );
          } else {
            return (
              <View
                style={{
                  backgroundColor: '#CCC0CF',
                  flex: 1,
                  height: 2,
                  margin: 4,
                }}
                key={index}>
                <Text>{element}</Text>
              </View>
            );
          }
        })}
      </View>
    </View>
  );
};

export default StoryHeader;
