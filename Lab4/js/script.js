//Event Listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#enteredUser").addEventListener("change", displayUser);
document.querySelector("#pw").addEventListener("click", displayPassword);

displayStates();

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data);
            document.querySelector("#city").textContent = data.city;
            document.querySelector("#latitude").textContent = data.latitude;
            document.querySelector("#longitude").textContent = data.longitude;
        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
    //alert(zipCode)
}

async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data);

            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.state;
                optionElement.value = i.usps;

                document.querySelector("#state").append(optionElement);
            }

        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
    //alert(zipCode)
}


async function displayPassword() {
    let password = document.querySelector("#pass").value;
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            let passLn = password.length;
            if(passLn < 6 ){
                document.querySelector("#pass").textContent = " Password is too short";
                document.querySelector("#pass").style.color = "red";
            }
            else{
                document.querySelector("#pass").textContent = " Password is good";
                document.querySelector("#pass").style.color = "green";
            }
            document.querySelector("#pass").textContent = data.password;
            console.log(data);
        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
    //alert(zipCode)
}


async function displayUser() {
    let user = document.querySelector("#enteredUser").value;
    let url = "https://csumb.space/api/usernamesAPI.php?username="+ user;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            let available = data.available;
            if(available){
                document.querySelector("#username").textContent = "Username Available";
                document.querySelector("#username").style.color = "green";
            }
            else {
                document.querySelector("#username").textContent = "Username Not Available";
                document.querySelector("#username").style.color = "red";
            }
            console.log(data);
        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
    //alert(zipCode)
}

displayCounty();

async function displayCounty() {
    let letter = document.querySelector("#state").value;
    console.log(letter);
    let url = "https://csumb.space/api/countyListAPI.php?state=" + letter;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            console.log(data);

        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
    //alert(zipCode)
}