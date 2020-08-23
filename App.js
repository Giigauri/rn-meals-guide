import React, { useState } from 'react'
import { AppLoading } from 'expo'
import { AppNavigation } from './navigation/MealsNavigator'
import { enableScreens } from 'react-native-screens'
import { bootstrap } from './bootstrap'
import { Provider } from 'react-redux'
import store from './store'

enableScreens()

export default function App() {
    const [fontLoaded, setFontLoaded] = useState(false)

    if (!fontLoaded) {
        return (
            <AppLoading 
                startAsync={bootstrap}
                onFinish={() => setFontLoaded(true)}
                onError={error => console.log(error)}
            />
        )
    }

    return (
        <Provider store={store}>
            <AppNavigation />
        </Provider>
    )
}