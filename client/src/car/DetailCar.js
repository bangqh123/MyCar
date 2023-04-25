import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Octicons from 'react-native-vector-icons/Octicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useEffect, useState } from 'react'
import apiUrl from '../utils/apiUrl'

export default function DetailCar({navigation, route}) {
  const {carId} = route.params
  const {userId} = route.params
  const id = carId

  const handleGoToNavi = () => {
    navigation.navigate('MyCar', {userId: userId})
  }
  const handleEditCar = () => {
    navigation.navigate('EditCar', {userId: userId, carId: id })
  }
  const [data, setData] = useState([])
  const url = apiUrl.getAPIURL(`/car/${id}`)
  const getCar = () => {fetch(url)
    .then(response => response.json())
    .then(data => {
        setData(data)
    })
    .catch(error => {
        console.log(error)
        setData('Unable to connect to API')
    })
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCar()
    })
  
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoToNavi}>
            <Ionicons name="arrow-back-outline" size={35} color="#000000" />
          </TouchableOpacity>
          <View style={styles.view}>
            <Text style={styles.text}>{data.name}</Text>
          </View>
          <TouchableOpacity onPress={handleEditCar}>
            <FontAwesome5 name="edit" size={25} color="#000000" />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View style={styles.body}>    
            <Image style={styles.image} source={require('../../assets/2.png')}/>
            <View style={styles.name}>
              <View style={{width:325}}>
                <Text style={{fontSize:25,textTransform:'capitalize'}}>{data.name}</Text>
              </View>
              <View>
                <Text style={{fontSize:20,textTransform:'capitalize'}}>${data.price}/day</Text>
              </View>
            </View>
            
            <View style={{width:400, alignItems:'center',flexDirection:'row', marginTop: 5}}>
                <View style={{width:130, alignItems:'center'}}>
                  <MaterialCommunityIcons name="seat" size={40} color="#000000"/>
                  <Text style={{fontSize:25, textTransform:'capitalize'}}>{data.seat} Seat</Text>
                </View>
                <View style={{width:130,alignItems:'center'}}>
                  <Octicons name='gear' size={36} color="#000000" style={{marginTop: 5}}/>
                  <Text style={{fontSize:25, textTransform:'capitalize'}}>{data.transmission}</Text>
                </View>
                <View style={{width:130, alignItems:'center'}}>
                  <MaterialCommunityIcons name="fuel" size={40} color="#000000"/>
                  <Text style={{fontSize:25, textTransform:'capitalize'}}>{data.fuel}</Text>
                </View>  
              </View>      
          </View>
        </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
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
    width:420,
    height:260,
  },
  name:{
    width: 410,
    height:35,
    alignItems:'center',
    flexDirection: 'row',
    borderTopWidth:1,
    borderBottomWidth:1,
  },
})