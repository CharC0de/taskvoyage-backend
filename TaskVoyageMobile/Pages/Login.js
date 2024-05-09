import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, Avatar, Card, TextInput, Button } from 'react-native-paper'
import { View, TouchableOpacity, Link } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'

export default function Login() {
    const [formData, setFormData] = useState({
        user: '',
        password: '',
    });
    const [error, setError] = useState('');
    const navigation = useNavigation()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://172.20.10.5:8000/api/login/', formData);

            if (response.status === 200) {
                console.log('User logged in successfully');
                navigate('/dashboard');
            } else {
                const data = response.data;
                setError(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const toRegister = () => {
        navigation.navigate('Register')
    }

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#BCA89F'}}>
        <View>
            <Avatar.Image size={300} source={require('../assets/ship.png')} style={{backgroundColor:'rgba(0,0,0,0)'}}/>
        </View>
        <View style={{marginBottom:30}}>
            <Text style={{fontSize: 30}}>TaskVoyage</Text>
        </View>
        <View style={{width:'80%'}}>
            <Card style={{backgroundColor:'#B27846'}}>
                <Card.Content>
                    <TextInput style={{backgroundColor:'#F5F5F5'}} 
                               label="E-mail" 
                               activeUnderlineColor='#F5F5F5' 
                               keyboardType='email-address' />
                    <TextInput style={{marginTop:10, backgroundColor:'#F5F5F5'}} 
                               label="Password" 
                               activeUnderlineColor='#F5F5F5' 
                               secureTextEntry={pVisibility}  
                               right={<TextInput.Icon icon={eyeIcon} onPress={showPass}/>}/>
                    <Button textColor='#f5f5f5' style={{alignSelf:'flex-end'}}>Forgot Password?</Button>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', backgroundColor:'#F5F5F5', padding:10, borderRadius:10}} onPress={handleSubmit}>
                        <Text style={{fontWeight:'bold'}}>Log-in</Text>
                    </TouchableOpacity>
                    <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop: 10}}>
                        <Text style={{fontWeight:'bold'}}>Don't have an account?</Text>
                        <TouchableOpacity>
                            <Text style={{color:'#f5f5f5', margin: 10, fontWeight:'bold'}} onPress={toRegister}>Sign-up</Text>
                        </TouchableOpacity>
                    </View>
                </Card.Content>
            </Card>
        </View>
    </SafeAreaView>
  )
}
