import Ionicons from '@expo/vector-icons/Ionicons'
import {
  StyleSheet,
  SafeAreaView,
  View,
  StatusBar,
  Text,
  TouchableOpacity,
  useColorScheme,
  ActivityIndicator,
  Animated
} from 'react-native'
import React, { useState, useEffect, useContext, useCallback } from 'react'
import ParallaxScrollView from '@/components/ParallaxScrollView'
import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'
import { Image } from 'expo-image'
import { router, useFocusEffect } from 'expo-router'
import GLOBAL from '@/global.js'
import { toast, formatPrice } from '@/helpers.js'
import { SearchBar } from '@rneui/themed'

export default function TabTwoScreen () {
  const [data, setData] = useState([])
  let colorScheme = useColorScheme()
  const [spinner, setSpinner] = useState('none')
  const [search, setSearch] = useState('')
  const [fadeAnim] = useState(new Animated.Value(0))
  const [displaySbar, setDisplaySbar] = useState('none')

  const updateSearch = search => {
    setSearch(search)
    // console.log(search)

    let filtered
    if (GLOBAL.dataFilterd) {
      filtered = GLOBAL.datF.filter(({ name }) => name.includes(search))
    } else {
      filtered = GLOBAL.dataOrginal.filter(({ name }) => name.includes(search))
    }

    setData(filtered)
  }

  useEffect(() => {
    setSpinner('flex')
    console.log(GLOBAL)

    const dataSource =
      'https://api.jsonsilo.com/public/a597ee63-6f5a-4f5d-b70e-338b22e45ee0'

    // for testing
    // const dataSource = null

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
    GLOBAL.dataOrginal = data
    // toast('green', 'Data fetched!')
    setSpinner('none')
  }

  useFocusEffect(
    useCallback(() => {
      GLOBAL.dataFilterd === true
        ? setData(GLOBAL.datF)
        : setData(GLOBAL.dataOrginal)
      return () => {
        // console.log('This route is now unfocused.')
      }
    }, [])
  )

  const cardGap = 10
  const cardWidth = '48%'

  const onPressItem = item =>
    router.replace({
      pathname: 'shop/prodDetail',
      params: {
        obj: JSON.stringify(item)
      }
    })

  const sBarAnimate = () => {
    if (displaySbar !== 'flex') {
      console.log(true)
      setDisplaySbar('flex')
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start()
    } else {
      console.log(true)
      setDisplaySbar('none')
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start()
    }
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
        <ThemedView
          style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}
        >
          <View style={{ flex: 2 }}>
            <Ionicons
              name='search-circle-sharp'
              size={28}
              color={colorScheme === 'dark' ? 'white' : 'black'}
              onPress={() => sBarAnimate()}
            />
          </View>

          <View style={{ flex: 20 }}>
            <ThemedText type='title' style={styles.title}>
              PRODUCT LIST
            </ThemedText>
          </View>

          <View style={{ flex: 2 }}>
            {colorScheme === 'dark' ? (
              <Ionicons
                name='settings'
                size={24}
                color={GLOBAL.dataFilterd === true ? 'orange' : 'white'}
                onPress={() =>
                  router.navigate({
                    pathname: 'modal'
                  })
                }
              />
            ) : (
              <Ionicons
                name='settings'
                size={24}
                color={GLOBAL.dataFilterd === true ? 'orange' : 'black'}
                onPress={() =>
                  router.navigate({
                    pathname: 'modal'
                  })
                }
              />
            )}
          </View>
        </ThemedView>

        <Animated.View
          style={{
            opacity: fadeAnim,
            display: displaySbar
          }}
        >
          <SearchBar
            platform='default'
            placeholder='Search'
            onChangeText={updateSearch}
            value={search}
            lightTheme={colorScheme === 'dark' ? false : true}
            containerStyle={{
              ...styles.SearchBar
            }}
            inputContainerStyle={{ borderRadius: 10 }}
          />
        </Animated.View>

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
                      ...styles.cardView,
                      marginTop: cardGap,
                      marginLeft: i % 2 !== 0 ? cardGap : 0,
                      width: cardWidth
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
      <ThemedView style={{ ...styles.spinnerView, display: spinner }}>
        <ActivityIndicator size='large' color={'white'} />
      </ThemedView>
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
  spinnerView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.95)'
  },
  cardView: {
    height: 220,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.2,
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  SearchBar: {
    borderRadius: 10,
    padding: 0,
    shadowOpacity: 0.2,
    elevation: 2
  }
})
