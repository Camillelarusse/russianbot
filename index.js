const botprefix = require('./config.json');
const prefix = (botprefix.prefix);
const Discord = require('discord.js');
const { Client, RichEmbed } = require('discord.js');
const client = new Client({ disableEveryone: true });
client.login(process.env.TOKEN);

client.on("ready", function(){
  client.user.setGame(`${prefix}help`);
});

client.on("ready", () => {
  console.log(`Prêt à envoyer un vent de Russie sur ${client.users.size} personnes, dans ${client.channels.size} channels de ${client.guilds.size} serveurs.`);
});
client.on('error', console.error);

//help section
client.on('message', message => {
  if (message.content === prefix +'help') {
    const embed = new RichEmbed()
      .setTitle('Commandes')
      .setColor(10038562)
      .setDescription(`${prefix}help -> -_-.
      \n${prefix}pp -> Ta pp !
      \n${prefix}hug @user -> Fais des câlins à quelqu'un !
      \n${prefix}kiss @user-> Fais des bisous à quelqu'un !
      `);
    message.channel.send(embed);
  }
});

//serveur infos serction
client.on('message', async message => {
  if (message.content === prefix + "serveurinfo") {
    const servembed = new RichEmbed()
      .setColor(10038562)
      .setTitle(`${message.guild} Infos`)
      .addField("Propriétaire", message.guild.owner)
      .addField("Rôles", message.guild.roles.size)
      .addField("Membres", message.guild.memberCount)
      .setThumbnail(message.guild.iconURL)
      message.channel.send(servembed)
  }
})

//pp section
client.on('message', message => {
    if (message.content === prefix + 'pp') {
      message.reply(message.author.avatarURL);
    }
  });

//bot 2
client.on("message", async message => {
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

if(message.author.bot) return;

if(message.content.indexOf(config.prefix) !== 0) return;

if(command === "kick") {
  if(!message.member.roles.some(r=>["🛠️Staff"].includes(r.name)) )
    return message.reply("Vous n'avez pas la permission !");
  
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!member)
    return message.reply("Mentionnez un membre valide !");
  if(!member.kickable) 
    return message.reply("Je ne peut pas le ban car vous n'avez pas la permission !");
  
  let reason = args.slice(1).join(' ');
  if(!reason) reason = "Pas de raison";
  
  await member.kick(reason)
    .catch(error => message.reply(`${message.author}, je ne peut pas le ban car : ${error}`));
  message.reply(`${member.user.tag} a été kick par ${message.author.tag} pour: ${reason}`);
}

if(command === "ban") {
  if(!message.member.roles.some(r=>["🛠️Staff"].includes(r.name)) )
    return message.reply("Vous n'avez pas la permission !");
  
  let member = message.mentions.members.first();
  if(!member)
    return message.reply("Mentionnez un membre valide !");
  if(!member.bannable) 
    return message.reply("Je ne peut pas le ban car vous n'avez pas la permission !");

  let reason = args.slice(1).join(' ');
  if(!reason) reason = "Pas de raison";
  
  await member.ban(reason)
    .catch(error => message.reply(`${message.author}, je ne peut pas le ban car : ${error}`));
  message.reply(`${member.user.tag} à été ban par ${message.author.tag} pour: ${reason}`);
}

if(command === "clear") {
if(!message.member.roles.some(r=>["🛠️Staff"].includes(r.name)) )
  return message.reply("Vous n'avez pas la permission !");

  const deleteCount = parseInt(args[0], 10);
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Combien de messages voulez vous supprimer");
  const fetched = await message.channel.fetchMessages({limit: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Impossible de supprimer les messages car : ${error}`));
}
});

const hugcommand = prefix + 'hug'

client.on('message', message => {
  const rando_imgs = [
    'https://cdn.discordapp.com/attachments/568052462716583948/568053015626383362/1.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568053078427959296/2.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568053234816778245/3.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568069176141545472/4.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568069098978803712/5.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568069238967894016/6.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568070271454412817/7.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568069242369474591/8.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568069127135297538/9.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568069278016995328/10.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568070317960855552/11.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568070274390425641/12.gif',
    ]

  if (message.content.startsWith(hugcommand)) {
    if(message.mentions.members.size == 1) {
      let member = message.mentions.members.first()
        message.channel.send(`${member} tu as reçu un câlin de ${message.author}`, {
          file: rando_imgs[Math.floor(Math.random() * rando_imgs.length - 1 * 1) + 1]
        });
    }
  }
})

const kisscommand = prefix + 'kiss'

client.on('message', message => {
  const kiss = [
    'https://cdn.discordapp.com/attachments/568052462716583948/568053190222807054/1.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568053175211524137/2.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568053174578184232/4.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568058696425406464/5.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568058742596173834/6.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568058752943783939/7.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568058732378849280/8.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568060908363055123/9.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568060970799202304/10.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568060965262721024/11.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568060979771080704/12.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568060980597096457/13.gif',
    'https://cdn.discordapp.com/attachments/568052462716583948/568060984397266985/14.gif',
    ]

    if (message.content.startsWith(kisscommand)) {
      if(message.mentions.members.size == 1) {
        let member = message.mentions.members.first()
          message.channel.send(`${member} tu as reçu un bisou de ${message.author}`, {
            file: kiss[Math.floor(Math.random() * kiss.length - 1 * 1) + 1]
          });
      }
    }
})

const squatcommand = prefix + 'squat'

client.on('message', message => {
  const rando_imgs = [
    'https://cdn.discordapp.com/attachments/570946198517841933/570946280302575637/2_12.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946281732702219/57597776_2353092611676671_5324965806878883674_n.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946283003445279/Cover_3.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946285121830912/e8a954d757ba1109fdd800de7c0aabbe.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946286295973919/fMMt82b.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946286828912660/hqdefault.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946288955293737/Image-1.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946291270680629/Itsslavsquatmatehavesomegopniks_7fb34eeb356d3d41f15f598b7eb5d09b.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946291643711518/slav-squat.jpg',
    'https://cdn.discordapp.com/attachments/570946198517841933/570946294026338304/slavsquat-1-1280x533.jpg',
    ]

  if (message.content.startsWith(squatcommand)) {
        message.channel.send(`${message.author} stay cheeki breeki !!!`, {
          file: rando_imgs[Math.floor(Math.random() * rando_imgs.length - 1 * 1) + 1]
        });
      }
})

//lvl section
/*const config = require('./config.json');
const fs = require("fs");
let db = JSON.parse(fs.readFileSync("./database.json", "utf8"));

client.on("message", message => {
    if (message.author.bot) return;
    if (!db[message.author.id]) db[message.author.id] = {
        xp: 0,
        level: 0
      };
    db[message.author.id].xp++;
    let userInfo = db[message.author.id];
    if(userInfo.xp > 100) {
        userInfo.level++
        userInfo.xp = 0
        message.reply("Squat level up !")
    }
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd === "lvl") {
        let userInfo = db[message.author.id];
        let member = message.mentions.members.first();
        let embed = new Discord.RichEmbed()
        .setTitle(`${message.author.username}, ton niveau de squatteur :`)
        .setColor(0xff0000)
        .addField("Level", userInfo.level)
        .addField("XP", userInfo.xp+"/100")
        if(!member) return message.channel.sendEmbed(embed)
        let memberInfo = db[member.id]
        let embed2 = new Discord.RichEmbed()
        .setTitle(`Niveau de squatteur de ${member}`)
        .setColor(0xff0000)
        .addField("Level", memberInfo.level)
        .addField("XP", memberInfo.xp+"/100")
        message.channel.sendEmbed(embed2)
    }
    fs.writeFile("./database.json", JSON.stringify(db), (x) => {
        if (x) console.error(x)
      });
});*/

client.on("message", message => {
  if(message.content.startsWith(prefix + "pileouface")) {
    pileface = Math.floor(Math.random() * 2 + 0)
    if(pileface === 0){
        message.channel.send("**Pile** !")
    }else{
        message.channel.send("**Face** !")
    }
  }
})

//puissance 4 section

const p4command = prefix + 'p4start'

client.on("message", message => {
  if(message.content.startsWith(p4command)){
    if(message.mentions.members.size == 1) {
      let member = message.mentions.members.first()

      const player1 = message.author.username
      const player2 = member.user.username
      const msg = (`:one: :two: :three: :four: :five: :six: :seven: :eight:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n:black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square: :black_large_square:\n\nJoueur 1 : ${player1}\nJoueur 2 : ${player2}`)

      let embed = new Discord.RichEmbed()
        .setTitle(`Puissance 4`)
        .setColor(0xff0000)
        .setDescription(msg)
      message.channel.sendEmbed(embed)
    }
  }
})

client.on('message', (message) => {
  const goulagcommand = prefix + 'gogoulag'

  if(message.content.startsWith(goulagcommand)){
    if(!message.member.roles.some(r=>["🛠️Staff"].includes(r.name)) )
      return message.reply("Tu n'a pas la permission !");

    let role = message.guild.roles.find(r => r.name === "🛂Séjourne au goulag");
    let crole = message.guild.roles.find(r => r.name === "👤Citoyen");
    let member = message.mentions.members.first();
    member.addRole(role).catch(console.error);
    member.removeRole(crole).catch(console.error);
      return message.channel.send(`${member} à été envoyer au goulag par ${message.author}`)
  }
});

client.on('message', (message) => {
  const exitgoulagcommand = prefix + 'exitgoulag'

  if(message.content.startsWith(exitgoulagcommand)){
    if(!message.member.roles.some(r=>["🛠️Staff"].includes(r.name)) )
      return message.reply("Tu n'a pas la permission !");

    let role = message.guild.roles.find(r => r.name === "🛂Séjourne au goulag");
    let crole = message.guild.roles.find(r => r.name === "👤Citoyen");
    let member = message.mentions.members.first();
    member.removeRole(role).catch(console.error);
    member.addRole(crole).catch(console.error);
      return message.channel.send(`${member} à été sortit du goulag par ${message.author}`)
  }
});

const yourID = "560182971173175306";
const setupCMD = `${prefix}rolemenu`
const initialMessage = `**Réagis au message pour accéder aux channels !**`;
const embedMessage = `
**Réagis à ce message avec l'émoji :**
`;
const embedFooter = "Russian World";
const roles = ["▪👤Citoyen▪"];
const reactions = ["✅"];
const embed = true;
const embedColor = "#ff0000";

if (roles.length !== reactions.length) throw "Mauvais paramètres !";

function generateMessages() {
    let messages = [];
    for (let role of roles) messages.push(`Réagis pour obtenir le role **"${role}"** !`);
    return messages;
}

function generateEmbedFields() {
    return roles.map((r, e) => {
        return {
            emoji: reactions[e],
            role: r
        };
    });
}

client.on("message", message => {
    if (message.author.id == yourID && message.content.toLowerCase() == setupCMD) {

        if (!embed) {
            message.channel.send(initialMessage);

            const toSend = generateMessages();
            toSend.forEach((role, react) => {
                message.channel.send(role).then(m => {
                    m.react(reactions[react]);
                });
            });
        } else {
            const roleEmbed = new RichEmbed()
                .setDescription(embedMessage)
                .setFooter(embedFooter);

            if (embedColor) roleEmbed.setColor(embedColor);

            const fields = generateEmbedFields();
            for (const f of fields) roleEmbed.addField(f.emoji, f.role, true);

            message.channel.send(roleEmbed).then(async m => {
                for (let r of reactions) await m.react(r);
            });
        }
    }
});

const events = {
	MESSAGE_REACTION_ADD: 'messageReactionAdd',
	MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

client.on('raw', async event => {

    if (!events.hasOwnProperty(event.t)) return;

    const { d: data } = event;
    const user = client.users.get(data.user_id);
    const channel = client.channels.get(data.channel_id);

    const message = await channel.fetchMessage(data.message_id);
    const member = message.guild.members.get(user.id);

    const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name;
    const reaction = message.reactions.get(emojiKey);

    let embedFooterText;
    if (message.embeds[0]) embedFooterText = message.embeds[0].footer.text;

    if (message.author.id === client.user.id && (message.content !== initialMessage || (message.embeds[0] && (embedFooterText !== embedFooter)))) {

        if (!embed) {
            const re = `\\*\\*"(.+)?(?="\\*\\*)`;
            const role = message.content.match(re)[1];

            if (member.id !== client.user.id) {
                const roleObj = message.guild.roles.find(r => r.name === role);

                if (event.t === "MESSAGE_REACTION_ADD") {
                    member.addRole(roleObj.id);
                } else {
                    member.removeRole(roleObj.id);
                }
            }
        } else {
            const fields = message.embeds[0].fields;

            for (let i = 0; i < fields.length; i++) {
                if (member.id !== client.user.id) {
                    const role = message.guild.roles.find(r => r.name === fields[i].value);

                    if (fields[i].name === reaction.emoji.name) {
                        if (event.t === "MESSAGE_REACTION_ADD") {
                            member.addRole(role.id);
                            break;
                        } else {
                            member.removeRole(role.id);
                            break;
                        }
                    }
                }
            }
        }
    }
});
