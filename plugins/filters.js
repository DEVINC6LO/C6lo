/* Copyright (C) 2020 Princerudh.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

WhatsAsena - Yusuf Usta
*/
const fs = require('fs')
const Asena = require('../events');
const {MessageType, Mimetype } = require('@adiwajshing/baileys');
const FilterDb = require('./sql/filters');
const Config = require('../config')
const jid = Config.DISBGM != false ? Config.DISBGM.split(',') : [];
const Language = require('../language');
const Lang = Language.getString('filters');

if (Config.WORKTYPE == 'private') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false }, (async (message, match) => {
    if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '918136997392@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/Mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['2','@༄PʀɪɴᴄEʳᶹᵈʰ࿐','Aa','Aarulle','Abhi','Abhinav','Ah','Aliya','Aliyo','Alo','Alone','Amma','Ara','Ardra','Ayin','Ayyo','Back','Bad','Bgm','Bhasi','Bilal','Black','Blackzue','Boss','Bot','Bro','Broken','Bye','Carlo','Chathi','Chathy','Chetta','Chiri','Chunk','Chunke','Cr7','Cristiano','Cry','DD','Da','Daa','Dai','Darling','Doctor','Dora','Dude sir','Eda','Eee','Ellarum ede','En','Enne','Entha cheyya','Enthada','Enthuva','Fan','Feel aayi','Feel','Fek','Frnd','Gd mng','Gd mrng','Gd ngt','Good mrng','Good night','Ha','Haa','Hai','Haii','Hallo','Happy','Haters','Hbd','Hbday','He','Hello','Hey','Hi','Hii','Hlo','Hloo','Hlooi','Hm','Hoi','Hy','I','Ikka','Jinn','Joker','Kanapi','Kanaran','Kanjan','Kanjav','Kemam','Kenzoo','Kevin','Kgf','Kk','Koi','Kollam','Kozhi','Kukku','Kunju','Kurup','Kutty','Kycho','La be','Lala','Legend','Leo','Leopucha','Life','Line','Lo','Loo','Love tune','Love','Loveu','Lub u','Mad','Malang','Mamooka','Mass','Mathy','Meeting','Messi','Mine','Missing','Mm','Mohanlal','Mood','Music pranthan','Music','Muth','My god','My love','My','Myre','N','Nalla kutty','Nalla','Nallakutti','Name entha','Name','Nanba','Nanban','Nanbiye','Nanni','Nee','New','Neymer','Nirtheda','Njn vera','Njn','Njr','No','Oh no','Oh','Ok bye','Ok','Onam','Oo','Ooi','Paat','Paavam','Para','Pever','Pinnallah','Place','Pm','Poda','Podai','Poli','Pooda','Poote','Pora','Potta','Potte','Power varate','Poweresh','Poyeda','Pranayam','Prince','Psycho','Rashmika','Rip','Rose','Sad','Sayip','Scene','Sed aayi','Sed tune','Sed','Senior','Serious','Set','Seth po','Sett','Show','Singapenne','Single','Smile','Soldier','Song','Sry','Subscribe','Super','T','Tentacion','Thalaiva','Thalapathy','Thantha','Thyr','Town','Track maat','Uff','Umbi','Umma','Uyir','Uyr','Va','Vaa','Vaathi','Vathi','Vava','Veeran','Vidhi','Vijay','Wait','Welcome','Xxx tentacion','Yaar','Z aayi','aara','adi','alive','aliya','alone','abhi','abhinav','am','andi','annan','ano','ara','athan','audio','ayilla','ayn','aysheri','baby','bad boy','bgm','bie','big fan','bilal','bot','broken','brokenlove','bye','care','carlo','chatho','chaya','chechi','chota mumbai','chunk','chunke','chunks','comedy','comrade','cr7','da','die','eda','ee','ekk','ellarum','en','enne','ennitt','enth','entha','enthada','evde','fd','ff','free','fresh','fvrt','good bye','good morning','good night','group','grp','hate','help','i ','i am back','ijathi','jd','kadhal','kali','kar98','kenzo','kerivaa','killadi','king','kiss','kozhi','kundan','kunna','left','life','line','love','love u','lover','lucifer','maari','machan','manasilayo','manath','mass bgm','mathi','mathiyo','mention','messi','mier','mindalle','mindathe','moodesh','moonji','mp3','music','muthe','my area','mybos','mylove','myr','myre','n','nallath','nanba','nanban','new ','neymar','nirthada','njan','njn','nokk','noob','ok','ok bei','ok da','on','onam','oombi','oompi','over','paatt','padicho','paka','palaji','pani','parayatte','patti','perfect ok','pewer','photo','pm','poda','polika','poora','power','poyo','prince','princerudh','rascal','rascal','rashmika','rasool','return','rip','sad','saji','scene','sed','sed bgm','set aano','single','sis','sketched','sneham','song','sorry','sticker','sulthan','tagall','thalapathy','thall','thamasha','thayoli','theri','thot','thottu','thug','trance','umma','uyir','uyr','vada','venda','verithanam','waiting','welcome ','why','wow','you']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
}
});
    }
    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
}
else if (Config.WORKTYPE == 'public') {

Asena.addCommand({pattern: 'filter ?(.*)', fromMe: true, desc: Lang.FILTER_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);

    if (match === null) {
        filtreler = await FilterDb.getFilter(message.jid);
        if (filtreler === false) {
            await message.client.sendMessage(message.jid,Lang.NO_FILTER,MessageType.text)
        } else {
            var mesaj = Lang.FILTERS + '\n';
            filtreler.map((filter) => mesaj += '```' + filter.dataValues.pattern + '```\n');
            await message.client.sendMessage(message.jid,mesaj,MessageType.text);
        }
    } else {
        if (match.length < 2) {
            return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + ' ```.filter "sa" "as"',MessageType.text);
        }
        await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, '').replace(/[#]+/g, '\n'), match[0][0] === "'" ? true : false);
        await message.client.sendMessage(message.jid,Lang.FILTERED.format(match[0].replace(/['"]+/g, '')),MessageType.text);
    }
}));
Asena.addCommand({pattern: 'stop ?(.*)', fromMe: true, desc: Lang.STOP_DESC, dontAddCommandList: true}, (async (message, match) => {
    match = match[1].match(/[\'\"\“](.*?)[\'\"\“]/gsm);
    if (match === null) {
        return await message.client.sendMessage(message.jid,Lang.NEED_REPLY + '\n*Example:* ```.stop "hello"```',MessageType.text)
    }

    del = await FilterDb.deleteFilter(message.jid, match[0].replace(/['"“]+/g, ''));
    
    if (!del) {
        await message.client.sendMessage(message.jid,Lang.ALREADY_NO_FILTER, MessageType.text)
    } else {
        await message.client.sendMessage(message.jid,Lang.DELETED, MessageType.text)
    }
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
        if(Config.BGMFILTER){
        let banned = jid.find( Jid => Jid === message.jid);
        if(banned !== undefined) return
        if (!!message.mention && message.mention[0] == '918136997392@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/Mention.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
        if (!!message.mention && message.mention[0] == '37122235326@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/Mention2.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
        }
const array = ['2','@༄PʀɪɴᴄEʳᶹᵈʰ࿐','Aa','Aarulle','Abhi','Abhinav','Ah','Aliya','Aliyo','Alo','Alone','Amma','Ara','Ardra','Ayin','Ayyo','Back','Bad','Bgm','Bhasi','Bilal','Black','Blackzue','Boss','Bot','Bro','Broken','ByeLu','Carlo','Chathi','Chathy','Chetta','Chiri','Chunk','Chunke','Cr7','Cristiano','Cry','DD','Da','Daa','Dai','Darling','Doctor','Dora','Dude sir','Eda','Eee','Ellarum ede','En','Enne','Entha cheyya','Enthada','Enthuva','Fan','Feel aayi','Feel','Fek','Frnd','Gd mng','Gd mrng','Gd ngt','Good mrng','Good night','Ha','Haa','Hai','Haii','Hallo','Happy','Haters','Hbd','Hbday','He','Hello','Hey','Hi','Hii','Hlo','Hloo','Hlooi','Hm','Hoi','Hy','I','Ikka','Jinn','Joker','Kanapi','Kanaran','Kanjan','Kanjav','Kemam','Kenzoo','Kevin','Kgf','Kk','Koi','Kollam','Kozhi','Kukku','Kunju','Kurup','Kutty','Kycho','La be','Lala','Legend','Leo','Leopucha','Life','Line','Lo','Loo','Love tune','Love','Loveu','Lub u','Mad','Malang','Mamooka','Mass','Mathy','Meeting','Messi','Mine','Missing','Mm','Mohanlal','Mood','Music pranthan','Music','Muth','My god','My love','My','Myre','N','Nalla kutty','Nalla','Nallakutti','Name entha','Name','Nanba','Nanban','Nanbiye','Nanni','Nee','New','Neymer','Nirtheda','Njn vera','Njn','Njr','No','Oh no','Oh','Ok bye','Ok','Onam','Oo','Ooi','Paat','Paavam','Para','Pever','Pinnallah','Place','Pm','Poda','Podai','Poli','Pooda','Poote','Pora','Potta','Potte','Power varate','Poweresh','Poyeda','Pranayam','Prince','Psycho','Rashmika','Rip','Rose','Sad','Sayip','Scene','Sed aayi','Sed tune','Sed','Senior','Serious','Set','Seth po','Sett','Show','Singapenne','Single','Smile','Soldier','Song','Sry','Subscribe','Super','T','Tentacion','Thalaiva','Thalapathy','Thantha','Thyr','Town','Track maat','Uff','Umbi','Umma','Uyir','Uyr','Va','Vaa','Vaathi','Vathi','Vava','Veeran','Vidhi','Vijay','Wait','Welcome','Xxx tentacion','Yaar','Z aayi','aara','abhi','abhinav','adi','alive','aliya','alone','am','andi','annan','ano','ara','athan','audio','ayilla','ayn','aysheri','baby','bad boy','bgm','bie','big fan','bilal','bot','broken','brokenlove','bye','care','carlo','chatho','chaya','chechi','chota mumbai','chunk','chunke','chunks','comedy','comrade','cr7','da','die','eda','ee','ekk','ellarum','en','enne','ennitt','enth','entha','enthada','evde','fd','ff','free','fresh','fvrt','good bye','good morning','good night','group','grp','hate','help','i ','i am back','ijathi','jd','kadhal','kali','kar98','kenzo','kerivaa','killadi','king','kiss','kozhi','kundan','kunna','left','life','line','love','love u','lover','lucifer','maari','machan','manasilayo','manath','mass bgm','mathi','mathiyo','mention','messi','mier','mindalle','mindathe','moodesh','moonji','mp3','music','muthe','my area','mybos','mylove','myr','myre','n','nallath','nanba','nanban','new ','neymar','nirthada','njan','njn','nokk','noob','ok','ok bei','ok da','on','onam','oombi','oompi','over','paatt','padicho','paka','palaji','pani','parayatte','patti','perfect ok','pewer','photo','pm','poda','polika','poora','power','poyo','prince','princerudh','rascal','rascal','rashmika','rasool','return','rip','sad','saji','scene','sed','sed bgm','set aano','single','sis','sketched','sneham','song','sorry','sticker','sulthan','tagall','thalapathy','thall','thamasha','thayoli','theri','thot','thottu','thug','trance','umma','uyir','uyr','vada','venda','verithanam','waiting','welcome ','why','wow','you']
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
       await message.client.sendMessage(message.jid, fs.readFileSync('./uploads/' + a + '.mp3'), MessageType.audio, { mimetype: Mimetype.mp4Audio, quoted : message.data, ptt: true})
}
});
    }

    var filtreler = await FilterDb.getFilter(message.jid);
    if (!filtreler) return; 
    filtreler.map(
        async (filter) => {
            pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
            if (pattern.test(message.message)) {
                await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
            }
        }
    );
}));
Asena.addCommand({on: 'text', fromMe: false}, (async (message, match) => {
    if(Config.AUTOSTICKER){
    let banned = jid.find( Jid => Jid === message.jid);
    if(banned !== undefined) return
    if (!!message.mention && message.mention[0] == '919895339960@s.whatsapp.net') {
await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/Bot.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted : message.data, ptt: false})
    }
const array = ['Aarulle','Aysheri','Ayye','Ayyo','Bot','Da','Eee','Entha','Enthada','Good morning','Good night','Hai','Hi','Hy','Joker','Kurippe','Kurumb','Love','Mm','Ok','Poda','Pova','Power','Prince','Rashmika','Rudhra','Samantha','Save','Sed','Shoo','Smile','Sry','Udayipp','Vaa','Vannu','Vijay','abhinav','achodaa','ayin','bot','broken','bye','chaya','cute','engane und','ithokke enth','ivan','joker','naanam','onam','paavam','poda','prince','rudhra','sed','sho','song','thalapathy','umma','vijay','༄PʀɪɴᴄEʳᶹᵈʰ࿐' ]
array.map( async (a) => {
let pattern = new RegExp(`\\b${a}\\b`, 'g');
if(pattern.test(message.message)){
   await message.client.sendMessage(message.jid, fs.readFileSync('./sticker/' + a + '.webp'), MessageType.sticker, { mimetype: Mimetype.webp, quoted: message.data, ptt: false})
}
});
}

var filtreler = await FilterDb.getFilter(message.jid);
if (!filtreler) return; 
filtreler.map(
    async (filter) => {
        pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
        if (pattern.test(message.message)) {
            await message.client.sendMessage(message.jid,filter.dataValues.text, MessageType.text, {quoted: message.data});
        }
    }
);
}));
}
