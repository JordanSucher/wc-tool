// src/commands/hello.ts
const { Command, Flags, Args } = require("@oclif/core");
const fs = require("fs");

class ccwc extends Command {
	static flags = {
		bytes: Flags.boolean({char: "c"}),
		lines: Flags.boolean({char: "l"}),
		words: Flags.boolean({char: "w"}),
		characters: Flags.boolean({char: "m"})
	}

	static args = {
		filePath: Args.string()
	}
	
	async run(): Promise<void> {
		const {flags, args} = await this.parse(ccwc)
		const validFile = args.filePath && fs.existsSync(args.filePath)

		if(!validFile) {
			this.log("\t" + "Please provide a valid filepath")
		}
		else if (flags.bytes) {
			const fileSize = fs.statSync(args.filePath).size;
			this.log("\t" + `${fileSize} ${args.filePath}`);
		}
		else if (flags.lines) {
			const fileLines = fs.readFileSync(args.filePath, "utf8").split("\n").length;
			this.log("\t" + `${fileLines} ${args.filePath}`);
		}
		else if (flags.words) {
			const fileWords = fs.readFileSync(args.filePath, "utf8").split('\n').filter((line: string)=>line.length>0).flatMap((line : string)=>line.split(' ')).length
			this.log("\t" + `${fileWords} ${args.filePath}`);
		}
		else if (flags.characters) {
			const fileCharacters = fs.readFileSync(args.filePath, "utf8").replace(/\n/g, "").length
			this.log("\t" + `${fileCharacters} ${args.filePath}`);
		}
		else {
			const fileSize = fs.statSync(args.filePath).size;
			const fileLines = fs.readFileSync(args.filePath, "utf8").split("\n").length;
			const fileWords = fs.readFileSync(args.filePath, "utf8").split('\n').filter((line: string)=>line.length>0).flatMap((line : string)=>line.split(' ')).length
			const fileCharacters = fs.readFileSync(args.filePath, "utf8").replace(/\n/g, "").length

			this.log("\t" + fileSize + "\t" + fileLines + "\t" + fileWords + "\t" + fileCharacters + ` ${args.filePath}`);
		}
	}

}

module.exports = ccwc;
