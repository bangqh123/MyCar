import { Platform } from 'react-native';

const isLocalhost = Boolean(
  Platform.OS === 'ios' ||
    Platform.OS === 'android' ||
    Platform.OS === 'web'
)

const Url='https://2075-1-52-164-105.ngrok-free.app'

const PROXY_URL = Url
const API_PREFIX = '/api'

// The function returns the API URL based on the environment
function getAPIURL(path) {
  let url = isLocalhost ? `${Url}${API_PREFIX}` : `${PROXY_URL}${API_PREFIX}`;
  return `${url}${path}`;
}

export default {
  getAPIURL,
};
