import {Button} from '@rneui/base';
import {View, Image, Text, Dimensions} from 'react-native';
import {
  GestureDetector,
  Gesture,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {Linking} from 'react-native';
import {useState} from 'react';

const SCREEN_WIDTH = Dimensions.get('screen').width;

type StoryProductProps = {
  image: string;
  name: string;
  priceFrom: string;
  price: string;
  shareLink: string;
  handleClick: any;
};

const StoryProduct = ({
  image,
  name,
  priceFrom,
  price,
  shareLink,
  handleClick,
}: StoryProductProps) => {
  const [transform, setTransform] = useState(0);
  const dragGesture = Gesture.Pan()
    .onUpdate((evt: PanGestureHandlerEventPayload) => {
      // const {x, y} = evt;
      setTransform(evt.translationX * 0.2);
    })
    .onEnd((evt: any) => {
      handleClick(evt.velocityX > 0 ? 'prev' : 'next');
      setTransform(0);
    });

  const tapGesture = Gesture.Tap().onEnd((evt: any) => {
    handleClick(evt.x > SCREEN_WIDTH / 2 ? 'next' : 'prev');
  });

  const composed = Gesture.Race(dragGesture, tapGesture);

  return (
    <GestureDetector gesture={composed}>
      <View
        style={{
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          transform: [
            {
              translateX: transform,
            },
          ],
        }}>
        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginVertical: 30,
          }}>
          <Image
            source={{uri: 'https://economizei.com/api/' + image}}
            style={{width: '100%', height: 300, margin: 'auto'}}
            resizeMode="contain"
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
        <Text
          style={{
            color: '#A69CA9',
            fontSize: 16,
            textDecorationLine: 'line-through',
            marginVertical: 10,
            fontWeight: '300',
          }}>
          De R$ {priceFrom}
        </Text>
        <Text style={{color: '#8612A7', fontWeight: 'bold', fontSize: 30}}>
          R$ {price}
        </Text>

        <Button
          buttonStyle={{
            borderRadius: 10,
            backgroundColor: '#8612A7',
            marginTop: 15,
            paddingVertical: 13,
            height: 44,
            justifyContent: 'flex-start',
          }}
          onPress={() => Linking.openURL(shareLink)}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: 'bold',
              color: 'white',
            }}>
            Ver na Loja
          </Text>
        </Button>
      </View>
    </GestureDetector>
  );
};

export default StoryProduct;
