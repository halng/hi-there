---
title: The defer keyword in Go
slug: the-defer-keyword-in-go
date: '2024-11-09'
authors: 
    - Hal Ng
relates: 
    - introduction-to-go
---

`defer` is one of those small but powerful tools that really enhances Go’s efficiency and readability. This keyword help manage resources and optimize program performance. Let’s dive into the `defer` keyword in Go and explore its use cases.

## Contents

## What is the `defer` keyword?

- The `defer` keyword is used to schedule a function call to run after the function containing it has completed. It’s commonly used for cleanup operations, like closing files, releasing resources, or unlocking mutexes, ensuring that these tasks are completed even if an error or a return statement interrupts the function.

- How it works:
  - When a function is deferred, it won’t execute immediately but will instead be delayed until the surrounding function completes.
  - If multiple defer statements are present, they are executed in Last In, First Out (LIFO) order, like a stack.
- Let see an example:

```go
package main

import "fmt"

func main() {
    fmt.Println("start")

    // This will be deferred until the function completes
    defer fmt.Println("deferred")

    fmt.Println("end")
}
```

Can you guess the output of this code snippet? The `deferred` statement will be executed after the `end` statement, as it’s deferred until the function completes.

Output:

```bash
start
end
deferred
```

This guarantees that any necessary cleanup or closing operation will run, regardless of what happens in the rest of the function. `defer` is particularly useful in functions with multiple return paths.

## Why use the `defer` keyword?

- When I started learning Go, I have a question like this: Why we use `defer` instead of just calling the function directly? The key answer for using is to ensure specific code runs as the function exits, regardless of when or how it exits. And below list out others benefits of using `defer`:

- **Guaranteed Execution at Function End**: When we use defer, the specified function is queued to run after the surrounding function completes. This behavior is critical for cleanup tasks that should happen no matter what, such as releasing resources, closing files, or unlocking mutexes, especially if there are multiple exit points.

```go
package main

import (
    "fmt"
    "errors"
)

func example() {
    fmt.Println("start")

    defer fmt.Println("deferred") // Will always run, even if an error occurs

    if err := doSomething(); err != nil {
        fmt.Println("error:", err)
        return // The deferred statement will still run
    }

    fmt.Println("end")
}

func doSomething() error {
    return errors.New("an error occurred")
}

func main() {
    example()
}
```

Output:

```bash
start
error: an error occurred
deferred
```

*There we can see that the `deferred` statement runs even though an error occurred and the function returned early.*

- **Last In, First Out Execution Order**: If there are multiple defer statements, they execute in **Last In, First Out (LIFO)** order. This is useful when you need to undo operations in the reverse order of their execution.
- Let's look at an example:

```go
func main() {
    defer fmt.Println("First")
    defer fmt.Println("Second")
    defer fmt.Println("Third")
    fmt.Println("Executing main function")
}
```

Can you guess the output of this code snippet? Take a look at the output:

```bash
Executing main function
Third
Second
First
```

*This LIFO behavior is particularly useful when dealing with resources or nested operations.*

- **Cleaner Code with Fewer Errors**: Using `defer` for cleanup keeps the code organized and reduces the chance of missing cleanup code in complex functions with multiple return points.
- For example:

Without `defer`:

```go
func process() {
    resource := acquireResource()
    if resource == nil {
        fmt.Println("Failed to acquire resource")
        return
    }
    // Missing cleanup if we return here
    fmt.Println("Processing")
}
```

With `defer`:

```go
func process() {
    resource := acquireResource()
    if resource == nil {
        fmt.Println("Failed to acquire resource")
        return
    }
    defer releaseResource(resource)
    fmt.Println("Processing")
}
```

## In summary

Using defer:

- Guarantees cleanup at the end of a function, even with early exits.
- Allows orderly LIFO execution of multiple deferred calls.
- Makes code easier to maintain and less error-prone, especially in functions with multiple return statements.
  