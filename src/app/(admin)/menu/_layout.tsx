import { router, Stack } from 'expo-router'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Pressable } from 'react-native'
import Colors from '@/constants/Colors'

const MenuStack = () => {
  return (
    <Stack>
      <Stack.Screen
        name={'index'}
        options={{
          title: 'Menu',
          headerRight: () => (
            <Pressable onPress={() => router.push('/(admin)/menu/create')}>
              {({ pressed }) => (
                <FontAwesome
                  name='plus-square-o'
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name={'[id]'}
        options={{
          headerRight: () => (
            <Pressable onPress={() => router.push('/')}>
              {({ pressed }) => (
                <FontAwesome
                  name='pencil'
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          ),
        }}
      />
    </Stack>
  )
}
export default MenuStack
