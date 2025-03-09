const { EmbedBuilder } = require('discord.js');

function useModule(message, command) {
	if (command === 'compliment') {
		var chosenbtw = Math.floor(Math.random() * ((list.length - 1) - 0) + 0);

		const compliEmbed = new EmbedBuilder()
		    .setColor('#deecf5')
		    .setAuthor({ name: 'Revade', iconURL: 'https://raw.githubusercontent.com/Akridiki/Revade/main/Logo.png' })
		    .setDescription(list[chosenbtw])
		message.channel.send({ embeds: [compliEmbed] })
	}
}

var list = [
    "You\'re that \"Nothing\" when people ask me what I\'m thinking about.",
    "You look great today.",
    "You\'re a smart cookie.",
    "You have impeccable manners.",
    "I like your style.",
    "You have the best laugh.",
    "I appreciate you.",
    "You are the most perfect you there is.",
    "You\'re strong.",
    "Your perspective is refreshing.",
    "You\'re an awesome friend.",
    "You light up the room.",
    "You deserve a hug right now. :)",
    "You should be proud of yourself.",
    "You\'re more helpful than you realize.",
    "You have a great sense of humor.",
    "Is that your picture next to \"charming\" in the dictionary?",
    "On a scale from 1 to 10, you\'re an 11.",
    "You are brave.",
    "You\'re even more beautiful on the inside than you are on the outside.",
    "Aside from food... :eyes: you\'re my favorite.",
    "You are making a difference.",
    "You\'re like sunshine on a rainy day.",
    "You bring out the best in other people.",
    "Your ability to recall random factoids at just the right time is impressive.",
    "You\'re a great listener.",
    "Everything would be better if more people were like you!",
    "You were cool way before hipsters were cool.",
    "Hanging out with you is always a blast.",
    "You always know - and say - exactly what I need to hear when I need to hear it.",
    "Being around you makes everything better!",
    "When you say, \"I meant to do that,\" I totally believe you.",
    "When you\'re not afraid to be yourself is when you\'re most incredible.",
    "Colors seem brighter when you\'re around.",
    "That thing you don\'t like about yourself is what makes you so interesting.",
    "You\'re wonderful.",
    "Jokes are funnier when you tell them.",
    "Your hair looks stunning.",
    "You\'re one of a kind!",
    "You\'re inspiring.",
    "You should be thanked more often. So, thank you!",
    "Someone is getting through something hard right now because you\'ve got their back.",
    "You have the best ideas.",
    "Everyone gets knocked down sometimes, but you always get back up and keep going.",
    "You\'re a candle in the darkness.",
    "You\'re a great example to others.",
    "Being around you is like being on a happy little vacation.",
    "You always know just what to say.",
    "You\'re always learning new things and trying to better yourself, which is awesome.",
    "You\'re more fun than bubble wrap.",
    "When you make a mistake, you always find a way to fix it.",
    "Who raised you? They deserve a medal for a job well done.",
    "You\'re great at figuring stuff out.",
    "The people you love are lucky to have you in their lives.",
    "You\'re like a breath of fresh air.",
    "You\'re gorgeous - and that\'s the least interesting thing about you, too.",
    "You're so thoughtful.",
    "Your creative potential seems limitless.",
    "You\'re the coolest person I know.",
    "Actions speak louder than words, and yours tell an incredible story.",
    "Somehow you make time stop and fly at the same time.",
    "When you make up your mind about something, nothing stands in your way.",
    "You seem to really know who you are.",
    "Any team would be lucky to have you on it.",
    "In high school I bet you were voted \"most likely to keep being awesome.\"",
    "If you were a scented candle they\'d call it Perfectly Imperfect (and it would smell like summer).",
    "There\'s ordinary, and then there\'s you.",
    "You\'re someone\'s reason to smile.",
    "You\'re even better than a unicorn, because you\'re real.",
    "How do you keep being so funny and making everyone laugh?",
    "The way you treasure your loved ones is incredible.",
    "You\'re really something special.",
    "You\'re a gift to those around you.",
];

module.exports = {
    list: list,
    useModule: useModule
};
