import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, TextInput, KeyboardAvoidingView} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import apiUrl from '../utils/apiUrl'
import axios from 'axios'

export default function Booking({navigation, route}) {

    const {carId} = route.params
    const {userId} = route.params
    const {price} = route.params
    const id = userId

    const [user] = useState(id)
    const [car] = useState(carId)
    const [startDate, setStart] = useState()
    const [endDate, setEnd] = useState()
    const [amount, setAmount] = useState(0)
    const [status] = useState('Approved')
    

    useEffect(() => {
        if (startDate && endDate) {
            const numOfDays = Math.ceil(
                (new Date(endDate) - new Date(startDate))/(1000 * 60 * 60 * 24)
            )
            setAmount(numOfDays * price)
        }
    }, [startDate, endDate])

    const handleAddBooking = async () => {
        const url = apiUrl.getAPIURL('/booking/')
        try {
        const res = await axios.post(url, {
            user: user,
            car: car,
            startDate: startDate,
            endDate: endDate,
            amount: amount,
            status: status,
        })
        navigation.navigate('Navi', {userId: userId})
        } catch (error) {
        console.log(error.data)
        }
    }

    const handleGoToDis = () => {
        navigation.navigate('CarDis', {userId: id, carId:carId})
    } 

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleGoToDis}>
                    <Ionicons name="arrow-back-outline" size={35} color="#000000" />
                </TouchableOpacity>
                <View style={styles.view}>
                    <Text style={{fontSize:20,color:'red',textTransform:'uppercase'}}>BOOKING</Text>
                </View>
            </View>
                <View style={styles.body}>    
                    <Image style={styles.image} source={require('../../assets/1.png')}/>
                    <KeyboardAvoidingView 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    >
                    <View style={styles.bottom}>
                        <TextInput 
                            style={styles.input}
                            placeholder="YYYY-MM-DD"
                            textAlign='center' 
                            keyboardType="numeric"
                            maxLength={10}
                            value={startDate}
                            onChangeText={text => setStart(text)}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder="YYYY-MM-DD"
                            textAlign='center' 
                            keyboardType="numeric"
                            maxLength={10}
                            value={endDate}
                            onChangeText={text => setEnd(text)}
                        />
                        <TextInput 
                            style={styles.input}
                            placeholder = 'Amount'
                            value={amount.toString()}
                            textAlign='center' 
                            editable={false}
                        />
                        <View style={{marginTop: 30}}>
                            <TouchableOpacity 
                                style={styles.opacity1}
                                onPress={handleAddBooking}
                            >
                                <Text style={{color: '#fff', fontSize: 22}}>Submit</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={styles.opacity2}
                                onPress={handleGoToDis}
                            >
                                <Text style={{color: '#fff', fontSize: 22}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>    
            </View>
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
    body:{
        width:'100%'
    },
    texthader:{
        fontSize:20,
        color:'red',
        textTransform:'uppercase'
    },
    view:{
        width:'81%',
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize:20,
        color:'red',
        textTransform:'uppercase'
    },
    image:{
        width:395,
        height:250,
    },
    bottom:{
        height: '100%',
        alignItems: 'center',
        marginTop: 40
    },
    input:{
        height: 40,
        width: '80%',
        marginTop: 10,
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