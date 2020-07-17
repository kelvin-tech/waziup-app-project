import React from 'react'
import { ScrollView, Text, Image, View, Platform, Button, Linking } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'

import { Images } from '../../shared/themes'
import styles from './statistics-screen.styles'

export default class StatisticScreen extends React.Component {
    constructor(props) {
        super(props)
        // Navigation.events().bindComponent(this)
    }

    componentDidAppear() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    enabled: true,
                    visible: false,
                },
            },
        })
    }

    showSideMenu() {
        Navigation.mergeOptions(this.props.componentId, {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        })
    }

    navigationButtonPressed({ buttonId }) {
        this.showSideMenu()
    }

    render() {
        return (
            <View style={styles.mainContainer} testID="statisticScreen">
                <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                    <View style={styles.centered}>
                        <Image source={Images.logoJhipster} style={styles.logo} />
                        <Text style={styles.welcomeText}>{'Welcome to your Ignite JHipster app.'}</Text>
                    </View>
                    <View style={styles.hairline} />
                    {/* <Header /> */}
                    <View style={styles.body}>
                        <Button title='Create User' onPress={() => Linking.openURL('https://dashboard.waziup.io/')} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}
