import {
  StyleSheet,
  Platform,
  Animated,
  Text,
  View,
  Dimensions,
  Modal
} from 'react-native'
import { router, useLocalSearchParams } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'

export default function prodDetail () {
  const { obj } = useLocalSearchParams()
  const product = JSON.parse(obj)

  const [prod, setProd] = useState('')
  const [price, setPrice] = useState('')

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
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={prod.mainImageUrl}
          placeholder={require('@/assets/images/logo.png')}
          contentFit='cover'
          transition={1000}
        />
      </View>

      <View
        style={{
          flex: 1,
          padding: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}
      >
        {prod
          ? prod.additionalImages.map((item, i) => {
              return (
                <Image
                  key={i}
                  style={styles.imageG}
                  source={item}
                  placeholder={require('@/assets/images/logo.png')}
                  contentFit='cover'
                  transition={1000}
                />
              )
            })
          : null}
      </View>

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
    minHeight: 300,
    minWidth: 300,
    flex: 1,
    backgroundColor: '#fff'
  },
  imageG: { minHeight: 100, minWidth: 100, flex: 1, margin: 5, padding: 5, backgroundColor: "#fff" },
  cont: {
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  },
  imageWrapper: {
    minHeight: 300,
    minWidth: 300,
    backgroundColor: '#fff',
    padding: 10,
    margin: 10
  }
})
