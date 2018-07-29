import React from 'react';
import { createStackNavigator } from 'react-navigation';
import ScreenComponentMovies from './ScreenMovies'
import ScreenComponentDetail from './ScreenDetails'

const AppNavigator = createStackNavigator({
  ScreenMovies: ScreenComponentMovies,
  ScreenDetail: ScreenComponentDetail,
  initialRouteName: 'ScreenMovies',
});

export default AppNavigator;
