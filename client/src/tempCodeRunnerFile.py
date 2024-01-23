def printPrimes(n):
    answer = [2]

    def RecursiveSolver(currentNumber):
        if currentNumber % 2 == 0:
            RecursiveSolver(currentNumber + 1)

        sqr_root = int(currentNumber**0.5) + 1
        for i in range(3, sqr_root, 2):
            if currentNumber % i == 0:
                RecursiveSolver(currentNumber + 1)

        answer.append(currentNumber)
        RecursiveSolver(currentNumber + 1)

    RecursiveSolver(3)
    print(answer)

printPrimes(100)