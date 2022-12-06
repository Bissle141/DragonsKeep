const charactersDb = require("./data_files/char_db.json")
const inquisitorDb = require("./data_files/inq_db.json")
const classesDb = require("./data_files/class_db.json")

let globalId = 17


//Gets whole character DB
const getAllCharacters = (req, res) => {
    // console.log(req.query)
    if(Object.keys(req.query)[0] === 'f_name') {
        const name =  req.query.f_name
        const index = charactersDb.findIndex((char) => char.f_name.toLowerCase() === name.toLowerCase())

        return charactersDb[index] === undefined ? res.status(404).send("Character Not Found") : res.status(200).send(charactersDb[index])
    } else if (Object.keys(req.query)[0] === 'char_id') {
        const id = req.query.char_id
        const index = charactersDb.findIndex((char) => char.char_id === +id)

        return charactersDb[index] === undefined ? res.status(404).send("Character Not Found") : res.status(200).send(charactersDb[index])
    } else(res.status(200).send(charactersDb))
    
} 

//gets classes DB
const getAllClasses = (req, res) => {
    // console.log(req.query.role)
    const role = req.query.role

    const index = classesDb.findIndex((opt)=> opt.role === role.toLowerCase())
    // console.log(index)

    res.status(200).send(classesDb[index])
}

//gets from inquisitor DB
const getInquisiorDb = (req, res) => {
    const id = req.params.id
    // console.log(id)

    const index = inquisitorDb.findIndex((opt)=> opt.id === id)
    // console.log(inquisitorDb[index].desc)

    res.status(200).send(inquisitorDb[index])
}

//deletes char based on id param
const deleteCharacter = (req, res) => {
    // console.log(req.params.id)
    const index = charactersDb.findIndex((char) => char.char_id === +req.params.id)

    charactersDb.splice(index, 1)
    
    res.status(200).send(charactersDb)
}

//adds a new inquisitor to the char DB
const createInqCard = (req, res) => {
    const {f_name, l_name, gender, race, role, spec, desc, race_img} = req.body
    // class_img, spec_img
    const newInq = {
        char_id: globalId,
        f_name: f_name,
        l_name: l_name,
        gender: gender,
        race: race,
        role: role,
        spec: spec,
        like_status: "unliked",
        quote: "All of this happened because of fanatics and arguments about the next world. It's time we start believing in this one.",
        desc: desc,
        img_link: race_img
    }

    charactersDb.push(newInq)

    ++globalId
    
    res.status(200).send(charactersDb)
}

const likeCharacter = (req, res) => {
    const character = charactersDb[charactersDb.findIndex((char) => char.char_id === +req.params.id)]
    
    if (character.like_status == "unliked") {
          
        character.like_status = "liked"
    } else {
        character.like_status = "unliked"
    }
    
    res.status(200).send(character)

}


module.exports = {
    ////////////////////////////////////////////////// GET ////////////////////////////////////////////////// 
    getAllCharacters,

    getAllClasses,

    getInquisiorDb,


    ////////////////////////////////////////////////// DELETE //////////////////////////////////////////////////
    deleteCharacter,


    ////////////////////////////////////////////////// PUT //////////////////////////////////////////////////
    likeCharacter,


    ////////////////////////////////////////////////// POST //////////////////////////////////////////////////
    createInqCard,


}