import {Text, TouchableOpacity, View} from 'react-native';
import {Button} from '@rneui/base';
import * as RootNavigaton from '../../utils/RootNavigation';

export type Category = {
  name: string;
  id: string;
};

export type CategoriesProps = {
  categories: Array<Category>;
};

const Categories = ({categories}: CategoriesProps) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '100%',
          paddingBottom: 4,
          paddingHorizontal: 3,
        }}>
        {categories.slice(0, 4).map((category, index) => {
          return (
            <View key={category.id}>
              <View
                style={{
                  marginTop: 30,
                  shadowColor: '#fff',
                  shadowOffset: {width: -10, height: -8},
                  shadowOpacity: 0.95,
                  shadowRadius: 20,
                }}>
                <View
                  style={{
                    shadowColor: '#45254E',
                    shadowOffset: {width: 10, height: 4},
                    shadowOpacity: 0.25,
                    shadowRadius: 20,
                  }}>
                  <Button
                    buttonStyle={{
                      backgroundColor: '#F6F3F7',
                      margin: 'auto',
                      borderRadius: 20,
                    }}
                    radius={18}
                    raised
                    titleStyle={{color: '#A69CA9', fontSize: 15}}
                    onPress={() =>
                      RootNavigaton.navigate('Category', {id: category.id})
                    }>
                    {category.name}
                  </Button>
                </View>
              </View>
            </View>
          );
        })}
      </View>
      <Text
        onPress={() => RootNavigaton.navigate('Categories')}
        style={{
          color: '#8612A7',
          fontSize: 12,
          fontWeight: 'bold',
          textAlign: 'right',
          marginTop: 10,
          marginBottom: 25,
          marginHorizontal: 25,
        }}>
        Ver todas as categorias
      </Text>
    </View>
  );
};

export default Categories;
