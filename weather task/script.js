const btn=document.getElementById("btn")
const output=document.getElementById("weather");
const loading=document.getElementById("loading");
const news=document.getElementById("news");
const botInput=document.getElementById("bot-input");
const botResponse=document.getElementById("bot-response");
const sendBtn=document.getElementById("send-btn");
const gemini_api=""
const API_KEY = "";
const nAPI=""

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

sendBtn.addEventListener("click", async () => {
    const prompt = botInput.value.trim();
    if (prompt === "") {
        alert("Enter a message");
        return;
    }
    botResponse.innerHTML += `
        <p class="user-message">${prompt}</p>
    `;
    botInput.value = "";
    botResponse.innerHTML += `
        <p class="bot-message" id="thinking">Thinking...</p>
    `;
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${gemini_api}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: prompt
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        document.getElementById("thinking").remove();
        const answer =
            data.candidates?.[0]?.content?.parts?.[0]?.text ||
            "No response.";
        botResponse.innerHTML += `
            <p class="bot-message">${answer}</p>
        `;
        botResponse.scrollTop = botResponse.scrollHeight;
    } catch (error) {
        document.getElementById("thinking").remove();
        botResponse.innerHTML += `
            <p class="bot-message">Something went wrong.</p>
        `;
        console.log(error);
    }
});