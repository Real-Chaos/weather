import '../assets/styles/styles.css';


async function weatherAPI(city) {
    const fetchAPI = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=15aa41d450eb4b764a4f8d0214f1f471`);
    const APIJson = await fetchAPI.json()
    const celsius = document.querySelector('.C');

    if(celsius.style.color == 'black') {
        summary(APIJson, 'C')
    }
    else {
        summary(APIJson, 'F')
    }
    
    tempUnit(APIJson)
}

function summary(api, unit) {
    const description = document.querySelector('.description');
    const cityName = document.querySelector('.city-name');
    const temperature = document.querySelector('.temp');
    const feels = document.querySelector('.feels-like');
    const wind = document.querySelector('.wind');
    const humidity = document.querySelector('.humidity');
    const temp = document.querySelector('.temp');
    const summary = document.querySelector('.summary');
    const hr = document.querySelector('.temp-hr');
    
    description.textContent = api.weather[0].description;
    cityName.textContent = `${api.name}, ${api.sys.country}`;
    wind.textContent = `Wind: ${api.wind.speed} mph`;
    humidity.textContent = `Humidity: ${api.main.humidity}%`;
    

    if(unit == 'C') {
        temperature.textContent = parseInt(api.main.temp - 273.15);
        feels.textContent = `Feels Like: ${parseInt(api.main.temp - 273.15)}`;
        temp.classList.add('temp-c')
        feels.classList.add('feels-c')
    }

    else if(unit == 'F') {
        temperature.textContent = parseInt((api.main.temp - 273.15) * 9/5 + 32);
        feels.textContent = `Feels Like: ${parseInt((api.main.feels_like - 273.15) * 9/5 + 32)}`;
        temp.classList.remove('temp-c');
        feels.classList.remove('feels-c')
    }

    if(temperature.textContent >= 100) {
        summary.style.marginLeft = '120px';
        hr.style.left = '350px';
    }

    else if(temperature.textContent < 10){
        hr.style.left = '160px';
    }

    else {
        summary.style.marginLeft = '70px';
        hr.style.left = '250px';
    }
}

function search() {
    const searchForm = document.querySelector('.search-form');
    const searchCity = document.querySelector('.search-form input')

    searchForm.addEventListener('submit', (e) => {
        e.preventDefault()
        weatherAPI(searchCity.value)
        searchForm.reset()
    })
}

function tempUnit(api) {
    let temperature = 'F';
    const celsius = document.querySelector('.C');
    const farenheit = document.querySelector('.F');
    const tempBtn = document.querySelector('.temp-unit');
    const temp = document.querySelector('.temp')
    const feels = document.querySelector('.feels-like');

    tempBtn.addEventListener('click', () => {
        if(temperature == 'F') {
            temperature = 'C';
            celsius.style.color = 'black';
            farenheit.style.color = 'white';
            temp.classList.add('temp-c')
            feels.classList.add('feels-c')
        }
        else {
            temperature = 'F';
            celsius.style.color = 'white';
            farenheit.style.color = 'black';
            temp.classList.remove('temp-c')
            feels.classList.remove('feels-c')
        }

        summary(api, temperature)
    })
}




search();
weatherAPI('london')