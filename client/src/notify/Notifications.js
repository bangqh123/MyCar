import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Notifications({navigation}) {
  url=('')
  return (
    <View style={styles.container}>
      <ScrollView style={{backgroundColor:'#ffffff',borderTopWidth:1}}>
        <View style={styles.top}>
          <Image style={styles.image} source={require('../../assets/avatar.png')} />
          <TouchableOpacity>
            <View style={{width:300, height: 70}}>
              <Text style={{paddingLeft:10, textAlign:'center'}}>
                Tương lai thuộc về AI. Tại sao không sử dụng
                nó
                để lấp đầy trang web của bạn với nội dung hấp dẫn,
                tất cả chỉ trong vài phút? Sử dụng Chat GPT không cần mua tài khoản
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  top:{
    height:100,
    width:'100%',
    marginBottom: 5,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#b2bdc0',
  },
  image:{
    height:70,
    width:70,
    borderRadius:100,
    borderWidth: 1,
    marginLeft:10,
    borderColor:'#000000',
  }
})