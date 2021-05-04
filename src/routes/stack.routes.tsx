import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import colors from '../styles/colors';
import react from 'react';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantsSelect } from '../pages/PlantsSelect';

const stackRoutes = createStackNavigator()

const AppRoutes: react.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}
    >
        <stackRoutes.Screen
            name="Welcome"
            component={Welcome}
         />

        <stackRoutes.Screen
            name="UserIdentification"
            component={UserIdentification}
         />

        <stackRoutes.Screen
            name="Confirmation"
            component={Confirmation}
         />

        <stackRoutes.Screen
            name="PlantsSelect"
            component={PlantsSelect}
         />

    </stackRoutes.Navigator>
)

export default AppRoutes;
