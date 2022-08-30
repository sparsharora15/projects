let Name, phone, Password, role, email , userName ,checkPass;

function handlePhone() {
    phone = document.getElementById("phone").value
    // console.log(phone);
}

function handleName() {
    Name = document.getElementById("text").value
    // console.log(Name);
}

function handlePassword() {
    Password = document.getElementById("password").value
    // console.log(Password);
}
function handleRole() {
    role = document.getElementById("role").value
    // console.log(role);
}
function handleEmail() {
    email = document.getElementById("email").value

}
function checkIfNumber(phone) {
    let count = 0;
    for (let i = 0; i < phone.length; i++) {
        if (isNaN(phone[i])) {
            return false;
        } else {
            count++;
        }
    }
    if (count == 10) {
        return true
    }
}


async function signup() {
    let data = {
        name: Name,
        phone: phone,
        password: Password,
        email: email,
        role: role
    }
    if (email.includes('@'), (checkIfNumber(phone))) {
        data['email'] = email;
        data['phone'] = phone;
        console.log("done");

        let options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        }
        fetch('http://localhost:2000/signup', options)
        .then(async (res) => {
            let result = await res.json();
            alert(result.msg)
            alert("signed in!")
        })
        

    }
    else {
        alert("Please check your Email or Phone")
    }
    console.log(JSON.stringify(data));
}
function handleUsername() {
    userName = document.getElementById("userName").value
    console.log(userName);
}

function checkPassword() {
    checkPass = document.getElementById("checkPass").value
    console.log(checkPass);
}

async function  login() {
    let data = {}
    if (userName.includes('@')) {
        data['email'] = userName;
        data['phone'] = null;
    } else if (checkIfNumber(userName)) {
        data['phone'] = userName;
        data['email'] = null;
    }
    else {
        alert("Please check your username")
    }
    data['password'] = checkPass
    console.log(data)
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(data)
    }
    console.log(JSON.stringify(data));
    try {
        let get = await fetch('http://localhost:2000/login', options)
        let final = await get.json();
        if (final.token) {
            window.location.href = "./welcome.html";
            console.log(final)
            
        }
        else {
            alert("Invalid username or password")
        }

       console.log(alert("logged in!")); 
    }

    catch (e) {
        console.log(e)
    }
}