//Event Listeners
document.querySelector("#zip").addEventListener("change", displayCity);
document.querySelector("#enteredUser").addEventListener("change", displayUser);
document.querySelector("#pw").addEventListener("click", displayPassword);
document.querySelector("#state").addEventListener("change", displayCounty);
document.querySelector("#sumbitBtn").addEventListener("click", validateForm);

displayStates();

async function displayCity() {
    let zipCode = document.querySelector("#zip").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();

            if(document.querySelector("#zipFeedback")){
                document.querySelector("#zipFeedback").textContent = "";
                document.querySelector("#zipFeedback").style.color = "";
            }

            if(data && data.city){
    
                console.log(data);
                document.querySelector("#city").textContent = data.city;
                document.querySelector("#latitude").textContent = data.latitude;
               document.querySelector("#longitude").textContent = data.longitude;
            }else{
                document.querySelector("#city").textContent = "";
                document.querySelector("#latitude").textContent = "";
                document.querySelector("#longitude").textContent = "";

                if(document.querySelector("#zipFeedback")){
                    document.querySelector("#zipFeedback").textContent = "Invalid Zip Code";
                    document.querySelector("#zipFeedback").style.color = "red";
                }

            }
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

            displayCounty();

        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
    //alert(zipCode)
}


async function displayPassword() {
    // let password = document.querySelector("#pass").value;
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        let response = await fetch(url);
        try {
            let data = await response.json();
            // let passLn = password.length;
            // if(passLn < 6 ){
                // document.querySelector("#pass").textContent = " Password is too short";
                // document.querySelector("#pass").style.color = "red";
            // }
            // else{
                // document.querySelector("#pass").textContent = " Password is good";
                // document.querySelector("#pass").style.color = "green";
            // }
            document.querySelector("#pass").textContent = data.password;
            document.querySelector("#pass").style.color = "blue";
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

            let countySelect = document.querySelector("#county");
            countySelect.innerHTML = "";

            for (let i of data) {
                let optionElement = document.createElement("option");
                optionElement.textContent = i.county;
                optionElement.value = i.county;

                countySelect.append(optionElement);
            }

        } catch (parseError) {
            console.log("JSON Parsing error " + parseError);
        }
    } catch (error) {
        console.log("Network error " + error);
    }
    //alert(zipCode)
}

function validateForm(){
    let user = document.querySelector("#enteredUser").value;
    let pwValue = document.querySelector("#pw").value;
    let pwConfirmValue = document.querySelector("#pwConfirm").value;
    let feedbackBox = document.querySelector(".feedback");
    feedbackBox.innerHTML = "";

    if(user.length <3){
        feedbackBox.innerHTML += "Username must be at least 3 characters<br>";
    }
    if(pwValue.length <6){
        feedbackBox.innerHTML += "Password must be at least 6 characters<br>";
    }
    if(pwValue !== pwConfirmValue){
        feedbackBox.innerHTML += "Passwords must match<br>";
    }
    if(feedbackBox.innerHTML === ""){
        feedbackBox.innerHTML = "Form is valid! Sending data...";
        feedbackBox.style.color = "green";
    }else{
        feedbackBox.style.color = "red";
    }
}