import {ScrollView, View} from 'react-native';
import HeaderEco from '../header/headerEco';
import SearchBar from '../search/search';
import {useEffect, useState} from 'react';
import axios from 'axios';

const Layout = (props: any) => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      <HeaderEco />
      <View style={{flexGrow: 1, paddingBottom: 50}}>{props.children}</View>
    </ScrollView>
  );
};

export default Layout;
