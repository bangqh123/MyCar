import { StyleSheet,Text,View,Alert,TouchableOpacity,ImageBackground,FlatList, TextInput } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import React, { useEffect, useState } from 'react'
import apiUrl from '../utils/apiUrl'

export default function Home({navigation, route}) {

  const {userId} = route.params
  const id = userId

  const [data, setData] = useState([])
  const [masterData, setmasterData] = useState([])
  const [search, setSearch] = useState('')

  const getAll = async () => {
    try {
      const url = apiUrl.getAPIURL('/car')
      const response = await fetch(url)
      const resJson = await response.json()
      setData(resJson)
      setmasterData(resJson)
    } catch (error) {
      console.error(error)
    }
  }

  const searchCar = (text) =>{
    if(text) {
      const newData = masterData.filter((item) =>{
        const itemData = item.name ? item.name.toUpperCase()
                  : ''.toUpperCase()
        const textData = text.toUpperCase()
        return itemData.indexOf(textData) >-1
      })
      setData(newData)
      setSearch(text)
    } else{
      setData(masterData)
      setSearch(text)
    }
  }

  useEffect(() => {
    getAll()
  }, [])

  const searchFilter = () => {
    Alert.alert('Functions in development')
  }

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.view}>
        <TextInput 
          style={styles.textInput}
          value={search}
          placeholder="Search"
          underlineColorAndroid='transparent'
          onChangeText={(text) =>searchCar(text)}
        />
        </View>
        
        <TouchableOpacity 
          style={{
            width:'16%',
            borderLeftWidth:0.8,
            justifyContent:'center',
            alignItems:'center'
          }}
          onPress={searchFilter}
        >
          <Text>
            <FontAwesome name="filter" size={30} color="#000000" />
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottom}>
        <View style={styles.from}>
          <FlatList
          data={data}
          key={({id}) => id}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity onPress={()=>navigation.navigate('CarDis', {userId: id, carId: item._id})}>
                <View>                  
                  <ImageBackground style={styles.image} source={require('../../assets/2.png')}>
                    <View style={{height:25, marginTop:225, backgroundColor:'#545454', alignItems:'center' ,flexDirection:'row'}}>
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
    flex: 1,
  },
  top:{
    height:65,
    width:'100%',
    borderTopWidth:1,
    borderBottomWidth:1,
    flexDirection:'row',
  },
  view:{
    height:45,
    width:'82%',
    marginHorizontal:5,
    marginVertical:9,
    alignItems:'flex-end',
    justifyContent:'center',
  },
  textInput:{
    borderWidth:1,
    borderRadius: 25,
    height: 45,
    width:'100%',
    paddingLeft: 15,
    marginVertical: 10,
  },
  icon:{
    marginRight:5
  },
  bottom:{
    width:'100%',
    marginTop:5,
    marginBottom: 65,
  },
  from:{
    width:'100%',
    borderBottomWidth:1
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