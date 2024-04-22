import Colors from '@/constants/Colors'
import Button from '@/components/Button'
import { Stack } from 'expo-router'
import { useState } from 'react'
import { StyleSheet, Text, View, Image, TextInput } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { defaultPizzaImage } from '@/components/ProductListItem'

const create = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState({ name: '', price: '' })
  const [image, setImage] = useState<string | null>(null)

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    console.log(result)

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const resetFeilds = () => {
    setName('')
    setPrice('')
  }

  const validateinputs = () => {
    if (!name) {
      setErrors((prev) => {
        return { ...prev, name: 'Name is required' }
      })
      return false
    }
    if (!price) {
      setErrors((prev) => {
        return { ...prev, price: 'Price is required' }
      })
      return false
    }
    if (!name || !price) {
      setErrors({ name: 'Name is required', price: 'Price is required' })
      return false
    }
    if (isNaN(parseFloat(price))) {
      setErrors((prev) => {
        return { ...prev, price: 'Price must be a number' }
      })
      return false
    }
    return true
  }

  const handleCreate = () => {
    if (!validateinputs()) {
      return
    }
    console.warn('Creating Product Name', name)

    //save database

    resetFeilds()
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Product' }} />
      <Image
        source={{ uri: image || defaultPizzaImage }}
        style={styles.image}
      />

      <Text style={styles.textBtn} onPress={pickImage}>
        Select Image
      </Text>

      <Text style={styles.lable}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        placeholder='Pizza'
        onChangeText={(text) => setName(text)}
      />
      <Text style={{ color: 'red' }}>{errors.name}</Text>
      <Text style={styles.lable}>Price</Text>
      <TextInput
        style={styles.input}
        value={price}
        placeholder='9.99'
        onChangeText={(text) => setPrice(text)}
        keyboardType='numeric'
      />
      <Text style={{ color: 'red' }}>{errors.price}</Text>
      <Button text='Create' onPress={() => handleCreate()} />
    </View>
  )
}
export default create
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.0)',
  },
  lable: {
    color: 'gray',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textBtn: {
    color: Colors.light.tint,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginVertical: 10,
  },
})
