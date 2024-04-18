import { StyleSheet, Text, ScrollView, View, Image } from 'react-native'
import Colors from '@/constants/Colors'
import { Product } from '@/assets/types'

type ProductListItemProps = {
  product: Product
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const defaultPizzaImage =
    'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>{product.price}</Text>
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

export default ProductListItem
