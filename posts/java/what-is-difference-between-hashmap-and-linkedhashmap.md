---
title: What is difference between HashMap and LinkedHashMap
date: '2024-11-06'
authors:
    - Hal Nguyen
prev: list-set-map-and-their-implementations-in-java
next:
---

Let's explore the Map hierarchy and its implementations.

![Map Hierarchy](/assets/Java-Hierarchy.webp)

In a [previous post](https://hi-there.me/blogs/java/list-set-map-and-their-implementations-in-java), I provided an overview of **Map**. In this article, we’ll take a closer look at HashMap and LinkedHashMap, comparing their features and behaviors.

## Contents

## HashMap

- **HashMap** is a robust data structure in Java that stores key-value pairs, mapping values to their associated keys. It allows null keys and values and is a non-synchronized class within the Java Collection framework.
- Declaration: The HashMap class is declared as follows:

```java
public class HashMap<K,V>
extends AbstractMap<K,V>
implements Map<K,V>, Cloneable, Serializable
```

- Key points of HashMap:
  - It stores **key-value** pairs.
  - It **cannot** have duplicate keys. If a newly inserted item has a key that already exists, the new item will replace the old one.
  - It allows one null key and multiple null values.
  - It’s non-synchronized.
  - It doesn’t guarantee that the order will remain constant over time.

- Example:

```java
HashMap<String, String> map = new HashMap<String, String>();
map.put("english", "Hello");
map.put("french", "Bonjour");
map.put("spanish", "Hola");
map.put("german", "Hallo");
map.put("italian", "Ciao");

for(var entry : map.entrySet()) {
    System.out.println(entry.getKey() + " : " + entry.getValue());
}
```

Output:

```bash
spanish : Hola
german : Hallo
english : Hello
italian : Ciao
french : Bonjour
```

Adding a new item with key `english` and value `Hi` results in:

```java
map.put("english", "Hi"); // Update value for key "english"
```

Output:

```bash
spanish : Hola
german : Hallo
english : Hi
italian : Ciao
french : Bonjour
```

- As mentioned earlier, HashMap is not synchronized. When multiple threads access a HashMap concurrently and at least one thread modifies the map structurally, it **must** be *synchronized externally*. Structural modification involves adding or deleting one or more mappings; merely changing the value associated with an existing key does not count as a structural modification. Typically, synchronization is achieved by locking an object that encapsulates the map. If no such object exists, the map should be "wrapped" using the `Collections.synchronizedMap` method, ideally at creation, to prevent accidental unsynchronized access:

```java
Map map = Collections.synchronizedMap(new HashMap<String, String>());
```

## LinkedHashMap

- **LinkedHashMap** is similar to **HashMap**, with the added capability to maintain the order of inserted elements. While **HashMap** provides straightforward methods for inserting, deleting, and searching elements, it lacks the functionality to preserve the insertion order. **LinkedHashMap** addresses this limitation by maintaining insertion order.

- **LinkedHashMap** inherits from the **HashMap** class and implements the **Map** interface in the Java Collection framework.

- Declaration: LinkedHashMap is declared as follows:

```java
public class LinkedHashMap<K,V>
extends HashMap<K,V>
implements Map<K,V>
```

- Key points: LinkedHashMap is similar to HashMap as it inherits all its properties and methods. Additionally, it provides an easy way to maintain the insertion order.

- Example:

```java
LinkedHashMap<String, String> map = new LinkedHashMap<String, String>();
map.put("english", "Hello");
map.put("french", "Bonjour");
map.put("spanish", "Hola");
map.put("german", "Hallo");
map.put("italian", "Ciao");

for(var entry : map.entrySet()) {
    System.out.println(entry.getKey() + " : " + entry.getValue());
}
```

Output:

```bash
english : Hello
french : Bonjour
spanish : Hola
german : Hallo
italian : Ciao
```

> As we can see, the order of elements matches the order of insertion.

## Comparison

- **Similarities**:
  - Both HashMap and LinkedHashMap implement the Map interface.
  - Both allow one null key and multiple null values.
  - Both are non-synchronized.
  - Both are not thread-safe.

- **Differences**:
  - HashMap extends AbstractMap, whereas LinkedHashMap extends HashMap.
  - **Order of iteration**: HashMap does not guarantee order, while LinkedHashMap maintains insertion order.
  - **Implementation**: HashMap uses buckets, while LinkedHashMap uses doubly-linked buckets.
  - **Performance**: HashMap is generally faster, while LinkedHashMap has similar performance but with slight overhead for maintaining order.
  - **Memory**: HashMap requires less memory compared to LinkedHashMap due to the lack of ordering features.
