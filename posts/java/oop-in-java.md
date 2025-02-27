---
title: OOP in Java
slug: oop-in-java
date: '2024-11-10'
authors: 
    - Hal Ng
prev: introduction-to-java
next: 
---

## Contents

## What is OOP in Java?

- OOP stands for Object-Oriented Programming, is a paradigm that structures the programs around objects, which are instances of classes.
- By focusing on objects and their interactions, OOP helps developers build scalable, modular, and reusable code.
- Java, one of the most popular OOP languages embraces this paradigm with robust support for core OOP concept (classes, objects, inheritance, polymorphism, and encapsulation)
- `Object` is an instance of `Class`, which is a blueprint for creating objects. `Class` defines the properties and behaviors of objects and this is a unit in Java.
- Access Modifiers: in Java, there are four access modifiers: `public`, `protected`, `default`, and `private`. They control the visibility of classes, methods, and fields.
  - `public`: accessible from anywhere
  - `protected`: accessible within the same package and subclasses
  - `default`: accessible within the same package
  - `private`: accessible only within the same class

### The four pillars of OOP

OOP is build around four main principles:

1. Encapsulation
2. Abstraction
3. Inheritance
4. Polymorphism

Let's go through each of them in detail.

### Encapsulation

- Encapsulation is about wrapping the data (fields) and methods (functions) into a single unit called class. By controlling access to this data, encapsulation protects an object's state and maintains data integrity.
- In Java, encapsulation is achieved by using access modifiers to restrict access to fields and methods. For example, you can use `private` access modifier to make a field accessible only within the same class.
- There is a concept called `getter` and `setter` methods in Java, which are used to access and modify the private fields of a class. This way, you can control how the data is accessed and modified.
- Example:

```java
public class Account {
    private String address;
    private String name;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
```

Here, the `address` and `name` fields are private, and can only be accessed and modified using the `getAddress()`, `setAddress()`, `getName()`, and `setName()` methods. Only setter methods can modify the fields, and getter methods can only access the fields.

### Abstraction

- Abstraction involves simplifying complex systems by modeling classes that represent real-world entities. By focusing on essential characteristics and hiding unnecessary details, abstraction helps developers manage complexity and build scalable systems.
- In Java, abstraction is implemented using:
  - **Abstracts classes**: classes that cannot be instantiated, but can be subclassed. Abstract classes can have abstract methods (methods without a body) that must be implemented by subclasses.
  - Interfaces: a contract that defines a set of methods that a class must implement. Interfaces provide a way to achieve multiple inheritance in Java.

- Example:

```java
public abstract class Shape {
    public abstract double area();
    public abstract double perimeter();
}

public class Circle extends Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double area() {
        return Math.PI * radius * radius;
    }

    @Override
    public double perimeter() {
        return 2 * Math.PI * radius;
    }
}
```

In this example, `Shape` is an abstract class with abstract methods `area()` and `perimeter()`. The `Circle` class extends `Shape` and implements these methods to calculate the area and perimeter of a circle.

### Inheritance

- Inheritance is a mechanism in which a new class inherits properties and behaviors from an existing class. This allows developers to create a hierarchy of classes that share common attributes and methods, reducing code duplication and promoting code reuse.
- In Java, the `extends` keyword is used to create a subclass that inherits from a superclass.

Example:

```java
public class Animal {
    public void eat() {
        System.out.println("Animal is eating");
    }
}

public class Dog extends Animal {
    public void bark() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Dog dog = new Dog();
        dog.eat(); // Output: Animal is eating
        dog.bark(); // Output: Dog is barking
    }
}
```

In this example, `Dog` inherits the eat method from the `Animal` class, and we can extend this further by adding more specialized behaviors to subclasses.

### Polymorphism

- `Polymorphism` enables one interface to be used for different data types, allowing a method or an object to take multiple forms. In Java, polymorphism is achieved through:

- **Method Overloading**: Multiple methods in a class share the same name but differ in parameter types or numbers.
- **Method Overriding**: A subclass provides a specific implementation of a method already defined in its superclass.

Example of Method Overloading:

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }
}

public class Main {
    public static void main(String[] args) {
        Calculator calculator = new Calculator();
        System.out.println(calculator.add(1, 2)); // Output: 3
        System.out.println(calculator.add(1.5, 2.5)); // Output: 4.0
    }
}
```

In this example, the `add` method is overloaded to accept both `int` and `double` parameters. This also called **compile-time polymorphism.**

Example of Method Overriding:

```java
public class Animal {
    public void makeSound() {
        System.out.println("Animal is making a sound");
    }
}

public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("Dog is barking");
    }
}

public class Main {
    public static void main(String[] args) {
        Animal animal = new Dog();
        animal.makeSound(); // Output: Dog is barking
    }
}
```

In this example, the `makeSound` method is overridden in the `Dog` class to provide a specific implementation. This is also called **runtime polymorphism.**

## Key features of Java that support OOP

Java’s design aligns strongly with OOP principles, making it a powerful language for developing modular and scalable applications. Key features include:

- **Class and Interface structure**: Java enforces an object-oriented structure that encourages using classes and interfaces for program design.
- **Garbage Collection**: Java’s automatic memory management supports OOP by reducing the need for manual memory allocation and deallocation, allowing developers to focus on object interaction.
- **The Standard Library**: Java provides extensive libraries and frameworks, many of which follow OOP principles, further encouraging modular and reusable code.

## Benefits of OOP in Java

By implementing OOP in Java, developers can enjoy:

- **Code Reusability**: Code can be reused across different parts of an application or even across projects, saving time and resources.
- **Maintainability**: With modular code and encapsulated data, Java programs are easier to debug and extend.
- **Scalability**: OOP principles enable Java applications to scale seamlessly, making them ideal for both small and large-scale projects.

## Conclusion

Object-Oriented Programming provides a powerful framework for building complex, modular, and maintainable software systems, and Java's OOP capabilities make it an excellent choice for developers who value these principles. By mastering Java’s OOP features, you’re well-equipped to create software that is both efficient and adaptable, standing the test of time as requirements evolve.
