import React, { useState } from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, TextInput, Card } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
 
export default function SignUp() {
    const navigation = useNavigation()

    const [pVisibility, setPVisibility] = useState(true)
    const [eyeIcon, setIcon] = useState('eye-off')
    const showPass = () => {
        if (pVisibility == true) {
            setPVisibility(false)
            setIcon('eye')
        } else {
            setPVisibility(true)
            setIcon('eye-off')
        }
    }

    const toLogin = () => {
        navigation.navigate('Login')
    }
  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#BCA89F', paddingBottom:50}}>
        <View style={{flexDirection:'row', alignItems:'center', marginVertical:30}}>
            <Icon style={{flex:1, marginHorizontal:20}} name='arrow-left' size={20} onPress={toLogin}/>
            <Text style={{fontSize:30}}>TaskVoyage</Text>
            <View style={{flex:1, marginHorizontal:20}} />
        </View>
        <View style={{width:'80%'}}>
            <Card style={{backgroundColor:'#B27846'}}>
                    <Card.Content>
                        <View style={{margin:10}}>
                            <Text style={{color:'#F5F5F5', fontSize:16}}>Please Fill out these Informations.</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{marginTop: 10, flex:1, marginHorizontal:2.5}}>
                            <TextInput  selectionColor="black" 
                                        underlineColor="transparent"
                                        activeUnderlineColor="#B27846" 
                                        style={{backgroundColor:'white', width: '100%', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height: 50}} 
                                        label="First Name"/>
                            </View>
                            <View style={{marginTop: 10, flex:1, marginHorizontal:2.5}}>
                            <TextInput  selectionColor="black" 
                                        underlineColor="transparent" 
                                        activeUnderlineColor="#B27846" 
                                        style={{backgroundColor:'white', width: '100%', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height: 50}} 
                                        label="Last Name"/>
                            </View>
                        </View>
                        <View style={{marginTop: 10}}>
                        <TextInput  selectionColor="black" 
                                    underlineColor="transparent" 
                                    activeUnderlineColor="#B27846" 
                                    style={{backgroundColor:'white', width: '100%', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height: 50}} 
                                    label="Username"/>
                        </View>
                        <View style={{marginTop: 10}}>
                        <TextInput  selectionColor="black" 
                                    underlineColor="transparent" 
                                    activeUnderlineColor="#B27846" 
                                    style={{backgroundColor:'white', width: '100%', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height: 50}} 
                                    label="Email"/>     
                        </View>
                        <View style={{marginTop: 10}}>
                        <TextInput  selectionColor="black" 
                                    underlineColor="transparent" 
                                    activeUnderlineColor="#B27846"
                                    secureTextEntry={pVisibility} 
                                    right={<TextInput.Icon icon={eyeIcon} 
                                    onPress={showPass}/>} 
                                    style={{backgroundColor:'white', width: '100%', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height: 50}} 
                                    label="Password"/>          
                        </View>
                        <View style={{marginTop: 10}}>
                        <TextInput  selectionColor="black" 
                                    underlineColor="transparent" 
                                    activeUnderlineColor="#B27846" 
                                    secureTextEntry={pVisibility} 
                                    style={{backgroundColor:'white', width: '100%', borderTopLeftRadius:10, borderTopRightRadius:10, borderRadius:10, height: 50}} 
                                    label="Confirm Password"/>           
                        </View>
                        <View style={{flexDirection: "row", justifyContent:'center', alignItems:'center', marginTop: 30, marginHorizontal:10}}>
                            <TouchableOpacity style={{flexDirection:'row', justifyContent:'center', width:100, backgroundColor:'#F5F5F5', padding:10, borderRadius:10}} onPress={toLogin}>
                                <Text style={{fontWeight:'bold'}}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                    </Card.Content>
            </Card>
        </View>
    </SafeAreaView>
  )
}
