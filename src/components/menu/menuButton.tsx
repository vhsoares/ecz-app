import {View, Image, ImageSourcePropType} from 'react-native';
import {Button} from '@rneui/base';
import LinearGradient from 'react-native-linear-gradient';
import {MaterialIcon} from '../icon/icon';

type MenuButtonProps = {
  onPress: any;
  image?: ImageSourcePropType;
  imageWidth?: number;
  imageHeight?: number;
  title: string;
  linearGradient: {
    colors: Array<string>;
    start: {x: number; y: number};
    end: {x: number; y: number};
  };
  icon?: string;
  active?: boolean;
};

const MenuButton = ({
  onPress,
  linearGradient,
  image,
  title,
  imageWidth = 25,
  imageHeight = 25,
  active = false,
  icon,
}: MenuButtonProps) => {
  return (
    <View
      style={{
        padding: 10,
        paddingVertical: 8,
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
          elevation: 2,
          marginVertical: 2,
        }}
        linearGradientProps={linearGradient}
        onPress={onPress}>
        {icon ? (
          <MaterialIcon
            name={icon}
            size="extraLarge"
            color={active ? '#FFF' : '#A69CA9'}
          />
        ) : image ? (
          <Image
            source={image}
            style={{width: imageWidth, height: imageHeight}}
          />
        ) : null}
      </Button>
    </View>
  );
};

export default MenuButton;
