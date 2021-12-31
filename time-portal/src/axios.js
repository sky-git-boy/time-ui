// axios
import axios from 'axios'

const baseURL = 'http://139.198.122.18'

export default axios.create({
  baseURL: baseURL
  // You can add your headers here
})
