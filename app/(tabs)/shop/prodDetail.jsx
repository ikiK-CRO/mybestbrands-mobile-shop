import { StyleSheet, Platform, Animated, Text, View } from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'

export default function prodDetail () {
  const { obj } = useLocalSearchParams()
  const [prod, setProd] = useState('')
  const [price, setPrice] = useState('')

  const product = JSON.parse(obj)

  useEffect(() => {
    console.log(JSON.parse(obj))
    setProd(product)
    formatPrice(product.price)
    return () => {
      setProd('')
    }
  }, [obj])

  const formatPrice = price => {
    let arr = price.toString().split('')
    arr.splice(-2, 0, ',')
    setPrice(arr.join(''))
    return
  }

  return (
    <ParallaxScrollView
      style={styles.cont}
      headerBackgroundColor={{ light: '#fff', dark: '#fff' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo.png')}
          style={styles.logo}
        />
      }
    >
      <ThemedText type='title' style={styles.title}>
        {prod.name ? prod.name : null}
      </ThemedText>
      <Image
        style={styles.image}
        source={prod.mainImageUrl}
        placeholder={require('@/assets/images/logo.png')}
        contentFit='cover'
        transition={1000}
      />
      <ThemedText>
        <Text style={{ fontWeight: 'bold' }}>Brand: </Text>
        {prod.brandName ? prod.brandName : null}
      </ThemedText>
      <ThemedText>
        <Text style={{ fontWeight: 'bold' }}>Price: </Text>
        {price} {'\u20AC'}
      </ThemedText>
      <ThemedText>
        <Text style={{ fontWeight: 'bold' }}>Descritption: </Text>
        {prod.description ? prod.description : null}
      </ThemedText>
    </ParallaxScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    maxWidth: '100%',
    textAlign: 'center'
  },
  logo: {
    marginTop: 40,
    height: 96,
    width: 72,
    // position: 'absolute',
    alignSelf: 'center'
  },
  image: {
    minHeight: 250,
    minWidth: 250,
    flex: 1,
    width: '100%',
    height: '100%'
  },
  cont: {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }
})
