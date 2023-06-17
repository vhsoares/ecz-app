import {ScrollView, StatusBar, View, useColorScheme} from 'react-native';
import HeaderEco from '../header/headerEco';
import {SafeAreaView} from 'react-native-safe-area-context';
import Menu from '../menu/menu';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Layout = (props: any) => {
  const isDarkMode = useColorScheme() === 'dark';

  const styles = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
    marginBottom: 0,
  };

  const menuHeight = 90;

  return (
    <>
      <SafeAreaView style={styles}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={styles.backgroundColor}
        />
        <ScrollView
          onScroll={props?.handleScroll || null}
          scrollEventThrottle={16}
          contentContainerStyle={{flexGrow: 1}}>
          <HeaderEco />
          <View style={{flexGrow: 1, paddingBottom: menuHeight}}>
            {props.children}
          </View>
        </ScrollView>
      </SafeAreaView>
      {!props?.hideMenu ? <Menu menuHeight={menuHeight} /> : null}
    </>
  );
};

export default Layout;
