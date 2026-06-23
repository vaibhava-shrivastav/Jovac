const btn=document.getElementById("btn")
const output=document.getElementById("weather");
const loading=document.getElementById("loading");
const news=document.getElementById("news");
const API_KEY = "d0551800686e58bc5c16cd13f8cb06e2";
const nAPI="7b937d195e9dee305e71d922e264cd01"

btn.addEventListener("click",async (e)=>{
    const city=document.getElementById("input").value.trim();
    if(city===""){
        alert("enter a city name");
        return;
    }

    try{
        loading.textContent="Loading.......";
        output.innerHTML="";

        const response=await fetch(
            `https://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
        );

        const data=await response.json();

        if(!response.ok){
            throw new Error(data.message);
        }
        output.innerHTML = `
            <h2>${data.location.name}</h2>
            <p> Temperature: ${data.current.temperature}°C</p>
            <p> Weather: ${data.current.weather_descriptions[0]}</p>
            <p> Humidity: ${data.current.humidity}%</p>
            <p> Wind Speed: ${data.current.wind_speed} km/h</p>
        `;

        const newsResponse = await fetch(
            `https://api.mediastack.com/v1/news?access_key=${nAPI}&keywords=${city}&languages=en`
        );

        const ndata= await newsResponse.json();
        news.innerHTML = `
            <h2 style="margin-top:20px;">
                📰 Latest News
            </h2>
        `;
        if (!ndata.data || ndata.data.length === 0) {
            news.innerHTML += `
            <p>No news found</p>
            `;
        }
        else {
            ndata.data.slice(0, 3).forEach(article => {
                news.innerHTML += `
                <a
                class="news-card"
                href="${article.url}"
                target="_blank"
                >
                ${article.title}
                </a>
                `;
            });
        }
    }
    catch(e){
        output.innerHTML = `
            <p style="color:red;">
                ${e.message || "Something went wrong"}
            </p>
        `;
    }
    finally{
        loading.textContent = "";
    }
})