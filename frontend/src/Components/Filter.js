// filteredWords.js
const filteredWords = [
    // English bad words
    'asshole',
    'asshat',
    'arsehole',
    'big black cock',
    'bitch',
    'bloody',
    'blowjob',
    'bugger',
    'bullshit',
    'chicken shit',
    'clusterfuck',
    'cock',
    'cocksucker',
    'coonas',
    'cornhole',
    'cox-Zucker machine',
    'cracker',
    'cunt',
    'dafuq',
    'damn',
    'dick',
    'fuck',
    'motherfucker',
    'nigga',
    'nigger',
    'shit',
    'shut up',
    'slut',
    'son of a bitch',
    'whore',

    // Tagalog bad words
    'putangina',
    'puta',
    'bobo',
    'ulol',
    'putangama',
    'tarantado',
    'hayop',
    'lintik',
    'punyeta',
    'leche',
    'walang-hiya',
    'langya',
    'kupal',
    'supot',
    'yawa',
    'piste',
    'gago',
    'bayot',
    'buang',
    'pakyu',
    'panget',
    'bading',
    'tanga',
    'amputa'
];

export const filterComment = (comment) => {
    const words = comment.split(/\s+/);
    for (let word of words) {
        if (filteredWords.includes(word.toLowerCase())) {
            return null; // Return null if any bad word found
        }
    }
    return comment; // Return original comment if no bad word found
};

export default filteredWords;
