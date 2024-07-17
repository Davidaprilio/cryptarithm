import { describe, expect, it } from 'vitest'
import { operator, uniqueCharacters } from './utils'

describe('operator functions', () => {
    it('math +', () => {
        expect(operator['+'](1, 2)).toBe(3)
        expect(operator['+'](29, 3)).toBe(32)
        expect(operator['+'](0, 0)).toBe(0)
    })
    it('math -', () => {
        expect(operator['-'](10, 5)).toBe(5)
        expect(operator['-'](32, 12)).toBe(20)
        expect(operator['-'](523, 212)).toBe(311)
    })
    it('math *', () => {
        expect(operator['*'](323, 2)).toBe(646)
        expect(operator['*'](37, 3)).toBe(111)
        expect(operator['*'](12, 0)).toBe(0)
    })
    it('math /', () => {
        expect(operator['/'](10, 2)).toBe(5)
        expect(operator['/'](20, 5)).toBe(4)
        expect(operator['/'](4, -5)).toBe(-0.8)
    })
})


it('uniqueCharacters function', () => {
    expect(uniqueCharacters('hello')).toEqual(['h', 'e', 'o'])
    expect(uniqueCharacters('world')).toEqual(['w', 'o', 'r', 'l', 'd'])
    expect(uniqueCharacters('lorem ipsum')).toEqual(['l', 'o', 'r', 'e', ' ', 'i', 'p', 's', 'u'])
})