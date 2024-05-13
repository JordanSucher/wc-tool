"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/commands/hello.ts
const { Command, Flags, Args } = require("@oclif/core");
const fs = require("fs");
class ccwc extends Command {
    static formatOutput(filePath = "", ...args) {
        return "\t" + `${args.join("\t")} ${filePath}`;
    }
    async run() {
        const { flags, args } = await this.parse(ccwc);
        const isPiped = !process.stdin.isTTY;
        const validFile = args.arg1 && fs.existsSync(args.arg1);
        const textBody = isPiped ? args.arg1 : validFile ? fs.readFileSync(args.arg1, "utf8") : "";
        if (!validFile && !isPiped) {
            this.log("\t" + "Please provide a valid filepath");
        }
        else if (flags.bytes) {
            const fileSize = isPiped ? new Blob([textBody]).size : fs.statSync(args.arg1).size;
            this.log(ccwc.formatOutput(isPiped ? "" : args.arg1, fileSize));
        }
        else if (flags.lines) {
            const fileLines = textBody.split("\n").length;
            this.log(ccwc.formatOutput(isPiped ? "" : args.arg1, fileLines));
        }
        else if (flags.words) {
            const fileWords = textBody.split('\n').filter((line) => line.length > 0).flatMap((line) => line.split(' ')).length;
            this.log(ccwc.formatOutput(isPiped ? "" : args.arg1, fileWords));
        }
        else if (flags.characters) {
            const fileCharacters = textBody.replace(/\n/g, "").length;
            this.log(ccwc.formatOutput(isPiped ? "" : args.arg1, fileCharacters));
        }
        else {
            const fileSize = isPiped ? new Blob([textBody]).size : fs.statSync(args.arg1).size;
            const fileLines = textBody.split("\n").length;
            const fileWords = textBody.split('\n').filter((line) => line.length > 0).flatMap((line) => line.split(' ')).length;
            const fileCharacters = textBody.replace(/\n/g, "").length;
            this.log(ccwc.formatOutput(isPiped ? "" : args.arg1, fileSize, fileLines, fileWords, fileCharacters));
        }
    }
}
ccwc.flags = {
    bytes: Flags.boolean({ char: "c" }),
    lines: Flags.boolean({ char: "l" }),
    words: Flags.boolean({ char: "w" }),
    characters: Flags.boolean({ char: "m" })
};
ccwc.args = {
    arg1: Args.string()
};
module.exports = ccwc;
//# sourceMappingURL=ccwc.js.map