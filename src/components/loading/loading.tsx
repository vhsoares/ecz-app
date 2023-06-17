import React, {useEffect, useRef} from 'react';
import {View, Animated, Easing} from 'react-native';
import {MaterialIcon} from '../icon/icon';

const LoadingComponent = () => {
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    startRotation();
  }, []);

  const startRotation = () => {
    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();
  };

  const spin = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
      }}>
      <Animated.View style={{transform: [{rotate: spin}]}}>
        <MaterialIcon name="loading" size="extraLarge" color="#8612A7" />
      </Animated.View>
    </View>
  );
};

export default LoadingComponent;
