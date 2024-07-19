import {
  StyleSheet,
  Platform,
  Animated,
  Text,
  View,
  Dimensions,
  Modal,
  useColorScheme
} from 'react-native'
import { router, useLocalSearchParams, useFocusEffect } from 'expo-router'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Collapsible } from '@/components/Collapsible'
import React, { useEffect, useState, useCallback } from 'react'
import { Image } from 'expo-image'
import Octicons from '@expo/vector-icons/Octicons'
import GLOBAL from '@/global.js'
import { toast, formatPrice } from '@/helpers.js'
import { ButtonGroup } from '@rneui/themed'

export default function prodDetail () {
  const { obj } = useLocalSearchParams()
  const product = JSON.parse(obj)
  let colorScheme = useColorScheme()

  const [prod, setProd] = useState('')
  const [like, setLike] = useState()
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    console.log(JSON.parse(obj))
    setProd(product)
    formatPrice(product.price)

    return () => {
      setProd('')
    }
  }, [obj])

  useFocusEffect(
    useCallback(() => {
      // console.log(product.id)
      if (GLOBAL.likes.includes(product.id)) {
        console.log(GLOBAL.likes)
        setLike('orange')
      } else {
        setLike(colorScheme === 'dark' ? 'white' : 'black')
      }
      return () => {
        // console.log('This route is now unfocused.')
      }
    }, [product])
  )

  const likeFunc = id => {
    // console.log(id)
    if (GLOBAL.likes.includes(id)) {
      GLOBAL.likes = GLOBAL.likes.filter(item => item !== id)
      setLike(colorScheme === 'dark' ? 'white' : 'black')
    } else {
      setLike('orange')
      GLOBAL.likes.push(id)
    }
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
      <ThemedView style={{ flexDirection: 'row' }}>
        <ThemedText>
          <Text style={{ fontWeight: 'bold' }}>Price: </Text>
          {formatPrice(prod.price ? prod.price : '')} {'\u20AC'}
        </ThemedText>
        <Octicons
          name='heart-fill'
          size={24}
          onPress={() => likeFunc(prod.id)}
          color={like}
          style={{ textAlign: 'right', marginLeft: 'auto' }}
        />
      </ThemedView>

      <ThemedText>
        <Text style={{ fontWeight: 'bold' }}>Brand: </Text>
        {prod.brandName ? prod.brandName : null}
      </ThemedText>

      <ThemedText>
        <ThemedText style={{ fontWeight: 'bold' }}>Materials: </ThemedText>
        {prod.materials ? prod.materials : null}
      </ThemedText>
      <ThemedText>
        <ThemedText style={{ fontWeight: 'bold' }}>Categories: </ThemedText>
        {prod.categoryTagNames ? prod.categoryTagNames.join(', ') : null}
      </ThemedText>

      <View>
        <ThemedText style={{ fontWeight: 'bold' }}>SIZES: </ThemedText>
        <ButtonGroup
          buttons={prod ? prod.sizes.map(x => x.name) : null}
          selectedIndex={selectedIndex}
          onPress={value => {
            setSelectedIndex(value)
          }}
          containerStyle={{ marginBottom: 20 }}
          selectedButtonStyle={{
            // backgroundColor: 'orange',
            color: 'black'
          }}
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

      <Collapsible title='Description'>
        <ThemedText>{prod.description ? prod.description : null}</ThemedText>
      </Collapsible>

      <Collapsible title='Shipping Info'>
        <ThemedText>{prod.shippingInfo ? prod.shippingInfo : null}</ThemedText>
      </Collapsible>
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
  imageG: {
    minHeight: 100,
    minWidth: 100,
    flex: 1,
    margin: 5,
    padding: 5,
    backgroundColor: '#fff'
  },
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
