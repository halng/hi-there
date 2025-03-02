---
title: Design Pattern in Java - Singleton
slug: design-pattern-in-java-singleton
date: '2025-02-25'
authors: 
    - Hal Ng
relates:
---

*What is the Signleton Pattern and its principle? How can we use it to improve our code? How to implement it in Java and so on... In this blog post we are going to learn more about it. Let's dive in!!*

## Contents

## 1. What is the Singleton Pattern?

- **Singleton** pattern is a *creational design pattern** that restricts the initialization of a class to ensure that only one instance of the class can be created while providing a global access point to this instances.
- This pattern can be used for wide range of purpose such as logging, caching, and thread pool. It's also combine with other design pattern like Builder, Facade, Prototype,etc...


<sup>* Creational: the design patterns that deal with object creation</sup>

## 2. Pros and Cons
### 2.1 Pros

- Can be sure that a class has only sone single instance
- Gaining a global access to that instance and ensure consistent behavior across application.
- The signleton object is initialized only when it's requested for the first time.
- Saves memory by preventing multiple object creation.
### 2.2 Cons

- Violate the *Signle Responsibility Principle*
- Can introduce global state, making code harder to manage
- Can make unit testing more difficult

## 3. Implement in Java

The implementation of a signleton pattern include 5 steps below:

- *Step 1*: Add a private static field to the class for storing instance
- *Step 2*: Declare a public static creation method for getting the instance
- *Step 3*: Implement a initialization inde the static method.
- *Step 4*: Make the constructor of the class private. The static method of the class still involve the private constructor, but not for outside
- *Step 5*: Update code to call directly to the signleton's constructor.


There are multiple ways to implement the Singleton pattern in Java, each with its own advantages and limits. The choice of the implementation deplends on factors such as memory efficiency, thread safety, and performance. Below are most commonly used approaches:

### 3.1 Eager Initialization

In this way, the singleton instance is created at the time of class loading. This appoach is simple and inherently thread-safe but can lead to unnecessary memory usage if the instance is never actually used.

```java
public class Singleton {
    private static final Singleton instance = new Singleton();
    
    private Singleton() {}  // Private constructor
    
    public static Singleton getInstance() {
        return instance;
    }
}
```

### 3.2 Lazy Initialization

In Lazy Initialization, the Singleton instance is created only when it is first requested. This ensures memory is used efficiently, but it is *not thread-safe*, meaning multiple threads could create multiple instances.

```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {}  
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}

```

### 3.3 Thread-Safe Singleton

To make Lazy Initialization thread-safe, we can use a synchronized method. This prevents multiple threads from creating multiple instances. However, synchronization can slow down performance.

```java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {}  
    
    public static synchronized Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}


```

### 3.4 Bill Pugh Singleton

This approach leverages a static inner helper class to create the Singleton instance. The instance is only created when getInstance() is called, ensuring lazy initialization while being thread-safe without synchronization overhead

```java
public class Singleton {
    private Singleton() {}  
    
    private static class SingletonHelper {
        private static final Singleton INSTANCE = new Singleton();
    }
    
    public static Singleton getInstance() {
        return SingletonHelper.INSTANCE;
    }
}

```

### 3.5 Double-Checked Locking

Double-Checked Locking reduces synchronization overhead by checking whether the instance is already created before acquiring the lock. This makes it more efficient than the synchronized method.

```java
public class Singleton {
    private static volatile Singleton instance;
    
    private Singleton() {}  
    
    public static Singleton getInstance() {
        if (instance == null) {  
            synchronized (Singleton.class) {  
                if (instance == null) {  
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}

```

## 4. Best Practice

* Use the Singleton pattern when a class should have only one instance shared across the application. 
* Ensure thread safety in multi-threaded environments.
* Prevent reflection-based attacks.
* Be mindful of serialization issues.
* Consider dependency injection as an alternative in testable applications.
* Avoid unnecessary use of Singleton.
* Allow flexibility if needed.
