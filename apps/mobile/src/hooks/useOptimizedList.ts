// src/hooks/useOptimizedList.ts
import { useMemo } from 'react';
import { FlatList } from 'react-native';

export const useOptimizedList = (data: any[]) => {
  return useMemo(() => (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      initialNumToRender={10}
      maxToRenderPerBatch={5}
      windowSize={7}
      removeClippedSubviews
      renderItem={({ item }) => <ListItem item={item} />}
    />
  ), [data]);
};