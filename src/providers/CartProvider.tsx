import {
  createContext,
  PropsWithChildren,
  ReactNode,
  useContext,
  useState,
} from 'react'
import { StyleSheet } from 'react-native'
import { CartItem, PizzaSize, Product } from '@/assets/types'
import * as Crypto from 'expo-crypto'

export type CartType = {
  items: CartItem[]
  addItem: (product: Product, size: CartItem['size']) => void
  updateQuantity: (id: string, quantity: -1 | 1) => void
  total: number
}

const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {},
  updateQuantity: () => {},
  total: 0,
})

const CartProvider = ({ children }: PropsWithChildren) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (product: Product, size: PizzaSize) => {
    // Find the item in the cart
    const existingItem = items.find(
      (item) => item.product_id === product.id && item.size === size
    )

    // If the item already exists, increase the quantity
    if (existingItem) {
      return updateQuantity(existingItem.id, 1)
    }

    // Create a new item
    const newItem = {
      id: Crypto.randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1,
    }
    // Add the new item to the cart
    setItems([...items, newItem])
  }

  //Update the quantity of the item
  const updateQuantity = (id: string, quantity: -1 | 1) => {
    const updatedItems = items
      .map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity + quantity,
          }
        }
        return item
      })
      .filter((item) => item.quantity > 0)
    setItems(updatedItems)
  }

  const total = items.reduce(
    (acc, item) => (acc += item.product.price * item.quantity),
    0
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider

const styles = StyleSheet.create({})

export const useCart = () => useContext(CartContext)
