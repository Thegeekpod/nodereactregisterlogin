import axios from 'axios';

const Apibaseurl = axios.create({
  baseURL: 'http://localhost:5000', // Replace with your base URL
});

export default Apibaseurl;