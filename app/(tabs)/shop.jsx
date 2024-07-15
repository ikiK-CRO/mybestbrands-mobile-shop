import Ionicons from '@expo/vector-icons/Ionicons';
import {
  StyleSheet, Image, Platform, SafeAreaView, View,
  FlatList, StatusBar, Text
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react'
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function TabTwoScreen() {
  const [data, setData] = useState([])

  useEffect(() => {
    const dataSource = "https://api.jsonsilo.com/public/a597ee63-6f5a-4f5d-b70e-338b22e45ee0"

    fetch(dataSource)
      .then(response => response.json())
      .then(data => addID(data))
      .catch(error => console.error('Error:', error));
    return () => {

    };
  }, [])

  let addID = data => {
    data.forEach((element, index) => {
      element.id = index + 1
    })
    setData(data)
    // console.log(data)
  }

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#fff', dark: '#fff' }}
        headerImage={
          <Image
            source={require('@/assets/images/logo.png')}
            style={styles.logo}
          />
        }>
        <ThemedView>
          <ThemedText type="title" style={styles.title}>PRODUCT LIST</ThemedText>
        </ThemedView>

        {/* <FlatList
          data={data}
          renderItem={({ item }) => <Item title={item.name} />}
          keyExtractor={item => item.id}
        /> */}

        {
          data ? data.map((item) => <Item key={item.id} title={item.name} />) : null
        }
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
    maxWidth: "100%",
    textAlign: 'center',
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
