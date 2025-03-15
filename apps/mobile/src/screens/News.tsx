import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface NewsItem {
    id: string;
    title: string;
    content: string;
}

const newsData: NewsItem[] = [
    { id: '1', title: 'News Title 1', content: 'News Content 1' },
    { id: '2', title: 'News Title 2', content: 'News Content 2' },
    // Add more news items here
];

const News: React.FC = () => {
    const renderItem = ({ item }: { item: NewsItem }) => (
        <View style={styles.newsItem}>
            <Text style={styles.newsTitle}>{item.title}</Text>
            <Text style={styles.newsContent}>{item.content}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={newsData}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    newsItem: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f9f9f9',
        borderRadius: 8,
    },
    newsTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    newsContent: {
        fontSize: 14,
        marginTop: 8,
    },
});

export default News;