const url = "http://localhost:4000"


const createCharCard = () => {
    const mainContainer = document.querySelector("#main-container")

    if(document.querySelector("#card-container")){
        document.querySelector("#card-container").remove()
    }

    const cardContainer = mainContainer.appendChild(document.createElement("ul"))
    cardContainer.setAttribute("id", "card-container")

    axios.get(`${url}/characters`)
    .then(res => {        
        res.data.forEach(character => {
            // console.log(character)
            const {char_id, f_name, img_link, like_status} = character
            
            const li = cardContainer.appendChild(document.createElement('li'))
            li.setAttribute('class', 'character-card')
            li.setAttribute('id', `card${char_id}`)

            li.innerHTML = `<h2 class="char-card-header">${f_name}</h2>
            <input class="char_port" onClick=openSingleView(${char_id}) type="image" src="${img_link}" alt="portrait of ${f_name}">
            <input type="button" class="like-btn-${char_id} ${like_status}" onclick="likeCharacter(${char_id})" alt="Like Button" alt="Star Icon">
            `
        });
    })
}

const createSingleView = (character) => {
    // console.log(character)
    const {char_id, f_name, l_name, gender, race, role, spec, desc, img_link, like_status, quote} = character
    const container = document.querySelector('body').appendChild(document.createElement('section'))

    container.setAttribute('id', "single-view-container")

    container.innerHTML = `
    <button class="exitBtn" onClick=exitSingleView()>X</button>
    <div id="left-div">
        <H1 class="sv-title">${f_name + " " + l_name}</H1>
        <p id="quote">"${quote}" -${f_name}</p>
        <p id="desc" class="first-letter">${desc}</p>
    </div>
    <div id="right-div">
        <img class="sv-char-port" src="${img_link}" alt="image of ${f_name}">
        <section id="sv-info-box">
            <div id="gender"><p class="tag">Gender</p><p>${gender}</p></div>
            <div id="race"><p class="tag">Race</p><p>${race}</p></div>
            <div id="class"><p class="tag">Class</p><p>${role}</p></div>
            <div id="spec"><p class="tag">Sub Class:</p><p>${spec}</p></div>
            <input type="button" class="like-btn-${char_id} ${like_status}" onclick="likeCharacter(${char_id})" alt="Like Button" alt="Star Icon">
            </section>
        <button class="delete-char-btn" onClick="deleteCharacter(${char_id})"></button>        
    </div>
    `
}

const openSingleView = (id) => {
    if (document.querySelector("#character-creator-container")) exitCreateCharacter()
    if (document.querySelector("#single-view-container")) exitSingleView()
    axios.get(`${url}/characters/?char_id=${id}`).then(res => {
        // console.log(res.data)
        createSingleView(res.data)})
    .catch(err => {
        console.log(err)
        alert('something went wrong.')
    })
}

const exitSingleView = () => {
    document.querySelector("#single-view-container").remove()
}

const searchCharacters = (event) => {
    event.preventDefault()
    const name = document.querySelector("#search-bar").value
    document.querySelector("#search-bar").value = ""

    if (/[ ~`!#$%\^&*+=\-\[\]\\;,/{}|\\":<>\?]/g.test(name) !== true) {
        console.log("valid input")

        axios.get(`${url}/characters?f_name=${name}`)
    	.then(res => {
        	openSingleView(res.data.char_id)
    	})
    	.catch(err => {
        	console.log(err)
        	alert("Character not found.")
    	})

    } else {
        return alert("Invalide input. Try again without special characters.")
    }

}

const likeCharacter = (id) => {
    axios.put(`${url}/likeCharacter/${id}`).then(res => {
        console.log("like status toggled")

        const likes = document.querySelectorAll(`.like-btn-${id}`)
        likes.forEach(like => {
            like.classList.toggle("unliked")
            like.classList.toggle("liked")
        });
    })
    .catch(err => {
        console.log(err)
        alert('something went wrong.')
    })

}

const deleteCharacter = (id) => {
    axios.delete(`${url}/character/${id}`).then(res => {
        exitSingleView()
        document.querySelector("#card-container").remove()
        createCharCard()
        console.log("Character deleted.")
    })
}

const opencharacterCreator = () => {
    if (document.querySelector("#character-creator-container")) exitCreateCharacter()
    if (document.querySelector("#single-view-container")) exitSingleView()

    const body = document.querySelector("body")
    const section = document.createElement("section")
    body.prepend(section)
    section.setAttribute("id", "character-creator-container")


    section.innerHTML = `
    <button class="exitBtn" onClick=exitCreateCharacter()>X</button>
        <form id="create-inq-form" onSubmit="addNewCharacter(event)">
            <H1>Your Inquisitor</H1>
            <div id="name-div" class="creator-opt-div">
                <input type="text" id="inq-f-name" name="f-name" placeholder="First Name" required>
                <input type="text" id="inq-l-name" name="l-name" placeholder="Last Name">
            </div>

            <div id="gender-div" class="creator-opt-div">
                <label for="gender">Gender:</label> 
                <label for="female">Female</label>
                <input class="inq-opt-selectors" id="female" type="radio" name="gender" value="F" required>
                
                <label for="male">Male</label>
                <input class="inq-opt-selectors" id="male" type="radio" name="gender" value="M">
            </div>
            
            <div id="race-div" class="creator-opt-div">
                <label for="race">Race:</label>

                <label for="dwarf">Dwarf</label>
                <input class="inq-opt-selectors" id="dwarf" type="radio" name="race" value="Dwarf" required>
                
                <label for="elf">Elf</label>
                <input class="inq-opt-selectors" id="elf" type="radio" name="race" value="Elf" >
                
                <label for="human">Human</label>
                <input class="inq-opt-selectors" id="human" type="radio" name="race" value="Human" >
                
                <label for="qunari">Qunari</label>
                <input class="inq-opt-selectors" id="qunari" type="radio" name="race" value="Qunari" >
            </div>
            
            <div id="role-div" class="creator-opt-div">
                <label for="role">Class:</label>
                
                <label for="mage">Mage</label>
                <input class="inq-opt-selectors" id="mage" type="radio" name="role" value="Mage" required>
                
                <label for="archer">Archer</label>
                <input class="inq-opt-selectors" id="archer" type="radio" name="role" value="Archer" >
                
                <label for="duel-wielder">Duel Wielder</label>
                <input class="inq-opt-selectors" id="duel-wielder" type="radio" name="role" value="Duel Wield" >
                
                <label for="two-handed">Two Handed</label>
                <input class="inq-opt-selectors" id="two-handed" type="radio" name="role" value="Two Handed" >
                
                <label for="sword-and-shield">Sword & Sheild</label>
                <input class="inq-opt-selectors" id="sword-and-shield" type="radio" name="role" value="Sword And Sheild" >
                
            </div>
            
            <div id="spec-div" class="creator-opt-div">
                <label for="spec">Specialization:</label>
                
                <label for="rift-mage">Rift Mage</label>
                <input class="inq-opt-selectors" id="rift-mage" type="radio" name="spec" value="Rift Mage" required>
                <label for="necromancer">Necromancer</label>
                <input class="inq-opt-selectors" id="necromancer" type="radio" name="spec" value="Necromancer" >
                <label for="knight-enchanter">Knight-Enchanter</label>
                <input class="inq-opt-selectors" id="knight-enchanter" type="radio" name="spec" value="Knight-Enchanter" >
                
                <label for="assassin">Assassin</label>
                <input class="inq-opt-selectors" id="assassin" type="radio" name="spec" value="Assassin" >
                <label for="artificer">Artificer</label>
                <input class="inq-opt-selectors" id="artificer" type="radio" name="spec" value="Artificer" >
                <label for="tempest">Tempest</label>
                <input class="inq-opt-selectors" id="tempest" type="radio" name="spec" value="Tempest" >
                
                <label for="templar">Templar</label>
                <input class="inq-opt-selectors" id="templar" type="radio" name="spec" value="Templar" >
                <label for="reaver">Reaver</label>
                <input class="inq-opt-selectors" id="reaver" type="radio" name="spec" value="Reaver" >
                <label for="champion">Champion</label>
                <input class="inq-opt-selectors" id="champion" type="radio" name="spec" value="Champion" >
            </div>

            <div id="submit-div">
                <button type="submit">Create</button>
            </div>

        </form>
    `
    const options = document.querySelectorAll(".inq-opt-selectors")
    options.forEach(option=> option.addEventListener("click", disabler))   
}

const addNewCharacter = (event) => {
    event.preventDefault()

    const f_name = document.querySelector('#inq-f-name').value.toLowerCase()
    const l_name = document.querySelector('#inq-l-name').value.toLowerCase()
    const gender = document.querySelector('input[name="gender"]:checked').value.toLowerCase()
    const race = document.querySelector('input[name="race"]:checked').value
    const role = document.querySelector('input[name="role"]:checked').value
    const spec = document.querySelector('input[name="spec"]:checked').value
    
    const fName = f_name.charAt(0).toUpperCase() + f_name.slice(1)
    const lName = l_name.charAt(0).toUpperCase() + l_name.slice(1)

    axios.get(`${url}/inquisitorinfo/${race.toLowerCase()}_inq`).then(res=> {
        let {desc, f_port_link, m_port_link} = res.data
        let img = ""
        let fullGender = ""

        gender === "f" ? img = f_port_link : img = m_port_link
        gender === "f" ? fullGender = "Female" : fullGender = "Male"
        
        const body = {
            "f_name": fName,
            "l_name": lName,
            "gender": fullGender,
            "race": race,
            "role": role,
            "spec": spec,
            "desc": desc,
            "race_img": img
        }

        axios.post(`${url}/character`, body).then(console.log("character sent!"))

        createCharCard()
        exitCreateCharacter()
    })
}

const exitCreateCharacter = () => {
    document.querySelector("#character-creator-container").remove()
}

const disabler = (event) =>{
    // console.log(event.target)
    const dwarfBtn = document.getElementById('dwarf')

    const mageBtn = document.getElementById('mage')
    const archerBtn = document.getElementById('archer')
    const duelWieldBtn = document.getElementById('duel-wielder')
    const twoHandedBtn = document.getElementById('two-handed')
    const SwordAndShieldBtn = document.getElementById('sword-and-shield')

    const assassinBtn = document.getElementById('assassin')
    const artificerBtn = document.getElementById('artificer')
    const tempestBtn = document.getElementById('tempest')
    const knightEnchanterBtn = document.getElementById('knight-enchanter')
    const RiftMageBtn = document.getElementById('rift-mage')
    const necromancerBtn = document.getElementById('necromancer')
    const reaverBtn = document.getElementById('reaver')
    const championBtn = document.getElementById('champion')
    const templarBtn = document.getElementById('templar')
    

    if(dwarfBtn.checked){
        mageBtn.disabled = true
        mageBtn.checked = false

    } else if(!dwarfBtn.checked){
        mageBtn.disabled = false
    } 

    if (mageBtn.checked) {
        RiftMageBtn.disabled = false
        knightEnchanterBtn.disabled = false
        necromancerBtn.disabled = false

        assassinBtn.disabled = true
        assassinBtn.checked = false

        artificerBtn.disabled = true
        artificerBtn.checked = false

        tempestBtn.disabled = true
        tempestBtn.checked = false

        reaverBtn.disabled = true
        reaverBtn.checked = false

        championBtn.disabled = true
        championBtn.checked = false

        templarBtn.disabled = true
        templarBtn.checked = false
    } else if (archerBtn.checked || duelWieldBtn.checked) {
        tempestBtn.disabled = false
        artificerBtn.disabled = false
        assassinBtn.disabled = false

        RiftMageBtn.disabled = true
        RiftMageBtn.checked = false

        knightEnchanterBtn.disabled = true
        knightEnchanterBtn.checked = false

        necromancerBtn.disabled = true
        necromancerBtn.checked = false

        reaverBtn.disabled = true
        reaverBtn.checked = false

        championBtn.disabled = true
        championBtn.checked = false
        
        templarBtn.disabled = true
        templarBtn.checked = false
    } else if (twoHandedBtn.checked || SwordAndShieldBtn.checked) {
        reaverBtn.disabled = false
        championBtn.disabled = false
        templarBtn.disabled = false

        RiftMageBtn.disabled = true
        RiftMageBtn.checked = false

        knightEnchanterBtn.disabled = true
        knightEnchanterBtn.checked = false

        necromancerBtn.disabled = true
        necromancerBtn.checked = false

        assassinBtn.disabled = true
        assassinBtn.checked = false

        artificerBtn.disabled = true
        artificerBtn.checked = false

        tempestBtn.disabled = true
        tempestBtn.checked = false
    } else {
        RiftMageBtn.disabled = false
        knightEnchanterBtn.disabled = false
        necromancerBtn.disabled = false
        assassinBtn.disabled = false
        artificerBtn.disabled = false
        tempestBtn.disabled = false
        reaverBtn.disabled = false
        championBtn.disabled = false
        templarBtn.disabled = false
    }
}

createCharCard()
document.querySelector("#add-inq-btn").addEventListener("click", opencharacterCreator)
document.querySelector("#search-form").addEventListener("submit", searchCharacters)



