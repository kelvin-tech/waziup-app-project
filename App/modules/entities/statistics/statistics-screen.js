import React, { Component } from 'react'
import { ScrollView, Text, Image, View, Platform, Button, Dimensions, StyleSheet } from 'react-native'
import { DebugInstructions, ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'
import SensorActions from './sensor.reducer'
import DeviceActions from '../../account/device/device.reducer'

import { Images } from '../../../shared/themes'
import RoomTwo from './room-two'
import styles from './statistics-screen.styles'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import Accordion from 'react-native-collapsible/Accordion';

class StatisticScreen extends Component {
    constructor(props) {
        super(props)
        // Navigation.events().bindComponent(this)
        this.state = {
            fetching: false,
            fetchingDevices: false,
            devices: null,
            sensors: null,
            loading: false,
            activeSections: [],
            sections: [
                {
                    title: 'ROOM ONE',
                    content: `Sorry, there's no data available at this time`
                },
                {
                    title: 'ROOM TWO',
                    content: `Sorry, there's no data available at this time`
                }
            ]
        }
        this.props.getDevices();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        let nextLoading = nextProps.fetching || nextProps.fetchingDevices;
        if (nextLoading !== prevState.loading) {
            return { loading: nextLoading };
        }

        if (nextProps.fetchingDevices !== prevState.fetchingDevices) {
            return { fetchingDevices: nextProps.fetchingDevices };
        }
        else return null;
    }

    componentDidUpdate(prevState, prevProps) {

        if (this.props.devices && !prevProps.devices) {
            this.setState({
                devices: this.props.devices.filter(device => device.owner === 'adubenedict10@gmail.com')
            });
            console.tron.log(this.state.devices)
            console.tron.log(this.props.devices)
        }

        // if (this.props.sensors && !prevProps.sensors) {
        //     this.setState({
        //         sensors: this.props.sensors
        //     });
        //     console.tron.log(this.state.sensors)
        // }
    }

    _renderSectionTitle = section => {
        return (
            <View style={styless.content}>
                <Text>{section.content}</Text>
            </View>
        );
    };

    _renderHeader = section => {
        return (
            <View style={styless.header}>
                <Text style={styless.headerText}>{section.title}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styless.content}>
                <View>{section.content}</View>
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
        console.tron.log(this.state.activeSections)
    };

    render() {
        const { devices, sensors } = this.state;
        const dev = devices ? devices[1] : [];
        return (
            <View style={styles.mainContainer} testID="statisticScreen">
                <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
                    <View style={styles.centered}>
                        <Image source={Images.logoJhipster} style={styles.logo} />
                        <Text style={styles.welcomeText}>{'Welcome to your Ignite JHipster app.'}</Text>
                    </View>
                    <View style={styles.hairline} />
                    <View style={styles.body}>
                        {/* <Accordion
                            sections={this.state.sections}
                            activeSections={this.state.activeSections}
                            // renderSectionTitle={this._renderSectionTitle}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
                        /> */}
                        {devices !== null &&
                            <RoomTwo devices={devices} />
                        }
                        <Button title='Fetch Sensor Data' onPress={() => this.props.getSensorData('b827eb500178_3', 'TC')} />
                        <Button title='Fetch Sensors' onPress={() => this.props.getAllSensors(dev.id)} />
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // for developer convenience
        fetching: state.sensor.fetchingAll,
        fetchingDevices: state.device.fetchingAll,
        devices: state.device.devices,
        sensors: state.sensor.sensors
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // for developer convenience
        getAllSensors: (deviceId) => dispatch(SensorActions.sensorAllRequest(deviceId)),
        getSensorData: (deviceId, sensorId) => dispatch(SensorActions.sensorDataRequest(deviceId, sensorId)),
        getDevices: () => dispatch(DeviceActions.deviceAllRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StatisticScreen);

const styless = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        // paddingTop: Constants.statusBarHeight,
    },
    title: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginBottom: 20,
    },
    header: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    headerText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '500',
    },
    content: {
        padding: 20,
        backgroundColor: '#fff',
    },
    active: {
        backgroundColor: 'rgba(255,255,255,1)',
    },
    inactive: {
        backgroundColor: 'rgba(245,252,255,1)',
    },
    selectors: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    selector: {
        backgroundColor: '#F5FCFF',
        padding: 10,
    },
    activeSelector: {
        fontWeight: 'bold',
    },
    selectTitle: {
        fontSize: 14,
        fontWeight: '500',
        padding: 10,
    },
    multipleToggle: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 30,
        alignItems: 'center',
    },
    multipleToggle__title: {
        fontSize: 16,
        marginRight: 8,
    },
});