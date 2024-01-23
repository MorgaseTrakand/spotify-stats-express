answer = [2]

def RecursiveSolver(currentNumber, limit):
    if (currentNumber >= limit):
      return
    sqr_root = int(currentNumber**0.5) + 1
    print(answer)
    for i in range(3, sqr_root, 2):
        if currentNumber % i == 0:
            RecursiveSolver(currentNumber + 1, limit)

    answer.append(currentNumber)
    RecursiveSolver(currentNumber + 1, limit)
    

RecursiveSolver(3, 100)
print(answer)

