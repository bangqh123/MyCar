import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import apiUrl from '../utils/apiUrl'
import axios from "axios"

import FontAwesome from 'react-native-vector-icons/FontAwesome'

export default function Login({navigation}) {

  const url = apiUrl.getAPIURL('/auth/login')

  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () =>{
    try {
      const res = await axios.post(url, {
        phone : phone,
        password: password
      })
      const userId = res.data.user._id
      navigation.navigate('Navi', {userId: userId})
    } catch(error){
      console.error('Invalid credentials')
    }
  }

  const handleLoginFB = async () => {
    Alert.alert('Functions in development')
  }

  const handleLoginGG = async () => {
    Alert.alert('Functions in development')
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Image source={require('../../assets/login.png')} style={{width: 200, height: 200}} />
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.bottom}>
          <TextInput
            name='phone'
            style={styles.input}
            placeholder='Phone number'
            textAlign='center'
            keyboardType="phone-pad"
            onChangeText={setPhone}
          />
          <TextInput
            name='password'
            style={styles.input}
            placeholder='Password'
            textAlign='center'
            type='password'
            secureTextEntry
            onChangeText={setPassword}
          />

          <View style={{marginTop: 25}}>
            <TouchableOpacity 
              style={styles.opacity1}
              onPress={handleLogin}
            >
              <Text style={{color: '#fff', fontSize: 22}}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.opacity2}
              onPress={() =>
                navigation.navigate('SignUp')
              }
            >
            <Text style={{color: '#fff', fontSize: 22}}>SignUp</Text>
            </TouchableOpacity>

            <View style={{flexDirection:'row', marginTop: 10}}>
              <TouchableOpacity style={styles.opacity3} onPress={handleLoginFB}>
                <FontAwesome name='facebook-square' size={40} color='#1196f5'/>
              </TouchableOpacity>

              <TouchableOpacity style={styles.opacity3} onPress={handleLoginGG}>
                <FontAwesome name='google' size={40} />
              </TouchableOpacity>
            </View>
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
  text: {
    marginTop: 30,
    fontSize: 30,
    color: '#fff',
  },
  top: {
    height: 250,
    width: 430,
    marginLeft:-20,
    alignItems:'center',
    paddingTop:30,
    backgroundColor: '#728744',
  },
  bottom:{
    paddingTop: 50,
    height: '100%',
    alignItems: 'center',
  },
  input:{
    height: 44,
    width: '80%',
    borderWidth: 1,
    borderColor: '#21a3d0',
    borderRadius: 20,
    paddingHorizontal: 25,
    marginTop: 20,
    fontSize: 20,
  },
  opacity1:{
    marginTop: 20,
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
  opacity3: {
    marginTop: 20,
    height: 44,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20
  }
})