---
title: How to create threads in Java
slug: how-to-create-threads-in-java
date: '2024-11-06'
authors:
    - Hal Nguyen
prev: what-is-difference-between-thread-and-process
next: 
---

## Contents

## Introduction

In [previous article](https://hi-there.me/blogs/java/what-is-difference-between-thread-and-process), we have learned about the difference between thread and process. In this article, we will learn how to create threads in Java. Typically, there are five ways to create threads in Java:

- By extending the Thread class
- By implementing the Runnable interface
- By creating new thread pool
- By using ExecutorService with Callable and Future
- By using CompletableFuture

Before we dive into each way, let's first understand the overview of multi-threading in Java:

- Java provides built-in support for multi-threading.
- Multi-threading is a process of executing multiple threads simultaneously.
- Used to maximize the CPU utilization: We don't want our CPU to be in a free state; for example, Func1() comes into the memory and demands any input/output process. The CPU will need to wait for unit Func1() to complete its input/output operation in such a condition. But, while Func1() completes its I/O operation, the CPU is free and not executing any thread. So, the efficiency of the CPU is decreased in the absence of multithreading.
  
Each method has its advantages depending on your use case, such as improving CPU utilization, handling tasks concurrently, or executing asynchronous operations. We’ll explore these methods in detail, providing code examples and explanations to help you choose the best approach for your project.

## By extending the Thread class

- To create a thread by extending the Thread class, we need to create a class that extends the Thread class and override the run() method.
- Let's look at the example below:

```java
public class DMThread extends Thread {
    @Override
    public void run() {
        System.out.println("Hello from: " + currentThread().getName());
    }

    public static void main(String ...args) {
        var thread1 = new DMThread();
        var thread2 = new DMThread();

        thread1.start();
        thread2.start();
    }
}

```

Output:

```bash
Hello from: Thread-0
Hello from: Thread-1
```

- In the code block above, we have created a class `DMThread` that extends the `Thread` class and overrides the `run()` method. The code we want to execute on the thread's execution goes inside the `run()` method.
- In order to execute the thread, we call the `start()` method on the thread object. Once the `start()` method is called,  It automatically calls the `run()` method, and a new stack is provided to the thread. So, that's how you easily create threads by extending the thread class in Java.

## By implementing the Runnable interface

- The second ways to create a thread in Java is by implementing the `Runnable` interface. When creating it, we only specify what should be done in a separate thread. To actually launch it you should create a new `Thread`, pass the `Runnable` as a parameter and run the `start()` method.
- Let's look at the example below:

```java
public class DMRunnable {
    public static void main(String ...args) {
        System.out.println("Hi There from " + Thread.currentThread().getName());
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("Hi There from " + Thread.currentThread().getName());
            }
        });

        thread.start();
    }
}
```

OR

```java
public class DMRunnable {
    public static void main(String ...args) {
        System.out.println("Hi There from " + Thread.currentThread().getName());
        Thread thread = new Thread(new DMRunnable().new RunnableImpl());
        thread.start();
    }

    private class RunnableImpl implements  Runnable {

        @Override
        public void run() {
            System.out.println("Hi There from " + Thread.currentThread().getName());
        }
    }
}

```

Output:

```bash
Hi There from main
Hi There from Thread-0
```

- In the code block above, we have created a class `DMRunnable` that implements the `Runnable` interface and overrides the `run()` method. The code we want to execute on the thread's execution goes inside the `run()` method.
- In order to execute the thread, we create a new `Thread` object and pass the `Runnable` object as a parameter to the `Thread` constructor. Once the `start()` method is called, it automatically calls the `run()` method, and a new stack is provided to the thread. So, that's how you easily create threads by implementing the `Runnable` interface in Java.

## By creating new thread pool

- A thread pool is a pool of worker threads that can handle a large number of tasks by reusing threads, rather than creating new threads each time a task is executed. This approach is efficient for handling multiple tasks without the overhead of thread creation and destruction, which can be costly.
- Let's look at the example below:

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class DMThreadPool{
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newFixedThreadPool(3); // Create a pool of 3 threads

        for (int i = 0; i < 5; i++) {
            Runnable task = new Task(i);
            executorService.submit(task); // Submitting each task to the thread pool
        }
        
        executorService.shutdown(); // Gracefully shutdown the executor
    }
}

class Task implements Runnable {
    private final int taskId;

    public Task(int taskId) {
        this.taskId = taskId;
    }

    @Override
    public void run() {
        System.out.println("Executing Task ID : " + taskId + " - Thread: " + Thread.currentThread().getName());
    }
}

```

Output:

```bash
Executing Task ID : 1 - Thread: pool-1-thread-2
Executing Task ID : 3 - Thread: pool-1-thread-2
Executing Task ID : 4 - Thread: pool-1-thread-2
Executing Task ID : 0 - Thread: pool-1-thread-1
Executing Task ID : 2 - Thread: pool-1-thread-3
```

- `ExecutorService`: We create an ExecutorService with a fixed-size thread pool of 3 threads using `Executors.newFixedThreadPool(3)`. This means up to three tasks can run concurrently, while others will wait until a thread becomes available.
- `Task Submission`: We submit five tasks to the pool in a loop. Each task is handled by a thread in the pool.
- `Task Execution`: The Task class implements Runnable and defines the run method, which is executed by the threads in the pool.
- `Shutdown`: Finally, we call `shutdown()` on the executor to prevent new tasks from being submitted and gracefully shut down the pool after completing the existing tasks.

Use case: Using a thread pool allows efficient task management without frequent thread creation and termination, making it a scalable solution.

## By using ExecutorService with Callable and Future

- `Callable` and `Future` provide a way to perform tasks that return a result. Unlike `Runnable`, which cannot return a value, `Callable` is a functional interface that allows tasks to return a result and throw checked exceptions. Future is used to retrieve the result or check the status of a `Callable` task once it’s complete.
- Let's look at the example below:

```java
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class DMCallableFuture {
    public static void main(String[] args) {
        ExecutorService executorService = Executors.newSingleThreadExecutor();

        Callable<Integer> callableTask = () -> {
            int sum = 0;
            for (int i = 1; i <= 10; i++) {
                sum += i;
            }
            return sum; // Returns the result of the computation
        };

        Future<Integer> futureResult = executorService.submit(callableTask); // Submit the Callable task

        try {
            Integer result = futureResult.get(); // Blocking call to retrieve the result
            System.out.println("Sum of numbers from 1 to 10: " + result);
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            executorService.shutdown();
        }
    }
}
```

Output:

```bash
Sum of numbers from 1 to 10: 55
```

- `Callable`: We define a `Callable` task that calculates the sum of numbers from 1 to 10 and returns the result.
- `Submit Task`: We submit the `Callable` task to the `ExecutorService`. The submit method returns a `Future` object.
- `Retrieve Result`: Using `futureResult.get()`, we retrieve the result of the computation. This call blocks until the task is complete.
- `Shutdown`: Finally, we call `shutdown()` to gracefully close the executor service.

Use case: Using `Callable` and `Future` is ideal when you need to execute a task that produces a result and want to handle any exceptions that might occur.

## By using CompletableFuture

- `CompletableFuture` is part of Java’s `java.util.concurrent` package, introduced in Java 8 to provide a flexible, non-blocking way of handling asynchronous tasks.
- Unlike traditional future-based solutions, `CompletableFuture` offers a range of methods to compose tasks and handle results once they become available, making it suitable for complex asynchronous programming.

```java
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

public class DMCompletableFuture {
    public static void main(String[] args) {
        CompletableFuture<Void> future = CompletableFuture.runAsync(() -> {
            System.out.println("Task running asynchronously - Thread: " + Thread.currentThread().getName());
        });

        CompletableFuture<Integer> futureWithResult = CompletableFuture.supplyAsync(() -> {
            int result = 10 * 10;
            System.out.println("Calculating result asynchronously - Thread: " + Thread.currentThread().getName());
            return result;
        });

        try {
            // Blocks to get the result of the future
            future.get(); // Waits until the first task completes
            System.out.println("Computation Result: " + futureWithResult.get()); // Gets the result of the second task
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

Output:

```bash
Task running asynchronously - Thread: ForkJoinPool.commonPool-worker-1
Calculating result asynchronously - Thread: ForkJoinPool.commonPool-worker-2
Computation Result: 100
```

- `Asynchronous Task Execution`: `runAsync` is used for tasks that do not return a result. In this case, it simply prints a message.
- `SupplyAsync`: `supplyAsync` is used to run a task that returns a result (e.g., 10 * 10). It is executed asynchronously and returns a `CompletableFuture`.
- `Blocking to Retrieve Results`: Calling `get()` on the `CompletableFuture` instance will block until the task completes. Here, we retrieve and print the computed result.

Use case: `CompletableFuture` provides more flexibility with chaining and combining tasks, handling exceptions, and running tasks asynchronously, making it an excellent choice for scalable asynchronous programming.

## Conclusion

Java offers multiple ways to manage and execute threads, each with its unique advantages depending on the complexity of your tasks and your performance requirements. Let’s briefly summarize the five approaches discussed:

1. **By Extending the `Thread` Class**: This is the most basic method, where you create a new thread by extending the `Thread` class and overriding its `run()` method. It is simple but not ideal for complex tasks or managing multiple threads, as it doesn’t provide easy ways to handle thread pooling or task management.

2. **By Implementing the `Runnable` Interface**: This method is more flexible than extending the `Thread` class. By implementing the `Runnable` interface, you can pass your task to an existing `Thread` or to an executor for better control. It’s a good choice when you need a clean separation between the task and the execution logic.

3. **By Creating a New Thread Pool**: Thread pools manage a group of worker threads and provide an efficient way to handle multiple tasks without creating new threads each time. This method is ideal when you have a large number of short-lived tasks, as it minimizes the overhead of thread creation and destruction.

4. **By Using `ExecutorService` with `Callable` and `Future`**: For tasks that need to return results or might throw exceptions, `ExecutorService` with `Callable` and `Future` is a powerful solution. It allows for more control over task execution and result retrieval, making it perfect for situations where tasks need to return values or handle errors effectively.

5. **By Using `CompletableFuture`**: `CompletableFuture` is the most advanced method for handling asynchronous tasks. It supports non-blocking task execution, task chaining, and composition, making it the best choice for complex applications with multiple asynchronous operations. It provides an easy way to work with asynchronous workflows and is ideal for scalable and modern Java applications.

In conclusion, the right method to use depends on the type of task and the level of control you need over concurrency. For simple thread execution, extending `Thread` or implementing `Runnable` might suffice. However, for more advanced scenarios requiring asynchronous execution, results retrieval, or thread management, using thread pools, `ExecutorService`, or `CompletableFuture` will provide greater flexibility and efficiency.
