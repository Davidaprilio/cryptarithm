import './style.css'
import { operator, uniqueCharacters } from './utils'

type MathOperation = '+' | '-' | '*' | '/'
(() => {
    const w1 = document.querySelector<HTMLInputElement>('#w1')
    const w2 = document.querySelector<HTMLInputElement>('#w2')
    const mathOprator = document.querySelector<HTMLSelectElement>('#mathOprator')
    const answer = document.querySelector<HTMLInputElement>('#answer-input')
    const answerBtn = document.querySelector<HTMLButtonElement>('#answerBtn')
    const resultsEl = document.querySelector<HTMLDivElement>('#results')
    const answerBoxTem = document.querySelector<HTMLTemplateElement>('#answer-box')
    const answerTem = document.querySelector<HTMLTemplateElement>('#answer')

    function createRowResult(val: string, vars: string) {
        if (!answerTem) throw new Error('answerTem not found')
        const el = answerTem.content.cloneNode(true) as DocumentFragment
        el.querySelector<HTMLSpanElement>('span[val]')!.innerText = val
        el.querySelector<HTMLSpanElement>('span[info]')!.innerText = vars
        return el.firstElementChild as HTMLDivElement
    }

    function createResultBox(
        wordsElRow: HTMLElement[], 
        operator: string, 
        resultRowEl: HTMLElement
    ) {
        if (!answerBoxTem) throw new Error('answerBoxTem not found')
        const box = answerBoxTem.content.cloneNode(true) as DocumentFragment

        box.querySelector('div[questions]')?.replaceWith(...wordsElRow)
        box.querySelector('div[answer]')?.replaceWith(resultRowEl)
        box.querySelector<HTMLSpanElement>('span[operator]')!.innerText = operator

        return box.firstElementChild! as HTMLDivElement
    }

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

        resultsEl!.appendChild(
            createResultBox([
                createRowResult(res[0][0].toString(), w1!.value),
                createRowResult(res[0][1].toString(), w2!.value),
            ], '+', createRowResult(res[1].toString(), answer!.value))
        )
    })

})()