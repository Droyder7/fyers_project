const smallletters = "qwertyuiopasdfghjklzxcvbnm";
// const specialSymbols = "~!@#$%^&*()_+`={}[]<>,.?/|";
const numbers = "1234567890", capitalLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

export const generateRandomString = (length, characters = (smallletters + capitalLetters + numbers)) => {
    let result = "";
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
