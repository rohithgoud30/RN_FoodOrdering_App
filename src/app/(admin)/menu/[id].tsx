import { Stack, useLocalSearchParams, router } from 'expo-router'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import products from '@/assets/data/products'
import { PizzaSize } from '@/assets/types'
import { defaultPizzaImage } from '@/components/ProductListItem'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()

  const product = products.find((p) => p.id.toString() === id)

  if (!product) {
    return (
      <View>
        <Stack.Screen options={{ title: 'Product Not Found' }} />
        <Text>Product Not Found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  )
}
export default ProductDetailsScreen
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    padding: 5,
  },
})
