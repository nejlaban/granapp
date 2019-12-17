let baseUrl;
if (!process.env.HEROKU) {
    baseUrl = 'http://localhost:3001'
}

module.exports = {
    BASE_URL: baseUrl
}