import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

type Props = {
    title: string;
    onPress: () => void;
    disabled?: boolean;
}
function SgButton({title, onPress, disabled}:Props) {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress} disabled={disabled || false}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default SgButton;
