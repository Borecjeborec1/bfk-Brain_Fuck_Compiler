# BFK (Brain F\*ck compiler)

A Brainfuck compiler written in node.js!

# Installation

#### Install globally

    npm install -g bfk

#### Local install

    npm install bfk

# Usage

I prefer using global packages. Why?

1. It's much easier
2. You can use it whenever you want

#### Global usage

    bfk <your file>

#### Local usage

    const bfk = require("bfk")
    bfk.compile("Path to Brain f*ck program")

# Examples

---

Let's assume u have hello world program.

> helloWorld.bf

With "Hello World!" code inside

    ++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>.

#### Everything you have to do, is to write this into your terminal

    bfk helloworld

#### The output should be

    H
    E
    L
    L
    O

    W
    O
    R
    L
    D
    !

#### If you want to create a continous string just add -str after command

    bfk helloworld -str

#### The output should be

    HELLO WORLD!

Notice that you don't even have to specify the file extension.
