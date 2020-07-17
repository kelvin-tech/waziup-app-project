import React from 'react'
import PropTypes from 'prop-types'
import { Alert, Image, View, ScrollView, Text, TextInput, TouchableOpacity, Linking } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { connect } from 'react-redux'

import styles from './login-screen.styles'
import { Images, Metrics } from '../../shared/themes'
import LoginActions from './login.reducer'
import Toast from 'react-native-simple-toast';
import { truncate } from 'lodash'

class LoginScreen extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    fetching: PropTypes.bool,
    attemptLogin: PropTypes.func,
  }

  constructor(props) {
    super(props)
    Navigation.events().bindComponent(this)
    this.state = {
      username: '',
      password: '',
      visibleHeight: Metrics.screenHeight,
      topLogo: {
        width: Metrics.screenWidth,
        height: 230
      },
    }
  }

  componentDidUpdate(prevProps) {
    if (!this.props.fetching) {
      if (prevProps.fetching && this.props.error) {
        Alert.alert('Error', this.props.error, [{ text: 'OK' }])
      }
      if (!prevProps.account && this.props.account) {
        Navigation.dismissModal(this.props.componentId)
      }
    }
  }

  waziLogin = async credentials => {
    try {
      await this.props.getAuth(credentials)
    } catch (error) {
      console.tron.log('Error logging in' + error)
    }
  }

  handlePressLogin = () => {
    const credentials = {
      username: this.state.username,
      password: this.state.password
    }
    // attempt a login - a saga is listening to pick it up from here.
    if (this.state.username) {
      Toast.showWithGravity('Please input username')
    } else if (this.state.password) {
      Toast.showWithGravity('Please input password')
    } else if (credentials) {
      { this.waziLogin(credentials) }
    }
  }

  handlePressCancel = () => {
    Navigation.dismissModal(this.props.componentId)
  }

  handleChangeUsername = (text) => {
    this.setState({ username: text })
  }

  handleChangePassword = (text) => {
    this.setState({ password: text })
  }

  render() {
    const { username, password } = this.state
    const { fetching } = this.props
    const editable = !fetching
    const textInputStyle = styles.textInput 
    return (
      <View
        contentContainerStyle={styles.contentContainer}
        style={[styles.container, { height: this.state.visibleHeight }]}
        keyboardShouldPersistTaps="always">
        <Image source={Images.logoLogin} style={[styles.topLogo, this.state.topLogo]} />
        <View style={styles.form}>
          <View style={styles.row}>
            <Text style={styles.rowLabel}>Username</Text>
            <TextInput
              ref={(c) => {
                this.usernameInput = c
              }}
              testID="loginScreenUsername"
              style={textInputStyle}
              value={username}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={this.handleChangeUsername}
              underlineColorAndroid="transparent"
              onSubmitEditing={() => this.passwordInput.focus()}
              placeholder="Username"
            />
          </View>

          <View style={styles.row}>
            <Text style={styles.rowLabel}>Password</Text>
            <TextInput
              ref={(c) => {
                this.passwordInput = c
              }}
              testID="loginScreenPassword"
              style={textInputStyle}
              value={password}
              keyboardType="default"
              returnKeyType="go"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              onChangeText={this.handleChangePassword}
              underlineColorAndroid="transparent"
              onSubmitEditing={this.handlePressLogin}
              placeholder="Password"
            />
          </View>

          <View style={[styles.loginRow]}>
            <TouchableOpacity testID="loginScreenLoginButton" style={styles.loginButtonWrapper} onPress={this.handlePressLogin}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Sign In</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity testID="loginScreenCancelButton" style={styles.loginButtonWrapper} onPress={this.handlePressCancel}>
              <View style={styles.loginButton}>
                <Text style={styles.loginText}>Cancel</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.noAccount}>
          <Text style={styles.noAccountText}>If you don't have an account, click </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://dashboard.waziup.io/')} testID="createUserButton">
            <Text style={styles.noAccountUnderline} >here</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    account: state.account.account,
    fetching: state.login.fetching,
    error: state.login.error,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    attemptLogin: (username, password) => dispatch(LoginActions.loginRequest(username, password)),
    getAuth: (credentials) => dispatch(LoginActions.loginRequest(credentials)),
    logout: () => dispatch(LoginActions.logoutRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
