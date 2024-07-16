import { Image, StyleSheet, Platform, Animated, Text, View } from 'react-native';
import { router } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useRef, useEffect } from 'react'


export default function prodDetail() {


  useEffect(() => {


  }, [])


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
        <ThemedText type="title" style={styles.title}>prodDetail</ThemedText>
      </ThemedView>

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
