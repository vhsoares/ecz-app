import {ScrollView, View} from 'react-native';
import HeaderEco from '../header/headerEco';
import SearchBar from '../search/search';

const Layout = (props: any) => (
  <ScrollView contentContainerStyle={{flexGrow: 1}}>
    <HeaderEco />
    <SearchBar />
    <View style={{flexGrow: 1, paddingBottom: 50}}>{props.children}</View>
  </ScrollView>
);

export default Layout;
