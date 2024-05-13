import { expect, test } from '@oclif/test'
import {describe} from 'mocha'
import path from 'path'

const testFilePath = path.join(__dirname, 'test.txt')


describe('bytes flag', () => {
    test
    .stdout()
    .command(['ccwc', '-c', testFilePath])
    .it('correctly measures bytes of a file', (ctx) => {
        expect(ctx.stdout).to.equal("\t" + `91 ${testFilePath}` + "\n")
    })
})

describe('lines flag', () => {
    test
    .stdout()
    .command(['ccwc', '-l', testFilePath])
    .it('measures lines of a file', (ctx) => {
        expect(ctx.stdout).to.equal("\t" + `6 ${testFilePath}` + "\n")
    })
})

describe('words flag', () => {
    test
    .stdout()
    .command(['ccwc', '-w', testFilePath])
    .it('measures words of a file', (ctx) => {
        expect(ctx.stdout).to.equal("\t" + `20 ${testFilePath}` + "\n")
    })
})

describe('characters flag', () => {
    test
    .stdout()
    .command(['ccwc', '-m', testFilePath])
    .it('measures characters of a file', (ctx) => {
        expect(ctx.stdout).to.equal("\t" + `86 ${testFilePath}` + "\n")
    })
})

describe('invalid filepath', () => {
    test
    .stdout()
    .command(['ccwc', 'invalid'])
    .it('throws an error', (ctx) => {
        expect(ctx.stdout).to.equal("\t" + 'Please provide a valid filepath' + "\n")
    })
})

describe('default option', () => {
    test
    .stdout()
    .command(['ccwc', testFilePath])
    .it('displayes bytes, lines, words, and characters of a file', (ctx) => {
        expect(ctx.stdout).to.equal("\t" + `91` + "\t" + `6` + "\t" + `20` + "\t" + `86` + ` ${testFilePath}` + "\n")
    })
})
