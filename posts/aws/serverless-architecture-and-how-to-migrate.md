---
title: Serverless Architecture and How to Migrate?
date: '2024-10-14'
authors:
    - Hal Nguyen
---

## Contents

## What is Serverless Architecture

- **Serverless architecture** is a cloud-based approach where developers can build and run applications without managing the underlying infrastructure. Unlike traditional architectures, which require provisioning and maintaining servers or virtual machines, serverless allows developers to focus solely on code, as the cloud provider automatically handles scaling, provisioning, and maintenance.
- This model is highly cost-effective, as users only pay for the compute resources consumed during execution, rather than for idle server time.
- For example, with serverless services like AWS Lambda, a developer can build a microservice that processes uploaded images, only incurring charges when an image is uploaded and processed. In contrast, a traditional architecture would require a dedicated server running continuously to handle these tasks, even when not in use. Serverless offers enhanced scalability, reduced operational overhead, and faster time-to-market, making it ideal for event-driven and microservices-based applications.

## Benefits of Serverless Architecture

1. **No Server Management**: Serverless allows developers to focus on writing code without worrying about provisioning, configuring, or managing servers, as the cloud provider handles infrastructure.

2. **Cost Efficiency**: With serverless, you only pay for the compute time you use, rather than for continuously running servers. This "pay-as-you-go" model reduces costs, especially for applications with variable workloads.

3. **Automatic Scaling**: Serverless architectures automatically scale up or down based on demand. Whether you have a single request or thousands, serverless platforms dynamically allocate resources to handle traffic, ensuring consistent performance.

4. **Reduced Operational Complexity**: By offloading infrastructure management, serverless minimizes operational tasks, allowing teams to focus on development and accelerate time-to-market.

5. **Event-driven Execution**: Serverless architectures are ideal for event-driven applications, as they can respond automatically to events like file uploads, database changes, or HTTP requests, making it easy to build responsive, event-based applications.

6. **Improved Resilience**: Serverless applications are distributed across multiple data centers, which increases reliability and ensures that your application remains available, even if one server or region experiences issues.

7. **Faster Development and Deployment**: Serverless services often integrate seamlessly with DevOps practices, allowing developers to quickly deploy and update individual functions without impacting the entire application.

8. **Granular Cost Management**: Serverless architecture enables detailed tracking of resource usage per function, which makes it easier to allocate costs to specific features or customers and helps align costs with business growth.

9. **Enhanced Security**: Serverless providers manage underlying infrastructure security, including patches and updates, reducing the risk of vulnerabilities and allowing teams to focus on application-level security.

10. **Environmental Efficiency**: Since serverless architectures allocate resources only as needed, they tend to consume less energy compared to always-on servers, making them a more sustainable choice for many applications.

## Considering before move to Serverless Architecture

- Migrating to serverless architectures often involves moving existing applications or integrating new serverless components with legacy systems. The “strangler” pattern is a common approach for refactoring complex applications, where monolithic systems are gradually decomposed into event-driven microservices.
- When planning a migration, it’s crucial to understand the business purpose and organizational structure of the application’s components to facilitate domain-driven design. Defining each microservice's role and ensuring it has a dedicated data store allows for independent scalability and optimized performance.
- Following patterns like CQRS helps decouple transactional and query operations, enabling efficient scaling based on data access needs. Serverless tools like AWS Lambda, CloudWatch Events, and Amazon SQS can replace traditional cron jobs and worker queues, reducing code dependencies. For seamless integration, services like API Gateway and Application Load Balancer offer flexible traffic management and security features, allowing you to enhance functionality with minimal disruption to existing systems.
- Finally, evaluating costs from infrastructure to operational effort can highlight serverless benefits, such as agility and granular cost management, which align with business growth.

- Here is the list of migration questions we need to answer before migration take place:
  - What does this application do and how are its components organized?
  - How can you break your data needs up based on the command query responsibility segregation (CQRS) pattern?
  - How does the application scale and what components drive the capacity you need?
  - Do you have schedule-based tasks?
  - Do you have workers listening to a queue?
  - Where can you refactor or enhance functionality without impacting the current implementation?

## Migration Pattern

### Leapfrog Pattern

- The leapfrog pattern involves jumping directly from an on-premises legacy architecture to a serverless cloud solution, bypassing incremental steps. This approach allows you to modernize swiftly by transitioning your entire infrastructure to a serverless model.

### Organic Pattern

- The organic pattern follows a more gradual “**lift-and-shift**” approach, where on-premises applications are moved to the cloud with minimal changes. Applications may run on Amazon EC2 instances or be slightly modified to use container services like Amazon EKS, Amazon ECS, or AWS Fargate.
- Initially, developers may explore AWS Lambda in low-risk areas, such as handling log processing or running scheduled tasks. As serverless capabilities prove effective, they can be applied to other tasks, including data transformations and parallel processing.
- Over time, a strategic focus emerges as teams see how serverless and microservices align with business goals like improved agility, enhanced developer productivity, and lower costs.
- With support for modernization, a pilot production workload can be selected. Early successes encourage faster adoption, leading to a broader shift to microservices and serverless architectures across applications.

### Strangler Pattern

- The strangler pattern involves gradually breaking down a monolithic application by developing APIs and event-driven components that replace the existing functionality.
- New API endpoints can direct traffic to either legacy or new components, enabling low-risk deployment strategies like canary releases, which allow you to revert to the legacy version if needed.
- New features can be designed serverless-first, allowing old components to be phased out as they’re replaced. This approach provides a controlled transition to serverless, allowing for targeted improvements with minimal risk and less disruption compared to the leapfrog pattern.

## Conclusion

Serverless architecture is a powerful alternative to traditional infrastructures, providing a scalable, cost-effective, and flexible approach to building modern applications. By choosing the right migration pattern—whether it’s leapfrogging, a gradual lift-and-shift, or a controlled strangler approach—organizations can unlock the full potential of serverless, optimizing application performance while minimizing operational overhead. Although serverless may not be the perfect fit for every application, its benefits in scalability, agility, and cost management make it a valuable option for many businesses looking to modernize their IT infrastructure.
