var socket = io()

function getGameData(){
    socket.emit("getGameData");
}

socket.on("gameData", function(data){
    for (const [key, value] of Object.entries(data)) {
        console.log(key, value);
    }
});

function startGame(){
    alert("Starting game for all participants...");
    socket.emit("startGame");
}

socket.on('startGame', function(){
    alert("the game is starting...");
    window.location = "/";
});

socket.on("playerData", function(data){
    var name = data["name"];
    var alias = data["alias"];
    var role = data["role"];
    var status = data["status"];

    var nameElement = document.getElementById("playerName");
    var aliasElement = document.getElementById("playerAlias");
    var roleElement = document.getElementById("playerRole");
    var statusElement = document.getElementById("playerStatus");

    nameElement.innerHTML = name;
    aliasElement.innerHTML = alias;
    roleElement.innerHTML = role;
    statusElement.innerHTML = status;
})

function messagePlayers(){
    var message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    socket.emit("alertRoom", {"message": message, "room": "player"})
}

function messageHackers(){
    var message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    socket.emit("alertRoom", {"message": message, "room": "hacker"})
}

function messageWhitehats(){
    var message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    socket.emit("alertRoom", {"message": message, "room": "whitehat"})
}

function messageInvestigators(){
    var message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    socket.emit("alertRoom", {"message": message, "room": "investigator"});
}

socket.on("alertMessage", function(msg){
    var message = msg["message"];
    alert(message);
});

function sendMessage(){
    var message = document.getElementById("message").value;
    document.getElementById("message").value = "";
    socket.emit("sendMessage", {"message": message});
}

socket.on("message", function(data){
    var sender = data["sender"];
    var message = data["message"];

    document.getElementById("output").innerText += sender + ": " + message + "\n";
});

function getRoundData(){
    socket.emit("getRoundData");
}

socket.on("roundData", function(data){
    for (const [key, value] of Object.entries(data)) {
        console.log(key, value);
    }
    // document.getElementById("output").innerText += data["nProtections"] + "\n";
});

socket.on("endGame", function(data){
    window.location = "/"; // Reload page
});

socket.on("endGameData", function(data){ // For the endgame screen only
    var hackers = data["hackers"];
    var whitehats = data["whitehats"];
    var investigators = data["investigators"];
    var civilians = data["civilians"];

    var banner = data["winner"];

    document.getElementById("banner").innerText = banner;

    console.log(data);

    for (h in hackers){
        console.log(hackers[h]["name"]);
        document.getElementById("hackers").innerText += hackers[h]["name"] + "\n";
    }
    for (w in whitehats){
        console.log(whitehats[w]["name"]);
        document.getElementById("whitehats").innerText += whitehats[w]["name"] + "\n";
    }
    for (i in investigators){
        console.log(investigators[i]["name"]);
        document.getElementById("investigators").innerText += investigators[i]["name"] + "\n";
    }
    for (c in civilians){
        console.log(civilians[c]["name"]);
        document.getElementById("civilians").innerText += civilians[c]["name"] + "\n";
    }
});


function startHackers(){
    socket.emit("startHackers");
}

function startWhitehats(){
    socket.emit("startWhitehats");
}

function startInvestigators(){
    socket.emit("startInvestigators");
}

function startCivilians(){
    socket.emit("startCivilians");
}