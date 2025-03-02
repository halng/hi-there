---
title: What’s New in Java 24 - Key Features and Enhancements
date: '2024-10-21'
authors:
    - Hal Nguyen
relates: 
    - breaking-changes-java-17
---

Java 24 is around the corner, bringing some exciting new features and updates to the language and the JVM. Whether you're a seasoned Java developer or just keeping tabs on the latest improvements, this release is designed to make Java more efficient, powerful, and developer-friendly. In this blog post, we’ll walk through the most notable updates that come with Java 24, based on the key JEPs (JDK Enhancement Proposals) in this release.

## Contents

## 1. JEP 472: Prepare to Restrict the Use of JNI*

![JNI](/assets/image-128.png)

JEP 472, titled "Prepare to Restrict the Use of JNI," is part of Java's ongoing effort to enhance security and integrity by limiting unsafe operations, especially those involving the Java Native Interface (JNI). This proposal introduces warnings for any use of JNI in preparation for future releases where JNI access will be restricted by default.

The main idea is to allow developers to adapt to upcoming changes by issuing warnings for restricted JNI operations. In future releases, these operations will require explicit permission through the `--enable-native-access` flag, which will need to be set at runtime to grant a module the ability to perform native operations like loading native libraries or binding `native` methods.

The proposal also aligns JNI's behavior with that of the Foreign Function & Memory (FFM) API introduced in previous JDK versions. As a result, when a restricted operation is performed without the necessary permissions, developers can choose how the JVM handles it using the new `--illegal-native-access` option, which controls whether to allow, warn, or `deny` such operations. The ultimate goal is to make `deny` the default mode in the future.

This initiative emphasizes security by encouraging more careful management of native code interactions while giving developers time to adjust before JNI access is fully restricted in subsequent releases.

*JNI: *Java Native Interface or JNI is a standard Java mechanism that allows Java code to interact with C and C++ code*

[Read more](https://openjdk.org/jeps/472)

## 2. JEP 475: Late Barrier Expansion for G1

In the fast-evolving world of cloud-based Java deployments, reducing JVM overhead is crucial for better performance. One area that has seen significant overhead is in JIT compilation, specifically with the C2 compiler and G1 garbage collector. Current early barrier expansion in C2 increases processing time by 10-20%, depending on the application.

To address this, they propose **late barrier expansion**, a method that delays the insertion of G1 barriers until the final stage of C2’s compilation process. This approach significantly reduces overhead while simplifying the work for garbage collector (GC) developers. It builds on the success of ZGC, another Java GC that has used this method since JDK 14.

**Early Barrier Expansion**
![Early](/assets/image-126-1024x281.webp)

**Late Barrier Expansion**
![Early](/assets/image-127-1024x281.webp)

By moving barrier expansion to the end of the pipeline, we can minimize the impact on C2’s compilation process, eliminate unnecessary barriers, and optimize memory access handling. Preliminary experiments show promising results, with nearly the same quality code generated as the current C2 process, but with lower overhead.

The shift to late barrier expansion will allow Java applications to run faster in cloud environments without sacrificing code quality or requiring deep C2 knowledge for GC developers. Extensive testing and benchmarking will ensure stability and performance improvements across platforms.

[Read more](https://openjdk.org/jeps/475)

## 3. JEP 484: Class-File API

The **Class-File API**, introduced under JEP 484, is an enhancement to the Java programming language, aimed at providing a robust API to read and write Java class files. It allows tools and libraries to manipulate class files programmatically, without having to parse bytecode manually. This API is especially useful for tasks like bytecode analysis, instrumentation, and dynamic code generation.

What is the Class-File API Used For?
The Class-File API is designed to simplify working with Java class files, which are the binary representation of compiled Java programs. Typical use cases include:

- Bytecode manipulation: Tools that modify bytecode to add new behavior or features (e.g., logging, profiling).
- Class analysis: Libraries that need to analyze class files to extract metadata, structure, or relationships.
- Dynamic code generation: Programs that generate classes at runtime, such as proxies or specialized libraries.

With this API, developers can parse, inspect, and even modify class files more easily and reliably than before.

The Class-File API is designed with the following key principles in mind:

- **Modularity**: The API separates concerns, ensuring that each aspect of the class file (e.g., methods, fields, constants) is independently manageable.
- **Extensibility**: It supports future versions of the Java Virtual Machine (JVM) by offering flexibility to handle future class file formats and structures.
- **Usability**: By abstracting the complexity of class file formats, the API makes it easier for developers to work with these binary files.
- **Efficiency**: The API ensures performance is optimized for both read and write operations, making it suitable for tool

Example

```java
import jdk.classfile.ClassFile;
import jdk.classfile.constantpool.ConstantPool;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class ClassFileReaderExample {
    public static void main(String[] args) throws IOException {
        // Load a class file from the file system
        File classFile = new File("path/to/MyClass.class");
        byte[] classBytes = Files.readAllBytes(classFile.toPath());

        // Parse the class file
        ClassFile classFileParsed = ClassFile.read(classBytes);

        // Retrieve and print the constant pool
        ConstantPool constantPool = classFileParsed.constantPool();
        System.out.println("Constant Pool: " + constantPool.size() + " entries");
    }
}

```

In this example, the `ClassFile.read()` method reads the byte array of a `.class` file and parses it into a structured `ClassFile` object. From here, you can explore the contents of the class, such as the constant pool, fields, and methods.

[Read more](https://openjdk.org/jeps/484)

## 4. JEP 485: Stream Gatherers

[Read more](https://openjdk.org/jeps/485)

## 5. JEP 489: Vector API (Ninth Incubator)

[Read more](https://openjdk.org/jeps/489)
