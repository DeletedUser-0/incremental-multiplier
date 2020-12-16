var game = {
    click: 0,
    money: 1,
    upgrade1cost: 33.3,
    upgrade1level: 0,
    multiplierOnClick: 1.04,
    multiplierEffect: 1.00005,
}

function multiply() {
    game.money = Decimal.times(game.money, game.multiplierOnClick);
    game.click = Decimal.add(game.click, 1).divide(1);
    game.multiplierEffect = Decimal.sub(game.multiplierEffect, 0.00000001);
    game.multiplierOnClick = Decimal.times(game.multiplierOnClick, game.multiplierEffect)
    document.getElementById("click").innerHTML = "Clicks: " + notate2(game.click);
    document.getElementById("money").innerHTML = "Number: " + notate(game.money);
    document.getElementById("multiplier").innerHTML = "Multiplier per click: " + game.multiplierOnClick.toPrecision(4);
}

var mainGameLoop = window.setInterval(function () {
    multiply()
}, 1000);


function upgrade1() {
	if (Decimal.compare(game.money, game.upgrade1cost) >= 0) {
    game.money = Decimal.divide(game.money, game.upgrade1cost);
    game.upgrade1cost = Decimal.pow(game.upgrade1cost, 1.125);
    game.multiplierOnClick = Decimal.pow(game.multiplierOnClick, 1.1);
    game.upgrade1level = Decimal.add(game.upgrade1level, 1);
    document.getElementById("upgrade1").innerHTML = "Level: " + game.upgrade1level + "<br /> Cost: " + notate(game.upgrade1cost);
    document.getElementById("money").innerHTML = "Number: " + notate(game.money);
    document.getElementById("multiplier").innerHTML = "Multiplier per click: " + game.multiplierOnClick.toPrecision(4);
	};
}

function notate(n) {
    var e = n.exponent;
    if (e < 3) return (n.mantissa * Math.pow(10, e)).toPrecision(3);
    return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
}

function notate2(n) {
    var e = n.exponent;
    if (e < 3) return (n.mantissa * Math.pow(10, e));
    return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
}

function notate3(n) {
    var e = n.exponent;
    if (e < 4) return (n.mantissa * Math.pow(10, e)).toPrecision(4);
    return `${n.mantissa.toPrecision(3)}e${e.toLocaleString("pt-BR")}`;
}

function saveGame() {
    saveData = game;
    localStorage.saveData = JSON.stringify(saveData);
}

function loadGame() {
    var saveData = JSON.parse(localStorage.saveData || null) || {};
    saveData.upgrade1cost = new Decimal(JSON.parse(saveData.upgrade1cost));
    saveData.upgrade1level = new Decimal(JSON.parse(saveData.upgrade1level));
    saveData.multiplierOnClick = new Decimal(JSON.parse(saveData.multiplierOnClick));
    game = saveData;
    return saveData.obj || "default";
	document.getElementById("upgrade1").innerHTML = "Level: " + saveData.upgrade1level + "<br /> Cost: " + notate(saveData.upgrade1cost);
    document.getElementById("money").innerHTML = "Number: " + notate(saveData.money);
    document.getElementById("multiplier").innerHTML = "Multiplier per click: " + saveData.multiplierOnClick.toPrecision(4);
}