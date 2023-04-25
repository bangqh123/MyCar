import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import React, { useEffect, useState } from 'react'
import apiUrl from '../utils/apiUrl'

export default function CarDis({navigation, route}) {
  const {carId} = route.params
  const {userId} = route.params
  const id = userId

  const handleGoToNavi = () => {
    navigation.navigate('Navi', {userId: userId})
  }
  const [data, setData] = useState([])
  const [owner, setOwner] = useState([])

  const url = apiUrl.getAPIURL(`/car/${carId}`)
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

  const getOwner = async () => {
    try {
      const res = await fetch(url)
      .then(res => res.json())
      .then(owner => {
          setOwner(owner.user)
      })
      .catch(error => {
          console.log(error)
          setData('Unable to connect to API')
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
      getCar(),
      getOwner()
  }, [])

  const handleBooking = () => {
    navigation.navigate('Booking', {userId: id, carId: carId, price: data.price})
  }

  return (
    <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoToNavi}>
            <Ionicons name="arrow-back-outline" size={35} color="#000000" />
          </TouchableOpacity>
          <View style={styles.view}>
            <Text style={styles.text}>{data.name}</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.body}>    
            <Image style={styles.image} source={require('../../assets/1.png')}/>
            <View style={styles.name}>
              <View style={{width:250,marginLeft:10,justifyContent:'center'}}>
                <Text style={{fontSize:20,textTransform:'uppercase'}}>{data.name}</Text>
              </View>
              <View style={{width:140,justifyContent:'center',}}>
                <Text style={{fontSize:20,textAlign:'right',textTransform:'capitalize'}}>${data.price}/day</Text>
              </View>
            </View>
            
            <View>
              <View>
                <Text style={{marginLeft:5,fontSize:20}}>FEATURE</Text>
              </View>
              <View style={styles.featured}>
                  <View style={{width:300,height:40, alignItems:'center',flexDirection:'row'}}>
                    <MaterialCommunityIcons name="seat" size={40} color="#000000"/>
                    <Text style={{fontSize:20}}>{data.seat} Seat</Text>
                  </View>
                  <View style={{width:300,alignItems:'center',flexDirection:'row'}}>
                    <Image style={{width:40,height:40,}} source={require('../../assets/gearbox.png')}/>
                    <Text style={{fontSize:20, textTransform:'capitalize'}}>{data.classify}</Text>
                  </View>
                  <View style={{width:300, alignItems:'center',flexDirection:'row'}}>
                    <MaterialCommunityIcons name="fuel" size={40} color="#000000"/>
                    <Text style={{fontSize:20}}>Gasoline</Text>
                  </View>
                </View>
              </View>

              <View style={styles.mortgage}>
                <Text style={{marginLeft:5,fontSize: 20}}>MORTGAGE</Text>
                <Text style={{marginLeft:5}}>15 million(cash/transfer) or property of equivalent value</Text>
              </View>

              <View style={styles.rule}>
                <Text style={{marginLeft:5,fontSize: 20}}>RULES</Text>
                <Text style={{marginLeft:5}}>1.Use the vehicle for the right purpose</Text>
                <Text style={{marginLeft:5}}>2.Do not use for illegal or illegal purposes</Text>
                <Text style={{marginLeft:5}}>3.Do not use for pledge or mortgage purposes</Text>
                <Text style={{marginLeft:5}}>4.No smoking, chewing gum, littering in the car</Text>
                <Text style={{marginLeft:5}}>5.Do not carry prohibited or flammable goods</Text>
                <Text style={{marginLeft:5}}>6.Do not carry food with strong odors in the vehicle</Text>
                <Text style={{marginLeft:5}}>7.When returning the car, please wash it or send a cleaning surcharge</Text>
                <Text style={{marginLeft:5}}>8.Please fill up the tank with gas before returning the car</Text>
              </View>   

              <View style={styles.owner}>
                <Text style={{marginLeft:5,fontSize: 20}}>OWNER CAR</Text>
                <View style={{flexDirection:'row', marginLeft:20}}>
                  <View style={{width:250,alignContent:'center',justifyContent:'center',}}>
                    <Text style={{fontSize:18}}>Name: {owner.name}</Text>
                    <Text style={{fontSize:18}}>Phone: 0{owner.phone}</Text>
                  </View>
                  <View>
                    <Image style={{width:80,height:80,borderRadius:100, marginBottom: 10}} source={require('../../assets/avatar.png')}/>
                  </View>
                </View>
              </View>

              <TouchableOpacity onPress={handleBooking}>
                <View style={styles.book}>
                  <Text style={{height:50,width:250,textAlign:'center',textAlignVertical:'center',backgroundColor:'#238E28',fontSize:20,color:'#ffffff',marginVertical:5}}>BOOKING</Text>  
                </View>   
              </TouchableOpacity>
               
              <View style={styles.feedback}>
                <Text style={{marginLeft:5,fontSize: 20}}>FEEDBACK</Text>
                <View style={{flexDirection:'row'}}>
                  <View><Image style={{width:80,height:80,borderRadius:100,marginLeft:5,marginVertical:5}}source={require('../../assets/avatar.png')}/></View>
                  <View style={{marginLeft:10}}>
                    <Text style={{fontSize:18}}>Name</Text>
                    <Text>5<Entypo name="star" size={15} color="#7BDF98"></Entypo></Text>
                    <Text>Comment</Text>
                  </View>
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
  view:{
      width:'84%',
      alignItems:'center',
      justifyContent:'center'
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
    width:395,
    height:250,
  },
  name:{
    borderTopWidth:1,
    borderBottomWidth:1,
    flexDirection:'row',
  },
  featured:{
    paddingLeft:20,
    borderBottomWidth:1,
    justifyContent:'center',
  },
  mortgage:{
    borderBottomWidth:1,
  },
  rule:{
    borderBottomWidth:1,
  },
  book:{
    height:60,
    alignItems:'center',
    borderBottomWidth:1,
  },
  feedback:{
    marginBottom:10
  }
})