package ch02

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

type Move struct {
	Direction string
	Number    int
}

type Point struct {
	horizontal int
	depth      int
	aim        int
}

func (p *Point) Move(m Move) {
	switch m.Direction {
	case "forward":
		p.horizontal += m.Number
		p.depth += m.Number * p.aim
	case "down":
		p.aim += m.Number
	case "up":
		p.aim -= m.Number
	}
}

func (p *Point) Result() int {
	return p.horizontal * p.depth
}

func Solution() {
	f, err := os.Open("ch02_input.txt")
	if err != nil {
		fmt.Println("no file")
		return
	}

	scanner := bufio.NewScanner(f)
	point := Point{}
	for scanner.Scan() {
		text := scanner.Text()
		fields := strings.Fields(text)
		direction := fields[0]
		number, err := strconv.Atoi(fields[1])
		if err != nil {
			fmt.Println("not int")
			return
		}

		move := Move{Direction: direction, Number: number}
		point.Move(move)
		// fmt.Println(point)
	}
	fmt.Println(point.Result())
}
