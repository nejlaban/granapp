let baseUrl;
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://localhost:3001'
} else {
    baseUrl = 'https://granapp.herokuapp.com'
}

module.exports = {
    BASE_URL: baseUrl
}