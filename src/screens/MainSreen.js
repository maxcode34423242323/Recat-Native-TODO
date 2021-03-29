import React, {useState, useEffect, useContext,useCallback}  from 'react';
import {StyleSheet, View, FlatList, Image, Dimensions, Text} from 'react-native'
import { AddTodo } from '../components/addTODO';
import { Todo } from '../components/Todo';
import { THEME } from '../theme';
import { TodoContext } from './../context/todo/todoContext';
import { ScreenContext } from './../context/screen/screenContext';
import { AppLoader } from '../components/ui/AppLoader';
import { AppText } from '../appText';
import { AppButton } from '../components/ui/apppButtons';

export const MainSreen = () => {
    const {addTodo, todos, removeTodo, fetchTodos, loading, error} = useContext(TodoContext)
    const {changeScreen} = useContext(ScreenContext)
    const [deviceWidth, setDeviceWidth] = useState(Dimensions.get('window').width - THEME.PADDING_HORIZONTAL*2)
    
    const loadsTodos = useCallback( async()=> await fetchTodos(), [fetchTodos])
    
    
    useEffect(()=>{
        loadsTodos()
    },[])
    
    useEffect(()=>{
        const update =() => {
            const width = Dimensions.get('window').width - THEME.PADDING_HORIZONTAL*2
            setDeviceWidth(width)
        }
        Dimensions.addEventListener('change', update)
        return ()=> {
            Dimensions.removeEventListener('change', update)
        }
    })
    if (error){
        return (
            <View style={styles.center}>
                <AppText style={styles.error}>{error}</AppText>
                <AppButton onPress={loadsTodos}>Повторить</AppButton>
            </View>
        )
    }
    if (loading){
        return <AppLoader/>
    }
    let content = (
        <View style={{width: deviceWidth}}>
            <FlatList
                keyExtractor={item => item.id.toString()}
                data={todos}
                renderItem={({item,index})=>  <Todo index={index} onRemove={removeTodo} onOpen={changeScreen} todo={item}/>}
            />
        </View> 
        )

    if (todos.length === 0) {
        content = 
            <View style={styles.imgWrap}>
                <Image style={styles.img} source={require('../../assets/pen_77896.png')} />
            </View> 
    }
    return (
        <View>
            <AddTodo onSubmit={addTodo}/>
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    imgWrap: {
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        height: 300
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.2
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center'
    },
    error: {
        fontSize: 20,
        color: THEME.DANGER_COLOR
    }
})