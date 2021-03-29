import React,{useState, useContext}  from 'react';
import {StyleSheet, View, Dimensions} from 'react-native'
import { THEME } from './../theme';
import { AppCard } from './../components/ui/AppCard';
import { EditModal } from '../components/editModal';
import { AppTextBold } from './../appTextBold';
import { AppButton } from '../components/ui/apppButtons';
import {FontAwesome, AntDesign} from '@expo/vector-icons'
import { TodoContext } from './../context/todo/todoContext';
import { ScreenContext } from './../context/screen/screenContext';

export const TodoScreen = () => {
    const {todos, updateTodo, removeTodo} = useContext(TodoContext)
    const {todoId, changeScreen} = useContext(ScreenContext)
    const [modal, setModal] = useState(false)

    const todo = todos.find( t => t.id === todoId)

    const saveHandler = async (title) =>{
        await updateTodo(todo.id, title)
        setModal(false)
    }


    
    return (
        <View>
            <EditModal onSave={saveHandler} value={todo.title} onCancel={()=> setModal(false)} visible={modal}/>
            <AppCard styles={styles.card}>
                 <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
                 <AppButton onPress={()=> setModal(true)}><FontAwesome size={20} name='edit'/></AppButton>
            </AppCard>
            <View style={styles.buttons}>
                <View style={styles.button}>
                    <AppButton color={THEME.GREY_COLOR} onPress={() => changeScreen(null)}>
                        <AntDesign name='back' size={20} color='white'/>
                    </AppButton>
                </View>
                <View style={styles.button}>
                    <AppButton color={THEME.DANGER_COLOR} onPress={()=> removeTodo(todo.id)}>
                        <FontAwesome name='remove' size={20} color='white'/>
                    </AppButton>
                </View>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    buttons: {
        
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    card:{
        marginBottom: 20,
        padding: 15
    },
    button: {
        width: Dimensions.get('window').width / 3
    },
    title: {
        fontSize: 20
    }
})