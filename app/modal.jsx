import {
  View,
  Platform,
  StyleSheet,
  useColorScheme,
  TouchableOpacity
} from 'react-native'
import { Link, router, useFocusEffect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from 'expo-router'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import GLOBAL from '@/global.js'
import React, { useState, useEffect, useCallback } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Toast from 'react-native-root-toast'
import { Divider } from '@rneui/themed'

export default function Modal () {
  let colorScheme = useColorScheme()
  const [genderFColor, setFGenderColor] = useState('')
  const [genderMColor, setMGenderColor] = useState('')

  let toast = (color, text) => {
    Toast.show(text, {
      duration: 5000,
      position: Toast.positions.TOP,
      backgroundColor: color,
      shadowColor: 'black',
      containerStyle: {
        marginTop: 80,
        marginStart: '60%',
        minWidth: 150,
        minHeight: 40
      }
    })
  }

  useEffect(() => {
    colorScheme === 'dark'
      ? (setFGenderColor('white'), setMGenderColor('white'))
      : (setFGenderColor('black'), setMGenderColor('black'))

    return () => {}
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (GLOBAL.filter == 'male') {
        setMGenderColor('orange')
      }
      if (GLOBAL.filter == 'female') {
        setFGenderColor('orange')
      }

      return () => {
        // console.log('This route is now unfocused.')
      }
    }, [])
  )

  const isPresented = router.canGoBack()

  const handleGender = type => {
    if (type === 'female' && genderFColor !== 'orange') {
      GLOBAL.filter = type
      setFGenderColor('orange')
      colorScheme === 'dark'
        ? setMGenderColor('white')
        : setMGenderColor('black')

      filterData('gender', true, 'female')

      return
    } else {
      colorScheme === 'dark'
        ? setFGenderColor('white')
        : setFGenderColor('black')
    }

    if (type === 'male' && genderMColor !== 'orange') {
      GLOBAL.filter = type
      setMGenderColor('orange')
      colorScheme === 'dark'
        ? setFGenderColor('white')
        : setFGenderColor('black')

      filterData('gender', true, 'male')

      return
    } else {
      colorScheme === 'dark'
        ? setMGenderColor('white')
        : setMGenderColor('black')
    }
  }

  const filterData = (type, statement, typeCategory) => {
    // let arr = []
    // GLOBAL.dataOrginal.forEach(el => {
    //   if (el.genders.includes(typeCategory)) {
    //     arr.push(el)
    //   }
    // })

    const arr = GLOBAL.dataOrginal.filter(({ genders }) => genders.includes(typeCategory));

    if (arr.length !== 0) {
      GLOBAL.dataFilterd = true
      GLOBAL.datF = arr
      GLOBAL.type = {
        typeCategory: typeCategory,
        type: type
      }
      toast('green', 'Filter applied!')
    } else {
      toast('red', 'No results!')
    }
  }

  const handleRefresh = () => {
    GLOBAL.dataFilterd = false
    GLOBAL.datF = null
    colorScheme === 'dark' ? setMGenderColor('white') : setMGenderColor('black')
    colorScheme === 'dark' ? setFGenderColor('white') : setFGenderColor('black')
    GLOBAL.dataFilterd = false
    GLOBAL.datF = null
    GLOBAL.type = null
    GLOBAL.filter = null
    toast('green', 'Filter reset')
  }

  return (
    <ThemedView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <ThemedText type='title' style={styles.title}>
        {!isPresented && <Link href='../shop'>Dismiss</Link>}
      </ThemedText>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => handleRefresh(true)}
          style={{ alignSelf: 'center', marginBottom: 30 }}
        >
          <FontAwesome
            name='refresh'
            size={50}
            color={colorScheme === 'dark' ? 'white' : 'black'}
          />
        </TouchableOpacity>
        <Divider width={1} color={colorScheme === 'dark' ? 'white' : 'black'} />
        <ThemedView
          style={{
            marginTop: 50,
            flex: 1,
            flexDirection: 'row',
            width: '100%',
            hight: '100%',
            alignContent: 'center'
          }}
        >
          <ThemedView style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleGender('female')}>
              <FontAwesome name='female' size={60} color={genderFColor} />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={{ flex: 1, alignItems: 'center' }}>
            <TouchableOpacity onPress={() => handleGender('male')}>
              <FontAwesome name='male' size={60} color={genderMColor} />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
        <Divider width={1} color={colorScheme === 'dark' ? 'white' : 'black'} />
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  title: {
    maxWidth: '100%',
    textAlign: 'center',
    fontSize: 30
  }
})
