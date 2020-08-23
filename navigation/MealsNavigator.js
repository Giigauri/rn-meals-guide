import React from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'

import { CategoriesScreen } from '../screens/CategoriesScreen'
import { CategoryMealScreen } from '../screens/CategoryMealScreen'
import { FavoritesScreen } from '../screens/FavoritesScreen'
import { FiltersScreen } from '../screens/FiltersScreen'
import { MealDetailScreen } from '../screens/MealDetailScreen'

import { Platform, Text } from 'react-native'
import { COLORS } from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? COLORS.PRIMARY_COLOR : COLORS.WHITE
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? COLORS.WHITE : COLORS.PRIMARY_COLOR,
    headerTitle: 'A Screen'
}

const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen
        },
        CategoryMeal: {
            screen: CategoryMealScreen,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: Platform.OS === 'android' ? COLORS.PRIMARY_COLOR : COLORS.WHITE
                },
                headerTintColor: Platform.OS === 'android' ? COLORS.WHITE : COLORS.PRIMARY_COLOR
            }
        },
        MealDetail: MealDetailScreen
    }, 
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen
    }, 
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: COLORS.PRIMARY_COLOR,
            tabBarLabel: Platform.OS === 'android' 
                ? <Text style={{fontFamily: 'open-sans-bold'}}>Meals</Text> 
                : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: COLORS.ACCENT_COLOR,
            tabBarLabel: Platform.OS === 'android' 
                ? <Text style={{fontFamily: 'open-sans-bold'}}>Favorites</Text> 
                : 'Favorites'
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android' 
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeTintColor: 'white',
        shifting: true,
        barStyle: {
            backgroundColor: COLORS.PRIMARY_COLOR
        }
    }) 
    : createBottomTabNavigator(
        tabScreenConfig,
        {
            tabBarOptions: {
                labelStyle: {
                    fontFamily: 'open-sans'
                },
                activeTintColor: COLORS.ACCENT_COLOR
            }
        }
    )

const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen
    },
    {
        defaultNavigationOptions: defaultStackNavOptions
    }
)

const MainNavigator = createDrawerNavigator(
    {
        MealsFavs: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals'
            }
        },
        Filters: FiltersNavigator
    },
    {
        contentOptions: {
            activeTintColor: COLORS.ACCENT_COLOR,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    }
)

export const AppNavigation = createAppContainer(MainNavigator)