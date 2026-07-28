async function getNASAPOD() {
    const apiKey = process.env.NASAPOD_KEY;
    const nasaURL = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

    const response = await fetch(nasaURL);

    if (!response.ok) {
        throw new Error(`NASA API request failed: ${response.status}`);
    }

    const data = await response.json();

    return {
        description: data.explanation,
        mediaType: data.media_type,
        mediaURL: data.url,
        link: "https://apod.nasa.gov/apod/astropix.html"
    };
}
module.exports = {getNASAPOD};