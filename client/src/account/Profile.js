import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import React, { useEffect, useState } from 'react'
import apiUrl from '../utils/apiUrl'

export default function Profile({navigation, route}) {
  const {userId} = route.params
  const id =userId

  const handleNavi = () => {
    navigation.navigate('Navi', {userId: id})
  }

  const handleEdit = () => {
    navigation.navigate('Edit',  {userId: id})
  }

  const [data, setData] = useState([])
  const url = apiUrl.getAPIURL(`/user/${userId}`)
  const getUser = () => {fetch(url)
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
      getUser()
    });
  
    return unsubscribe;
  }, [navigation])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleNavi}>
          <Ionicons name="arrow-back-outline" size={35} color="#000000" />
        </TouchableOpacity>
        <View style={styles.view}>
          <Text style={styles.texthader}>PROFILE</Text>
        </View>
      </View>
      <View style={styles.top}>
        <View style={{width:150,flexDirection:'row'}}>
          <Image style={styles.image} source={require('../../assets/avatar.png')} />
          <TouchableOpacity onPress={handleEdit} style={styles.icon}> 
            <FontAwesome5 name='edit' size={25} color="#000000" />
          </TouchableOpacity> 
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={styles.row}>
          <View style={{width:120}}>
            <Text style={styles.text}>FullName: </Text>
          </View>
          <View>
            <Text style={{fontSize:20,textAlign:'right',textTransform:'uppercase'}}>{data.name}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width:120}}>
            <Text style={styles.text}>Gender: </Text>
          </View>
          <View>
            <Text style={styles.text}>{data.gender}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width:120}}>
            <Text style={styles.text}>Phone: </Text>
          </View>
          <View>
            <Text style={styles.text}>0{data.phone}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width:120}}>
            <Text style={styles.text}>Address: </Text>
          </View>
          <View>
            <Text style={styles.text}>{data.address}</Text>
          </View>
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
  texthader:{
    fontSize:20,
    color:'red',
    textTransform:'uppercase'
  },
  top:{
    width:'100%',
    height:160,
    paddingTop:15,
    alignItems:'center'
  },
  image:{
    width:150,
    height:150,
    borderRadius:100
  },
  icon:{
    width:30,
    height:25,
    marginTop:130,
    marginLeft:-35
  },
  bottom:{
    width:'100%',
    height:300,
    marginTop:10,
  },
  row:{
    width:'100%',
    height:30,
    flexDirection:'row',
    marginTop:10,
    paddingLeft:35
  },
  text:{
    fontSize:20,
    textAlign:'right'
  }
})