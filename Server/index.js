//REQUIIRE DEPENDANT PACKAGES
const express = require("express")
const cors = require("cors")



//APP INSTANCE
const app = express()


//MIDDLEWARE
app.use(express.json())
app.use(cors())

//ENDPOINTS
//destructuring function modules from controller file
const {
    getAllCharacters,
    getAllClasses,
    getInquisiorDb,
    createInqCard,
    deleteCharacter,
    likeCharacter
} = require('./controller.js')


////////////////////////////////////////////////// GET ////////////////////////////////////////////////// 
app.get('/characters', getAllCharacters)

app.get('/classes', getAllClasses)

app.get('/inquisitorInfo/:id', getInquisiorDb)


////////////////////////////////////////////////// DELETE //////////////////////////////////////////////////
app.delete('/character/:id', deleteCharacter)


////////////////////////////////////////////////// PUT //////////////////////////////////////////////////
app.put('/likeCharacter/:id', likeCharacter)

////////////////////////////////////////////////// POST //////////////////////////////////////////////////
app.post('/character', createInqCard)


//APP.LISTEN
app.listen(4000, () => console.log('Docked at port 4000'))