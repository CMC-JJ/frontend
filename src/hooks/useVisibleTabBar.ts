import {useCallback} from 'react';
import {Platform} from 'react-native';

export const useShowTabBar = (navigation: any) => {
  return useCallback(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: [
        {
          position: 'absolute',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          backgroundColor: '#ffffff',
          shadowColor: 'rgba(0, 0, 0, 0.25)',
          shadowOffset: {width: 0, height: -3},
          shadowOpacity: 0.5,
          elevation: 10,
        },
        Platform.OS === 'ios' && {height: 96},
      ],
    });
  }, [navigation]);
};
export const useHideTabBar = (navigation: any) => {
  return useCallback(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: {display: 'none'},
    });
  }, [navigation]);
};
