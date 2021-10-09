const TelegramApi = require("node-telegram-bot-api");
// const cron = require('node-cron');
const schedule = require('node-schedule');
const token = "2040457925:AAGwYJZ77l_x6JNOZ5HZgc37J83THZkZUzk";

const bot = new TelegramApi(token, {polling: true});
let timer = null;

const hourMinute = new Date().getHours() == new Date().getMinutes();
const startMinute = new Date().getSeconds() == 1;
const period = (new Date().getHours() >= 8 && new Date().getHours() <= 21);
let count = true;
const listStickers = ["https://tlgrm.ru/_/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/4.webp",
"https://tlgrm.ru/_/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/5.webp", 
"https://tlgrm.ru/_/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/2.webp",
"https://tlgrm.ru/_/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/11.webp",
"https://tlgrm.ru/_/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/9.webp",
"https://tlgrm.ru/_/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/1.webp"
]

bot.onText(/\/start/, async msg => {

    const text = msg.text
    const chatId = msg.chat.id

    const answer = `Пора загадывать желание, ${msg.chat.first_name}! Надеюсь, оно сбудется =)`;

    await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/9b3/6f4/9b36f4d8-203f-3e1e-b31f-78519f4f9ba4/22.webp")
    await bot.sendMessage(chatId, `Привет, ${msg.chat.first_name}! Я Бот Исполнитель желаний! Я буду напоминать тебе с 8 утра до 10 вечера каждый час загадать желание! Но не все желания можно исполнить, ну как в Алладине, помнишь?\nУдачи и будь осторожна со своими желаниями!\nP.S. И не загадывай пожалуйста мировые геноциды. Спасибо!`)

    timer = setInterval(async ()=>{
        if(new Date().getSeconds() == 0 && 
        (new Date().getHours() >= 8 && new Date().getHours() <= 21) && 
        new Date().getHours() == new Date().getMinutes()){
           await bot.sendSticker(chatId, listStickers[Math.floor(Math.random()*listStickers.length)])
           await bot.sendMessage(msg.chat.id, answer);
        }
    }, 1100)

});

bot.onText(/\/stop/, msg => {
    if(timer){
        timer = null;
    }
});
