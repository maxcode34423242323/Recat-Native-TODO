import React, {useState} from 'react';
import * as Font from 'expo-font'
import {AppLoading} from 'expo'
import { MainLoyout } from './src/MaiLoyout';
import { TodoState } from './src/context/todo/TodoState';
import { ScreenState } from './src/context/screen/screenState';



async function loadApplication (){
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}
export default function App() {
  const [isReady, setIsReady] = useState(null)


  if (!isReady){
    return <AppLoading 
    startAsync={loadApplication} 
    onError={err => console.log(err)}
    onFinish={()=> setIsReady(true)}
    />
  } 

 

  return (
    <ScreenState>
      <TodoState>
        <MainLoyout/>
        </TodoState> 
    </ScreenState>
       
  );
}

