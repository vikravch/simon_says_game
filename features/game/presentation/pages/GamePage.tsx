import React, {useRef, useState} from 'react';
import {Button, Pressable, StyleSheet, Text, View} from "react-native";
import {SimonItem} from "../../../../general/types/SimonItem.ts";
import {testCurrentSequence} from "../../domain/use_cases/testCurrentSequence.ts";
import {generateSequence} from "../../domain/use_cases/generateNewSequence.ts";


function GamePage() {
    const [isGameStarted, setGameStarted] = useState(false);
    const [isShowErrorMessage, setShowErrorMessage] = useState(false);

    const gameSequence = useRef<Array<SimonItem>>([]);
    const currentSequence = useRef<Array<SimonItem>>([]);
    const onHandleStartBtnClick = ()=>{
        setGameStarted(true);
        setShowErrorMessage(false);
        gameSequence.current = generateSequence(gameSequence.current.length+1);
        console.log('Game sequence generated - '+gameSequence.current)
    }

    const onHandleSimonItemClick = (itemClicked: SimonItem)=>{
        console.log('Clicked on - '+itemClicked);
        const newUserSequence = currentSequence.current.concat(itemClicked);
        console.log('New user sequence - '+newUserSequence+' current sequence - '+currentSequence.current);
        try{
            if(testCurrentSequence(newUserSequence, gameSequence.current)){
                currentSequence.current = newUserSequence;
                console.log('Deal with this sequence!');
            } else {
                console.log('Error with this sequence!');
                gameSequence.current = [];
                currentSequence.current = [];
                setGameStarted(false);
                setShowErrorMessage(true);
            }
        } catch (e) {
            if(e === 'Finish'){
                console.log('Finish this sequence!');
                gameSequence.current = generateSequence(gameSequence.current.length+1);
                console.log('New sequence - '+gameSequence.current);
                currentSequence.current = [];
            }
        }
    }

    return (
        <View>
            {(isShowErrorMessage)&&<Text>Error!!!!</Text>}
            <Pressable style={[styles.gameItemButton, styles.itemR]} onPress={()=>onHandleSimonItemClick('R')}><Text>R</Text></Pressable>
            <Pressable style={[styles.gameItemButton, styles.itemG]} onPress={()=>onHandleSimonItemClick('G')}><Text>G</Text></Pressable>
            <Pressable style={[styles.gameItemButton, styles.itemY]} onPress={()=>onHandleSimonItemClick('Y')}><Text>Y</Text></Pressable>
            <Pressable style={[styles.gameItemButton, styles.itemB]} onPress={()=>onHandleSimonItemClick('B')}><Text>B</Text></Pressable>
            <Button title={'Start'} onPress={onHandleStartBtnClick} disabled={isGameStarted}/>
        </View>
    );
}


const styles = StyleSheet.create({
   gameItemButton: {
       display: 'flex',
       height: 48,
       width: 48,
       justifyContent: 'center',
       alignItems: 'center'
   },
   itemR: {
       backgroundColor: 'red'
   },
   itemG: {
       backgroundColor: 'green'
   },
   itemY: {
       backgroundColor: 'yellow'
   },
   itemB: {
       backgroundColor: 'blue'
   }
});

export default GamePage;