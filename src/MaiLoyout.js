import React, {useState, useContext} from 'react'
import {View, StyleSheet, StatusBar,Alert} from 'react-native'
import { Navbar } from './components/navBar'
import { THEME } from './theme'
import { MainSreen } from './screens/MainSreen';
import { TodoScreen } from './screens/TodoScreen';
import { TodoContext } from './context/todo/todoContext';
import { ScreenContext } from './context/screen/screenContext';


export const MainLoyout = () =>{
    const {todoId} = useContext(ScreenContext)
 
    return (
        <View style={styles.wrapper} >
            <Navbar title='ToDo App'/>
            <View style={styles.container}>
                { todoId ? <TodoScreen/> : <MainSreen/> }
            </View>
            <StatusBar style="auto"/>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
      paddingHorizontal: THEME.PADDING_HORIZONTAL,
      paddingVertical: 20,
      flex: 1
    }, 
    wrapper: {
        flex: 1
    }
  });
  