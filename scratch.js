const fs = require('fs')

let testFile = fs.readFileSync('./tests/test.txt', 'utf8')

testFile = testFile.replace(/\n/g, "").length

console.log(testFile)

