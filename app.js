const express = require('express')
const cors = require('cors');
const path = require('path');



const corsOptions = require('./config/cors.js');
const { swagger, swaggerUi } = require('./config/swagger.js');
const authRouter = require('./src/routes/auth.router.js')




const port = process.env.PORT || 3000
const publicDir = path.join(__dirname, 'public');


const app = express()

app.use(cors(corsOptions))

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swagger));
app.use('/public', express.static(publicDir));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())


app.use('/', authRouter)



app.listen(port, function () {
	console.log(`Server listens ${port}`);

});
