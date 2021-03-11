npm install
* npm init to Get start in your Node.js project
* npm install nodemon to run your program in real time
* npm install express to use express in your program
*npm install dotenv to open a new config file where you can store important variables
* npm install graphql to get graphql in your system and npm install express-graphql


# Directories
>routes /
> middleware /
>controllers /
>models /
>utils /
>config

# Main
> app.js


#WebSockets 
> webSockets allows us to build real-time web services
>Why? And How to add Real time communication to a node app.
>npm i socket.io a websocket tool , use require(''socket.io')(anyServer)

#Socket.io 
>backend -> npm i socket.io and use like this . const io = require('socket.io')(server)
>then you establish a connection using io.on('connection',console if it is working)
>frontend you need to install npm i socket.io-client , then import it. 
>const socket = openSocket('http://localhost:8080/'), Then socket.on('posts', data=>{
>data.action (action being the name you define in the backend)})
*This is new


#"# async-node.js" 

>npm i graphql express-graphql
>>Folder GraphQl 
>>> schema.js: queries, mutations and types we work with 
>>> resolvers.js: define the logic that is executed for incoming queries 
>>> 
