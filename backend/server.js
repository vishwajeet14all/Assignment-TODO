const dotenv = require('dotenv');
const app = require('./app.js')

dotenv.config({ path: "backend/config/.env" });

const PORT = process.env.PORT || 4000;


app.listen(PORT, () => {
    console.log(`Server is listening at port ${process.env.PORT}`);
})