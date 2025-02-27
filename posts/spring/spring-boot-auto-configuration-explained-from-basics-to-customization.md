---
title: Spring Boot Auto-Configuration Explained From Basics to Customization
slug: spring-boot-auto-configuration-explained-from-basics-to-customization
date: '2025-02-26'
authors: 
    - Hal Ng
prev: 
next: 
---

*Have you been working with Spring Boot for a long time? Have you ever wondered what sets it apart from traditional Spring? In this post, we’ll dive deep into how Spring Boot auto-configuration works, why it matters, and how you can customize it to better fit your application’s needs.*

## Contents

## 1. Introduction

- Spring Boot is an open-source project built on the Spring Framework.
- Spring Boot provides the ability to create standalone Spring application that can run immediately without the need for XML configuration or writing lots of additional code. 
- One of the key features that makes Spring Boot so powerful is **auto-configuration**—a mechanism that simplifies setup and eliminates boilerplate code.
- Spring Boot configures Spring and other third-party frameworks automatically by the default **convention over configuration*** principle.

<sup>* convention over configuration: in other word, coding by convention, is a concept used in application frameworks to reduce the number of decisions that a developer has to make.  It adheres to the "don't repeat yourself" principle to avoid writing redundant code.</sup>

- For example, if we add Spring Web as a dependency, Spring Boot will automatically configure an embedded web server (like Tomcat or Jetty for Reactive) and register key Spring MVC components without requiring any explicit configuration


## 2. How Auto-Configuration Works?

### 2.1 Conditionals

Before we dive into how auto-configuration works, let’s first understand the `@Conditional` annotation—one of the key building blocks behind Spring Boot’s auto-configuration mechanism.

1. **What is @Conditional?**

- The `@Conditional` annotation allows Spring to register beans only when certain conditions are met. It serves as the foundation for many Spring Boot auto-configuration extensions, enabling the framework to dynamically configure components based on the classpath, environment, or application properties.
- Spring Boot leverages `@Conditional` internally to determine whether to enable or disable specific configurations. It is commonly used alongside annotations like `@Component`, `@Configuration`, `@Bean`, and custom stereotype annotations.


2. **How @Conditional Works in Spring Boot**

- When Spring encounters @Conditional, it checks whether the specified condition matches before instantiating the bean. If the condition evaluates to false, the bean is not registered in the Spring container.

- Let’s say we only want to register a Mock DataSource when the application runs in a development profile.

    ```java
    @Configuration
    public class DataSourceConfig {

        @Bean
        @Conditional(DevEnvironmentCondition.class)
        public DataSource mockDataSource() {
            System.out.println("Mock DataSource created for development environment");
            return new HikariDataSource();  // Simulating a DataSource
        }
    }
    ```

    Here, the `mockDataSource()` bean will only be registered if the condition in `DevEnvironmentCondition` evaluates to true.

- To control when the bean should be registered, we implement the Condition interface:
    
    ```java
    public class DevEnvironmentCondition implements Condition {
        @Override
        public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
            String env = context.getEnvironment().getProperty("spring.profiles.active");
            return "dev".equals(env); // Bean is only registered if profile is 'dev'
            }
    }
    ```

    If `spring.profiles.active=dev` is set in application.properties, the mock `DataSource` bean will be registered.

### 2.2 How Does Spring Boot Determine What to Auto-Configure?

Auto-configuration is triggered based on **conditional annotations**, such as:
- `@ConditionalOnClass`: Applies configuration if a specific class is present.
- `@ConditionalOnMissingBean`: Ensures auto-configuration only runs if no user-defined bean exists.
- `@ConditionalOnProperty`: Enables/disables configurations based on properties.

For example: Spring Boot defines a *DataSourceAutoConfiguration* class like this:

```java
@Configuration
@EnableAutoConfiguration
@ConditionalOnClass(DataSource.class)
@ConditionalOnMissingBean(DataSource.class)
public class DataSourceAutoConfiguration {
    
    @Bean
    @ConfigurationProperties("spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
}
```
- If DataSource is on the *classpath*, this configuration is applied.
- If the user defines their own *DataSource* bean, auto-configuration is skipped.


### 2.3 Annotation @EnableAutoConfiguration

- The annotation `@EnableAutoConfiguration` is used to enable the auto-configuration feature.
- The `@EnableAutoConfiguration` annotation enables the auto-configuration of Spring `ApplicationContext` by scanning the classpath components and registering the beans.
- This annotation is wrapped inside the `@SpringBootApplication` annotation along with `@ComponentScan` and `@SpringBootConfiguration` annotations.
- When running `main()` method, this annotation initiates auto-configuration.
- Example: Simple Spring Boot Application

```java
@SpringBootApplication
public class DemoApplication {
    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}
```

**Now Let's see how it works**

Let’s say we add the Spring Boot JDBC Starter dependency in **pom.xml**:
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>

```

With this configuration, Spring Boot will:
- Step 1: Detect that H2 is present and configure an embedded database.
- Step 2: Enable Spring Data JPA without requiring explicit DataSource bean definitions.
- Step 3: Automatically set up Hibernate as the default JPA provider.

We can now create a repository interface without manually setting up a `DataSource` or `EntityManager`:
```java
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByLastName(String lastName);
}
```
Spring Boot auto-configures everything needed for this repository to work!

## 3. Recap

- The `@Conditional` annotation is a fundamental part of Spring Boot’s auto-configuration system. By using it effectively, we can dynamically control bean registration, optimize resource usage, and enable or disable features based on runtime conditions.
- Spring Boot’s auto-configuration removes the need for boilerplate setup, allowing developers to focus on writing business logic instead of infrastructure code.