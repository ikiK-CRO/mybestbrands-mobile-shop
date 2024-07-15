import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import React, { useState, useEffect, useContext } from 'react'


export default function HomeScreen() {

  useEffect(() => {
    const dataSource = "https://api.jsonsilo.com/public/a597ee63-6f5a-4f5d-b70e-338b22e45ee0"

    fetch(dataSource)
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));

    return () => {

    };
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
        <ThemedText type="title" style={styles.title}>MYBESTBRANDS</ThemedText>
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
  },
});
