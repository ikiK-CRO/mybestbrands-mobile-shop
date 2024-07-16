import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  FlatList,
  StatusBar,
  Text,
  Dimensions,
  TouchableOpacity,
  useColorScheme
} from 'react-native'
import React, { useState, useEffect, useContext } from 'react'
import { ExternalLink } from '@/components/ExternalLink'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'

export default function TabTwoScreen () {
  const [data, setData] = useState([])
  let colorScheme = useColorScheme()

  useEffect(() => {
    const dataSource =
      'https://api.jsonsilo.com/public/a597ee63-6f5a-4f5d-b70e-338b22e45ee0'

    fetch(dataSource)
      .then(response => response.json())
      .then(data => addID(data))
      .catch(error => console.error('Error:', error))
    return () => {}
  }, [])

  let addID = data => {
    data.forEach((element, index) => {
      element.id = index + 1
    })
    setData(data)
    // console.log(data)
  }

  // console.log(Dimensions.get('window').width)
  const cardGap = 10
  const cardWidth = '48%'

  const onPress = i => console.log(data[i])
  const formatPrice = price => {
    let arr = price.toString().split('')
    arr.splice(-2, 0, ',')
    // console.log(arr)
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
        <ThemedView>
          <ThemedText type='title' style={styles.title}>
            PRODUCT LIST{' '}
            <View>
              {colorScheme === 'dark' ? (
                <Ionicons
                  name='settings'
                  size={24}
                  color='white'
                  onPress={() => console.log(true)}
                  iconStyle={{ marginRight: 30 }}
                />
              ) : (
                <Ionicons
                  name='settings'
                  size={24}
                  color='black'
                  onPress={() => console.log(true)}
                  iconStyle={{ marginRight: 30 }}
                />
              )}
            </View>
          </ThemedText>
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
                      onPress={() => onPress(i)}
                    >
                      <Image
                        style={styles.image}
                        source={item.mainImageUrl}
                        placeholder={require('@/assets/images/logo.png')}
                        contentFit='cover'
                        transition={1000}
                      />
                      <Text style={styles.itemTitle}>{item.name}</Text>
                      <Text>
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
    marginTop: 40,
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
  }
})
