import {View, Image, ImageSourcePropType} from 'react-native';
import {Button} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';

type MenuButtonProps = {
  onPress: any;
  image: ImageSourcePropType;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  linearGradient: {
    colors: Array<string>;
    start: {x: number; y: number};
    end: {x: number; y: number};
  };
};

const MenuButton = ({
  onPress,
  linearGradient,
  image,
  title,
  imageWidth = 25,
  imageHeight = 25,
}: MenuButtonProps) => {
  return (
    <View
      style={{
        elevation: 10,
        padding: 10,
        zIndex: 10,
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 4},
        shadowOpacity: 0.15,
        shadowRadius: 20,
      }}>
      <Button
        title={title}
        ViewComponent={LinearGradient}
        buttonStyle={{
          width: 50,
          height: 50,
          borderRadius: 13,
          margin: 0,
          position: 'relative',
        }}
        linearGradientProps={linearGradient}
        onPress={onPress}>
        <Image
          source={image}
          style={{width: imageWidth, height: imageHeight}}
        />
      </Button>
    </View>
  );
};

export default MenuButton;
