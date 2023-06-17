import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontFamily} from '../../styles/font';

const Counter = () => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const now = new Date();
    const tomorrow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + 1,
    );
    const timeUntilTomorrow = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(
      timeUntilTomorrow / (1000 * 60 * 60),
    ).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const minutes = Math.floor(
      (timeUntilTomorrow / (1000 * 60)) % 60,
    ).toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    const seconds = Math.floor((timeUntilTomorrow / 1000) % 60).toLocaleString(
      'en-US',
      {
        minimumIntegerDigits: 2,
        useGrouping: false,
      },
    );
    return {hours, minutes, seconds};
  }

  return (
    <View style={styles.countDown}>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>00</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{timeLeft.hours}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{timeLeft.minutes}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{timeLeft.seconds}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  countDown: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 6,
    marginBottom: 20,
  },
  timeContainer: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#333333',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    borderRadius: 16,
    width: 55,
    height: 45,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    backgroundColor: '#CCC0CF',
    width: 1,
    height: 20,
  },
  timeText: {
    color: '#fefefe',
    fontSize: 16,
    lineHeight: 45,
    textAlign: 'center',
    fontWeight: '600',
    fontFamily: fontFamily,
  },
});

export default Counter;
