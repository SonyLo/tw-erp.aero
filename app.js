const express = require('express')
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');


const corsOptions = require('./config/cors.js');
const { swagger, swaggerUi } = require('./config/swagger.js');
const authRouter = require('./src/routes/auth.router.js')
const fileRouter = require('./src/routes/files.router.js')




const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, 'public');


const app = express()

app.use(cors(corsOptions))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/public', express.static(publicDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cookieParser());

app.use('/', authRouter)
app.use('/file', fileRouter)



app.listen(port, function () {
	console.log(`Server listens ${port}`);

});
