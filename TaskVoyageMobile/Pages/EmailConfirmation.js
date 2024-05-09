import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native';
import axios from 'axios'

export default function EmailConfirmation() {

  const { uid, token } = useParams();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const confirmEmail = async () => {
            try {
                await axios.get(`http://172.20.10.5:8000/api/confirm-email/${uid}/${token}/`);
                setConfirmationMessage('Email confirmation successful! You can now log in.');
                setErrorMessage('');
            } catch (error) {
                setErrorMessage('Email confirmation failed. Please try again.');
                setConfirmationMessage('');
            }
        };

        confirmEmail();
    }, [uid, token]);

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#BCA89F'}}>
        <View>
            <Text>Email Confirmation</Text>
            { confirmationMessage && (<Text>{confirmationMessage}</Text>)} 
            { errorMessage && (<Text>{errorMessage}</Text>) }
        </View>
    </SafeAreaView>
  )
}
