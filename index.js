const chai = require("chai"),
    expect = chai.expect;

describe('use cases michi', () => {
    it('array is winner', () => {
        const input = [2,2,2];

        expect(isArrayWinner(input).isThereWinner).to.be.true;
        expect(isArrayWinner(input).winner).to.equal(2);
    });

    it('array is not winner', () => {
        const input = [1,2,2];

        expect(isArrayWinner(input).isThereWinner).to.be.false;
        expect(isArrayWinner(input).winner).to.be.null;
    });

    it('array is not winner case 2', () => {
        const input = [0,0,0];

        expect(isArrayWinner(input).isThereWinner).to.be.false;
        expect(isArrayWinner(input).winner).to.be.null;
    });

    it('combination player 1 is winner', () => {
        const input = [
            [2,2,0],
            [1,1,1],
            [1,0,2]
        ]

        expect(whoPlayerIsWin(input)).to.equal(1);
    });

    it('combination player 2 is winner', () => {
        const input = [
            [2,2,2],
            [1,0,1],
            [1,1,2]
        ]

        expect(whoPlayerIsWin(input)).to.equal(2);
    });
    
    it('combination without winner', () => {
        const input = [
            [1,2,0],
            [0,0,0],
            [0,0,0]
        ]

        expect(whoPlayerIsWin(input)).to.be.null;
    });

    it('matrix final', () => {
        const input = [
            [2,2,2],
            [1,0,1],
            [1,1,2]
        ];

        const output = [
            [ 2, 2, 2 ],
            [ 1, 0, 1 ],
            [ 1, 1, 2 ],
            [ 2, 1, 1 ],
            [ 2, 0, 1 ],
            [ 2, 1, 2 ],
            [ 2, 0, 2 ],
            [ 1, 0, 2 ]
        ]
          
        console.log(setMatrix(input));

        expect(setMatrix(input)).to.eql(output);
    })
});

const isArrayWinner = array => {
    const isThereWinner = (array[0] === array[1] && array[0] === array[2]) && array[0] !== 0;
    let winner = null;
    if (isThereWinner) {
        winner = array[0];
    }

    return {
        isThereWinner,
        winner
    }
}

const setMatrix = matrix => {
    const matrixTrans = [];
    let diag1 = [];
    let diag2 = [];

    for (let i = 0; i < 3; i++) {
        let array = [];
        for (let j = 0; j < 3; j++) {
            array = [...array, matrix[j][i]];

            if (i === j) {
                diag1 = [...diag1, matrix[j][i]];
            }

            if (2 - j === i) {
                diag2 = [...diag2, matrix[j][i]]
            }
        }
        matrixTrans[i] = array;
    }

    return [...matrix, ...matrixTrans, diag1, diag2];
}

const whoPlayerIsWin = (matrix) => {
    const matrixFinal = setMatrix(matrix);
    const winner = matrixFinal.find(array => isArrayWinner(array).isThereWinner);
    console.log('Winner is', winner);
    if (winner) {
        return winner[0];
    }

    return null;
}