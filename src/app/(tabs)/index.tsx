import { StyleSheet, ScrollView } from 'react-native'
import products from '../../../assets/data/products'
import ProductListItem from '@/components/ProductListItem'

const product = products

export default function MenuScreen() {
  return (
    <ScrollView>
      <ProductListItem product={product[5]} />
      <ProductListItem product={product[1]} />
    </ScrollView>
  )
}

const styles = StyleSheet.create({})
