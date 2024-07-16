import { Tabs } from 'expo-router';
import React from 'react';
import { useSegments } from 'expo-router'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout2() {
  const colorScheme = useColorScheme();
  const segment = useSegments();
  // console.log(segment)

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarStyle: { display: segment[2] === "prodDetail" ? 'flex' : 'none' },
          title: 'BACK',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cart' : 'cart-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="prodDetail"
        options={{
          tabBarStyle: { display: segment[2] === "prodDetail" ? 'flex' : 'none' },
          title: 'DETAILS',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5 name={focused ? 'cart-arrow-down' : 'cart-arrow-down'} size={22} color={color} />
          ),
        }}
      />
    </Tabs>

  );
}
