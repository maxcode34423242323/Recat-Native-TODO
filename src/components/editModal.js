import React,{useState} from 'react'
import {View, StyleSheet, TextInput, Button, Modal, Alert} from 'react-native'
import { THEME } from '../theme'
import { AppButton } from './ui/apppButtons'

export const EditModal = ({visible, onCancel, value, onSave}) => {
    const [title, setTitle] = useState(value)
    const saveHandler =()=>{
        if (title.trim().length < 3){
            Alert.alert('Ошибка', `Минимальная длина названия 3. Cейчас ${title.trim().length} символов`)
        } else {
            onSave(title)
        }
    }
    const cancelHandler =()=>{
        setTitle(value)
        onCancel()
    }
    return (
        <Modal transparent={false} animationType='fade' visible={visible}>
            <View style={styles.wrap}>
                <TextInput onChangeText={setTitle} value={title} maxLength={64} style={styles.input} placeholder='Введите название'/>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={cancelHandler}>Отменить</AppButton>
                    <AppButton onPress={saveHandler}>Сохранить</AppButton>
                </View>
                
                
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        padding: 10,
        borderBottomColor: THEME.MAIN_COLOR,
        borderBottomWidth: 2,
        width: '80%'
    },
    button: {
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})