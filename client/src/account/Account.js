import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import apiUrl from '../utils/apiUrl'

export default function Account({navigation, route}) {

  const {userId} = route.params
  const id = userId

  const [data, setData] = useState([])
  const url = apiUrl.getAPIURL(`/user/${id}`)
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
    })
  
    return unsubscribe
  }, [navigation])

  const handleGoToPro = () => {
    navigation.navigate('Pro', {userId: id})
  }

  const handleGoToMyCar = () => {
    navigation.navigate('MyCar', {userId: id})
  }

  const handleGoToLogin = () => {
    navigation.navigate('Login')
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <TouchableOpacity onPress={handleGoToPro}>
          <View style={{marginVertical:10,marginLeft:5,flexDirection:'row',alignItems:'center'}}>
            <Image style={{height:100,width:100,borderRadius:100,borderWidth: 1,borderColor:'#000000'}} source={require('../../assets/avatar.png')} />
            <View>
              <Text style={{marginLeft:5,fontSize:20,color:'#fff',textTransform:'uppercase'}}>{data.name}</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <View style={{borderWidth:0.5}}>
          <TouchableOpacity 
            style={styles.opacity1}
            onPress={handleGoToPro}
          >
            <FontAwesome name="vcard-o" size={25} color="#000000" />
            <Text style={styles.text}>Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.opacity1}
            onPress={handleGoToMyCar}
          >
            <AntDesign name="car" size={28} color="#000000" />
            <Text style={styles.text}>My car</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.opacity2}
          onPress={handleGoToLogin}
        >
          <SimpleLineIcons name="logout" size={28} color="#000000" />
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
        <Text style={{fontSize:17,marginTop:10,marginHorizontal:150,color:'#000000'}}>Version:1.0.0</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  top:{
    flex:1,
    height: 50,
    width: 393,
    backgroundColor: '#445e38'
  },
  bottom:{
    flex: 4,
    marginTop: 30,
  },
  opacity1:{
    height: 50,
    width: 400,
    paddingLeft:5,
    borderWidth:0.5,
    flexDirection:'row',
    alignItems: 'center',

  },
  opacity2:{
    width: 400,
    height: 40,
    marginTop: 20,
    paddingLeft:5,
    borderWidth: 1,
    flexDirection:'row',
    alignItems: 'center',
  },
  text:{
    fontSize: 20,
    paddingLeft:5
  }
})