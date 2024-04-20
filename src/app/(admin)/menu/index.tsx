import { StyleSheet, FlatList, Text } from 'react-native'
import products from '@/assets/data/products'
import ProductListItem from '@/components/ProductListItem'

const product = products

export default function MenuScreen() {
  return (
    <FlatList
      data={product}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  )
}

const styles = StyleSheet.create({})
