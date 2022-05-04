const smallletters = "qwertyuiopasdfghjklzxcvbnm", specialSymbols = "~!@#$%^&*()_+`={}[]<>,.?/|";
const numbers = "1234567890", capitalLetters = "QWERTYUIOPASDFGHJKLZXCVBNM";

export const generateRandomString = (length, characters = (smallletters + capitalLetters + numbers + specialSymbols)) => {
    let result = "";
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}
