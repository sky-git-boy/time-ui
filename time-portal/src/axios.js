// axios
import axios from 'axios'

const baseURL = 'http://time-server'

export default axios.create({
  baseURL: baseURL
  // You can add your headers here
})
