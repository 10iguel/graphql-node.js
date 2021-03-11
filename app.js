const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const dotenv = require('dotenv')
const logrocket = require('logrocket')
const cors = require('cors')
const path = require('path')
const fs = require('fs')
const multer = require('multer')
const {graphqlHTTP} = require('express-graphql')
const graphqlSchema = require('./graphql/schema')
const graphqlResolver = require('./graphql/resolvers')
const auth = require('./middleware/auth')


const MONGO_URI = 'mongodb+srv://10iguel:Carlczerny10@justdo.0xaby.mongodb.net/messages\n'

const app = express()

//Load env variables
dotenv.config({path: './config/config.env'})


//Files Storage

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

logrocket.init('kpxuqk/miguel-angel')
logrocket.identify('kpxuqk:miguel-angel:i1r8msY1829nM79C3WTW', {
    name: 'Miguel Espinoza',
    email: 'miguel.espinoza.silloca@gmail.com',

    // Add your own custom user variables here, ie:
    subscriptionType: 'pro'
});
//app.use(bodyParser.urlencoded()); // x-www-form-urlencoded </form>
app.use(bodyParser.json()) // /aplication/json
// MULTER is a node. js middleware for handling multipart/form-data, which is primarily used for uploading files.
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))
//Static images
app.use('/images', express.static(path.join(__dirname, 'images')))


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200)
    }
    next()
})

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://www.differentServerDomain.fr https://www.differentServerDomain.fr");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(cors())

app.use(auth)

app.put('/post-image', (req, res, next) => {
    if (!req.isAuth) {
        throw new Error("It is not authenticated")
    }
    if (!req.file) {
        return res.status(200).json({message: "No file provided"})
    }
    if (req.body.oldPath) {
        clearImage(req.body.oldPath)
    }
    return res
        .status(201)
        .json({message: "File Stored.", filePath: req.file.path})
})

// GraphQl
app.use('/graphql', graphqlHTTP({
        schema: graphqlSchema,
        rootValue: graphqlResolver,
        graphiql: true,
        customFormatErrorFn(error) {
            if (!error.originalError) {
                return error
            }
            const data = error.originalError.data
            const status = error.originalError.code || 500
            const message = error.message || "An error occurred "
            return {message: message, status: status, data: data}
        }
    }
))

app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({message: message, data: data})
})

const PORT = process.env.PORT || 8080
mongoose
    .connect(MONGO_URI)
    .then(result => {
        app.listen(PORT)
    })
    .catch(err =>
        console.log(err)
    )

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', filePath)
    fs.unlink(filePath, err => console.log(err))
}
