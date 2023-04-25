import { StyleSheet, Text, View, KeyboardAvoidingView, TextInput,  TouchableOpacity, Image } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useState } from 'react'
import apiUrl from '../utils/apiUrl'
import axios from "axios"

export default function Editprofile({navigation, route}) {

    const {userId} = route.params
    const id = userId
    const url = apiUrl.getAPIURL(`/user/${id}`)

    const [name, setName] = useState()
    const [gender, setGender] = useState()
    const [address, setAddress] = useState()

    const handleProfileUpdate = async () => {
        try {
          const res = await axios.put(url, {
            name: name,
            gender: gender,
            address: address,
          })
          navigation.navigate('Pro', {userId: userId, name: name})
        } catch (error) {
          console.log(error.data)
        }
    }

    const handlePro = () => {
        navigation.navigate('Pro', {userId: id})
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity onPress={handlePro}>
            <Ionicons name="arrow-back-outline" size={35} color="#000000" />
            </TouchableOpacity>
            <View style={styles.view}>
            <Text style={styles.texthader}>EDIT PROFILE</Text>
            </View>
        </View>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                    <Image style={styles.image} source={require('../../assets/avatar.png')} />
                </View>
                <View style={styles.bottom}>
                    <TextInput 
                        placeholder='Display name'
                        style={styles.input}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        textAlign='center'
                    />
                    <TextInput 
                        placeholder='Gender'
                        style={styles.input}
                        textAlign='center'
                        value={gender}
                        onChangeText={(text) => setGender(text)}
                    /> 
                    <TextInput 
                        placeholder='Address'
                        textAlign='center'
                        style={styles.input}
                        value={address}
                        onChangeText={(text) => setAddress(text)}
                    />
                    <View style={{marginTop: 30}}>
                        <TouchableOpacity 
                            style={styles.opacity1}
                            onPress={handleProfileUpdate}
                        >
                            <Text style={{color: '#fff', fontSize: 22}}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.opacity2}
                            onPress={handlePro}
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
    header:{
        height:100,
        paddingTop:40,
        alignItems:'center',
        flexDirection:'row',
        borderBottomWidth:1
    },
    view:{
        width:'84%',
        alignItems:'center',
        justifyContent:'center'
    },
    texthader:{
        fontSize:20,
        color:'red',
        textTransform:'uppercase'
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
        width: 170,
        height: 170,
        borderRadius:100
    },
    icon:{
        width:70,
        marginTop:160,
        marginLeft:-120,
        backgroundColor:'#D7DB32'
    },
    bottom:{
        height: '100%',
        alignItems: 'center',
        marginTop: 10
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