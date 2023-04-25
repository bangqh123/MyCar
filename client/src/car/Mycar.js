import { StyleSheet, Text, View, TouchableOpacity, ScrollView,ImageBackground, Image, FlatList } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import apiUrl from '../utils/apiUrl'

export default function Mycar({navigation, route}) {

  const {userId} = route.params
  const id = userId
  const url = apiUrl.getAPIURL(`/car/my/${id}`)
  const [data, setData] = useState([])

  console.url

  const getICars = async () => {
    try {
      const res = await fetch(url)
      .then(res => res.json())
      .then(data => {
          setData(data)
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
    const unsubscribe = navigation.addListener('focus', () => {
      getICars()
    })
  
    return unsubscribe
  }, [navigation])

  const handleAddCar = () => {
    navigation.navigate('AddCar', {userId: userId})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={()=>navigation.navigate('Navi', {userId: id})}>
          <Ionicons name="arrow-back-outline" size={35} color="#000000" />
        </TouchableOpacity>
        <View style={styles.view}>
          <Text style={styles.texthead}>MY CAR</Text>
        </View>
        <TouchableOpacity onPress={handleAddCar}>
          <Ionicons name="md-add-circle" size={40} color="#1B400B" />
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <View style={styles.from}>
          <FlatList 
          data={data}
          key={({id}) => id}
          renderItem={({item}) => (
            <View style={{borderBottomWidth: 1}}>
              <TouchableOpacity onPress={()=>navigation.navigate('Detail', {userId: id, carId: item._id})}>
                <View>                  
                  <ImageBackground style={styles.image} source={require('../../assets/2.png')}>
                    <View style={{width: 410,height:25, marginTop:225, backgroundColor:'#545454', alignItems:'center' ,flexDirection:'row'}}>
                      <View style={{width:325}}>
                        <Text style={styles.text}>{item.name}</Text>
                      </View>
                      <View>
                        <Text style={{fontSize:16, color:'#fff',}}>${item.price}/day</Text>
                      </View>
                    </View>
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            </View>
            )}
          />
        </View>
      </View>
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
    width:'81%',
    alignItems:'center',
    justifyContent:'center'
  },
  texthead:{
    fontSize:20,
    color:'red',
    textTransform:'uppercase'
  },
  top:{
    width:'100%',
    height:730,
    alignItems:'center',
    backgroundColor:'#ffffff'
  },
  from:{
    width:'100%',
    marginBottom:122,
  },
  image:{
    width:395,
    height:250,
  },
  text:{
    fontSize:20,
    paddingLeft:2,
    color:'#fff',
  }
})