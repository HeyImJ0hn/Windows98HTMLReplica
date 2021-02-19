//API KEY: f2N2k4tpchUhTAyeN1qgDOOAlzmbT9SG

function getCityTEST() {
    $.getJSON('json/search.json', getCityId);
}

function getCity(name) {
    
    let city = document.getElementById("searchcity").value;

    if (name != null)
        city = name;

    $.getJSON('https://dataservice.accuweather.com/locations/v1/cities/search?apikey=f2N2k4tpchUhTAyeN1qgDOOAlzmbT9SG&q=' + city + '%20portugal&language=en-us&details=true', getCityId).fail(throwErrorPopUp);
    document.getElementById("searchcity").value = "";
}

function getWeatherTEST(city_id) {
    $.getJSON('json/1-274087_1_AL.json', getWeatherData);
}

function getWeather(city_id) {
    $.getJSON('https://dataservice.accuweather.com/forecasts/v1/daily/5day/' + city_id + '?apikey=f2N2k4tpchUhTAyeN1qgDOOAlzmbT9SG&language=en-US&details=true&metric=true', getWeatherData).fail(throwErrorPopUp);
}

function getCityId(data) {
    if (data.length == 0)
        throwErrorPopUp();
    let terminal = document.getElementById("weatherterminaltext");
    let string = "<p id='key'>City Key: " + data[0].Key + "</p>";
    string += "<h3 id='localname'>" + data[0].LocalizedName + " - " + data[0].Country.LocalizedName + "</h3>";
    terminal.innerHTML = string;
    window.localStorage.setItem("weather", string);
    getWeather(data[0].Key);
}

function getWeatherData(data) {
    let terminalcol1 = document.getElementById("weatherterminalcol1");
    let terminalcol2 = document.getElementById("weatherterminalcol2");
    let string = window.localStorage.getItem("weather");
    window.localStorage.clear();

    string = '';
    let fulldate = data.DailyForecasts[0].Date; // Format: "2021-02-11T07:00:00+00:00"
    let date = fulldate.split('T')[0];
    string += "<p id='date'>Today - " + date + "</p>";
    string += "<p id='feel'>Temperature: <br>"
    string += "<span id='mintemp'>Minimum: " + data.DailyForecasts[0].Temperature.Minimum.Value + "C</span><br>";
    string += "<span id='maxtemp'>Maximum: " + data.DailyForecasts[0].Temperature.Maximum.Value + "C</span></p>";
    string += "<p id='feel'>Real Feel Temperature: <br>"
    string += "<span id='minfeeltemp'>Minimum: " + data.DailyForecasts[0].RealFeelTemperature.Minimum.Value + "C</span><br>";
    string += "<span id='maxfeeltemp'>Maximum: " + data.DailyForecasts[0].RealFeelTemperature.Maximum.Value + "C</span></p>";
    string += "<p id='dayt'>DayTime: <br>"
    string += "<span id='minday'>" + data.DailyForecasts[0].Day.LongPhrase + "</span><br>";
    string += "<span id='minfeeltemp'>Rain Probability: " + data.DailyForecasts[0].Day.RainProbability + "%</span></p>";
    string += "<p id='nightt'>NightTime: <br>"
    string += "<span id='minnight'>" + data.DailyForecasts[0].Night.LongPhrase + "</span><br>";
    string += "<span id='minfeeltemp'>Rain Probability: " + data.DailyForecasts[0].Night.RainProbability + "%</span></p>";
    terminalcol1.innerHTML = string;

    string = '';
    fulldate = data.DailyForecasts[1].Date; // Format: "2021-02-11T07:00:00+00:00"
    date = fulldate.split('T')[0];
    string += "<p id='date'>Tomorrow - " + date + "</p>";
    string += "<p id='feel'>Temperature: <br>"
    string += "<span id='mintemp'>Minimum: " + data.DailyForecasts[1].Temperature.Minimum.Value + "C</span><br>";
    string += "<span id='maxtemp'>Maximum: " + data.DailyForecasts[1].Temperature.Maximum.Value + "C</span></p>";
    string += "<p id='feel'>Real Feel Temperature: <br>"
    string += "<span id='minfeeltemp'>Minimum: " + data.DailyForecasts[1].RealFeelTemperature.Minimum.Value + "C</span><br>";
    string += "<span id='maxfeeltemp'>Maximum: " + data.DailyForecasts[1].RealFeelTemperature.Maximum.Value + "C</span></p>";
    string += "<p id='dayt'>DayTime: <br>"
    string += "<span id='minday'>" + data.DailyForecasts[1].Day.LongPhrase + "</span><br>";
    string += "<span id='minfeeltemp'>Rain Probability: " + data.DailyForecasts[1].Day.RainProbability + "%</span></p>";
    string += "<p id='nightt'>NightTime: <br>"
    string += "<span id='minnight'>" + data.DailyForecasts[1].Night.LongPhrase + "</span><br>";
    string += "<span id='minfeeltemp'>Rain Probability: " + data.DailyForecasts[1].Night.RainProbability + "%</span></p>";
    terminalcol2.innerHTML = string;

}