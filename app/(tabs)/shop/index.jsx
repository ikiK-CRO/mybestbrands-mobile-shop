import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { router } from 'expo-router'
import Toast from 'react-native-root-toast'

export default function TabTwoScreen () {
  const [data, setData] = useState([])
  let colorScheme = useColorScheme()

  let toast = (color, text) => {
    Toast.show(text, {
      duration: 5000,
      position: Toast.positions.TOP,
      backgroundColor: color,
      shadowColor: 'black',
      containerStyle: {
        marginTop: 20,
        marginStart: '60%',
        minWidth: 150,
        minHeight: 40
      }
    })
  }

  useEffect(() => {
    const dataSource =
      'https://api.jsonsilo.com/public/a597ee63-6f5a-4f5d-b70e-338b22e45ee0'

    fetch(dataSource)
      .then(response => response.json())
      .then(data => processData(data))
      .catch(error => {
        console.error('Error:', error)
        toast('red', 'Error fetching data!')
      })
    return () => {}
  }, [])

  let processData = data => {
    data.forEach((element, index) => {
      element.id = index + 1
    })
    setData(data)
    toast('green', 'Data fetched!')
  }

  const cardGap = 10
  const cardWidth = '48%'

  const onPressItem = item =>
    router.replace({
      pathname: 'shop/prodDetail',
      params: {
        obj: JSON.stringify(item)
      }
    })

  const formatPrice = price => {
    let arr = price.toString().split('')
    arr.splice(-2, 0, ',')
    return arr.join('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#fff', dark: '#fff' }}
        headerImage={
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
        }
      >
        <ThemedView style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 2 }}>
            <ThemedText type='title' style={styles.title}>
              PRODUCT LIST
            </ThemedText>
          </View>

          <View style={{ lex: 6 }}>
            {colorScheme === 'dark' ? (
              <Ionicons
                name='settings'
                size={24}
                color='white'
                onPress={() => console.log(true)}
              />
            ) : (
              <Ionicons
                name='settings'
                size={24}
                color='black'
                onPress={() => console.log(true)}
              />
            )}
          </View>
        </ThemedView>

        <ThemedView
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {data
            ? data.map((item, i) => {
                return (
                  <View
                    key={item.id}
                    style={{
                      marginTop: cardGap,
                      marginLeft: i % 2 !== 0 ? cardGap : 0,
                      width: cardWidth,
                      height: 220,
                      backgroundColor: 'white',
                      borderRadius: 12,
                      shadowOpacity: 0.2,
                      elevation: 2,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => onPressItem(item)}
                    >
                      <Image
                        style={styles.image}
                        source={item.mainImageUrl}
                        placeholder={require('@/assets/images/logo.png')}
                        contentFit='cover'
                        transition={1000}
                      />
                      <Text style={styles.itemTitle}>{item.name}</Text>
                      <Text style={{ paddingLeft: 5 }}>
                        {formatPrice(item.price)} {'\u20AC'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )
              })
            : null}
        </ThemedView>
      </ParallaxScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  logo: {
    marginTop: 20,
    height: 96,
    width: 72,
    // position: 'absolute',
    alignSelf: 'center'
  },
  title: {
    maxWidth: '100%',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0
  },
  item: {
    // backgroundColor: '#54626F',
    // padding: 10,
    // marginVertical: 5,
    // marginHorizontal: 7
  },
  itemTitle: {
    color: '#000',
    margin: 5,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  image: {
    minHeight: 120,
    minWidth: 120
    // marginTop: 5
  },
})
