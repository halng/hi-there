---
title: What is difference between Thread and Process
date: '2024-11-06'
authors:
    - Hal Nguyen
relates: 
  - how-to-create-threads-in-java
---
## Contents

## Introduction

Let's start by looking at the image below:
![Thread vs Process](/assets/thread-and-process.webp)

As we can see, Thread and Process are two basic component in OS. Process is the program under execution, while Thread is the smallest unit of execution in a process.

## Process

- Processes are basically the programs that are loaded from the ready state and are scheduled in the CPU for execution.
- A process can have multiple threads.
- A process can create other processes which are knows as child processes.
- The process takes more time to terminate, and it is isolated from other processes. In other words, the process does not share memory with other processes.
- The process has 6 states: New, Ready, Running, Waiting, Terminated, and Suspended. See image below:

![Process State](/assets/process-state.webp)

## Thread

- Thread is a part of a process which means a process can have multiple threads and these multiple threads are contained within a single process.
- Thread is not isolated from other threads, it mean thread can shares memory with other threads.
- A thread has 3 states: Running, Ready, and Blocked. See image below:

![Thread State](/assets/thread-state.webp)

## How Thread and Process work together

- Let's look at the image below to understand how Thread and Process work together:
![Thread and Process](/assets/thread-process-relation.webp)

- Explain:
  - First, the process is created by the operating system.
  - Then, check if a thread is needed.
  - If a thread is needed, the thread is created and perform thread operations. This task repeats until no more threads are needed.
  - Then, it will terminate all the threads and then the process.

Here is how Threads and Processes work Step By Step

- The program starts out as a text file of programming code.
- The program is compiled or interpreted into binary form.
- The program is loaded into memory.
- The program becomes one or more running processes. Processes are typically independent of one another.
- Threads exist as the subset of a process.
- Threads can communicate with each other more easily than processes can.
- Threads are more vulnerable to problems caused by other threads in the same process.

## Difference between Thread and Process

|Aspect|Processes|Threads|
|---|---|---|
|Definition|Independent programs with their own memory space.|Lightweight, smaller units of a process, share memory.|
|Creation Overhead|Higher overhead due to separate memory space.|Lower overhead as they share the same memory space.|
|Isolation|Processes are isolated from each other.|Threads share the same memory space.|
|Resource Allocation|Each process has its own set of system resources.|Threads share resources within the same process.|
|Independence|Processes are more independent of each other.|Threads are dependent on each other within a process.|
|Failure Impact|A failure in one process does not directly affect others.|A failure in one thread can affect others in the same process.|
|Synchronization|Less need from the synchronization, as processes are isolated.|Requires careful synchronization due to shared resources.|
|Example Use Cases|Running multiple independent applications.|Multithreading within a single application for parallelism.|
|Memory Usage|Typically consumes more memory.|Consumes less memory compared to processes.|
