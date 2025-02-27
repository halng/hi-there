---
title: Breaking Changes - Java 17
date: '2024-11-02'
authors:
    - Hal Nguyen
next: whats-new-in-java-24-key-features-and-enhancements
prev: introduction-to-java
---

Java 17, the latest long-term support (LTS) release since Java 11, brings several changes, enhancements, and new features to the language and platform. While it introduces improvements that make development easier and more efficient, it also has breaking changes that could potentially impact existing codebases. This blog post delves into the major breaking changes that developers should be aware of when migrating to Java 17.

## Contents

## 1. The Removal of Deprecated Features

### a. Removal of Nashorn JavaScript Engine

One of the most significant changes in Java 17 is the complete removal of the Nashorn JavaScript engine. Originally introduced in JDK 8 as a replacement for the Rhino engine, Nashorn allowed developers to embed JavaScript code within Java applications. However, with Java 15, Nashorn was marked as deprecated, and Java 17 officially removes it.

**Impact**: Any applications that relied on the `jdk.nashorn.api.scripting` package for scripting will need to migrate to other JavaScript engines, such as GraalVM’s JavaScript engine or a third-party library.

**Solution**: Developers should refactor their code to use the JavaScript engine provided by GraalVM or adapt to other solutions like Jython or external JavaScript libraries.

### b. Removal of the `Solaris/Sparc` Port

Support for Solaris/SPARC and 32-bit x86 builds was deprecated in Java 14 and has now been removed in Java 17. This means that organizations running Java on these legacy platforms must look for alternative hardware solutions or consider virtualization and containerization strategies.

**Impact**: This removal could affect legacy systems and older infrastructure that still rely on Solaris.

**Solution**: Migrate to more modern and supported platforms like Linux or Windows if you are still running code on Solaris/SPARC architectures.

## 2. Deprecation of RMI Activation System

Java 17 also deprecates the Remote Method Invocation (RMI) Activation System. The RMI Activation framework was primarily used for starting remote services on-demand. However, due to its limited usage and the availability of better alternatives such as RESTful services and modern frameworks like Spring Boot, the RMI Activation System has been marked for removal in future releases.

**Impact**: Applications that still use RMI for communication between remote objects will not see immediate breaks, but developers should plan to transition to newer alternatives.

**Solution**: Refactor existing RMI-based services to use more contemporary solutions, such as HTTP-based APIs, gRPC, or other messaging protocols.

## 3. Sealed Classes and Their Compatibility Issues

Java 17 introduced the concept of sealed classes, which enable developers to explicitly control which classes can extend or implement a particular class or interface. While this feature offers more robust modeling and prevents unintended class hierarchies, it can cause issues when integrating with older codebases or libraries that do not account for this new feature.

### How Sealed Classes Work

```java
public sealed class Vehicle permits Car, Truck {
    // class content
}

public final class Car extends Vehicle {
    // class content
}

public non-sealed class Truck extends Vehicle {
    // class content
}
```

**Compatibility Impact**: Libraries or frameworks that use reflection to introspect class hierarchies may encounter unexpected behavior when working with sealed classes. Additionally, older versions of tools that do not recognize the `sealed`, `non-sealed`, or `permits` keywords could run into parsing issues.

**Solution**: Ensure that all dependent libraries and tools are updated to versions that support Java 17’s sealed class feature. Test your code thoroughly if you are integrating sealed classes into an existing application.

## 4. The Stronger Encapsulation of JDK Internals

Starting with Java 9, Java has been steadily encapsulating its internal APIs, and Java 17 continues this trend. The most notable change is the enhanced encapsulation of the `sun.misc` package and other non-standard, internal JDK classes.

**Impact**: Code that relied on these internal APIs, such as direct memory access via `sun.misc.Unsafe`, will encounter compatibility issues in Java 17. Many tools, libraries, and frameworks previously accessed these internal APIs for advanced features and performance optimizations.

**Solution**: Transition to supported public APIs whenever possible. For example, use `java.lang.invoke` and other officially supported packages for reflective access or look for JEPs (Java Enhancement Proposals) that suggest alternatives to `sun.misc` functionality.

## 5. Enhanced `Pattern Matching for switch`

Java 17 introduces preview features such as pattern matching for `switch` expressions. While these preview features are not fully breaking changes, developers who choose to enable and use them must be aware of potential pitfalls if their applications are expected to run on older Java versions.

### Example of Pattern Matching for `switch`

```java
public static String formatShape(Object shape) {
    return switch (shape) {
        case Circle c -> "Circle with radius " + c.getRadius();
        case Rectangle r -> "Rectangle with area " + r.getArea();
        default -> "Unknown shape";
    };
}
```

**Impact**: This feature is available only in Java 17 and beyond, so applications utilizing pattern matching for `switch` must be compiled and executed in an environment that supports it. If backward compatibility is required, developers need to use traditional `switch` or `if-else` logic.

**Solution**: Before adopting preview features like pattern matching for `switch`, consider the project’s requirement for backward compatibility. If needed, plan for feature flags or separate code paths.

## 6. Garbage Collection (GC) and Performance Tweaks

Java 17 includes updates and removals related to garbage collection algorithms and memory management. Notably, the `Concurrent Mark-Sweep (CMS)` garbage collector, deprecated in Java 9, has been removed.

**Impact**: Applications explicitly configured to use the CMS collector will no longer function correctly and will need to adapt to the G1 (Garbage First) collector or other modern collectors like ZGC (Z Garbage Collector) or Shenandoah.

**Solution**: Modify your JVM options to use supported collectors such as `-XX:+UseG1GC`, `-XX:+UseZGC`, or `-XX:+UseShenandoahGC`. Each collector has its strengths and tuning parameters that can be adjusted to optimize performance according to the application’s needs.

## Conclusion

Java 17 brings a host of new features and optimizations, but it also presents several breaking changes that developers need to address for a smooth migration. The removal of deprecated components like Nashorn and CMS, the introduction of sealed classes, and enhanced encapsulation are key areas to watch for. To ensure a successful upgrade, it is crucial to evaluate existing codebases, update dependencies, and thoroughly test the application under the new Java version.

Staying informed and proactive about these breaking changes will help developers harness the benefits of Java 17 while minimizing disruptions to their projects. By understanding the impact of these changes and planning accordingly, developers can navigate the migration process effectively and take full advantage of the latest Java features and enhancements.
