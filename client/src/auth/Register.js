import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, Alert} from 'react-native'
import React, { useState } from 'react'
import apiUrl from '../utils/apiUrl'
import axios from "axios"

export default function SignUp({navigation, route}) {

    const url = apiUrl.getAPIURL('/auth/register')

    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [address, setAdresss] = useState('Viet Nam')
    const [gender, setGender] = useState(null)

    const handleRegister = async () =>{
      try {
        const res = await axios.post(url, {
          name : name,
          phone : phone,
          password: password,
          address: address,
          gender: gender
        })
        console.log(res.data)
        navigation.navigate('Login')
      } catch(error){
        Alert.alert('Account already exists')
      }
    }

    return (
        <View style={styles.container}>
            <View style={styles.top} >
                <Image style={styles.image} source={require('../../assets/register.png')} />
            </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.bottom}>
                    <TextInput 
                        placeholder='Display name'
                        style={styles.input}
                        textAlign='center'
                        onChangeText={setName}
                    />
                    <TextInput 
                        placeholder='Phone number'
                        style={styles.input}
                        textAlign='center'
                        keyboardType="phone-pad"
                        onChangeText={setPhone}
                    />
                    <TextInput 
                        placeholder='Password'
                        style={styles.input}
                        textAlign='center'
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    <View style={{marginTop: 30}}>
                        <TouchableOpacity 
                            style={styles.opacity1}
                            onPress={handleRegister}
                        >
                        <Text style={{color: '#fff', fontSize: 22}}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.opacity2}
                            onPress={() =>
                                navigation.navigate('Login')
                            }
                        >
                        <Text style={{color: '#fff', fontSize: 22}}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
    },
    title:{
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000'
    },
    text: {
      marginTop: 20,
      fontSize: 30,
      color: '#fff',
    },
    top: {
        height: 250,
        width: '100%',
        paddingTop:30,
        paddingHorizontal:'30%',
        backgroundColor: '#454401',
    },
    image:{
        width: 200,
        height: 190,
    },
    bottom:{
      height: '100%',
      alignItems: 'center',
      marginTop: 40
    },
    input:{
      height: 40,
      width: '80%',
      marginTop: 15,
      borderWidth: 1,
      borderColor: '#21a3d0',
      borderRadius: 20,
      paddingHorizontal: 25,
      fontSize: 17,
    },
    opacity1:{
      height: 44,
      width: 250,
      backgroundColor: '#1D685D',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
    opacity2:{
      marginTop: 20,
      height: 44,
      width: 250,
      backgroundColor: '#5883E5',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 20,
    },
  })