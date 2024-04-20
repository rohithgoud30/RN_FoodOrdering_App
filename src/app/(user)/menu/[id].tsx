import { Stack, useLocalSearchParams, router } from 'expo-router'
import { Image, StyleSheet, Text, View, Pressable } from 'react-native'
import products from '@/assets/data/products'
import { useState } from 'react'
import Button from '../../../components/Button'
import { PizzaSize } from '@/assets/types'
import { useCart } from '@/providers/CartProvider'

const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

const ProductDetailsScreen = () => {
  const { id } = useLocalSearchParams()
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M')

  const { addItem } = useCart()

  const product = products.find((p) => p.id.toString() === id)

  const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'

  if (!product) {
    return (
      <View>
        <Stack.Screen options={{ title: 'Product Not Found' }} />
        <Text>Product Not Found</Text>
      </View>
    )
  }

  const handleAddToCart = () => {
    if (!product) return
    addItem(product, selectedSize)
    router.push('/cart')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.subtitle}>Select Size</Text>
      <View style={styles.sizes}>
        {sizes.map((size) => (
          <Pressable
            onPress={() => setSelectedSize(size)}
            style={[
              styles.size,
              {
                backgroundColor: selectedSize === size ? 'gainsboro' : 'white',
              },
            ]}
            key={size}
          >
            <Text
              style={[
                styles.sizeText,
                {
                  color: selectedSize !== size ? 'gray' : 'black',
                },
              ]}
            >
              {size}
            </Text>
          </Pressable>
        ))}
      </View>
      <Text style={styles.price}>${product.price}</Text>
      <Button onPress={() => handleAddToCart()} text='Add to Cart' />
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
  subtitle: {
    padding: 5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  sizeText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sizes: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  size: {
    backgroundColor: 'gainsboro',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 'auto',
    padding: 5,
  },
})
