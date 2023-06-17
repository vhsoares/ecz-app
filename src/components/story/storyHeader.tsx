import React, {useEffect, useState} from 'react';
import {Button, Text} from '@rneui/base';
import {Image, View, StyleSheet} from 'react-native';

import {apiUrl} from '../../utils/api';

type StoryHeaderProps = {
  storeImage: string;
  storeName: string;
  productAmount: number;
  activeProduct: number;
  onClose: any;
};

const StoryHeader = ({
  storeImage,
  storeName,
  productAmount,
  activeProduct,
  onClose,
}: StoryHeaderProps) => {
  const [progressWidth, setProgressWidth] = useState(0);

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number;

    setProgressWidth(0);

    const animateProgress = (timestamp: number) => {
      if (!startTime) {
        startTime = timestamp;
      }
      const progress = timestamp - startTime;

      if (progress >= 4000) {
        setProgressWidth(100);
        return;
      }

      setProgressWidth((progress / 4000) * 100);

      animationFrameId = requestAnimationFrame(animateProgress);
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activeProduct]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.storeInfo}>
          <View style={styles.storeImageContainer}>
            <Image
              source={{
                uri: apiUrl + storeImage,
                width: 45,
              }}
              style={styles.storeImage}
            />
          </View>
          <Text style={styles.storeName}>{storeName}</Text>
        </View>
        <Button
          onPress={onClose}
          buttonStyle={{
            ...styles.closeButton,
          }}>
          <Image
            source={require('../../assets/images/Close.png')}
            style={styles.closeIcon}
          />
        </Button>
      </View>

      <View style={styles.progressBarContainer}>
        {Array.from(Array(productAmount), (_, index) => (
          <View
            key={index}
            style={[
              styles.progressBar,
              activeProduct > index ? styles.progressBarActive : null,
            ]}>
            {index === activeProduct && (
              <View
                style={[styles.progressBarFill, {width: `${progressWidth}%`}]}
              />
            )}
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  storeInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  storeImageContainer: {
    borderRadius: 100,
    overflow: 'hidden',
    borderColor: '#CCC',
    borderStyle: 'solid',
    borderWidth: 1,
  },
  storeImage: {
    maxWidth: '80%',
    height: 45,
    minWidth: 45,
  },
  storeName: {
    paddingLeft: 10,
    lineHeight: 45,
    fontWeight: 'bold',
  },
  closeButton: {
    marginLeft: 'auto',
    backgroundColor: 'transparent',
    height: 45,
    paddingHorizontal: 0,
    marginRight: 0,
  },
  closeIcon: {
    height: 15,
    minWidth: 15,
    backgroundColor: 'transparent',
  },
  progressBarContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  progressBar: {
    backgroundColor: '#CCC0CF',
    flex: 1,
    height: 2,
    margin: 4,
    position: 'relative',
  },
  progressBarActive: {
    backgroundColor: '#8612A7',
  },
  progressBarFill: {
    backgroundColor: '#8612A7',
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
});

export default StoryHeader;
