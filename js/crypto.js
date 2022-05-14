function getBTC() {
    $.getJSON('https://api.coingecko.com/api/v3/coins/bitcoin?localization=false', getData);
}

function getETH() {
    $.getJSON('https://api.coingecko.com/api/v3/coins/ethereum?localization=false', getData);
}

function getBNB() {
    $.getJSON('https://api.coingecko.com/api/v3/coins/binancecoin?localization=false', getData);
}

function getDOGE() {
    $.getJSON('https://api.coingecko.com/api/v3/coins/dogecoin?localization=false', getData);
}

function searchCrypto() {
    let search = document.getElementById("searchcrypto").value;

    $.getJSON('https://api.coingecko.com/api/v3/coins/' + search + '?localization=false', getData).fail(throwErrorPopUp);
    document.getElementById("searchcrypto").value = "";

}

function getData(data) {
    let terminal = document.getElementById("cryptoterminaltext");

    let last_updated = data.last_updated; // Format: "2021-02-09T13:14:20.702Z"
    last_updated = last_updated.split('T');
    let date = last_updated[0];
    let time = last_updated[1].split('.')[0];

    let string = "<p id='date'>Last Updated: " + time + " - " + date + "</p>";
    string += "<h3 id='name'>" + data.name + " - " + data.symbol + "</h3>";
    string += "<p id='price'>Price: " + data.market_data.current_price.eur + "€" + "</p>";
    string += "<p><span id='market_cap'>Market Cap: " + data.market_data.market_cap.eur + "</span><br>";
    string += "<span id='market_cap_rank'>Market Cap Rank: " + data.market_data.market_cap_rank + "</span></p>";
    string += "<p id='volume'>Total Volume: " + data.market_data.total_volume.eur + "</p>";
    string += "<p><span id='high_24h'>Highest last 24h: " + data.market_data.high_24h.eur + "€" + "</span><br>";
    string += "<span id='low_24h'>Lowest last 24h: " + data.market_data.low_24h.eur + "€" + "</span></p>";
    string += "<p><span id='change_1h_p'>Price change 1h (%): " + data.market_data.price_change_percentage_1h_in_currency.eur + "%" + "</span><br>";
    string += "<span id='change_24h_p'>Price change 24h (%): " + data.market_data.price_change_percentage_24h_in_currency.eur + "%" + "</span><br>";
    string += "<span id='change_24h'>Price change 24h: " + data.market_data.price_change_24h_in_currency.eur + "€" + "</span></p>";
    string += "<p><span id='ath'>All Time High: " + data.market_data.ath.eur + "€" + "</span><br>";
    string += "<span id='atl'>All Time Low: " + data.market_data.atl.eur + "€" + "</span></p>";

    terminal.innerHTML = string;
}

// Not working atm
function saveToXML() {
    let xmlRowString = "<Crypto>\n";
    let name = document.getElementById("name").innerHTML.split("-")[0].trim();
    xmlRowString += "<" + name + ">\n";
    xmlRowString += "<date>" + document.getElementById("date").innerHTML + "</date>"
    xmlRowString += "<price>" + document.getElementById("price").innerHTML + "</price>\n"
    xmlRowString += "<market_cap>" + document.getElementById("market_cap").innerHTML + "</market_cap>\n"
    xmlRowString += "<market_cap_rank>" + document.getElementById("market_cap_rank").innerHTML + "</market_cap_rank>\n"
    xmlRowString += "<volume>" + document.getElementById("volume").innerHTML + "</volume>\n"
    xmlRowString += "<high_24h>" + document.getElementById("high_24h").innerHTML + "</high_24h>\n"
    xmlRowString += "<low_24h>" + document.getElementById("low_24h").innerHTML + "</low_24h>\n"
    xmlRowString += "<change_1h_p>" + document.getElementById("change_1h_p").innerHTML + "</change_1h_p>\n"
    xmlRowString += "<change_24h_p>" + document.getElementById("change_24h_p").innerHTML + "</change_24h_p>\n"
    xmlRowString += "<ath>" + document.getElementById("ath").innerHTML + "</ath>\n"
    xmlRowString += "<atl>" + document.getElementById("atl").innerHTML + "</atl>\n"
    xmlRowString += "</" + name + ">\n";
    xmlRowString += "</Crypto>";

    let parser = new DOMParser();
    let xml = parser.parseFromString(xmlRowString, "text/xml");
    console.log(xml);
    
    let link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(xml));
    link.setAttribute('download', 'crypto.xml');
    link.style.display = 'none';
    document.body.appendChild(link);
	link.click();
	setTimeout(document.body.removeChild(link), 50);
}