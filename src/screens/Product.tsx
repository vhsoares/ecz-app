import {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {getProduct} from '../services/get';
import {Button, Text} from '@rneui/base';
import MenuButton from '../components/menu/menuButton';
import Layout from '../components/layout/layout';
import {Linking} from 'react-native';
import {fontFamily} from '../styles/font';
import {TextInput} from 'react-native-gesture-handler';
import {MaterialIcon} from '../components/icon/icon';
import {doComment} from '../services/post';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../utils/api';
import {getUser} from '../utils/AuthToken';
import {useRoute} from '@react-navigation/native';

const ProductScreen = ({route = {}, navigation}: any) => {
  const [product, setProduct]: any = useState();
  const [user, setUser] = useState({} as any);
  const {id} = route.params || {};
  const {name: routeName} = useRoute();
  const [commentInput, setCommentInput] = useState('');
  const commentInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const handleGetProduct = async () => {
      const result = await getProduct(id);
      const _user = await getUser();

      if (_user?.id) {
        setUser(_user);
      }
      setProduct(result.data.product);
    };
    handleGetProduct();
  }, [id, route, routeName]);

  const handleChange = (text: string) => {
    setCommentInput(text);
  };

  const handleComment = async () => {
    try {
      const newComment = commentInput;
      const result = await doComment(newComment, product?.id);

      if (result?.status === 201) {
        setCommentInput('');
        setProduct({...product, comments: [...product.comments, result.data]});
        navigation.navigate('Product', {id: product.id});
      }
    } catch (e: any) {
      console.log(e, 'Not able to send comment');

      if (e?.response?.status === 401) {
        await Promise.all([
          AsyncStorage.removeItem('token'),
          AsyncStorage.removeItem('user'),
        ]);

        navigation.navigate('Login');
      }
    }
  };

  return (
    product?.id && (
      <Layout>
        <View style={{paddingTop: 20}}>
          <View
            style={{
              width: '100%',
              height: 275,
              alignItems: 'center',
              backgroundColor: 'white',
              justifyContent: 'center',
            }}>
            <Image
              source={{uri: apiUrl + product?.image}}
              style={{
                resizeMode: 'contain',
                width: '80%',
                height: '80%',
              }}
            />
          </View>
          <View style={{padding: 20}}>
            <Text
              style={{
                color: '#23052C',
                fontSize: 21,
                lineHeight: 21,
                marginBottom: 5,
              }}>
              {product?.name}
            </Text>
            <Text
              style={{
                textDecorationLine: 'line-through',
                color: '#A69CA9',
                fontSize: 14,
                lineHeight: 20,
              }}>
              De R${product?.previousPrice}
            </Text>
            <Text
              style={{
                color: '#8612A7',
                fontSize: 24,
                fontWeight: 'bold',
                lineHeight: 30,
                marginBottom: 15,
              }}>
              R$ {product?.price}
            </Text>
            <Button
              buttonStyle={{
                backgroundColor: '#8612A7',
                borderRadius: 12,
                paddingVertical: 14,
              }}
              titleStyle={{fontWeight: 'bold', fontSize: 14}}
              onPress={() =>
                Linking.openURL(
                  'https://economizei.com/api/redireciona/produto/' +
                    product?.id,
                )
              }>
              Ver na Loja
            </Button>
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: -10,
                gap: 2,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <MenuButton
                  onPress={() => {}}
                  image={require('../assets/images/Share.png')}
                  title={'share'}
                  imageWidth={20}
                  imageHeight={20}
                  linearGradient={{
                    colors: ['#E8E8E8', '#FFFFFF'],
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 1.5},
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: -10,
                }}>
                <MenuButton
                  onPress={() => {
                    // Focus on the comment input
                    commentInputRef?.current?.focus();
                  }}
                  image={require('../assets/images/Chat.png')}
                  title={'share'}
                  imageWidth={20}
                  imageHeight={20}
                  linearGradient={{
                    colors: ['#E8E8E8', '#FFFFFF'],
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 1.5},
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: 'auto',
                }}>
                <Text
                  style={{
                    lineHeight: 74,
                  }}>
                  {product?.clickCount}
                </Text>
                <MenuButton
                  onPress={() => {}}
                  image={require('../assets/images/icon-love.png')}
                  imageWidth={20}
                  imageHeight={17.5}
                  title={'like'}
                  linearGradient={{
                    colors: ['#E8E8E8', '#FFFFFF'],
                    start: {x: 0, y: 0.5},
                    end: {x: 1, y: 1.5},
                  }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingVertical: 15,
                  color: '#23052C',
                }}>
                Descrição do Produto
              </Text>
              <Text style={{color: '#4E4750', fontFamily, fontWeight: '500'}}>
                {product?.description}
              </Text>
            </View>
            <View
              style={{
                borderTopColor: '#F4E8F8',
                borderTopWidth: 1,
                marginTop: 25,
                maxWidth: '100%',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  paddingTop: 25,
                  paddingBottom: 15,
                  color: '#23052C',
                }}>
                Comentários ({product?.comments?.length})
              </Text>

              <View style={styles.container}>
                <View
                  style={{
                    ...styles.image,
                    backgroundColor: user?.picture ? 'transparent' : '#8612A7',
                  }}>
                  {user?.picture ? (
                    <Image
                      source={{uri: `${apiUrl}${user.picture}`}}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                      }}
                    />
                  ) : (
                    <MaterialIcon name="account" size="large" color="#F1F1F1" />
                  )}
                </View>
                <View
                  style={{
                    ...styles.inputContainer,
                  }}>
                  <TextInput
                    ref={commentInputRef}
                    value={commentInput}
                    style={styles.input}
                    onChangeText={handleChange}
                    placeholder="Escreva um comentário..."
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    style={{
                      ...styles.icon,
                      opacity: !commentInput?.length ? 0.5 : 1,
                    }}
                    onPress={handleComment}
                    disabled={!commentInput?.length}>
                    <MaterialIcon
                      name="chevron-right"
                      size="extraLarge"
                      color="#A69CA9"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {product?.comments?.length ? (
                <View>
                  {product?.comments
                    ?.sort(
                      (a: any, b: any) =>
                        new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .map((comment: any, index: any) => (
                      <View
                        key={index}
                        style={{
                          borderBottomColor: '#F4E8F8',
                          borderBottomWidth: 1,
                          marginVertical: 10,
                          flexDirection: 'row',
                          gap: 20,
                          paddingVertical: 15,
                        }}>
                        <View
                          style={{
                            ...styles.image,
                            backgroundColor: comment?.user?.picture
                              ? 'transparent'
                              : '#8612A7',
                          }}>
                          {comment?.user?.picture ? (
                            <Image
                              source={{uri: `${apiUrl}${comment.user.picture}`}}
                              style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25,
                              }}
                            />
                          ) : (
                            <MaterialIcon
                              name="account"
                              size="large"
                              color="#F1F1F1"
                            />
                          )}
                        </View>
                        <View
                          style={{
                            width: '80%',
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              width: '100%',
                              justifyContent: 'space-between',
                            }}>
                            {comment?.user?.name ? (
                              <Text
                                style={{
                                  fontSize: 13,
                                  color: '#23052C',
                                  paddingBottom: 8,
                                  fontFamily,
                                  fontWeight: '700',
                                }}>
                                {comment?.user?.name}
                              </Text>
                            ) : null}
                            <Text
                              style={{
                                color: '#A69CA9',
                                fontFamily,
                                fontSize: 13,
                              }}>
                              {new Date(comment?.createdAt).toLocaleDateString(
                                'pt-BR',
                              )}
                            </Text>
                          </View>
                          <Text
                            style={{
                              color: '#23052C',
                              fontFamily,
                              fontWeight: '600',
                              maxWidth: '100%',
                              width: '100%',
                              fontSize: 16,
                              marginBottom: 10,
                            }}>
                            {comment.content}
                          </Text>
                        </View>
                      </View>
                    ))}
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </Layout>
    )
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F3F6',
    width: '100%',
    gap: 16,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '100%',
    marginBottom: 25,
    paddingTop: 10,
  },
  image: {
    backgroundColor: '#8612A7',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  inputContainer: {
    backgroundColor: '#F6F3F7',
    shadowColor: '#45254E',
    shadowOffset: {
      width: -4,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 8,
    position: 'relative', // Added
    maxWidth: '80%',
    flexGrow: 1,
  },
  input: {
    height: 56,
    fontFamily,
    fontWeight: '400',
    color: '#23052C',
    backgroundColor: '#F6F3F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingRight: 55,
  },
  icon: {
    position: 'absolute',
    right: 12,
    top: 12,
  },
});

export default ProductScreen;
