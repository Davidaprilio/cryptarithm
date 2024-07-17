export const operator = {
    '+': (a:  number, b: number) => a + b,
    '-': (a:  number, b: number) => a - b,
    '*': (a:  number, b: number) => a * b,
    '/': (a:  number, b: number) => a / b
}

export function uniqueCharacters(string: string): string[] {
    let charCount = new Map();

    // Hitung kemunculan setiap karakter
    for (let char of string) {
        if (charCount.has(char)) {
            charCount.set(char, charCount.get(char) + 1);
        } else {
            charCount.set(char, 1);
        }
    }

    // Ambil karakter yang hanya muncul sekali
    for (let [char, count] of charCount) {
        if (count > 1) {
            charCount.delete(char);
        }
    }

    return Array.from(charCount.keys());
}