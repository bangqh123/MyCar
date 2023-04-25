import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, TextInput } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useState } from 'react'
import apiUrl from '../utils/apiUrl'
import axios from 'axios'

export default function EditCar({navigation, route}) {

    const {carId} = route.params
    const {userId} = route.params
    const id = carId
    
    const [name, setName] = useState()
    const [price, setPrice] = useState()
    const [seat, setSeat] = useState()
    const [transmission, setTransmission] = useState()
    const [fuel, setFuel] = useState()
    const [available, setAvaliable] = useState(true)

    const handleCarUpdate = async () => {
        const url = apiUrl.getAPIURL(`/car/${id}`)
        try {
            const res = await axios.put(url, {
            name: name,
            seat: seat,
            price: price,
            transmission: transmission,
            fuel: fuel,
            available: available,
            })
            navigation.navigate('Detail', {userId: userId})
        } catch (error) {
            console.log(error.data)
        }
    }

    const handleGoToMyCar = () => {
        navigation.navigate('Detail', {userId: userId})
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoToMyCar}>
                    <Ionicons name="arrow-back-outline" size={35} color="#000000" />
                </TouchableOpacity>
                <View style={styles.view}>
                <Text style={styles.texthader}>EDIT CAR</Text>
                </View>
            </View>

            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.bottom}>
                    <TextInput 
                        placeholder='Car name'
                        style={styles.input}
                        textAlign='center'
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />

                    <TextInput 
                        placeholder='Seats'
                        style={styles.input}
                        textAlign='center'
                        keyboardType="numeric"
                        value={seat}
                        onChangeText={(text) => setSeat(text)}
                    />

                    <TextInput 
                        placeholder='Price'
                        style={styles.input}
                        textAlign='center'
                        keyboardType="numeric"
                        value={price}
                        onChangeText={(text) => setPrice(text)}
                    /> 
                    
                    <TextInput 
                        placeholder='Transmission'
                        textAlign='center'
                        style={styles.input}
                        value={transmission}
                        onChangeText={(text) => setTransmission(text)}
                    />

                    <TextInput 
                        placeholder='Fuel'
                        textAlign='center'
                        style={styles.input}
                        value={fuel}
                        onChangeText={(text) => setFuel(text)}
                    />

                    <View style={{marginTop: 50}}>
                        <TouchableOpacity 
                            style={styles.opacity1}
                            onPress={handleCarUpdate}
                        >
                            <Text style={{color: '#fff', fontSize: 22}}>Submit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.opacity2}
                            onPress={handleGoToMyCar}
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
        marginTop: 30
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