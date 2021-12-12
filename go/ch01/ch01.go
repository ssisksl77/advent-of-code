package ch01

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func Solution() {
	f, err := os.Open("ch01_input.txt")
	if err != nil {
		fmt.Println("no file")
		return
	}

	scanner := bufio.NewScanner(f)
	data := make([]int, 0)
	for scanner.Scan() {
		i, err := strconv.Atoi(scanner.Text())
		if err != nil {
			fmt.Println("no int")
			return
		}
		data = append(data, i)
	}

	prev := data[0] + data[1] + data[2]
	cnt := 0
	for i := 2; i < len(data); i++ {
		sum := data[i] + data[i-1] + data[i-2]
		if prev < sum {
			cnt++
		}
		prev = sum
	}

	fmt.Println(cnt)
	// fmt.Println(data)
}
