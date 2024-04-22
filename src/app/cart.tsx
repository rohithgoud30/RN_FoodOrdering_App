import { StatusBar } from 'expo-status-bar'
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native'
import { useCart } from '../providers/CartProvider'
import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

export default function CartScreen() {
  const { items, total } = useCart()
  return (
    <View style={[styles.container, { padding: 10 }]}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ gap: 10 }}
      />
      <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.00)' }}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <Button text='Checkout' onPress={() => {}} />
      </View>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0,0.00)',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
})
