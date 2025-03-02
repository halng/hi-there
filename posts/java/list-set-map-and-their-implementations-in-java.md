---
title: List Set Map and their implementation in Java
date: '2024-10-29'
authors:
    - Hal Nguyen
relates: 
    - what-different-between-hashmap-and-linkedhashmap
---

## Contents

## 1. List

- One of the Java **collection interface's sub interface** is **List**. It's offer index-based ways to **add, update, remove, search** for elements.
- List allows **duplicate** elements. And we can store the `null` element in the list.
- List preserves the insertion order, it allows positional access and insertion of elements.
- It locals in `java.util` package.
- Example of using **List**

```java
package cff;

import java.util.ArrayList;
import java.util.List; // import List interface

public class CollectionDemo {

    public static void main(String[] args) {

        List<String> greetings = new ArrayList<>();
        // add a new element to the list
        greetings.add("hello world");
        greetings.add("hello java");

        // iterate the list
        for (String greeting : greetings) {
            System.out.println(greeting);
        }
    }
}
```

Output

```shell
hello world
hello java
```

There are two general purpose List implementation - `ArrayList` and `LinkedList`. Most of the time, we usually use `ArrayList` because of it offers faster to position access. It also doesn't allocate a node object for each element in the `List` and it can take advantage of `system`. Let's dive into these two class.

### 1.1 ArrayList


### 1.2 LinkedList



## Set

- The Set interface in Java, found in the java.util package, represents an **unordered** collection of unique elements. This means that duplicate elements are automatically discarded.

- Example:

```java
package cff;

import java.util.HashSet;
import java.util.Set;

public class CollectionDemo {

    public static void main(String[] args) {

        Set<String> greeting = new HashSet<>();
        greeting.add("Hello");
        greeting.add("Hi");
        greeting.add("Hola");
        greeting.add("Bonjour");
        greeting.add("Namaste");
        greeting.add("Hello"); // this will not be added as it is duplicate

        for(String greet : greeting) {
            System.out.println(greet);
        }
    }
}
```

Output

```shell
Hi
Hello
Namaste
Bonjour
Hola
```

## Map

- The Map interface represent a mapping between key-value. It mean each key will be linked to a specific value.
- Once store in a Map, we only lookup value by using the key.
- Let's have a look at example below:

```java
package cff;

import java.util.HashMap;
import java.util.Map;

public class CollectionDemo {

    public static void main (String[] args) {
        Map<String, String> greetings = new HashMap<>();

        greetings.put("English", "Hello");
        greetings.put("French", "Bonjour");
        greetings.put("Spanish", "Hola");
        greetings.put("Italian", "Ciao");

        for (var entry : greetings.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue());
        }
    }
}
```

Output

```shell
English: Hello
Italian: Ciao
French: Bonjour
Spanish: Hola
```

## Question

Let's answer some simple questions about these topic:

### 1. **What is the difference between a List, a Set, and a Map?**

| **Aspect**               | **List**                               | **Set**                                | **Map**                              |
|--------------------------|---------------------------------------|---------------------------------------|-------------------------------------|
| **Implementation Classes** | `ArrayList`, `LinkedList`, etc.       | `HashSet`, `TreeSet`, `LinkedHashSet`  | `HashMap`, `TreeMap`, `LinkedHashMap` |
| **Allows Duplicates**    | Yes                                   | No                                    | No (only unique keys)               |
| **Order of Elements**    | Ordered (insertion order maintained)  | Depends (insertion order or sorted order depending on implementation) | Key-value pairs (ordering depends on implementation) |
| **Null Values**          | Allows multiple null values           | Allows only one null element          | Allows one null key and multiple null values (depending on implementation) |
| **Access Time Complexity** | O(1) for `ArrayList` (index-based)    | O(1) for `HashSet` (amortized); O(log n) for `TreeSet` | O(1) for `HashMap` (amortized); O(log n) for `TreeMap` |
| **Search Time Complexity** | O(n)                                 | O(1) for `HashSet`; O(log n) for `TreeSet` | O(1) for `HashMap`; O(log n) for `TreeMap` |
| **Index-Based Access**   | Yes (supports `get(int index)`)       | No                                    | No (key-based access)               |
| **Best Use Case**        | When the order and duplicates matter  | When uniqueness matters               | When key-value pairs are needed     |
| **Key-Value Pair**       | No                                    | No                                    | Yes                                 |
| **Common Methods**       | `add()`, `get()`, `set()`, `remove()` | `add()`, `contains()`, `remove()`     | `put()`, `get()`, `remove()`,  `containsKey()` |

### 2. **Explain the concept of ordered and unordered collections. Which interfaces and implementations fall into each category?**

- Ordered: An ordered collection maintains the order in which elements are inserted. It can be based on insertion order or a natural/specified sorting order.

  - Example:
    - List: Maintain the insertion order and allow access by index
    - Certain Sets: maintain order based on insertion like `LinkedHashSet` and `TreeSet`
  
  - Interface and implementation:
    - List: ArrayList, LinkedList
    - SortedSet: TreeSet
    - LinkedHashSet
    - Map: LinkedHashMap
    - SortedMap: TreeMap

- Unordered Collections: Unordered collections do not guarantee any specific order of elements. The order of elements may depend on factors like hash code or internal bucket organization.

  - Example:
    - Hash-Based Sets: do not maintain order of elements
    - Hash-Based Maps: Do not maintain key-value pair order
  
  - Interfaces and implementation:
    - Set: HashSet
    - Map: HashMap

#### Order question to answer

- ***What is the difference between an ArrayList and a LinkedList? When would you use one over the other?***
- ***How does a HashSet ensure uniqueness of elements?***
- ***What is the time complexity of common operations (add, remove, search) for ArrayList, LinkedList, HashSet, and HashMap?***
- ***Explain the concept of hashing and how it's used in HashMaps***
- ***What is the difference between a HashMap and a TreeMap? When would you use one over the other?***
- ***Explain the concept of fail-fast iterators***
- ***What is the difference between a ConcurrentHashMap and a Hashtable?***
- ***How would you implement a custom hash function for a HashMap?***
- ***What is the difference between a WeakHashMap and a SoftReference?***
- ***How would you implement a thread-safe HashMap?***
