package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

// oxygen generator rating
// 1. 각 비트 세로줄에서 1,0의 갯수를 경합한다. 그리고 갯수가 많은 쪽으로 필터링한다.
// 2. 그리고 다음 줄을 필터링 한다.
// 3. 만약에 1개만 남으면 멈춘다.
// 4. 두개여도 동일하면 멈춘다.
// 5. 둘의 갯수가 같으면(즉, 하나는 0 다른 하나는 1 인 경우) 해당 포지션에 1이 있는 경우를 선택한다.
func main() {
	// N := 5
	f, err := os.Open("ch03_input.txt")
	if err != nil {
		return
	}

	scanner := bufio.NewScanner(f)
	counter := make([]int, 12)
	for scanner.Scan() {
		text := scanner.Text()
		for i, t := range text {
			switch t {
			case 48:
				counter[i]--
			case 49:
				counter[i]++
			}
		}
	}

	// fmt.Println(counter)

	var gammaRate string
	var epsilonRate string
	for _, n := range counter {
		if n > 0 {
			gammaRate += "1"
			epsilonRate += "0"
		} else {
			gammaRate += "0"
			epsilonRate += "1"
		}
	}

	g, _ := strconv.ParseInt(gammaRate, 2, 64)
	e, _ := strconv.ParseInt(epsilonRate, 2, 64)
	fmt.Println(g * e)
}
