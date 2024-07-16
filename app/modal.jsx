import {
  View,
  Platform,
  StyleSheet,
  useColorScheme,
  TouchableOpacity
} from 'react-native'
import { Link, router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from 'expo-router'
import { ThemedView } from '@/components/ThemedView'
import { ThemedText } from '@/components/ThemedText'
import GLOBAL from '@/global.js'
import React, { useState, useEffect } from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import Toast from 'react-native-root-toast'

export default function Modal () {
  let colorScheme = useColorScheme()
  const [genderFColor, setFGenderColor] = useState('')
  const [genderMColor, setMGenderColor] = useState('')

  useEffect(() => {
    console.log(GLOBAL.dataOrginal)
    colorScheme === 'dark'
      ? (setFGenderColor('white'), setMGenderColor('white'))
      : (setFGenderColor('black'), setMGenderColor('black'))
    return () => {}
  }, [])

  const isPresented = router.canGoBack()
  // console.log(isPresented)

  const handleGender = type => {
    // console.log(type)

    if (type === 'female' && genderFColor !== 'orange') {
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
    // console.log(type)
    // console.log(statement)
    // console.log(typeCategory)
    // console.log(GLOBAL.dataOrginal)
    GLOBAL.dataOrginal.forEach(prod => {
      // console.log(prod.genders)
    })

    let res = GLOBAL.dataOrginal.map(element => {
      return {
        ...element,
        subElements: element.genders.filter(
          subElement => subElement.includes(type)
        )
      }
    })
    console.log(res)
  }

  return (
    <ThemedView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <ThemedText type='title' style={styles.title}>
        {!isPresented && <Link href='../shop'>Dismiss</Link>}
      </ThemedText>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View>
        {/* <ThemedText type='title' style={styles.title}>
          FILTERS
        </ThemedText> */}
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
      </View>
    </ThemedView>
  )
}

const styles = StyleSheet.create({
  title: {
    maxWidth: '100%',
    textAlign: 'center'
  }
})
