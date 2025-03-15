import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SecurityScreen: React.FC = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Security Settings</Text>
            {/* Add your security settings components here */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default SecurityScreen;