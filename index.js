const express = require("express");
var bodyParser = require('body-parser')
const OpenAIApi = require("openai");
const app= express();
app.use(bodyParser.json());


const PORT = 3000;
const messages = [];

const openai = new OpenAIApi({
    apiKey: process.env["OPENAI_API_KEY"],
});

app.post("/chat",async(req,res)=>{
    console.log("test ",req.body)
    if(!req.body) res.send("Error");
    messages.push(req.body)
    const response = await openai.chat.completions.create({
        messages,
        model: 'gpt-3.5-turbo',
    });
    messages.push(response.choices[0].message);
    return res.json(response.choices[0].message);
});

app.post("/deathreply",async(req,res)=>{
    if(!req.body) res.send("Error");
    const prompt = [
        {"role":"system" , "content":`Make a funny 1 line insult reply to this message ${req.body.content}`}]
    const response = await openai.chat.completions.create({
        messages:prompt,
        model: 'gpt-3.5-turbo',
    });
    return res.json(response.choices[0].message);
});

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})