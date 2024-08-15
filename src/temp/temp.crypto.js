const crypto = require("crypto")
//generates a random string/salt of size 128 bits and string of base64
const cryptoRandom = crypto.randomBytes(128).toString("base64")

const authentication = (salt, password) => {
    return crypto.createHmac("sha256", [salt,password].join('/')).update("milkman123").digest('hex')
}

const result = authentication(cryptoRandom,"yash123")

console.log(`Random crypto generated is : ${cryptoRandom}`)
console.log(`Result generated based on the crypto is ${result}`)