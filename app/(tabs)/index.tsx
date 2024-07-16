import { Image, StyleSheet, Platform, Animated, Text, View } from 'react-native';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useRef, useEffect } from 'react'


export default function HomeScreen() {

  const fadeAnim = useRef(new Animated.Value(0)).current

  useEffect(() => {

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2300,
      useNativeDriver: true,
    }).start()

    setTimeout(function () {
      router.replace('/shop/');
    }, 2500)

  }, [fadeAnim])


  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#fff', dark: '#fff' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      }>
      <ThemedView>
        <ThemedText type="title" style={styles.title}>MYBESTBRANDS</ThemedText>
      </ThemedView>

      <Animated.View // Special animatable View
        style={{
          opacity: fadeAnim,
        }}>
        <ThemedView>
          <ThemedText type="subtitle">FIND WHAT YOU STAND FOR.</ThemedText>
        </ThemedView>
      </Animated.View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  title: {
    maxWidth: "100%",
    textAlign: 'center',
  },
  logo: {
    marginTop: 40,
    height: 96,
    width: 72,
    // position: 'absolute',
    alignSelf: 'center'
  }
});
