import React, {useReducer, useContext} from 'react'
import {TodoContext} from './todoContext'
import { todoReducer } from './todoReducer';
import { ADD_TODO, REMOVE_TODO, SHOW_LOADER, UPDATE_TODO, HIDE_LOADER, SHOW_ERROR, CLEAR_ERROR, FETCH_TODOS } from './../types';
import { ScreenContext } from './../screen/screenContext';
import {Alert} from 'react-native'


export const TodoState =({children})=>{
    const initianalState = {
        todos: [],
        loading: false,
        error: null
    }
    const {changeScreen} = useContext(ScreenContext)
    const [state, dispatch] = useReducer(todoReducer, initianalState)

    const addTodo = async title => {
      const response = await fetch('https://react-native-70a4a.firebaseio.com/todos.json',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
      }) 
      const data = await response.json()
      dispatch({type: ADD_TODO, title, id: data})
    }

    const removeTodo = id => {
        const todo = state.todos.find(t => t.id === id) 
        Alert.alert(
            'Удаление элемента',
            `Вы уверены, что хотите удалить ${todo.title}?`,
            [
              {
                text: "Отмена",
                style: "Cancel"
              },
              { text: "Да", style: "positive", onPress: async () => {
                
                await fetch(`https://react-native-70a4a.firebaseio.com/todos/${id}.json`, {
                  method: 'DELETE',
                  headers: {'Content-Type': 'application/json'}
                })
                changeScreen(null)
                dispatch({type: REMOVE_TODO, id})
              } }
            ],
            { cancelable: false }
          );
        
    }
    const fetchTodos = async () => {
      showLoader()
      clearError()
      console.log(`2222`)
      try {
        const response = await fetch('https://react-native-70a4a.firebaseio.com/todos.json',{
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        if (!data){
          console.log(`!!!!`)
          return {}
        }
        const todos = Object.keys(data).map( key => {
          return {
            ...data[key], id: key
          }
        })
        dispatch({type: FETCH_TODOS, todos})
      } catch (e) {
        showError('Что-то пошло не так...get')
        console.log(e)
      } finally{
        hideLoader()
      }
      
    }


    const updateTodo = async (id, title) => {
      clearError()
      try {
        await fetch(`https://react-native-70a4a.firebaseio.com/todos/${id}.json`,{
          method: 'PATCH',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({title})
        })
        dispatch({type: UPDATE_TODO, id, title})
      } catch (e) {
        showError('Что-то пошло не так...')
        console.log(e)
      }

     
    }
    
    const showLoader = () => dispatch({type: SHOW_LOADER})
    
    const hideLoader = () => dispatch({type: HIDE_LOADER})
    
    const showError = (error) => dispatch({type: SHOW_ERROR, error})
    
    const clearError = () => dispatch({type: CLEAR_ERROR})
    
    return (
    <TodoContext.Provider 
        value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        updateTodo,
        removeTodo,
        showLoader,
        hideLoader,
        showError,
        clearError,
        fetchTodos
    }}
        >{children}
    </TodoContext.Provider>)
}
