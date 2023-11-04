
function retrieveUsers() {
    return fetch("/getUsers").then((response) => {
        return response.json()
    })
}

function retrieveUser(username) {
    console.log("/getUser?" + new URLSearchParams({username: username}))
    return fetch("/getUser?" + new URLSearchParams({username: username})).then((response) => {
        return response.json()
    })
}

async function populateUserList() {
    var userList = await retrieveUsers()
    const tableItems = ["name", "username", "email"]
    const tableBody = document.getElementById("userTableBody")
    for (var u of userList) {
        const row = document.createElement("tr")
        row.onclick = () => { document.location=`editUser?username=${u.username}` }
        for (item of tableItems) {
            const c = document.createElement("td")
            c.innerText = u[item]
            row.appendChild(c)
        }
        tableBody.appendChild(row)
    }    
}

async function populateUserFields() {
    var searchpars = location.search.substring(1)
    searchpars = JSON.parse('{"' + decodeURI(searchpars).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
    var user = await retrieveUser(searchpars.username)
    user.password = ''
    const tableItems = ["name", "username", "email", "password"]
    for (item of tableItems) {
        const c = document.getElementById(item)
        c.value = user[item]
    }
}

window.onload = async function () {
    switch (document.location.pathname) {
        case "/users":
            await populateUserList()
            break
        case "/addUser":
            break
        case "/editUser":
            await populateUserFields()
            break
        default:
            break
    }  
};