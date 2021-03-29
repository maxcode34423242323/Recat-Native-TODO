import React,{useState} from 'react'
import {View, StyleSheet,TextInput, Keyboard , Alert} from 'react-native'
import { THEME } from '../theme'
import { SimpleLineIcons } from '@expo/vector-icons'; 

export const AddTodo = ({onSubmit}) => {
    const [value, setValue] = useState('')
    const pressHandler = () => {
        if (value.trim()){
            onSubmit(value)
            setValue('')
            Keyboard.dismiss()
        } else {
            Alert.alert('Напиши текст, Мудила!!!')
        }
        
    }


    return (
        <View style={styles.block}>
            <TextInput 
                style={styles.input}
                onChangeText={setValue}
                value={value}
                placeholder='Эй, пиши сюда задачи...'
            />
            <SimpleLineIcons.Button onPress={pressHandler} color='white' name='plus' size={24}>
                Добавить
            </SimpleLineIcons.Button>
            {/* <Button onPress={pressHandler} title='Добавить'/> */}
        </View>
    )
}

const styles = StyleSheet.create({
    block: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    input:{
        width: '60%',
        padding: 10,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: THEME.MAIN_COLOR,
        fontSize: 17
    },
    button: {
        
    }
})