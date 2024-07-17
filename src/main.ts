import './style.css'
import { operator, uniqueCharacters } from './utils'

type MathOperation = '+' | '-' | '*' | '/'
(() => {
    const w1 = document.querySelector<HTMLInputElement>('#w1')
    const w2 = document.querySelector<HTMLInputElement>('#w2')
    const mathOprator = document.querySelector<HTMLSelectElement>('#mathOprator')
    const answer = document.querySelector<HTMLInputElement>('#answer')
    const answerBtn = document.querySelector<HTMLButtonElement>('#answerBtn')
    const resultsEl = document.querySelector<HTMLDivElement>('#results')


    function createRowResult(val: string, vars: string) {
        const div = document.createElement('div')
        div.innerHTML = `<div class="res-row">
          <span class="var-info">${vars}</span>
          <span>${val}</span>
        </div>`
        return div
    }

    function createResultBox(
        wordsElRow: HTMLElement[], 
        operator: string, 
        resultRowEl: HTMLElement
    ) {
        const div = document.createElement('div')
        div.innerHTML = `<div class="w-fit border p-4 pr-10 rounded-md">
            ${wordsElRow.map(el => el.innerHTML).join(' ')}
            <div class="relative">
                <hr>
                <span class="uppercase absolute text-3xl -right-5 -top-5">${operator}</span>
            </div>
            ${resultRowEl.innerHTML}
        </div>`
        return div
    }

    

    let string = "hello";
    let uniqueChars = uniqueCharacters(string);
    console.log(uniqueChars); // Output: ['h', 'e']


    /**
     * 
     * @param {string[]} wordQuestions 
     * @param {string} wordResult 
     * @returns 
     */
    function cryptarithm(
        wordQuestions: string[], 
        wordResult: string, 
        mathOperation: MathOperation = '+'
    ): [number[], number] {
        if (operator[mathOperation] == undefined) {
            throw new Error('operator not available, use ' + Object.keys(operator).join(', '))
        }
        wordQuestions = wordQuestions.map((word) => word.toUpperCase())
        wordResult = wordResult.toUpperCase()
        const uniqQuestion = Array.from(new Set(wordQuestions.join(''))).join('')
        const uniqResult = Array.from(new Set(wordResult)).join('')
        let varValue = Array.from(new Set(uniqResult + uniqQuestion)).reduce((acc, letter) => {
            acc[letter] = 0
            return acc
        }, {} as Record<string, number>)

        varValue[wordResult[0]] = 1

        function getValueFromWord(word: string) {
            let val = ''
            for (var char of word) {
                val += varValue[char].toString()
            }
            return Number(val)
        }


        function insertVal2Var(wordVar: string, value: string) {
            for (const index in wordVar.split('')) {
                varValue[wordVar[index]] = Number(value[index])
            }
        }

        console.log(uniqueCharacters(uniqResult + uniqQuestion));



        const maxRerVal = Number('9'.repeat(wordResult.length))
        let resVal = getValueFromWord(wordResult)
        let qVals: number[] = []
        while (resVal <= maxRerVal) {
            qVals = wordQuestions.map((word) => getValueFromWord(word))

            if (resVal == qVals.reduce((acc, val) => operator[mathOperation](acc, val), 0)) {
                break;
            }

            console.log(resVal, wordQuestions.map((w, i) => {
                return w + ':' + qVals[i].toString()
            }).join(' '));

            resVal++
            insertVal2Var(wordResult, resVal.toString())
        }

        if (resVal > maxRerVal) {
            throw new Error('No solution')
        }

        return [qVals, resVal]
    }


    answerBtn?.addEventListener('click', async () => {
        const res = cryptarithm([
            w1!.value,
            w2!.value,
        ], answer!.value, mathOprator!.value as MathOperation)

        resultsEl!.innerHTML = createResultBox([
            createRowResult(res[0][0].toString(), w1!.value),
            createRowResult(res[0][1].toString(), w2!.value),
        ], '+', createRowResult(res[1].toString(), answer!.value)).innerHTML
    })

})()