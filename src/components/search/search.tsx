import {Button, Icon, Input} from '@rneui/base';
import React from 'react';
import {Image, View} from 'react-native';
import SearchModal from './searchModal';

const SearchBar = () => {
  return (
    <View>
      <View
        style={{
          padding: 0,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignContent: 'center',
          margin: 15,
          // alignItems: 'center',
          width: '90%',
        }}>
        <Input
          placeholder="O que você procura?"
          inputContainerStyle={{
            backgroundColor: `#F6F3F6`,
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: {width: 10, height: 6},
            shadowOpacity: 0.35,
            shadowRadius: 20,
            width: '90%',
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderBottomColor: 'transparent',
          }}
          rightIcon={
            <Image
              source={require('../../assets/images/Search.png')}
              style={{width: 20, height: 20}}
            />
          }></Input>
        <View
          style={{
            shadowColor: '#000',
            shadowOffset: {width: 10, height: 6},
            shadowOpacity: 0.35,
            shadowRadius: 20,
            width: '20%',
          }}>
          <Button
            buttonStyle={{
              backgroundColor: '#F6F3F6',
              borderRadius: 12,
              width: 60,
              height: 60,
            }}>
            <Image
              source={require('../../assets/images/Filter.png')}
              style={{width: 22, height: 12}}
            />
          </Button>
        </View>
      </View>

      <SearchModal />
    </View>
  );
};

export default SearchBar;
