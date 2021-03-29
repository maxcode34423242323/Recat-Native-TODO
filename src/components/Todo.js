import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { AppText } from '../appText';

export const Todo = ({todo, onRemove, onOpen,index}) => {
    
    const longHandler = () =>{
        onRemove(todo.id)
    }
    return (
        <TouchableOpacity 
        activeOpacity={0.5} 
        onPress={() => {
            return onOpen(todo.id)}}
        onLongPress={longHandler}
        >
        
            <View style={styles.todo}>
                <AppText style={styles.text}>{`${index+1}. ${todo.title}`}</AppText>
            </View>
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
    todo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 5,
        marginBottom: 10
    }
})