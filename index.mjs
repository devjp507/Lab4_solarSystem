import 'dotenv/config';
import express from 'express';
import fetch from 'node-fetch';
const { getNASAPOD } = await import('./nasa.js');
const planets = (await import('npm-solarsystem')).default;
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
//routes
app.get('/', async(req, res) => {
    let apiKey = process.env.UNSPLASH_KEY;
    let url =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&featured=true&query=solar-system`;
    let response = await fetch(url);
    let data = await response.json();
    let randomImage = data.urls.full;
    res.render("index", {"image":randomImage})
});

app.get('/planet', (req, res) => {
    let planetName = req.query.planetName;
    let planetInfo = planets[`get${planetName}`]();
    res.render('planet', { planetInfo, planetName });
});

app.get("/nasa", async (req, res) => {
    try {
        const nasaPOD = await getNASAPOD();
        return res.render("nasa", { nasaPOD });
    } catch (error) {
        console.error("NASA route error:", error);
        return res.status(500).send(error.message);
    }
});

app.listen(3000, () => {
    console.log('server started');
});