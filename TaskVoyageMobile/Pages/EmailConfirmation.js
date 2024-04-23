import React, { useState, useEffect } from 'react'
import { View } from 'react-native';
import { Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native';
import axios from 'axios'

export default function EmailConfirmation() {

  return (
    <SafeAreaView style={{flex:1, justifyContent:'center', alignItems:'center', backgroundColor: '#BCA89F'}}>
        <View>
            <Text>Email Confirmation</Text>
            {/* {confirmationMessage && <Text>{confirmationMessage}</Text>} */}
            {/* {errorMessage && <Text>{errorMessage}</Text>} */}
        </View>
    </SafeAreaView>
  )
}
