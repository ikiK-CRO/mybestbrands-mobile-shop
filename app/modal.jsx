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
    // console.log(GLOBAL.dataOrginal)
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
      return
    } else {
      colorScheme === 'dark'
        ? setMGenderColor('white')
        : setMGenderColor('black')
    }
  }

  return (
    <ThemedView
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <ThemedText>
        {!isPresented && <Link href='../shop'>Dismiss</Link>}
      </ThemedText>

      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <View>
        <ThemedText type='title' style={styles.title}>
          FILTERS
        </ThemedText>
        <ThemedView
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row'
          }}
        >
          <ThemedView style={{ flex: 3 }}>
            <TouchableOpacity onPress={() => handleGender('female')}>
              <FontAwesome name='female' size={50} color={genderFColor} />
            </TouchableOpacity>
          </ThemedView>

          <ThemedView style={{ flex: 3 }}>
            <TouchableOpacity onPress={() => handleGender('male')}>
              <FontAwesome name='male' size={50} color={genderMColor} />
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
