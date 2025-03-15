import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Content: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Content Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 20,
        color: '#000',
    },
});

export default Content;