---
title: Breaking Up is Easy - A Love Story About Dependency Injection and IoC in Spring Boot
slug: breaking-up-is-easy-a-love-story-about-dependency-injection-and-ioc-in-spring-boot
date: '2025-04-11'
authors: 
    - Hal Ng
relates:
    - spring-boot-auto-configuration-explained-from-basics-to-customization
---
        
## Contents

## 1. The Dating Scene: Understanding Dependencies

Imagine you are a Coffee Shop (yes, you are a whole shop, stay with me here). As a coffee shop, you absolutely NEED a coffee machine to function. In the tradtional "tightly-coupled" world, it would be like this:

```java
public class OldSchoolCoffeeShop {
    private final CoffeeMachine coffeeMachine;

    public OldSchoolCoffeeShop() {
        // Yikes! We're creating our own coffee machine
        this.coffeeMachine = new ExpensiveCoffeeMachine();
    }
}
```

This is like saying, "I can only work with THIS specific coffee machine, and I have to build it myself!" Talk about commitment issue! 🤔

## 2. Enter the Matchmaker: Spring's IoC Container

Spring boot is like a really good matchmaker who says, "Hey, let me handle your relationships!" This is *Inversion of Control* - IOC - you're no longer in charge of creating and managing your relationships(dependencies). Instead Spring play cupid!

```java
@Component
public class ModernCoffeeShop {
    private final CoffeeMachine coffeeMachine;

    @Autowired
    public ModernCoffeeShop(CoffeeMachine coffeeMachine) {
        this.coffeeMachine = coffeeMachine;
    }
}
```

## 3. Why Was IoC/DI Created? The Historical Drama

Imagine building a house where every room has to construct its own furniture, plumbing, and electrical systems. That's how code looked before DI:

```java
public class OldStyleApplication {
    private Database database;
    private UserService userService;
    private EmailService emailService;
    
    public OldStyleApplication() {
        this.database = new MySQLDatabase("url", "user", "pass");
        this.emailService = new SMTPEmailService("smtp.server", "credentials");
        this.userService = new UserService(database, emailService);
        // Configuration nightmare! 😱
    }
}

```

There are 5 problems with this approach:
- Hard-codeed dependencies: Classes had specific dependencies hardcoded within them.
- Difficult to test: You couldn't easily swap out dependencies for testing (e.g., a mock database).
- Tight coupling: Classes were dependent on the concrete implementations of their dependencies.
- Complex configuration management: Managing these dependencies was a configuration nightmare.
- Nightmare to change implementation: Changing the implementation of dependencies was very difficult.

So this is why IoC and DI were born!! So that:
- Loose Coupling : Your coffee shop can work with any coffee machine that fits the interface
- Easy Testing : Mock dependencies like a pro
- Flexible Configuration : Switch implementations without changing code
- Maintainable Code : Each class has a single responsibility

## 4. Type of Dependency Injection
### 4.1. Constructor Injection(The marriage)

This is the most recommended way. Dependencies are passed through the constructor. Clear and all dependencies are available when the object is created.

```java
@Service
public class CoffeeService {
    private final BeanGrinder grinder;
    private final WaterBoiler boiler;
    
    // The most recommended way - all dependencies clear at construction
    @Autowired
    public CoffeeService(BeanGrinder grinder, WaterBoiler boiler) {
        this.grinder = grinder;
        this.boiler = boiler;
    }
}
```

### 4.2. Setter Injection(The Casual Dating)

Dependencies are set using **setter** methods. More flexible, but can lead to `NullPointerException` if a dependency isn't set.

```java
@Service
public class CoffeeService {
    private MilkFrother milkFrother;
    @Autowired
    public void setMilkFrother(MilkFrother milkFrother) {
        this.milkFrother = milkFrother;
    }
}
```

### 4.3 Field Injection(The Friends with Benefits)

Dependencies are injected directly into fields using @Autowired. This is generally discouraged because it hides dependencies and makes testing harder.

```java
@Service
public class CoffeeService {
    @Autowired // Not recommended! It's like hiding your relationships
    private SugarDispenser sugarDispenser;
}
```

## 5. How Dependencies Are Actually Discovered

Spring Boot is like a relationship detective. When you add `@SpringBootApplication`, it starts scanning for potential matches:

```java
@SpringBootApplication // Contains @ComponentScan
public class CoffeeShopApplication {
    public static void main(String[] args) {
        SpringApplication.run(CoffeeShopApplication.class, args);
    }
}
```

Spring uses a process called **component scanning** that works in three phases:

### 5.1. Scanning Phase
In this phase, Spring scans all classes in this package and sub-packages
```java
@Configuration
@ComponentScan(basePackages = "com.mycoffeeshop")
public class AppConfig {
    //...
}
```

### 5.2. Bean Registration Phase

Then, Spring looks for these stereotypes:

```java
@Component // Generic component
@Service   // Business logic
@Repository // Data access
@Controller // Web endpoints
@Configuration // Configuration classes

```

### 5.3. Dependency Resolution Phase

Finnaly, Spring creates a dependency graph and resolves in correct order

```java
@Service
public class OrderService {
    private final PaymentService paymentService;
    private final InventoryService inventoryService;

    @Autowired
    public OrderService(PaymentService paymentService, 
                       InventoryService inventoryService) {
        this.paymentService = paymentService;
        this.inventoryService = inventoryService;
    }
}

```

## 6. Qualification: When You Have Multiple Options

Sometimes you have multiple implementations (like having many coffee machines). Use `@Qualifier` to pick the right one:

```java
@Component("basic")
public class BasicCoffeeMachine implements CoffeeMachine {}

@Component("fancy")
public class FancyCoffeeMachine implements CoffeeMachine {}

@Service
public class CoffeeShop {
    @Autowired
    @Qualifier("fancy")
    private CoffeeMachine coffeeMachine; // I only want the fancy one!
}
```

## 7. Conclusion
Dependency Injection and IoC in Spring Boot are like having a really good relationship counselor. They help you:
- Keep your relationships healthy (loose coupling)
- Stay flexible (easy to change implementations)
- Maintain independence (each class has its own responsibility)
- Make testing easier (mock dependencies)

Remember: Good relationships are built on independence and clear boundaries. The same goes for your code! Let Spring Boot be your matchmaker, and you'll have a much happier application! 💝

Now go forth and build some beautiful relationships in your code! Just remember to `@Autowired` responsibly! 😉