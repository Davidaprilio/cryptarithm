import './style.css'

(() => {
    const w1 = document.querySelector('#w1')
    const w2 = document.querySelector('#w2')
    const mathOprator = document.querySelector('#mathOprator')
    const answer = document.querySelector('#answer')
    const answerBtn = document.querySelector('#answerBtn')
    const resultsEl = document.querySelector('#results')

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

    function createRowResult(val, vars) {
        const div = document.createElement('div')
        div.innerHTML = `<div class="res-row">
          <span class="var-info">${vars}</span>
          <span>${val}</span>
        </div>`
        return div
    }

    function createResultBox(wordsElRow, operator, resultRowEl) {
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

    /**
     * 
     * @param {string[]} wordQuestions 
     * @param {string} wordResult 
     * @returns 
     */
    function cryptarithm(wordQuestions, wordResult) {
        wordQuestions = wordQuestions.map((word) => word.toUpperCase())
        wordResult = wordResult.toUpperCase()
        let varValue = Array.from(new Set(wordResult + wordQuestions.join(''))).reduce((acc, letter) => {
            acc[letter] = 0
            return acc
        }, {})

        varValue[wordResult[0]] = 1

        function getValueFromWord(word) {
            let val = ''
            for (var char of word) {
                val += varValue[char].toString()
            }
            return Number(val)
        }


        function insertVal2Var(wordVar, value) {
            value = value.toString()
            for (const index in wordVar) {
                varValue[wordVar[index]] = Number(value[index])
            }
        }

        let resVal  = getValueFromWord(wordResult)
        let qVals = []
        while (true) {
            qVals = wordQuestions.map((word) => getValueFromWord(word))

            if (resVal == qVals.reduce((acc, val) => acc + val, 0)) {
                break;
            }

            resVal++
            insertVal2Var(wordResult, resVal)
        }

        return [qVals, resVal]
    }


    answerBtn.addEventListener('click', async () => {
        const res = cryptarithm([
            w1.value,
            w2.value,
        ], answer.value)

        console.log(res);

        resultsEl.innerHTML = createResultBox([
            createRowResult(res[0][0], w1.value),
            createRowResult(res[0][1], w2.value),
        ], '+', createRowResult(res[1], answer.value)).innerHTML
    })



})()