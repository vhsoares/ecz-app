import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fontFamily} from '../../styles/font';

const LoadingBar = () => {
  const [progress, setProgress] = useState(0);
  const [timer, setTimer] = useState('00:00');

  useEffect(() => {
    setProgress(0);
    setTimer('00:00');
    const duration = 12000; // 10 seconds
    const intervalDuration = 20; // 10 milliseconds
    const steps = duration / intervalDuration;
    let currentStep = 0;

    const interval = setInterval(() => {
      setProgress((currentStep / steps) * 100);

      currentStep += 1;
      if (currentStep > steps) {
        clearInterval(interval);
      }
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const intervalDuration = 1000; // 1 second
    let currentSecond = 0;

    const interval = setInterval(() => {
      currentSecond += 1;
      const formattedTime = formatTime(currentSecond);
      setTimer(formattedTime);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      <View style={styles.container}>
        <View style={[styles.progressBar, {width: `${progress}%`}]} />
      </View>
      <Text style={styles.timer}>{timer}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 10,
    backgroundColor: '#ECECEC',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#8612A7',
  },
  timer: {
    fontSize: 16,
    textAlign: 'right',
    width: '100%',
    fontFamily: fontFamily,
    marginTop: -5,
  },
});

export default LoadingBar;
