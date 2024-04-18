import { StyleSheet, Text, View, Image } from 'react-native'
import products from '@/assets/data/products'
import Colors from '@/src/constants/Colors'
const product = products

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: product[0].image }} style={styles.image} />
      <Text style={styles.title}>{product[0].name}</Text>
      <Text style={styles.price}>{product[0].price}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
  },
  image: { width: '100%', aspectRatio: 1 },
})
