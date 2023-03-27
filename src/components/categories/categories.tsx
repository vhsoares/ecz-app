import {View} from 'react-native';
import {Button} from '@rneui/base';

export type Category = {
  name: string;
  id: string;
};

export type CategoriesProps = {
  categories: Array<Category>;
};

const Categories = ({categories}: CategoriesProps) => {
  return (
    <View
      style={{flexDirection: 'row', justifyContent: 'center', width: '100%'}}>
      {categories.map((category, index) => {
        return (
          <View key={category.id}>
            {index < 4 && (
              <View
                style={{
                  marginVertical: 30,
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
                      marginHorizontal: 5,
                    }}
                    titleStyle={{color: '#A69CA9', fontSize: 15}}>
                    {category.name}
                  </Button>
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
};

export default Categories;
