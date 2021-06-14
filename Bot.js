
/*==========================================================================================================*/
const {VK, Keyboard} = require('vk-io');
const fs = require("fs"); 
const acc = require("./base/acc.json");
const uid = require("./base/uid.json");
const tokens = require("./base/tokens.json");
const all = require("./base/all.json");  
 
/*==========================================================================================================*/
setInterval(function(){
	fs.writeFileSync("./base/acc.json", JSON.stringify(acc, null, "\t")) 
	fs.writeFileSync("./base/uid.json", JSON.stringify(uid, null, "\t"))  
	fs.writeFileSync("./base/tokens.json", JSON.stringify(tokens, null, "\t"))
	fs.writeFileSync("./base/all.json", JSON.stringify(all, null, "\t"))    
}, 1500);
/*==========================================================================================================*/
for(a in tokens.tokens){ tokens.tokens[a].stats = false; }
/*==========================================================================================================*/
for(i in tokens.tokens){
	if(tokens.tokens[i].stats == false){ 
		tokens.tokens[i].stats = true;
		var bot = new bots(VK, {
			token: i,
			apiMode: 'parallel',
			id: tokens.tokens[i].id,
			bd: tokens.tokens[i].bd
		});  
	} 
}
/*==========================================================================================================*/
function start(){
	for(i in tokens.tokens){
		if(tokens.tokens[i].stats == false){ 
			var bot = new bots(VK, {
				token: i,
				apiMode: 'parallel',
				id: tokens.tokens[i].id,
				bd: tokens.tokens[i].bd
			}); 
			tokens.tokens[i].stats = true;
		}
	} 
}

/*==========================================================================================================*/
function bots(VK, token) {  

	const vk = new VK(); 
	const {updates} = vk;  

	vk.setOptions({
		token: token.token,
		apiMode: 'parallel',
		pollingGroupId: token.id
	});  
	/*==========================================================================================================*/
	vk.updates.use(async (message, next) => {  
	 	const cid = 1; 
	 	const aid = token.bd;
	    if (message.is("message") && message.isOutbox) { return; }  
	    message.user = message.senderId; message.text = message.payload.text; if (!message.text) return;
	/*==========================================================================================================*/	   
	    if(!acc[cid]){ acc[cid] = { users: {}, number: 0, name: false, imperator: false } }
	    if(!uid[cid]){ uid[cid] = {} }
	/*==========================================================================================================*/
	    if(!uid[1][message.user]){ 
		 	acc[1].number += 1; 
			uid[1][message.user] = {
				id: acc[1].number
			}
	 
			var result  = ''; let words  = '0123456789'; let max_position = words.length - 1;
			for( i = 0; i < 5; ++i ) {
				position = Math.floor ( Math.random() * max_position );
				result = result + words.substring(position, position + 1);
			}

			acc[1].users[acc[1].number] = {
				ban: false,
				gold: 0,
				donate: 0,
				card: 0,
				level: 1,
				exs: 0,
				admin: 0,
				id: message.user,
				hero: {
					id: false,
					name: false,
					prefix: false,
					hp: 0,
					zashita: 0,
					ataka: 0, 
					kr_udar: 0,
					navik: {
						id: false,
						name: false, 
						count: false
					},
					up: false,
					gun: false
				},
				res: {
					tree: 0,
					stone: 0
				},
				objects: { 
					lesopilka: 0,
					kamenolom: 0,
					gold: 0,
					hp: false,
					zashita: false,
					ataka: false,
					kr_udar: false
				},
				limits: {
					stroyka: false,
					id: false,
					bonus: 'first',
					war: false,
					les: false
				},
				msg: 0,
				refka: {
					activ: false,
					level: 1,
					lvl_up: 5,
					users: {},
					dohod: 10,
					count: 0,
					bonus: {
						tree: 100,
						stone: 50,
						gold: 10
					}, 
					cod: Number(result)
				},
				clan: false,
				registr: 1,
				vip: 0,
				rtime: `${time()} | ${data()}` 
			}   
			var name = 'странник'
			vk.api.call('users.get', { user_ids: message.user, fields: "photo_max,verified,domain,last_seen"}).then(res => {
				let user = res[0]; 
				name = `${user.first_name}`; 
			}).catch((error) => { 
				console.log('err_name'); 
			}); 

			if(acc[aid] != 1){
				return message.send(`
					🔯 Приветствую тебя, ${name}! 
					🔹 Рады приветствовать тебя в нашей империи. 
					🔹 Чтобы играть в боте, 
					🔹 Вам нужно пройти регистрацию
					
					❗ В официальной группе: vk.com/gameb0t11
					❗ Просто напишите сообщение в ЛС группы.
				`)
			}
			////////////////////  
			if(message.$from.type != 'user'){
				return message.send(`
					🔯 Приветствую тебя, ${name}! 
					🔹 Рады приветствовать тебя в нашей империи. 
					🔹 Чтобы создать своего персонажа, 
					🔹 Вам нужно пройти регистрацию. 
					🔹 Для этого, вам нужно написать команду:
					❗ "Помощь"
				`)
			}else{ 
				return message.send(`
					🔯 Приветствую тебя, ${name}! 
					🔹 Рады приветствовать тебя в нашей империи. 
					🔹 Чтобы создать своего персонажа, 
					🔹 Вам нужно пройти регистрацию. 
					🔹 Для этого, вам нужно написать команду:
					❗ "Помощь"
				`
				)
			}
		}   
		if(message.text){if(acc[1].users[user_id(message.user)].msg){acc[1].users[user_id(message.user)].msg += 1}}
		if(acc[cid].users[user_id(message.user)].registr == 1){ 
			
			if(aid != 1){return message.send(`✅ Пройти регистрацию нужно в основной группе: [gameb0t11|Бот Империал]`);} 
			if(message.$from.type != 'user'){
				if(!/[0-9]+/.test(message.text)) return message.send(`✅ Укажите номер героя\n✅ Напиши цифру от 1 до 6\n- - - - -\n${text_hero()}\n- - - - \n✅ Укажите номер героя\n✅ Напиши цифру от 1 до 6`)
			}else{
				if(!/[0-9]+/.test(message.text)) return message.send(`✅ Укажите номер героя\n✅ Напиши цифру от 1 до 6\n- - - - -\n${text_hero()}\n- - - - \n✅ Укажите номер героя\n✅ Напиши цифру от 1 до 6`)
			}
			acc[cid].users[user_id(message.user)].hero.id = message.text;
			acc[cid].users[user_id(message.user)].hero.name = heros[message.text].group;
			acc[cid].users[user_id(message.user)].registr = false;

			return message.send(`
			✅ Ваш герой: ${heros[message.text].group}

			🔯 Характеристики:
			❤ Здоровье: 0
			🛡 Защита: 0
			⚔ Атака: 0
			🗡 Критический урон: 0
			💠 Навык: отсутствует 
			- - - - - 
			🔸 Здоровье, защита, атака
			🔸 При атаке на других игроков складываются
			🔸 Критический урон срабатывает в бою 
			🔸 С небольшой вероятностью.
			🔸 Навыки можно открыть/поменять,
			🔸 Достигнув 3 ранга.
			🔸 Уровень героя можно повысить,
			🔸 Обучая и улучшая персонажа, 
			🔸 Строя новые здания
			🔸 И участвуя я поединках.

			‼ Напишите 'ПОМОЩЬ'
			`); 
		}

	/*==========================================================================================================*/
		let id = user_id(message.user); 
		if(message.text){ if(acc[cid].users[id].ban != false) return;   }
	    try { await next(); } catch (err) { console.error(err) }
	});
	/*==========================================================================================================*/

	//////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////
	const cid = 1; // Chat Id (основной)
	const aid = token.bd; //Альянс ИД
	//////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////////////////////////////////////

	/*==========================================================================================================*/	   	

	vk.updates.hear(/^(?:создать)\s?([^]+)?\s([0-9]+)?/i, (message) => {  
		let user = acc[cid].users[user_id(message.user)]; 
		if(user.donate < 100) return message.send(`📛 Создание Альянса стоит 100р\n📛 Товар: vk.cc/8UNVZ1`);
		if(!message.$match[1] || !message.$match[2]) return message.send(`📛 Проверьте ввод данных:\n'Создать [token] [id]'`);
		let i = message.$match[1];  
		user.donate -= 100;
		tokens.number += 1;
		tokens.tokens[i] = { id: message.$match[2], stats: false, bd: tokens.number }

		user.clan = tokens.number;

		acc[tokens.number] = {
			users: {},  
			dev: user_id(message.user),
			name: 'Альянс',
			balance: {
				tree: 0,
				stone: 0,
				gold: 0
			},
			arm: {
				pehota: 0,
				mech: 0,
				opol: 0,
				lyk: 0
			},
			ataka: 0,
			zashita: 0,
			objects: {
				stena: 0,
				katapylt: 0,
				bashnya: 0,
				kol: 0,
				rov: 0
			}
		} 

		acc[tokens.number].users[user_id(message.user)] = {
			id: message.user,
			level: 2,
			name: user.hero.prefix
		}
		 
		start();
		return message.send(`🔹 Токен: ${i}\n🔹 ID: ${message.$match[2]}\n🔹 Сохранены`);
	});
	/*==========================================================================================================*/

	vk.updates.hear(/^(?:альянс)$/i, (message) => { 
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan == false) return message.send(`📛 Вы не состоите в Альянсе`);
		let al_id = user.clan; 
		return message.send(`
			🔸 Данные Альянса
			🔸 Название: ${acc[al_id].name}
			🔸 Предводитель: @id${acc[1].users[acc[al_id].dev].id}(${acc[1].users[acc[al_id].dev].hero.prefix})
			- - - - - - -
			💰 Казна:
			💰 Золота: ${acc[al_id].balance.gold}
			💰 Камня: ${acc[al_id].balance.stone}
			💰 Дерева: ${acc[al_id].balance.tree}
			- - - - - - - 
			🛡 Защита: ${acc[al_id].zashita}%
			🛡 Стены: ${acc[al_id].objects.stena}
			🛡 Башни: ${acc[al_id].objects.bashnya}
			🛡 Катапульты: ${acc[al_id].objects.katapylt}
			- - - - - - -
			⚔ Атака: ${acc[al_id].ataka}%
			⚔ Ополченцы: ${acc[al_id].arm.opol}
			⚔ Лучники: ${acc[al_id].arm.lyk}
			⚔ Мечники: ${acc[al_id].arm.mech}
			⚔ Пехота: ${acc[al_id].arm.pehota}

			🔸 Команды:
			🔸 Дположить СУММА - положить дерево
			🔸 Кположить СУММА - положить камень
			🔸 Зположить СУММА - положить золото
			🔸 Сделать - меню улучшений
			🔸 Состав - состав Альянса
			🔸 Переименовать НАЗВАНИЕ - для создателя

		`);
	});
	////
	vk.updates.hear(/^(?:дположить)\s?([0-9]+)?/i, (message) => {
		if(aid == 1) return message.send(`📛 Положить дерево можно только в группе Альянса.`); 
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`📛 Проверьте ввод данных:\n'Дположить СУММА'`);
		let i = Number(message.$match[1]); 
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan == false) return message.send(`📛 Вы не состоите в Альянсе`);
		if(user.res.tree < i)  return message.send(`📛 У вас недостаточно дерева`);
		user.res.tree -= i;
		acc[user.clan].balance.tree += i;
		return message.send(`🔸 Вы положили ${i} дерева в казну Альянса`);
	});

	vk.updates.hear(/^(?:кположить)\s?([0-9]+)?/i, (message) => { 
		if(aid == 1) return message.send(`📛 Положить камень можно только в группе Альянса.`); 
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`📛 Проверьте ввод данных:\n'Кположить СУММА'`);
		let i = Number(message.$match[1]); 
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan == false) return message.send(`📛 Вы не состоите в Альянсе`);
		if(user.res.stone < i)  return message.send(`📛 У вас недостаточно камня`);
		user.res.stone -= i;
		acc[user.clan].balance.stone += i;
		return message.send(`🔸 Вы положили ${i} камня в казну Альянса`);
	});

	vk.updates.hear(/^(?:зположить)\s?([0-9]+)?/i, (message) => { 
		if(aid == 1) return message.send(`📛 Положить золото можно только в группе Альянса.`); 
		if(!message.$match[1] || !Number(message.$match[1])) return message.send(`📛 Проверьте ввод данных:\n'Зположить СУММА'`);
		let i = Number(message.$match[1]); 
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan == false) return message.send(`📛 Вы не состоите в Альянсе`);
		if(user.gold < i)  return message.send(`📛 У вас недостаточно золота`);
		user.gold -= i;
		acc[user.clan].balance.gold += i;
		return message.send(`🔸 Вы положили ${i} золота в казну Альянса`);
	});

	vk.updates.hear(/^(?:Сделать)\s?([0-9]+)?/i, (message) => { 
		if(aid == 1) return message.send(`📛 Сделать улучшение можно только в группе Альянса.`);  
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan == false) return message.send(`📛 Вы не состоите в Альянсе`); 
		if(message.$match[1]){
			let i = Number(message.$match[1]); 
			if(i < 0 || i > 9) return message.send(`📛 Неверный ID объекта`); 

			if(i==1){if(acc[user.clan].balance.tree < 10000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.tree -= 10000; acc[user.clan].objects.stena += 1;}
			if(i==2){if(acc[user.clan].balance.tree < 20000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.tree -= 20000; acc[user.clan].objects.bashnya += 1;}
			if(i==3){if(acc[user.clan].balance.tree < 30000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.tree -= 30000; acc[user.clan].objects.katapylt += 1;}
			if(i==4){if(acc[user.clan].balance.stone < 60000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.stone -= 60000; acc[user.clan].objects.kol += 1;}
			if(i==5){if(acc[user.clan].balance.stone < 100000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.stone -= 100000; acc[user.clan].objects.rov += 1;}
			if(i==6){if(acc[user.clan].balance.gold < 5000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.gold -= 5000; acc[user.clan].arm.opol += 1;}
			if(i==7){if(acc[user.clan].balance.gold < 10000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.gold -= 10000; acc[user.clan].arm.lyk += 1;}
			if(i==8){if(acc[user.clan].balance.gold < 20000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.gold -= 20000; acc[user.clan].arm.mech += 1;}
			if(i==9){if(acc[user.clan].balance.gold < 40000) return message.send(`📛 В казне Альянса не хватает дерева!`); acc[user.clan].balance.gold -= 40000; acc[user.clan].arm.pehota += 1;}
			 
			return message.send(`🛡 Вы успешно купили улучшение для Альянса`);  
		}else{
			return message.send(`
				🛡 Усиление защиты
				1&#8419; Стена | 10000 дерева +1%
				2&#8419; Башня | 20000 дерева +3%
				3&#8419; Катапульта | 30000 дерева +5%
				4&#8419; Колья | 60000 камня + 20%
				5&#8419; Ров с водой | 100000 камня +35%

				⚔ Усиление атаки. Армия.
				6&#8419; Ополченцы | 5000 золота +2%
				7&#8419; Лучники | 10000 золота +5%
				8&#8419; Мечники | 20000 золота +7%
				9&#8419; Пехота | 40000 золота +15%

				🔸 Для покупки напишите:
				🔸 'Сделать ID'
			`);
		}
	});

	vk.updates.hear(/^(?:вступить)\s?([0-9]+)?/i, (message) => {   
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan != false) return message.send(`📛 Вы уже состоите в Альянсе`); 
		if(!Number(message.$match[1])) return message.send(`📛 Укажите номер Альянса`); 
		let i = Number(message.$match[1]);  
		if(acc[i].users[user_id(message.user)]) return message.send(`📛 Вы уже состоите в Альянсе!`); 
		user.clan = i;
		acc[i].users[user_id(message.user)] = {
			level: 0
		}
  		return message.send(`📛 Вы вошли в Альянс`);
  	});
	/*==========================================================================================================*/

	vk.updates.hear(/^(?:состав)/i, (message) => { 
		if(aid == 1) return message.send(`📛 Команда работает в группе Альянса.`); 
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan == false) return message.send(`📛 Вы не состоите в Альянсе`);

		let al_id = user.clan;
		let peoples = '';  
		for(i in acc[al_id].users){ 
			peoples += `🔹 ID: ${i} | [id${acc[1].users[i].id}|${acc[1].users[i].hero.prefix}]\n`;
		}
		return message.send(`
			🔸 Состав Альянса:
			${peoples}
		`);
	});


	/*==========================================================================================================*/
	vk.updates.hear(/^(?:переименовать)\s?([^]+)?/i, (message) => {   
		if(aid == 1) return message.send(`📛 Команда работает в группе Альянса.`); 
		let user = acc[cid].users[user_id(message.user)];
		if(user.clan == false) return message.send(`📛 Вы не состоите в Альянсе`);
		if(!message.$match[1]) return message.send(`📛 Проверьте ввод данных:\n'переименовать [название]'`);
		if(acc[acc[cid].users[user_id(message.user)].clan].users[user_id(message.user)].level < 1) return message.send(`📛 Вы не создатель Альянса!`);
		let i = message.$match[1];

		let zaprets1 = message.$match[1].toLowerCase();
		var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkbot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`📗 » Придумайте адекватное название`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватное название`);
		}
		if(message.$match[1].length > 15) return message.send(`📗 » Максимальная длина названия 15 символов.`); 
			acc[acc[cid].users[user_id(message.user)].clan].name = i;
			return message.send(`🔹 Вы переименовали Альянс (${i})`);
	});
	/*==========================================================================================================*/

	/*==========================================================================================================*/
	vk.updates.hear(/^(?:dellmagc)\s?([^]+)?/i, (message) => {  
		if(!message.$match[1]) return message.send(`📛 Проверьте ввод данных:\n'dell [token]'`);
		let i = message.$match[1]; 
		if(!tokens.tokens[i]) return message.send(`📛 Бота с таким токеном не существует!`);
		delete tokens.tokens[i]; 
		return message.send(`📛 Вы удалили бота с вашей группы.`);
	}); 

	/*==========================================================================================================*/
	vk.updates.hear(/^(?:альянсы)/i, (message) => {
		let text = '';
		for(i in acc){
			if(i!=1){
				text += `ID ${i} | ${acc[i].name} | [id${acc[1].users[acc[i].dev].id}|${acc[1].users[acc[i].dev].hero.prefix}]\n-----\n`
			}
		} 
		return message.send(`
			✅ Император: @magicbot_inc(MagicBot Inc)
			- - - - -
			✅ Номер | Альянсы | Создатели
			${text}
		`)
	});


	/*
	Состав участников до 15.
	Возможность скидываться ресурсами в казну общую.
	Покупка из казны зданий, стен для обороны
	Покупка армии: ополченцев, лучников, мечников.
	Атака и защита. Суммарная мощь это.
	Все меню альянсы в группе подключенной. 
	*/


	/*==========================================================================================================*/
	/*==========================================================================================================*/
	vk.updates.hear(/^(?:поиск)(\shttps\:\/\/vk\.com\/)?(id)?([0-9]+)?([^]+)?/i, (message) => { 

		if(message.$match[3]){
			var id = user_id(message.$match[3]);
			if (!acc[1].users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
			return message.send(`
				🔹 Игрок: [id${acc[1].users[id].id}|${acc[1].users[id].hero.prefix.toString().replace(/false/gi, "Герой")}]
				🔹 ID: ${id}
				🔹 Статус: ${acc[1].users[id].admin.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Дизайнер").replace(/2/gi, "DEVELOPER")}
				🔹 Ранг: ${acc[1].users[id].level}
			`);
		}else{ 
			if(!message.$match[4]) return message.send(`Укажите данные`);
			var domain = message.$match[4].split(" ");
			vk.api.call("utils.resolveScreenName", {
				screen_name: message.$match[4]
			}).then((res) => { 
				var id = user_id(res.object_id);
				if (!acc[1].users[id]) return message.send(`Не верно указаны данные | Игрока нет`);  
				return message.send(`
					🔹 Игрок: [id${acc[1].users[id].id}|${acc[1].users[id].hero.prefix.toString().replace(/false/gi, "Герой")}]
					🔹 ID: ${id}
					🔹 Статус: ${acc[1].users[id].admin.toString().replace(/0/gi, "Игрок").replace(/1/gi, "Дизайнер").replace(/2/gi, "DEVELOPER")}
					🔹 Ранг: ${acc[1].users[id].level}
				`);
			})
			return;
		}
	});

	/*==========================================================================================================*/
	
	vk.updates.hear(/^(?:cmd|команды|кмд|помощь|✅ Помощь|@privat_project ✅ Помощь)/i, (message) => { 
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let user = acc[cid].users[user_id(message.user)];
		check(user)
		text = '';
		if(user.refka.activ == false){
			text += `- - - - - \n‼ Укажите реферальный код человека\n‼ Который Вас пригласил.\n✏ Напишите: "Активировать <COD>"\n\n‼ Если Вас никто не пригласил\n✏ Напишите: "Активировать MagicBot"\n📕 После активации Вы получите бонус!\n- - - - -\n`
		}
		if(aid != 1){
			return message.send(`
				🔔 Функционал Бота 🔔
				${text}
				🤖 Ко - отклик бота.
				👥 Бот - инфо о проекте.
				⚠ Помощь  - команды бота
				🆘 Рапорт [жалоба] - отправить репорт
				📋 Профиль - информация о игроке.
				💴 Баланс - ваше состояние.  
				🔎 Поиск [ССЫЛКА ВК игрока] - узнать ID 
				✅ Бонус - ежедневный бонус 
				💠 Открыть - открыть Карту Героя.
				💠 Открыть всё- открыть все Карты Героя.


				🏆 Топ - топ игроков

				👑 Вип - список преимуществ
				💰 Передать [ID] [SUMMA] - передать золото(VIP)
				🔸 Дпродать [КОЛИЧЕСТВО] - продажа дерева
				🔸 Кпродать [КОЛИЧЕСТВО] - продажа камня

				👦 Герои - список Героев 
				💾 Назвать [name] - переименовать Героя 
				🔹 Империи - список Империй  
				⚔ Атаковать [ID(игрока)] 
				📒 Реферал - статистика
				📜 Активировать [COD(реферала)] 

				- - - - - -
				‼ Команды ниже работают
				‼ Только в основной группе: vk.com/gameb0t11
				- - - - - -  
				🔫 Оружие - список оружия
				🏨 Постройки - список зданий.
				🔨 Строить №(постройки)
				📚 Обучить  
				📝 Навык - список навыков
				⛩ Рынок 
				✔ Купить №(товара) 
				📕 Промокод [COD] 

			`);	
		}
		return message.send(`
			🔔 Функционал Бота 🔔
			${text}
			⚠ Помощь  - команды бота
			🆘 Рапорт [жалоба] - отправить репорт
			📋 Профиль - информация о игроке.
			💴 Баланс - ваше состояние.
			✅ Бонус - ежедневный бонус 
			🔎 Поиск [ССЫЛКА ВК игрока] - узнать ID 
			⏩ Экспедиция - отправить героя в экспедицию

			🆘 Альянс инфо - вся информация.
			🆘 Альянс - список команд и информация.
			🆘 Вступить ID - Войти в Альянс.
			🆘 Альянсы - список альянсов.

			👑 Вип - список преимуществ
			💰 Передать [ID] [SUMMA] - передать золото(VIP)
			🔸 Дпродать [КОЛИЧЕСТВО] - продажа дерева
			🔸 Кпродать [КОЛИЧЕСТВО] - продажа камня

			🏆 Топ альянсы - топ Альянсов 
			🏆 Топ - топ игроков

			💠 Открыть - открыть Карту Героя.
			👦 Герои - список Героев
			🔫 Оружие - список оружия
			💾 Назвать [name] - переименовать Героя 
			🔹 Империи - список Империй 
			🏨 Постройки - список зданий.
			🔨 Строить №(постройки)
			📚 Обучить  
			📝 Навык - список навыков
			⛩ Рынок 
			✔ Купить №(товара)
			⚔ Атаковать [ID(игрока)]
			📕 Промокод [COD]
			📒 Реферал - статистика
			📜 Активировать [COD(реферала)] 

		`);
	}); 
	/*==========================================================================================================*/
	vk.updates.hear(/^(?:альянс инфо)$/i, (message) => {  
		return message.send(`
			Альянс в нашем боте является заменой старомодным кланам. 
			Однако одно остаётся неизменным. 
			Каждый может создать свой Альянс! 
			Для этого вам необходимо арендовать нашего бота 
			И подключить его к своей группе. 
			🆘 Будет стоить это всего 100 рублей. 
			Империал Бот будет функционировать в вашей группе, 
			Но принадлежать нагему проекту.
			В вашей версии будет чуть ограниченный функционал в общем, 
			Но расширенный в плане управления Альянсом. 
			Так же вы сможете редактировать информацию Альянса :
			Название/смена руководящего состава/удаление игроков и т.д.
			Обратите ваше внимание, что приглашать участников можно только в основной группе!
			Чтобы создать Альянс, нужно написать в ЛС ГРУППЫ vk.com/gameb0t11
			- - -
			"Создать [TOKEN] [ID]"
			[TOKEN] - Токен вашей группы.
			[ID] - цифровой ИД группы.

			По всем вопросам писать - vk.com/c_o_d_e_r
		`);
	});
	/*==========================================================================================================*/
	vk.updates.hear(/^(?:eval)\s([^]+)/i, (message) => {  
		if (message.user === 489137926) {
			return message.send(`Готово: ${eval(message.$match[1])}`);
		}
	});
	/*==========================================================================================================*/
	vk.updates.hear(/^(?:✅ Герои|герои|@privat_project ✅ Герои)/i, (message) => {  
		if(check_id(aid)) return message.send(check_id(aid))
		return message.send(`✅ Укажите номер героя\n- - - - -\n${text_hero()}`)
	});
	/*==========================================================================================================*/
	vk.updates.hear(/^(?:вип)/i, (message) => { 
		return message.send(`
			👑 Преимущества VIP аккаунта
			🔸 Ускоренная прокачка ранга (х2)
			🔸 Удвоенная прибыль с лесопилок/каменоломнь
			🔸 В 2 раза больше карт с бонуса
			🔸 Больше награда за победу над игроками
			🔸 Удвоенный донат. 1 империал = 200 золота. 

			🔸 Доступна передача золота другим игрокам 
			🔸 ("Передать ID СУММА")
			🔸 Дпродать [КОЛИЧЕСТВО] - продажа дерева
			🔸 Кпродать [КОЛИЧЕСТВО] - продажа камня

			👑 Преимущества SUPER VIP аккаунта
			🔸 Преимущества VIP'а.
			🔸 Двойная прибыль с "Бонус"
			🔸 В 3 раза больше карт с "Бонус"
			🔸 Бесплатная смена навыка
			🔸 Утроенный донат. 1 рубль - 300 золота.
			🔸 Время постройки зданий: 2 часа.

			‼ Купить VIP за 50р / SUPER VIP за 100р
			‼ Отправив сумму, указав ССЫЛКУ ВК.
			‼ https://qiwi.me/gameb0t11
		`);
	});
	/*==========================================================================================================*/ 	
 	vk.updates.hear(/^(?:топ альянсы)/i, (message) => { 

		let text = ``;
		var tops = []
		for (i=1;i<2000;i++) {
			if(i!=1){
				if(acc[i]){
					tops.push({
						id: i,
						dev: acc[i].dev,
						count: acc[i].summ_harac
					})
				}
			} 	 
		}
		tops.sort(function(a, b) {
			if (b.count > a.count) return 1
			if (b.count < a.count) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id,
					dev: tops[g].dev,
					count: tops[g].count,
					smile: `${ups}`
				})
			}
		}
		var people = "🏆 ТОП АЛЬЯНСОВ 🏆\n👑 Подвластных \n🕍 [gameb0t11|Империи] \n📢 @c_o_d_e_r(Vlad Kucher) \n- - - - - -\n" + yo.map(a => a.smile + " [id" + acc[1].users[a.dev].id + "|" + acc[1].users[a.dev].hero.prefix + "] | Мощь " + spaces(a.count) + "% 👑").join("\n")
		text += `${people}\n\n`; 
		return message.send(text);
	});

	/*==========================================================================================================*/ 	
 	vk.updates.hear(/^(?:топ)/i, (message) => { 

		let text = ``;
		var tops = []
		for (i=1;i<5000;i++) {
			if(acc[1]){
				if(acc[1].users[i]){

					let counts = acc[1].users[i].hero.hp + acc[1].users[i].hero.zashita + acc[1].users[i].hero.ataka + acc[1].users[i].hero.kr_udar;
					if(acc[1].users[i].hero.gun != false){ 
						counts += guns[acc[1].users[i].hero.gun].count;
					}
					tops.push({
						id: i,
						balance: acc[1].users[i].gold,
						count: counts,
						level: acc[1].users[i].level
					})
					 
				}
			}	 
		}
		tops.sort(function(a, b) {
			if (b.count > a.count) return 1
			if (b.count < a.count) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				let ups = g;
				ups += 1;
				if(g <= 8) ups = `${ups}&#8419;`
				if(g == 9) ups = `&#128287;`
				yo.push({
					id: tops[g].id, 
					gold: tops[g].balance,
					count: tops[g].count,
					level: tops[g].level,
					smile: `${ups}`
				})
			}
		}
		var people = "🏆 ТОП ИГРОКОВ 🏆\n- - - - - -\n" + yo.map(a => a.smile + " [id" + acc[1].users[a.id].id + "|" + acc[1].users[a.id].hero.prefix + "] | Мощь " + spaces(a.count) + "% | " + a.gold + " золота |" + a.level + " lvl").join("\n")
		text += `${people}\n\n`; 
		return message.send(text);
	});
	/*==========================================================================================================*/
 

	vk.updates.hear(/^(?:назвать)\s?([^]+)?/i, (message) => {   
		if(!message.$match[1]) return message.send(`📛 Пример команды: "назвать [префикс]"`);
		let user = acc[cid].users[user_id(message.user)]; 
		let i = message.$match[1];
		let zaprets1 = message.$match[1].toLowerCase();
		var zapret = /(&#4448;|вк бо т |вкботру|vkbot&#4448;ru|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
		if (zapret.test(zaprets1) == true) { 
				return message.send(`📗 » Придумайте адекватный ник`);
		}
		var filter0 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
		var filter1 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/
		var lol = filter0.test(zaprets1)
		var lol1 = filter1.test(zaprets1)	
		if (filter0.test(zaprets1) == true || filter1.test(zaprets1) == true) { 
			return message.send(`📗 » Придумайте адекватное имя`);
		}
		if(message.$match[1].length > 15) return message.send(`📗 » Максимальная длина имени 15 символов.`); 
		
		user.hero.prefix = i;
		if(acc[cid].users[user_id(message.user)].registr == false){
			acc[cid].users[user_id(message.user)].registr = 'actived';
			return message.send(`✏ Вы дали имя <${i}> своему герою\n\n‼ Поздравляем! Вы завершили регистрацию!\n✅ Чтобы получить бонус, напишите: "бонус"`);
		}
		return message.send(`✏ Вы дали имя <${i}> своему герою`);
	});
	/*==========================================================================================================*/
	vk.updates.hear(/^(?:💴 Баланс|баланс)/i, (message) => { 
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let user = acc[cid].users[user_id(message.user)];

		return message.send(`
			⏩ Аккаунт игрока <${user.hero.prefix}>
			&#127380; Игрока: ${user_id(message.user)}
			${user.vip.toString().replace(/0/gi, "👑 VIP: нет").replace(/1/gi, "👑 VIP: куплен").replace(/2/gi, "👑 SUPER VIP: куплен")}

			📶 Ранг: ${user.level}
			⏩ Повышается за постройку зданий/улучшения героя

			🃏 Карт Героя: ${user.card}
			&#128142; Империалов: ${user.donate}
			&#128176; Золота: ${user.gold} 
			🌳 Дерева: ${user.res.tree}
			🗿 Камня: ${user.res.stone} 
			- - - - - 
			🏫 Золотых шахт: ${user.objects.gold}
			⛩ Лесопилок: ${user.objects.lesopilka}
			🏛 Каменоломнь: ${user.objects.kamenolom} 

		`);
	});
	/*==========================================================================================================*/
	vk.updates.hear(/^(?:профиль|проф|📋 Профиль)\s?([0-9]+)?/i, (message) => { 
		let i = message.$match[1];
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)])) 
		if(i){ 
			if(!acc[1].users[i]) return message.send(`Такого игрока не найдено`);
			let user = acc[cid].users[user_id(message.user)];
			return message.send(`
			⏩ Аккаунт игрока <${user.hero.prefix}>
			&#127380; Игрока: ${user_id(message.user)}
			&#128100; Герой: ${acc[cid].users[user_id(message.user)].hero.name}

			📶 Ранг: ${acc[cid].users[user_id(message.user)].level}
			⏩ Повышается за постройку зданий/улучшения героя

			🔯 Характеристики
			❤ Здоровье: ${user.hero.hp}%
			🛡 Защита: ${user.hero.zashita}%
			⚔ Атака: ${user.hero.ataka}%
			🗡 Критический урон: ${user.hero.kr_udar}%

			` +
			(user.hero.gun == false ? `🔫 Оружие: не куплено\n` : `🔫 Оружие: ${guns[user.hero.gun].name}\n`)+
			(user.hero.gun == false ? `🔫 Урон: 0\n` : `🔫 Урон: ${guns[user.hero.gun].count}\n`)+
			`  
			` +
			(user.hero.navik.id == false ? `💠 Навык: отсутствует\n` : `💠 Навык: ${user.hero.navik.name}\n`)+
			` 
			`);
		}else{ 
			let user = acc[1].users[user_id(message.user)]; 
			return message.send(`
			⏩ Аккаунт игрока <${user.hero.prefix}>
			&#127380; Игрока: ${user_id(message.user)}
			&#128100; Герой: ${user.hero.name}

			📶 Ранг: ${user.level} 

			🔯 Характеристики
			❤ Здоровье: ${user.hero.hp}%
			🛡 Защита: ${user.hero.zashita}%
			⚔ Атака: ${user.hero.ataka}%
			🗡 Критический урон: ${user.hero.kr_udar}%

			` +
			(user.hero.gun == false ? `🔫 Оружие: не куплено\n` : `🔫 Оружие: ${guns[user.hero.gun].name}\n`)+
			(user.hero.gun == false ? `🔫 Урон: 0\n` : `🔫 Урон: ${guns[user.hero.gun].count}\n`)+
			`  
			` +
			(user.hero.navik.id == false ? `💠 Навык: отсутствует\n` : `💠 Навык: ${user.hero.navik.name}\n`)+
			` 
			`);
		}
		 
	});
	/*==========================================================================================================*/

	vk.updates.hear(/^(?:постройки|🚧 Постройки|постройка)/i, (message) => { 
		if(check_id(aid)) return message.send(check_id(aid))
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let user = acc[cid].users[user_id(message.user)];
		return message.send(`
			🚧 Добывающие
			1&#8419; Лесопилка [1000 д.] +100д./час
			2&#8419; Золотая шахта [1500 д.] +50з./час
			3&#8419; Каменоломня [5000 д.] +100к./час 
			- - - - - -
			❤ Повышающие [Здоровье]
			4&#8419; Магический алтарь [5000 к.] +2%/час 
			- - - - - -
			🛡 Повышающие [Защиту]
			5&#8419; Рыцарский храм [5000 к.] +2%/час 
			- - - - - - 
			⚔ Повышающие [Атаку]
			6&#8419; Военная академия [5000 к.] +2%/час
			- - - - - -
			🗡 Повышающие [Критический урон]
			7&#8419; Магический круг [5000 к.] +2%/час
			- - - - - -
			&#10067; Название [цена] +прибыль/навык
			&#10067; д.- дерево | к. - камень. 
			⏩ Для постройки напишите: 'Строить ID'
		`);
	});	
	/*==========================================================================================================*/

	vk.updates.hear(/^(?:строить)\s?([0-9]+)?/i, (message) => {
		if(check_id(aid)) return message.send(check_id(aid))
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = message.$match[1];
		let user = acc[cid].users[user_id(message.user)];
		if(!i || !Number(i)) return message.send(`📛 Пример команды: "Строить ID"\n📛 ID - номер постройки ('постройки')`);
		if(i < 0 || i > 7) return message.send(`📛 Неверно указан номер постройки. ('постройки')`);

		if(i==1 && user.res.tree < 1000|| i == 2 && user.res.tree < 1500 || i == 3 && user.res.tree < 5000) return message.send(`📛 У вас недостаточно древесины.`);
		if(i==4 && user.res.stone < 5000|| i == 5 && user.res.stone < 5000 || i == 6 && user.res.stone < 5000 || i == 7 && user.res.stone < 5000) return message.send(`📛 У вас недостаточно камня.`);

		if(i == 4 && user.objects.hp == true) return message.send(`📛 У вас уже построена `);
		if(i == 5 && user.objects.zashita == true) return message.send(`📛 У вас уже построена `);
		if(i == 6 && user.objects.ataka == true) return message.send(`📛 У вас уже построена `);
		if(i == 7 && user.objects.kr_udar == true) return message.send(`📛 У вас уже построена `);

		if(user.limits.stroyka != false) return message.send(`📛 Вы уже начали постройку объекта. Дождитесь её завершения.`);

		if(i==1){user.res.tree -= 1000} if(i==2){user.res.tree -= 1500} if(i==3){user.res.tree -= 5000}
		if(i==4){user.res.stone -= 5000} if(i==5){user.res.stone -= 5000} if(i==6){user.res.stone -= 5000} if(i==7){user.res.stone -= 5000}

		user.limits.stroyka = 3;
 		if(user.vip == 2){
 			user.limits.stroyka = 2;
 		}
		 

		user.limits.id = Number(i);
		let name = [0, 'лесопилки','золотой шахты','каменоломни','Магического алтаря','Рыцарского храма','Военной академии','Магического круга']

		return message.send(`
		🚧 Вы успешно начали постройку (${name[i]}).
		⌛ Время постройки объекта: 3 часа.
		⌛ (Для Super Vip - 2 час)
		`);
	});
	/*==========================================================================================================*/

	vk.updates.hear(/^(?:обучить)\s?([0-9]+)?/i, (message) => {
		if(check_id(aid)) return message.send(check_id(aid))
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = Number(message.$match[1])
		let user = acc[cid].users[user_id(message.user)];
		if(i < 0 || i > 5) return message.send(`📛 Неверно указан номер.`);
		if(i){
			if(i == 1 && user.objects.hp == false) return message.send(`📛 У вас не построен <Магический алтарь> ('постройки')`);
			if(i == 2 && user.objects.zashita == false) return message.send(`📛 У вас не построен <Рыцарский храм> ('постройки')`);
			if(i == 3 && user.objects.ataka == false) return message.send(`📛 У вас не построена <Военная академия> ('постройки')`);
			if(i == 4 && user.objects.kr_udar == false) return message.send(`📛 У вас не построен <Магический круг> ('постройки')`);
			if(user.hero.up == true) return message.send(`📛 Вы уже отправили героя на учения. Дождитесь его возвращения!`);

			let xar = [0, 'hp','zashita','ataka','kr_udar'];
			user.hero.up = true; 
			if(i==1||i==2){
				let time = 3600000;
				if(user.hero.navik.id == 4){
					time = 3600000 / user.hero.navik.count;
				}
				setTimeout(() => {
					user.hero.up = false;
					if(user.hero.navik.id == 6){
						user.hero[String(xar[i])] += 1;
					}
					user.hero[String(xar[i])] += 2;
				}, time); // time
			}
			if(i==3||i==4){
				let time = 3600000;
				if(user.hero.navik.id == 5){
					time = 3600000 / user.hero.navik.count;
				}
				setTimeout(() => {
					user.hero.up = false;
					if(user.hero.navik.id == 7){
						user.hero[String(xar[i])] += 1;
					}
					user.hero[String(xar[i])] += 2;
				}, time); // time
			}
			 
			return message.send(`🔹 Вы успешно отправили героя на учения.\n🔹 Через час он вернется с новыми навыками.`);

		}else{
			return message.send(`
			🔹 В данном разделе Вы можете 
			🔹 отправить своего героя на обучение.
			- - - - -
			❤ Повышение здоровья
			`+(user.objects.hp == false ? `❌ Магический алтарь: не построен`: `1&#8419; Магический алтарь: построен`)+`
			- - - - - 
			🛡 Повышение защиты
			`+(user.objects.zashita == false ? `❌ Рыцарский храм: не построен`: `2&#8419; Рыцарский храм: построен`)+`
			- - - - - 
			⚔ Повышение атаки
			`+(user.objects.ataka == false ? `❌ Военная академия: не построена`: `3&#8419; Военная академия: построена`)+`
			- - - - - 
			🗡 Повышение критического урона
			`+(user.objects.kr_udar == false ? `❌ Магический круг: не построен`: `4&#8419; Магический круг: построен`)+`
			- - - - -
			`+((user.objects.hp == false && user.objects.zashita == false && user.objects.ataka == false && user.objects.kr_udar == false) ? `❗ Чтобы улучшить характеристики героя\n❗ Постройте здания, где герой может тренироваться`: `❗ Чтобы отправить тренироваться героя, напишите:\n❗ 'обучить ID'\n❗ ID - это номер постройки.`)+` 
			`);
		}
	});

	/*==========================================================================================================*/
	vk.updates.hear(/^(?:оружие)\s?([0-9]+)?/i, (message) => {
		if(check_id(aid)) return message.send(check_id(aid))
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = Number(message.$match[1])
		let user = acc[cid].users[user_id(message.user)];
		if(i < 0 || i > 6) return message.send(`📛 Номер должен быть > 0 и < 6`);
		if(i){
			if(user.gold < guns[i].price) return message.send(`📛 Это оружие стоит ${guns[i].price} золота!`);
			user.gold -= Number(guns[i].price);
			user.hero.gun = i;
			return message.send(`
			⚔ Вы купили ${guns[i].name}
			🗡 Мощность оружия: ${guns[i].count}%
			- - - - -
			🔹 Ваше оружие было заменено.
			`);
		}else{
			let text = '';
			for(i in guns){
				text += `⚔ ${i}. ${guns[i].name} | ${guns[i].price} золота | ${guns[i].count}%\n`;
			}
			text += `❤ Название | Цена | Мощность\n🔸 Для покупки введите: "Оружие ID"`;
			return message.send(text);
		}
	});


	/*==========================================================================================================*/

	vk.updates.hear(/^(?:бонус)/i, (message) => { 
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let user = acc[cid].users[user_id(message.user)];
		if(user.limits.bonus == true) return message.send(`📛 Забирать бонус можно раз в час.`);
		if(user.limits.bonus == 'first'){
			user.limits.bonus = true;
			setTimeout(() => {
				user.limits.bonus = false;
			}, 3600000); // 3600000
			user.card += 10;
			user.gold += 100;
			user.res.tree += 1000;
			user.exs += 60;
			return message.send(`
			⭐ Из ежечасного бонуса Вам выпало:
			⏩ 1000 Дерева
			⏩ 100 Золота
			⏩ 10 Карт Героя
			- - - - -

			⚠ Подсказка: Открывая карты Героя 
			⚠ Вы улучшаете своего персонажа.
			‼ Характеристика вашего героя: "ПРОФИЛЬ"
			‼ Открыть карту Героя: "ОТКРЫТЬ"
			`);

		}else{
			user.limits.bonus = true;
			setTimeout(() => {
				user.limits.bonus = false;
			}, 3600000); // 3600000
			let text = ``; 
			let count = rand(2,3)
			if(rand(0,1) == 1){
				if(user.vip == 1){ user.card += 1; text += `⏩ 1 Карты Героя\n` }
				if(user.vip == 2){ user.card += 2; text += `⏩ 2 Карты Героя\n` }
				user.card += 1;
				text += `⏩ 1 Карты Героя\n`
			}
			for(i=0;i<count;i++){
				let trees = rand(80,200);
				let stones = rand(80,150);
				let golds = rand(10,25);
				if(user.vip == 2){
					trees += trees; stones += stones; golds += golds;
				}
				let r = rand(1,100);
				if(r > 50) {
					user.res.tree += trees;
					text += `⏩ ${trees} Дерева\n`;
				}
				if(r < 50 && r > 20) {
					user.res.stone += stones;
					text += `⏩ ${stones} Камня\n`;
				}
				if(r < 20 && r > 0) {
					user.gold += golds;
					text += `⏩ ${golds} Золота\n`;
				}
			}
			uplvl(acc[cid].users[user_id(message.user)]);
			return message.send(`
			⭐ Из ежечасного бонуса Вам выпало:
			${text}
			`)
		}
	})
 	

 	/*==========================================================================================================*/
	vk.updates.hear(/^(?:навык)\s?([0-9]+)?/i, (message) => {
		if(check_id(aid)) return message.send(check_id(aid))
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = Number(message.$match[1])
		let user = acc[cid].users[user_id(message.user)];
		if(user.rang < 3) return message.send(`📛 Выбор навыка доступен с 3 ранга!`);
		if(i< 0 || i > 7) return message.send(`📛 Неверный ID навыка.`);
		if(i){ 
			if(user.hero.navik.id == false){
				user.hero.navik.id = Number(i);
				user.hero.navik.name = naviks[String(i)].text;
				user.hero.navik.count = naviks[String(i)].count;
				uplvl(acc[cid].users[user_id(message.user)]);
				return message.send(`
				🔯 Вы выбрали навык:
				⏩ ${naviks[String(i)].text}
				- - - - - 
				❌ Повторная смена навыка стоит 20 Империалов.
				`); 
			}else{
				// platno
				if(user.donate < 20 && user.vip < 2) return message.send(`📛 Смена навыка стоит 20 Империалов\n📛 Для Super Vip - бесплатно`);
				if(user.vip < 2){
					user.donate -= 20;	
				} 
				user.hero.navik.id = Number(i);
				user.hero.navik.name = naviks[String(i)].text;
				user.hero.navik.count = naviks[String(i)].count;
				uplvl(acc[cid].users[user_id(message.user)]);
				return message.send(`
				🔯 Вы выбрали навык:
				⏩ ${naviks[String(i)].text}
				- - - - - 
				❌ Повторная смена навыка стоит 20 Империалов
				📛 Для Super Vip - бесплатно	
				`);
			}
 

		}else{
			return message.send(`
			1&#8419; Увеличенная добыча дерева (х2)
			2&#8419; Увеличенная добыча камня (х2)
			3&#8419; Увеличенная добыча золота (х2)
			4&#8419; Ускоренная прокачка HP/Защиты (x1.5)
			5&#8419; Ускоренная прокачка Атаки/Критического урона (x1.5)
			6&#8419; Увеличение HP/Защиты при обучении (+3%)
			7&#8419; Увеличение Атаки/Критического урона при обучении (+3%) 
			- - - - -
			⏩ Для выбора навыка напишите:
			⏩ "Навык ID"
			`);
		}
	});
	/*==========================================================================================================*/
 	vk.updates.hear(/^(?:ко|тест)/i, (message) => {
 		return message.send(`&#129302; Работаю!`);
 	});
 	/*==========================================================================================================*/
 	vk.updates.hear(/^(?:бот)/i, (message) => {
 		return message.send(`
 		&#129302; Проект: [gameb0t11|Империал Бот] 
		Империал Бот - это принципиально новый бот от всеми известного создателя, из под чьих ловких рук вышло не мало легенд этой отрасли! В этом проекте были учтены недостатки прошлых и мы представляем вам увлекательную РПГ игру с невероятным количеством общения, сражений, строительства, развития! 

 		&#128128; Developer(coder): [greatrussiatop|Илья Зименков]

 		&#128122; Дизайнер: [greatrussiatop|Илья]

 		👻 Креативщик: [greatrussiatop|Илья]

 		⏩ Беседы:
 		Пока их нет
 		`);
 	});
 	/*==========================================================================================================*/
 	vk.updates.hear(/^(?:рынок)/i, (message) => {
 		if(check_id(aid)) return message.send(check_id(aid))
		let user = acc[cid].users[user_id(message.user)];
		if(user.rang < 2) return message.send(`📛 Рынок доступен со 2 ранга!`);
 		return message.send(`
 		♻ Рынок Империи
 
 		1&#8419; Карта Героя - 3 Империала
 		🔸 https://vk.cc/8TObbc
 		2&#8419; 100 Золота - 1 Империал
 		- - - - - 
 		3&#8419; Маленький комплект - 50 золота
 		⭐ (100 дерева / 50 камня)
 		4&#8419; Средний комплект - 100 золота
 		⭐ (300 дерева / 200 камня)
 		5&#8419; Большой комплект - 500 золота
 		⭐ (2000 дерева / 1000 камня)
 		- - - - -
 		⏩ Для покупки/продажи напишите:
 		⏩ "Купить ID КОЛИЧЕСТВО"
 
 		`);
 	});
 	 
 	/*==========================================================================================================*/
	vk.updates.hear(/^(?:купить)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(check_id(aid)) return message.send(check_id(aid))
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = Number(message.$match[1])
		let c = Number(message.$match[2]) 
		let user = acc[cid].users[user_id(message.user)];
		if(!i || !c || !Number(i) || !Number(c)) return message.send(`📛 Пример команды: "Купить ID КОЛИЧЕСТВО"`);
		if(user.rang < 2) return message.send(`📛 Рынок доступен со 2 ранга!`);
		if(i < 0 || i > 5) return message.send(`📛 Неверно указан ID операции.`);
		if(i == 1){
			if(user.donate < c*3) return message.send(`📛 ${c} карт(а) стоит ${c*3} Империалов.`); 
			user.donate -= c * 3;
			user.card += Number(c);
			return message.send(`✅ Вы успешно купили ${c} Карт Героя за ${c*3} Империалов`);
		}
		if(i == 2){
			if(user.donate < c*10) return message.send(`📛 ${c*100} золота стоит ${c*1} Империалов.`); 
			user.donate -=  c * 1;
			user.gold += Number(c)*100;
			if(user.vip >= 1){
				user.gold += Number(c)*100;
				return message.send(`✅ Вы успешно купили ${c*200} золота за ${c} Империалов`);
			}
			return message.send(`✅ Вы успешно купили ${c*100} золота за ${c} Империалов`);
		} 
		if(i == 3){ 
			if(user.gold < c*50) return message.send(`📛 ${c} Маленьких комплект стоит ${c*50} золота.`); 
			user.gold -=  c * 50; user.res.tree += c * 100; user.res.stone += c * 50; 
			return message.send(`✅ Вы успешно купили ${c} Маленький комплект за ${c*50} золота`);
		}
		if(i == 4){
			if(user.gold < c*100) return message.send(`📛 ${c} Средний комплект стоит ${c*100} золота.`); 
			user.gold -=  c * 100; user.res.tree += c * 300; user.res.stone += c * 200; 
			return message.send(`✅ Вы успешно купили ${c} Средний комплект за ${c*100} золота`);
		}
		if(i == 5){
			if(user.gold < c*500) return message.send(`📛 ${c} Большой комплект стоит ${c*500} золота.`); 
			user.gold -=  c * 500; user.res.tree += c * 2000; user.res.stone += c * 1000; 
			return message.send(`✅ Вы успешно купили ${c} Большой комплект за ${c*500} золота`);
		}

	});
	///////message.send(`↪ Держи : "${text.split('').reverse().join('')}"`)
	/*==========================================================================================================*/ 

	vk.updates.hear(/^(?:атаковать)\s?([0-9]+)?/i, (message) => {
		if(!message.$match[1]) return message.send(`📛 Пример команды: "атаковать ID(игрока)"`);
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = Number(message.$match[1])
		if(user_id(message.user) == i) return message.send(`📛 Упс... Вы указали свой ID`);
		let user = acc[cid].users[user_id(message.user)];
		let a = acc[cid].users[i];
		if(!acc[cid].users[i]) return message.send(`📛 Упс... Такого игрока не найдено.`);
		if(acc[1].users[user_id(message.user)].level < 3 || acc[1].users[i].level < 3) return message.send(`📛 Атаковать игроков можно с 3 ранга!`);
		if(user.limits.war == true) return message.send(`📛 Вы уже атаковали в этом часу.`);
		if(a.limits.war == true) return message.send(`📛 На этого игрока уже нападали.`);

		let summ_user = user.hero.hp + user.hero.zashita + user.hero.ataka;
		let summ_a = a.hero.hp + a.hero.zashita + a.hero.ataka;

		if(rand(0,1) == 1){ 
			summ_user += user.hero.kr_udar; 
		} 
		if(rand(0,1) == 1){ 
			summ_a += a.hero.kr_udar; 
		} 
		if(user.hero.gun != false){ summ_user += guns[user.hero.gun].count;}
		if(a.hero.gun != false){ summ_a += guns[a.hero.gun].count;}

		if(summ_user > summ_a){
			user.hero.hp += 1; user.hero.zashita += 1; user.hero.ataka += 1; user.hero.kr_udar += 1; user.gold += rand(10,25);
			if(user.vip == 1){user.gold += rand(10,15);}
			uplvl(user);
			message.send(`
				⚔ Мощь Вашего героя: ${summ_user}%
				⚔ Мощь ${a.hero.prefix} ${summ_a}%

				🏁 Победу одержал ${user.hero.prefix}!
				💰 Герой получает куш золота.
				📢 Характеристики Героя улучшены на 1%.
			`);
		}
		if(summ_user < summ_a){
			a.hero.hp += 1; a.hero.zashita += 1; a.hero.ataka += 1; a.hero.kr_udar += 1; a.gold += rand(10,25);
			if(a.vip == 1){a.gold += rand(10,15);}
			uplvl(a);
			message.send(`
				⚔ Мощь Вашего героя: ${summ_user}%
				⚔ Мощь ${a.hero.prefix} ${summ_a}%

				🏁 Победу одержал ${a.hero.prefix}!
				💰 <${a.hero.prefix}> получает куш золота.
				📢 Характеристики его Героя улучшены на 1%.
			`);
		}
		if(summ_a == summ_user){
			message.send(`
				⚔ Мощь Вашего героя: ${summ_user}%
				⚔ Мощь ${a.hero.prefix} ${summ_a}%

				🏁 Шансы равны...
				🏁 Бой не состоялся.
			`);
		}
		user.limits.war = true;
		a.limits.war = true;
		setTimeout(() => {
			user.limits.war = false;
			a.limits.war = false;
		}, 3600000); // 3600000 
	});

	/*==========================================================================================================*/ 
	vk.updates.hear(/^(?:newpromo)\s?([0-9]+)?\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		let user = acc[cid].users[user_id(message.user)];
		if(user.admin == 0) return;

		let a = Number(message.$match[1])
		let b = Number(message.$match[2])
		let c = Number(message.$match[3])
		let cods = 0;

		if(a && b && c){
			if(a==1){
				cods = cod();
				all[cods] = { id: 1, name: 'gold', activ: Number(b), count: Number(c), users: {} }
				return message.send(`🔸 Промокод на ${c} золота создан.\n🔸Активаций: ${b}\n🔸Для активации напишите:\n🔸 'Промокод ${cods}'`);
			}
			if(a==2){
				cods = cod();
				all[cods] = { id: 2, name: 'tree', activ: Number(b), count: Number(c), users: {} }
				return message.send(`🔸 Промокод на ${c} дерева создан.\n🔸Активаций: ${b}\n🔸Для активации напишите:\n🔸 'Промокод ${cods}'`);
			}
			if(a==3){
				cods = cod();
				all[cods] = { id: 3, name: 'stone', activ: Number(b), count: Number(c), users: {} }
				return message.send(`🔸 Промокод на ${c} камня создан.\n🔸Активаций: ${b}\n🔸Для активации напишите:\n🔸 'Промокод ${cods}'`);
			}
			if(a==4){
				cods = cod();
				all[cods] = { id: 4, name: 'card', activ: Number(b), count: Number(c), users: {} }
				return message.send(`🔸 Промокод на ${c} Карт создан.\n🔸Активаций: ${b}\n🔸Для активации напишите:\n🔸 'Промокод ${cods}'`);
			}
			if(a==5){
				cods = cod();
				all[cods] = { id: 5, name: 'case', activ: Number(b), count: Number(c), users: {} }
				return message.send(`🔸 Промокод на ${c} золота создан.\n🔸Активаций: ${b}\n🔸Для активации напишите:\n🔸 'Промокод ${cods}'`);
			}
		}

		return message.send(`
			🔸 Создание промокода:
			🔸 1. Золото  
			🔸 2. Дерево  
			🔸 3. Камень  
			🔸 4. Карта 
			🔸 5. Набор (в разработке)
			🔸 - - - - - -
			🔸 addpromo № актив-й кол-во  
		`);
	});

	function cod(){
		var result  = '';
		let words  = '0123456789qwertyuiopasdfghjklzxcvbnm';
		let max_position = words.length - 1;
		for( i = 0; i < 8; ++i ) {
			position = Math.floor ( Math.random() * max_position );
			result = result + words.substring(position, position + 1);
		}
		return result
	}
	/*==========================================================================================================*/ 

	vk.updates.hear(/^(?:промокод)\s?([^]+)?/i, (message) => {
		if(check_id(aid)) return message.send(check_id(aid))
		let user = acc[cid].users[user_id(message.user)];
		if(!message.$match[1]) return message.send(`📛 Пример команды: "промокод <COD>"`);
		let i = message.$match[1].toLowerCase();
		if(!all[i]) return message.send(`🔸 Упс...\n🔸 Такого промокода нет.\n🔸 Либо его уже активировали.`);
		if(all[i].users[message.user]) return message.send(`🔸 Вы уже активировали этот промокод.`);
		all[i].users[message.user] = {i: true}
		all[i].activ -= 1;
		if(all[i].id == 1 || all[i].id == 4){
			user[String(all[i].name)] += all[i].count;
			message.send(`🔮 Вы успешно активировали промокод\n🔱 На ${all[i].count} ${all[i].name.toString().replace(/gold/gi, "золота").replace(/card/gi, "Карт Героя")}`)
		}
		if(all[i].id == 2 || all[i].id == 3){
			user.res[String(all[i].name)] += all[i].count;
			message.send(`🔮 Вы успешно активировали промокод\n🔱 На ${all[i].count} ${all[i].name.toString().replace(/tree/gi, "дерева").replace(/stone/gi, "камня")}`)
		}
		if(all[i].activ <= 0){delete all[i]}
		return;
	});
	/*==========================================================================================================*/ 

	vk.updates.hear(/^(?:реферал)/i, (message) => { 
		let user = acc[cid].users[user_id(message.user)];
		let text = '';
		for(i in user.refka.users){
			text += `[ID: ${i}| @id${acc[cid].users[Number(i)].id}(${acc[cid].users[Number(i)].hero.prefix})]  `;
		}
		return message.send(`
			📝 Реферальная страничка 📝
			⏩ Попросите друзей написать: 
			⏩ "Активировать ${user.refka.cod}"

			👑 Уровень: ${user.refka.level} 
			👑 До ${user.refka.level + 1} уровня: ${user.refka.lvl_up - user.refka.count} реферола(ов).

			✅ Бонус за реферала:
			🔹 ${user.refka.bonus.tree} дерева
			🔹 ${user.refka.bonus.stone} камня
			🔹 ${user.refka.bonus.gold} золота

			🎎 Рефералов: ${user.refka.count}
			${text}

		`);
	});
	/*==========================================================================================================*/ 

	vk.updates.hear(/^(?:активировать)\s?([^]+)?/i, (message) => { 
		if(!message.$match[1]) return message.send(`📛 Пример команды: "активировать <COD>"\n📛 Писать без кавычек.`);
		let user = acc[cid].users[user_id(message.user)];
		let i = message.$match[1] 
		if(i == user.refka.cod) return message.send(`📛 Вы указали свой реферальный код.`);
		if(message.$match[1].toLowerCase() == 'magicbot'){
			if(acc[cid].users[1].refka.users[user_id(message.user)]) return message.send(`📛 Вы уже указывали реферала.`);
			if(user.refka.activ != false) return message.send(`📛 Вы уже указывали реферала.`);
			user.refka.activ = true;
			acc[cid].users[1].refka.count += 1;
			acc[cid].users[1].refka.users[user_id(message.user)] = {i: true}
			acc[cid].users[1].res.tree += acc[cid].users[1].refka.bonus.tree;
			acc[cid].users[1].res.stone += acc[cid].users[1].refka.bonus.stone;
			acc[cid].users[1].gold += acc[cid].users[1].refka.bonus.gold;
			if(acc[cid].users[1].refka.count >= acc[cid].users[1].refka.lvl_up){
				acc[cid].users[1].refka.level += 1; 
				acc[cid].users[1].refka.lvl_up += 10;
				acc[cid].users[1].refka.bonus.tree += 100; acc[cid].users[1].refka.bonus.stone += 50; acc[cid].users[1].refka.bonus.gold += 10;
			}

			user.res.tree += 100;
			user.res.stone += 50;
			return message.send(`
				🔸 Вы получили 100 дерева и 50 камня
				🔸 За активацию реферального кода.
			`);
		}else{
			for(i=1;i<250000;i++){
				if(acc[cid].users[i]){
					if(acc[cid].users[i].refka.cod == Number(message.$match[1])){ 
						if(acc[cid].users[i].refka.users[user_id(message.user)]) return message.send(`📛 Вы уже указывали реферала.`);
						if(user.refka.activ != false) return message.send(`📛 Вы уже указывали реферала.`);
						user.refka.activ = i;
							
						user.refka.activ = true;
						acc[cid].users[i].refka.count += 1;
						if(acc[cid].users[i].refka.count >= acc[cid].users[i].refka.lvl_up){
							acc[cid].users[i].refka.level += 1; acc[cid].users[i].refka.lvl_up += 10;
							acc[cid].users[i].refka.bonus.tree += 100; acc[cid].users[i].refka.bonus.stone += 50; acc[cid].users[i].refka.bonus.gold += 10;
						} 
						acc[cid].users[i].refka.users[user_id(message.user)] = {i: true}
						acc[cid].users[i].res.tree += acc[cid].users[i].refka.bonus.tree;
						acc[cid].users[i].res.stone += acc[cid].users[i].refka.bonus.stone;
						acc[cid].users[i].gold += acc[cid].users[i].refka.bonus.gold;

						user.res.tree += 100;
						user.res.stone += 50;
						return message.send(`
							🔸 Вы получили 100 дерева и 50 камня
							🔸 За активацию реферального кода.
						`);
					}
				}
			}
		}
		 
		return message.send(`📛 Неверно указан реферальный код.`);
	});
	/*==========================================================================================================*/  

	vk.updates.hear(/^(?:открыть)\s?([^]+)?/i, (message) => { 
		let i = message.$match[1] 
		let user = acc[cid].users[user_id(message.user)];
		if(!i){
			if(check_id(aid)) return message.send(check_id(aid)) 
		 	if(user.card <= 0) return message.send(`📛 У вас нет Карт Героя.`);
		 	user.card -= 1;
		 	let new_card = card(user);

		 	return message.send(`
		 		⏩ Вы открыли Карту Героя
		 		🗡 К характеристике <${new_card[0].toString().replace(/hp/gi, "Здоровье").replace(/zashita/gi, "Защита").replace(/ataka/gi, "Атака").replace(/kr_udar/gi, "Критический Удар")}>
		 		➕ Добавлено ${new_card[1]}%
		 		📛 Открыть все - откроет все карты.
		 	`, {attachment: new_card[2]});
	 	}
	 	if(i == 'все' || i == 'всё'){ 
	 		let cards = 0;
	 		let texts = '';
	 		if(user.card <= 0) return message.send(`📛 У вас нет Карт Героя.`);	 
	 		for(z=0;z<user.card;z++){
	 			cards += 1;
	 			user.card -= 1;
		 		let new_card = card(user);
		 		texts += `--> +${new_card[1]}% к <${new_card[0].toString().replace(/hp/gi, "Здоровью").replace(/zashita/gi, "Защите").replace(/ataka/gi, "Атаке").replace(/kr_udar/gi, "Критическому Удару")}>\n` 
	 		}	
	 		let text = `Вы открыли ${cards} карт Героя\n`;  
	 		return message.send(text+texts);
	 	}
	 	return message.send(`📛 Чтобы открыть карту, напишите: "открыть"`);
	}); 	

	/*==========================================================================================================*/  

	 vk.updates.hear(/^(?:кадмин)/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		return message.send(`
		            ⚠ администраторская ⚠ 
					
 			☣ » setadm (ID игрока) (уровень) 
 			☣ » setvip (ID игрока) (уровень) 
 			☣ » newpromo (название)
 			☣ » ban (ID игрока)
 			☣ » unban (ID игрока)
 			☣ » givegold (ID игрока) (кол-во) 
 			☣ » giveimp (ID игрока) (кол-во) 
 			☣ » givecard (ID игрока) (кол-во) 
			☣ » ответ (обращение)
			☣ » eval (код) (вр. в разработке)
			
			☣ » Пример: givegold 1 1234
		     INFO: кол-во, сокращение слова - количество


 		`);
 	});

	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:setadm)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let id = Number(message.$match[1]) 
 		let i = Number(message.$match[2]) 
 		if(!acc[cid].users[id]) return message.send(`Нет такого игрока`);
 		acc[cid].users[id].admin = Number(i);
 		return message.send(`@id${acc[cid].users[id].id} получил ${i} lvl админа`);
 	});

 	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:setvip)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let id = Number(message.$match[1]) 
 		let i = Number(message.$match[2]) 
 		if(!acc[cid].users[id]) return message.send(`Нет такого игрока`);
 		acc[cid].users[id].vip = Number(i);
 		return message.send(`@id${acc[cid].users[id].id} получил ${i} lvl VIP`);
 	});

 	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:givegold)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let id = Number(message.$match[1]) 
 		let i = Number(message.$match[2]) 
 		if(!acc[cid].users[id]) return message.send(`Нет такого игрока`);
 		acc[cid].users[id].gold += Number(i);
 		return message.send(`@id${acc[cid].users[id].id} получил ${i} золота`);
 	});

 	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:giveimp)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let id = Number(message.$match[1]) 
 		let i = Number(message.$match[2]) 
 		if(!acc[cid].users[id]) return message.send(`Нет такого игрока`);
 		acc[cid].users[id].donate += Number(i);
 		return message.send(`@id${acc[cid].users[id].id} получил ${i} империалов`);
 	});

 	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:givecard)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let ids = Number(message.$match[1]) 
 		let i = Number(message.$match[2]) 
 		if(!acc[cid].users[ids]) return message.send(`Нет такого игрока`);
 		acc[cid].users[ids].card += Number(i);
 		return message.send(`@id${acc[cid].users[ids].id} получил ${i} Карт Героя`);
 	});
 	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:ban)\s?([0-9]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let ids = Number(message.$match[1])  
 		if(!acc[cid].users[ids]) return message.send(`Нет такого игрока`);
 		acc[cid].users[ids].ban = true;

 		vk.api.call('messages.send', {
			peer_id: acc[cid].users[ids].id,
			message: `✅ » @id${user.id}(${user.hero.prefix}) заблокировал Ваш аккаунт.`
		});

 		return message.send(`@id${acc[cid].users[ids].id} был заблокирован`);
 	});
 	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:ответ)\s?([0-9]+)?\s?([^]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let ids = Number(message.$match[1])  
 		if(!acc[cid].users[ids]) return message.send(`Нет такого игрока`); 

 		vk.api.call('messages.send', {
			peer_id: acc[cid].users[ids].id,
			message: `✅ » @id${user.id}(${user.hero.prefix}) ответил вам:\n-> ${message.$match[2]}`
		});

 		return message.send(`Ответ отправлен.`);
 	});
 	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:unban)\s?([0-9]+)?/i, (message) => {
 		let user = acc[cid].users[user_id(message.user)];
 		if(user.admin == 0) return;
 		let ids = Number(message.$match[1]) 
 		let i = Number(message.$match[2]) 
 		if(!acc[cid].users[ids]) return message.send(`Нет такого игрока`);
 		acc[cid].users[ids].ban = false;

 		vk.api.call('messages.send', {
			peer_id: acc[cid].users[ids].id,
			message: `✅ » @id${user.id}(${user.hero.prefix}) разблокировал Ваш аккаунт.`
		});

 		return message.send(`@id${acc[cid].users[ids].id} был разблокирован`);
 	});
 	/*==========================================================================================================*/ 
 	vk.updates.hear(/^(?:рапорт)\s?([^]+)?/i, (message) => { 
 		let i = message.$match[1]
 		if(!i) return message.send(`📛 Вы не написали суть проблемы.`);

 		vk.api.call('messages.send', {
			peer_id: 422783858,
			message: `- - - Репорт - - -\n✅ » Игрок ID: ${user_id(message.user)} | vk.com/id${acc[cid].users[user_id(message.user)].id}\n✅ » Жалоба: ${i}`
		});

 		return message.send(`📛 Вы успешно отправили жалобу/вопрос`);
 	});
 	/*==========================================================================================================*/
	vk.updates.hear(/^(?:передать)\s?([0-9]+)?\s?([0-9]+)?/i, (message) => {
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = Number(message.$match[1])
		let c = Number(message.$match[2]) 
		if(!i || !c) return message.send(`📛 Пример команды: 'передать ID SUMMA'`);
		let user = acc[cid].users[user_id(message.user)];
		if(user.vip == 0) return message.send(`📛 Команда доступна для VIP игроков.`);
		if(user.gold < c) return message.send(`📛 У вас недостаточно золота`);
		if(!acc[cid].users[i]) return message.send(`📛 Неверно указан ID игрока`);
		user.gold -= Number(c);
		acc[cid].users[i].gold += Number(c);
		return message.send(`⏩ Вы перевели ${c} золота игроку @id${acc[cid].users[i].id}(${acc[cid].users[i].hero.prefix})`);

	});
	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:дпродать)\s?([0-9]+)?/i, (message) => {
		if(!message.$match[1]) return message.send(`📛 Пример команды: 'дпродать КОЛИЧЕСТВО'`);
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
 		let user = acc[cid].users[user_id(message.user)];
		if(user.vip == 0) return message.send(`📛 Команда доступна для VIP игроков.`);
		let i = Number(message.$match[1])
		if(user.res.tree < i) return message.send(`📛 У вас недостаточно дерева`);
		if(i < 100) return message.send(`📛 Минимальное количество для продажи: 100 шт.`);
		user.res.tree -= i;
		user.gold += Math.round(Number(i) / 100);
		return message.send(`⏩ Вы обменяли ${i} дерева на ${Math.round(Number(i) / 100)} золота`);
	});
	/*==========================================================================================================*/  
 	vk.updates.hear(/^(?:кпродать)\s?([0-9]+)?/i, (message) => {
		if(!message.$match[1]) return message.send(`📛 Пример команды: 'кпродать КОЛИЧЕСТВО'`);
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
 		let user = acc[cid].users[user_id(message.user)];
		if(user.vip == 0) return message.send(`📛 Команда доступна для VIP игроков.`);
		let i = Number(message.$match[1])
		if(user.res.stone < i) return message.send(`📛 У вас недостаточно дерева`);
		if(i < 100) return message.send(`📛 Минимальное количество для продажи: 100 шт.`);
		user.res.stone -= i;
		user.gold += Math.round(Number(i) / 50);
		return message.send(`⏩ Вы обменяли ${i} камня на ${Math.round(Number(i) / 50)} золота`);
	});
 


 	/*==========================================================================================================*/
	vk.updates.hear(/^(?:экспедиция)\s?([0-9]+)?/i, (message) => {
		if(check_id(aid)) return message.send(check_id(aid))
		if(check(acc[cid].users[user_id(message.user)])) return message.send(check(acc[cid].users[user_id(message.user)]))
		let i = Number(message.$match[1])
		let user = acc[cid].users[user_id(message.user)]; 
		if(user.limits.les == true) return message.send(`📛 Ваш Герой еще не вернулся с экспедиции!`)
		if(i){   
			if(i< 0 || i > 6) return message.send(`📛 Неверный ID локации.`); 
			user.limits.les = true;
			setTimeout(() => {
				user.hero.limits.les = false;
				let t = rand(20,60); let k = rand(10,40); let z = 0;
				user.res.tree += Number(t);
				user.res.stone += Number(k);
				if(rand(0,1) == 1){
					let z = rand(10,20);
					user.gold += Number(z)
				}
				message.send(`⏩ @id${message.user}(${user.hero.prefix})\n⏩ Ваш герой вернулся с экспедиции\n⏩ И принес:\n${t} дерева, ${k} камня, ${z} золота.`);
			}, 3600000);
			return message.send(`⏩ Вы отправили героя в экспедицию.\n⏩ Через час он вернется с находками.`);
   		}else{
   			return message.send(`
   			⏩ Отправьте Героя за ресурсами:
   			1&#8419; В лес
   			2&#8419; На болото
   			3&#8419; В горы
   			4&#8419; В подземелье
   			5&#8419; На речку
   			6&#8419; К оркам

   			⏩ Чтобы отправить игрока в экспедицию
   			⏩ Напишите: "Экспедиция ID(локации)"
   			`);
   		}
 	});
 	/*==========================================================================================================*/  
	async function run() {
	    await vk.updates.startPolling();
	    console.log('Bot actived');  
	    restart();
	}
	run().then(() => {
	    console.log('[Start token] | ', token.token);
	})
	.catch((error) => {
	    console.error('[TOKEN NE VEREN] | ' + token.token + '\n '+error); 
	});

	/*==========================================================================================================*/ 
	function rand(min, max) {return Math.round(Math.random() * (max - min)) + min} 
	/*==========================================================================================================*/
	var parserInt = (str) => parseInt(str.replace(/k|к/ig, "000"));
	/*==========================================================================================================*/
	function spaces(string) { if (typeof string !== "string") string = string.toString(); return string.split("").reverse().join("").match(/[0-9]{1,3}/g).join(".").split("").reverse().join("");};
	/*==========================================================================================================*/
	Array.prototype.random = function() { return this[Math.floor(this.length * Math.random())]; }
	/*==========================================================================================================*/
	function user_id(id) {
		 let ids = 0
		 if(uid[1][id]){
		 	ids = uid[1][id].id
		 }    
		return ids; 
	}  
	/*==========================================================================================================*/
	function restart() {
	 	  for(i=1;i < 200000; i++){  
	 	  	if(acc[1]){ 	 
		 	  	if(acc[1].users[i]){  
		 	 		acc[1].users[i].limits.bonus = false; 
		 	 		acc[1].users[i].limits.war = false;
		 	 		acc[1].users[i].limits.les = false;
		 	 		acc[1].users[i].hero.up = false;
				}
			}
		}
	} 
	/*==========================================================================================================*/
	function data() {
		var date = new Date();
		let days = date.getDate();
		let month = date.getMonth() + 1; 
		if (month < 10) month = "0" + month;
		if (days < 10) days = "0" + days;
		var datas = days + ':' + month + ':2018' ;
		return datas;
	}
	/*==========================================================================================================*/
	function time() {
		let date = new Date();
		let days = date.getDate();
		let hours = date.getHours();
		let minutes = date.getMinutes();
		let seconds = date.getSeconds();
		if (hours < 10) hours = "0" + hours;
		if (minutes < 10) minutes = "0" + minutes;
		if (seconds < 10) seconds = "0" + seconds;
		var times = hours + ':' + minutes + ':' + seconds
		return times;
	}
 	/*==========================================================================================================*/
	var uptime = { sec: 0, min: 0, hours: 0, days: 0 }
	/*==========================================================================================================*/
	setInterval(() => {
		uptime.sec++;
		if (uptime.sec == 60) { uptime.sec = 0; uptime.min += 1; }
		if (uptime.min == 60) { uptime.min = 0; uptime.hours += 1; }
		if (uptime.hours == 24) { uptime.hours = 0; uptime.days += 1; }
	}, 1000);
///////////
}
/////////
/*==========================================================================================================*/
setInterval(() => {
	let summ = 0;
	for(i=1;i<2000;i++){
		if(acc[i]){
			if(i!=1){
				for(z=1;z<15000;z++){
					if(acc[i].users[z]){  
						summ += acc[1].users[z].hero.hp + acc[1].users[z].hero.zashita + acc[1].users[z].hero.ataka + acc[1].users[z].hero.kr_udar;
						if(acc[1].users[z].hero.gun != false){ summ += guns[acc[1].users[z].hero.gun].count}
					}
				} 
				acc[i].summ_harac = summ;
			}
		}
	}
}, 5000); 


/*==========================================================================================================*/
setInterval(() => {
	for(i=1;i<250000;i++){ 
		if(acc[1]){
			if(acc[1].users[i]){
				let user = acc[1].users[i];

				if(user.limits.stroyka > 0){
					user.limits.stroyka -= 1;
					if(user.limits.stroyka == 0){
						user.limits.stroyka = false;
						let i = user.limits.id;
						let a = user;
						user.limits.id = false;  
						if(i == 1){a.objects.lesopilka += 1; uplvl(a);}
						if(i == 2){a.objects.gold += 1; uplvl(a);}
						if(i == 3){a.objects.kamenolom += 1; uplvl(a);}
						if(i == 4){a.objects.hp += true; uplvl(a);}
						if(i == 5){a.objects.zashita += true; uplvl(a);}
						if(i == 6){a.objects.ataka += true; uplvl(a);}
						if(i == 7){a.objects.kr_udar += true; uplvl(a);}
					}
				}

				if(user.objects.lesopilka > 0){
					if(user.vip == 1){
						user.res.tree += Number(user.objects.lesopilka) * 100;
					}
					if(user.hero.navik.id == 1){
						user.res.tree += Number(user.objects.lesopilka) * 100 * user.hero.navik.count;
					}else{
						user.res.tree += Number(user.objects.lesopilka) * 100;
					} 
				}
				if(user.objects.kamenolom > 0){
					if(user.vip == 1){
						user.res.stone += Number(user.objects.kamenolom) * 100;
					}
					if(user.hero.navik.id == 2){
						user.res.stone += Number(user.objects.kamenolom) * 100 * user.hero.navik.count;
					}else{
						user.res.stone += Number(user.objects.kamenolom) * 100;
					} 
				}
				if(user.objects.gold > 0){
					if(user.hero.navik.id == 3){
						user.gold += Number(user.objects.gold) * 50 * user.hero.navik.count;
					}else{
						user.gold += Number(user.objects.gold) * 50;
					}  
				}
			}
		} 
	}	 
}, 3600000); // 3600000	


//

setInterval(() => {
	var tops = []
	for (i=1;i<5000;i++) {
			if(acc[1]){
				if(acc[1].users[i]){

					let counts = acc[1].users[i].hero.hp + acc[1].users[i].hero.zashita + acc[1].users[i].hero.ataka + acc[1].users[i].hero.kr_udar;
					if(acc[1].users[i].hero.gun != false){ 
						counts += guns[acc[1].users[i].hero.gun].count;
					}
					tops.push({
						id: i,
						count: counts,
					})
					 
				}
			}	 
		}
		tops.sort(function(a, b) {
			if (b.count > a.count) return 1
			if (b.count < a.count) return -1
			return 0
		})
		var yo = []
 
		for (var g = 0; g < 10; g++) {
			if (tops.length > g) {
				acc[1].users[tops[g].id].res.tree += 50;
			}
		} 
}, 36000000);
 
//
function text_hero(){
	let text = '';
	for(i=1;i<7;i++){
		var h = heros[i];
		text += `⏩ Герой: ${h.group}
		- - - - - 
		📜 Описание: ${h.text}
		- - - - - 
		`
	} 
	return text
} 

const heros = {
	"1": {
		group: "Маг",
		text: `Волшебник — герой, посвятивший свою жизнь изучению древних мистических таинств и искусств. Он не способен сражаться в первых рядах, но при должной поддержке успеет нанести огромный урон, пока противники будут тщетно пытаться добраться до него.`
	},
	"2": {
		group: "Техник",
		text: `Техник — герой, чьи технологии и машины позволяют выполнить любую задачу, какую только можно придумать. Сам по себе он довольно хил, но мощная броня и совершенное оружие решают эту проблему за него. `
	},
	"3": {
		group: "Воин",
		text: `Воин — герой, для которого долг и честь — краеугольные камни жизни. Закалённый в боях, он может принять на себя главный удар вражеских сил, при этом сокрушая противников по всем фронтам.`
	},
	"4": {
		group: "Варвар",
		text: `Варвар — герой, которого не волнует ничего, кроме его жажды сражений, крови и побед. Он будет биться с врагами лицом к лицу до тех пор, пока не погибнет он, или, что куда более вероятно, они. `
	},
	"5": {
		group: "Командир",
		text: `Командир — герой, присутствие которого на поле боя само по себе воодушевляет союзников. До тех пор, пока его не победили, его отряды будут биться с удвоенным пылом и отвагой — а победить его весьма трудно. `
	},
	"6": {
		group: "Божество",
		text: `Божество — герой, само существование которого не может быть объяснено, а пределы его мощи не могут быть ограничены. Сражаясь с ним, враг может быть обманут кажущейся хрупкостью — перед тем, как единственный удар покончит с ним.`
	}
}
 
const naviks = {
	'1': {
		text: 'Увеличенная добыча дерева (х2)',
		count: 2
	},
	'2': {
		text: 'Увеличенная добыча камня (х2)',
		count: 2
	},
	'3': {
		text: 'Увеличенная добыча золота (х2)',
		count: 2
	}, 
	'4': {
		text: 'Ускоренная прокачка HP/Защиты (x1.5)',
		count: 1.5
	}, 
	'5': {
		text: 'Ускоренная прокачка Атаки/Критического урона (x1.5)',
		count: 1.5
	}, 
	'6': {
		text: 'Увеличение HP/Защиты при обучении (+3%)',
		count: 3
	}, 
	'7': {
		text: 'Увеличение Атаки/Критического урона при обучении (+3%)',
		count: 3
	}  
}

function rand(min, max) {return Math.round(Math.random() * (max - min)) + min}  
function card(user){
	card_hp = [1,2,3,4,5,6,7,8,9,10].random();
	card_hp_url = [0,'photo-167936449_456239087','photo-167936449_456239088','photo-167936449_456239089','photo-167936449_456239090','photo-167936449_456239091','photo-167936449_456239092','photo-167936449_456239093','photo-167936449_456239094','photo-167936449_456239095','photo-167936449_456239096']
	////////
	card_zashita = [1,2,3,4,5,6,7,8,9,10].random();
	card_zashita_url = [0,'photo-167936449_456239065','photo-167936449_456239066','photo-167936449_456239067','photo-167936449_456239068','photo-167936449_456239069','photo-167936449_456239070','photo-167936449_456239071','photo-167936449_456239072','photo-167936449_456239073','photo-167936449_456239074']
	////////
	card_ataka = [1,2,3,4,5,6,7,8,9,10].random();
	card_ataka_url = [0,'photo-167936449_456239033','photo-167936449_456239034','photo-167936449_456239045','photo-167936449_456239046','photo-167936449_456239047','photo-167936449_456239048','photo-167936449_456239049','photo-167936449_456239050','photo-167936449_456239051','photo-167936449_456239052']
	////////
	card_kr_udar = [1,2,3,4,5].random();
	card_kr_udar_url = [0,'photo-167936449_456239109','photo-167936449_456239110','photo-167936449_456239111','photo-167936449_456239112','photo-167936449_456239113']
	////////
	let a = rand(1,4);
	if(a == 1){
		user.hero.hp += Number(card_hp);
		return ['hp', card_hp, card_hp_url[card_hp]];
	}
	if(a == 2){
		user.hero.zashita += Number(card_zashita);
		return ['zashita', card_zashita, card_zashita_url[card_zashita]];
	}
	if(a == 3){
		user.hero.ataka += Number(card_ataka);
		return ['ataka', card_ataka, card_ataka_url[card_ataka]];
	}
	if(a == 4){
		user.hero.kr_udar += Number(card_kr_udar);
		return ['kr_udar', card_kr_udar, card_kr_udar_url[card_kr_udar]];
	}
}
  
// Если много карт надо, то через цикл функцию гоняем.
 
 
function check(user){
	if(user.hero.id == false) return `\n‼ Упс...‼\n Вы не зарегистрированы в [gameb0t11|Империал Бот]\n&#9203; Перед началом игры, вам нужно создать персонажа.\n\n1&#8419; Этап. Выбор персонажа.\n&#9193; "Герои" - список персонажей.`; 
	if(user.hero.prefix == false) return `‼ Упс...\n Вы не зарегистрированы в [gameb0t11|Империал Бот]\n&#9203; Перед началом игры, вам нужно придумать имя для героя.\n\n2&#8419; Этап. Придумайте имя.\n&#9193; "Назвать [имя]"`;
} 

function check_id(id){
	if(id != 1) return `‼ Упс...\n‼ Эта команда доступна в только в [gameb0t11|Империал Бот]`;
} 
 
function uplvl(user){ 
	if(user.vip == 1){
		user.exs += 20;	
	}
	user.exs += 20;
	if(user.exs >= 100){
		user.level += 1;
		user.exs = 0;
	}
}

var pack = {
	"mini": {
		group: "Божество",
		id: 6,
		hp: 50,
		zashita: 20,
		ataka: 25,
		kr_udar: 10
	},
	"normal": {
		group: "Божество",
		id: 6,
		hp: 100,
		zashita: 70,
		ataka: 45,
		kr_udar: 30
	}
}
 
function zapret(text) {
 	let text1 = text.toLowerCase();
 	let texts = 0;
 	let stat = false;
	var zaprets = /(вк бо т |сова не спит|сова никогда не спит|с о в а н е с п и т|сованикогданеспит|сова не спит никогда|вкботру|vkvot ru|vkbotru|vkbot|v k b o t . r u|в к бот|порно|botvk|ботвк|vkbot|кбот|bot vk|хентай|секс|пидр|трах|насилие|зоофил|бдсм|сирия|hentai|hentay|синий кит|самоубийство|террористы|слив|цп|cp|маленькие|малолетки|сучки|трах|ебля|изнасилование|блять|хуй|пошел нах|тварь|мразь|сучка|гандон|уебок|шлюх|паскуда|оргазм|девственницы|целки|рассовое|мелкие|малолетки|несовершеннолетние|ебля|хентай|sex|bdsm|ebl|trax|syka|shlux|инцест|iznas|мать|долбаеб|долбаёб|хуесос|сучка|сука|тварь|пездюк|хуй|шлюх|бог|сатана|мразь)/
	if (zaprets.test(text1) == true) { 
		texts = `📗 » Некорректный запрос.` 
		stat = true;
	}
	var filter1 = /(http(s)?:\/\/.)?(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}/
	var filter2 = /(?!http(s)?:\/\/)?(www\.)?[а-я0-9-_.]{1,256}\.(рф|срб|блог|бг|укр|рус|қаз|امارات.|مصر.|السعودية.)/ 
	if (filter1.test(text1) == true || filter2.test(text1) == true) { 
		texts = `📗 » Некорректный запрос.` 
		stat = true; 
	}
	return texts
 } 

const guns = {

	"1": {
		name: 'Камень',
		count: 10,
		price: 3000
	},
	"2": {
		name: 'Рогатка',
		count: 30,
		price: 6000
	},
	"3": {
		name: 'Лук',
		count: 70,
		price: 8000
	},
	"4": {
		name: 'Копьё',
		count: 100,
		price: 12000
	},
	"5": {
		name: 'Меч',
		count: 150,
		price: 15000
	},
	"6": {
		name: 'Катапульта',
		count: 200,
		price: 20000
	}
}