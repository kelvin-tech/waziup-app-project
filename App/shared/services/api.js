// a library to wrap and simplify api calls
import apisauce from 'apisauce'

import AppConfig from '../../config/app-config'

// our "constructor"
const create = (baseURL = AppConfig.apiUrl) => {
  // ------
  // STEP 1
  // ------
  //
  // Create and configure an apisauce-based api object.
  //

  const api = apisauce.create({
    // base URL is read from the "constructor"
    baseURL,
    // here are some default headers
    headers: {
      'Cache-Control': 'no-cache',
    },
    // 10 second timeout...
    timeout: 10000
  })

  // ------
  // STEP 2
  // ------
  //
  // Define some functions that call the api.  The goal is to provide
  // a thin wrapper of the api layer providing nicer feeling functions
  // rather than "get", "post" and friends.
  //
  // I generally don't like wrapping the output at this level because
  // sometimes specific actions need to be take on `403` or `401`, etc.
  //
  // Since we can't hide from that, we embrace it by getting out of the
  // way at this level.
  //
  const setAuthToken = (userAuth) => api.setHeader('Authorization', 'Bearer ' + userAuth)
  const requestToken = (username, password) => api.post('api/auth/token', { username, password })
  const getDevicePermissions = () => api.get('api/auth/permissions/devices')
  const getGatewayPermissions = () => api.get('api/auth/permissions/gateways')
  const getProjectPermissions = () => api.get('api/auth/permissions/projects')

  const createDevice = (deviceId) => api.post('api.devices', deviceId)
  const getDevices = () => api.get('api/devices')
  const getDevice = (deviceId) => api.get('api/devices/' + deviceId)
  const deleteDevice = (deviceId) => api.delete('api/devices/' + deviceId)
  const updateDevice = (deviceId, name, location, gatewayId, visibility, deployed, owner) =>
    api.put('api/devices/' + deviceId + '/' + name, location, gatewayId, visibility, deployed, owner)

  const createSensor = (deviceId, sensorId) => api.post('api.devices/' + deviceId + '/sensors/', sensorId)
  const getSensors = (deviceId) => api.get('api.devices/' + deviceId + '/sensors')
  const getSensor = (deviceId, sensorId) => api.get('api.devices/' + deviceId + '/sensors/' + sensorId)
  const deleteSensor = (deviceId, sensorId) => api.delete('api.devices/' + deviceId + '/sensors/' + sensorId)
  const updateSensor = (deviceId, sensorId, name, sensorKind, quantityKind, unit, calib) =>
    api.put('api.devices/' + deviceId + '/sensors/' + sensorId + '/' + name, sensorKind, quantityKind, unit, calib)
  const getSensorData = (deviceId, sensorId) => api.get('api.devices/' + deviceId + '/sensors/' + sensorId + '/values')

  const createActuator = (deviceId, actuatorId) => api.post('api.devices/' + deviceId + '/actuators/', actuatorId)
  const getActuators = (deviceId) => api.get('api.devices/' + deviceId + '/actuators')
  const getActuator = (deviceId, actuatorId) => api.get('api.devices/' + deviceId + '/actuators/' + actuatorId)
  const deleteActuator = (deviceId, actuatorId) => api.delete('api.devices/' + deviceId + '/actuators/' + actuatorId)
  const updateActuator = (deviceId, actuatorId, name, actuatorKind, valueType, value) =>
    api.put('api.devices/' + deviceId + '/actuators/' + actuatorId + '/' + name, actuatorKind, valueType, value)

  const createGateway = (gatewayId) => api.post('api.gateways/', gatewayId)
  const getGateways = () => api.get('api.gateways')
  const getGateway = (gatewayId) => api.get('api.gateways/' + gatewayId)
  const deleteGateway = (gatewayId) => api.delete('api.gateways/' + gatewayId)
  const updateGateway = (gatewayId, heartbeat, name, owner, location) =>
    api.put('api.gateways/' + gatewayId + '/' + heartbeat, name, owner, location)

  const createProject = (projectId) => api.post('api.projects/', projectId)
  const getProjects = () => api.get('api.projects')
  const getProject = (projectId) => api.get('api.projects/' + projectId)
  const deleteProject = (projectId) => api.delete('api.projects/' + projectId)
  const updateProject = (projectId, deviceIds, gatewayIds, name) =>
    api.put('api.projects/' + projectId + '/' + deviceIds, gatewayIds, name)

  const getUser = (userId) => api.get('api/users/' + userId)
  const getUsers = (options) => api.get('api/users', options)
  const createUser = (userId) => api.post('api/users', userId)
  const updateUserSmsCredit = (userId, smsCredit) => api.put('api/users/' + userId + '/', smsCredit)

  const createNotification = (notifId) => api.post('api.notifications/', notifId)
  const getNotifications = () => api.get('api.notifications')
  const getNotification = (notifId) => api.get('api.notifications/' + notifId)
  const deleteNotification = (notifId) => api.delete('api.notifications/' + notifId)
  const updateNotification = (notifId) => api.patch('api.notifications/' + notifId)
  //To pause and restart a notification: state = "inactive" || "active"
  const pauseStartNotif = (notifId, state) => api.put('api/notifications/' + notifId + '/', state)

  const removeAuthToken = () => api.deleteHeader('Authorization')
  const login = (userAuth) => api.post('api/auth', userAuth)
  const register = (user) => api.post('api/register', user)
  const forgotPassword = (data) =>
    api.post('api/account/reset-password/init', data, {
      headers: { 'Content-Type': 'text/plain', Accept: 'application/json, text/plain, */*' },
    })

  const getAccount = () => api.get('api/account')
  const updateAccount = (account) => api.put('api/account', account)
  const changePassword = (currentPassword, newPassword) => api.post('api/account/change-password', { currentPassword, newPassword }, { headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/plain, */*' } })

  const updateUser = (user) => api.put('api/users', user)
  const deleteUser = (userId) => api.delete('api/users/' + userId)

  // ignite-jhipster-api-method-needle

  // ------
  // STEP 3
  // ------
  //
  // Return back a collection of functions that we would consider our
  // interface.  Most of the time it'll be just the list of all the
  // methods in step 2.
  //
  // Notice we're not returning back the `api` created in step 1?  That's
  // because it is scoped privately.  This is one way to create truly
  // private scoped goodies in JavaScript.
  //
  return {
    // a list of the API functions from step 2
    requestToken,
    getProjectPermissions,
    getDevicePermissions,
    getGatewayPermissions,

    createDevice,
    getDevice,
    getDevices,
    deleteDevice,
    updateDevice,

    createSensor,
    getSensor,
    getSensors,
    deleteSensor,
    updateSensor,
    getSensorData,

    createActuator,
    getActuator,
    getActuators,
    deleteActuator,
    updateActuator,

    createGateway,
    getGateway,
    getGateways,
    deleteGateway,
    updateGateway,

    createProject,
    getProject,
    getProjects,
    deleteProject,
    updateProject,

    createNotification,
    getNotification,
    getNotifications,
    deleteNotification,
    updateNotification,
    pauseStartNotif,

    createUser,
    updateUser,
    updateUserSmsCredit,
    getUsers,
    getUser,
    deleteUser,

    // ignite-jhipster-api-export-needle
    setAuthToken,
    removeAuthToken,
    login,
    register,
    forgotPassword,
    getAccount,
    updateAccount,
    changePassword
  }
}

// let's return back our create method as the default.
export default {
  create
}
