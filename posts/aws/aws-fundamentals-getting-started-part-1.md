---
title: AWS Fundamentals - Getting Started (Part 1)
slug: aws-fundamentals-getting-started-part-1
date: '2025-03-02'
authors: 
    - Hal Ng
relates:
    - introduction-to-aws
---

*Hi everyone, In this course, we will go though the key concepts behind cloud computing and explore AWS services covering compute, storage, databases, and networking. Let's get started!*

## AWS Compute

- On-premises computing requires significant time, money, and effort to set up and maintain, from researching and purchasing hardware to installing and securing servers in a data center. Scaling is difficult, and unused resources lead to wasted investment.
- In contrast, AWS offers **compute as a service**, eliminating these challenges by providing pre-built, secure, and ready-to-use infrastructure, allowing businesses to deploy applications quickly and efficiently.

### Servers

![Client-Server](/assets/client-server.png)

To host applications, the first essential component is a **server**. Traditionally, on-premises servers are physical machines responsible for running applications and storing data. However, managing these servers can be **complex and expensive**.  

To simplify this, AWS provides **cloud-based compute services**, including **Amazon EC2 (Elastic Compute Cloud)**, **AWS Lambda**, and **AWS Fargate**, offering scalable and cost-effective alternatives.  

#### How to Select the Right Compute Service?

If you're setting up servers on AWS, choosing the right compute option is crucial. AWS offers three primary compute categories:  

1. **Virtual Machines (VMs)** – Flexible, customizable environments.  
2. **Container Services** – Lightweight, portable application environments.  
3. **Serverless** – Fully managed execution without infrastructure management.  

#### Understanding Amazon EC2

- **Amazon EC2** is the most widely used AWS compute service for running **virtual machines**. It offers various instance types, enabling users to select the ideal combination of **CPU, memory, storage, and networking** for their applications. AWS handles the underlying host machines, hypervisor layer, and **guest operating system**, simplifying management.  

- Since many AWS compute services rely on EC2 or virtualization concepts, understanding **Amazon EC2** is fundamental before exploring **containers** or **serverless computing**.

*With EC2, we can:*

- Provision and launch one or more instances in minutes
- Stop or shut down instances when we finish running a workload
- Pay by the hour or second for each instance type

##### AMI

Each EC2 instance runs an operating system (Linux, Windows, macOS, etc.), determined by an Amazon Machine Image (AMI). AMIs define instance configurations, including OS, pre-installed applications, and settings. You can:

- Use AWS-provided AMIs (e.g., Amazon Linux 2).
- Select from community or marketplace AMIs.
- Create custom AMIs tailored to your needs.

##### Instance Types

AWS offers a wide range of instance types optimized for different workloads:

- Compute-optimized – Ideal for high-performance tasks.
- Memory-optimized – Best for large-scale databases and caching.
- Storage-optimized – Suitable for high-throughput storage needs.
- General-purpose (e.g., M5 family) – Balanced for web servers and applications.

Instance types are labeled with a family name (T3, A1, G, M5, etc.), followed by size options (nano to extra-large). You can resize instances via the AWS console or API, ensuring optimal performance without over-provisioning.

##### Lifecycle

An instance transitions between different states from the moment you create it until its termination

1. When instance is created, it enters the **pending** state. At this time, billing has not started.
2. When the instance is **running**, it's ready to use. This is also the stage where billing begins. From now on, we can take other actions on the instance like reboot, terminate, stop, and stop-hibernate.
3. When we reboot an instance, it’s different than performing a stop action and then a start action. **Rebooting** an instance is equivalent to rebooting an operating system. After reboot, public DNS, public IPv4 and IPv6 remains on the same host computer.
4. When we stop an instance, it enters the **stopping** and then **stopped** state. This similar to when we shut down our laptop.
5. When we **terminate** an instance, the instance stores are erased, and we lose both the public IP address and private IP address of the machine.

> Bonus Difference between stop and stop-hibernate: *Stopping* an EC2 instance moves it to a **stopped state**, halting usage charges but still incurring **EBS storage costs**. While stopped, you can modify attributes like **instance type**, but **RAM data is lost**.  With **hibernate**, the OS saves **RAM contents to the EBS root volume**, allowing the instance to resume with previous data intact. Hibernation must be **enabled** and meet **prerequisites** to be used.

#### Understanding Container Service

- AWS offers a broad spectrum of compute offerings that give you the flexibility to choose the right tool for the job. As mentioned earlier, the three main categories of compute are virtual machines (VMs), containers, and serverless. No one-size-fits-all compute service exists because it depends on your needs.
- In this section we will learn about Container. Containers can host a variety of different workloads, including web applications, lift and shift migrations, distributed applications, and streamlining of development, test, and production environments.
- A container is a standardized unit that packages your code and its dependencies. This package is designed to run reliably on any platform, because the container creates its own independent environment. With containers, workloads can be carried from one place to another, such as from development to production or from on-premises environments to the cloud.
- An example of a containerization platform is Docker. Docker is a popular container runtime that simplifies the management of the entire operating system stack required for container isolation, including networking and storage. Docker helps customers create, package, deploy, and run containers.

#### Understand Serverless

*With serverless compute, we can spend time on the things that differentiate our application, rather than spending time on ensuring availability, scaling, and managing servers. Every definition of serverless mentions the following four aspects:*

- There are no servers to provision or manage.
- It scales with usage.
- We never pay for idle resources.
- Availability and fault tolerance are built in.

AWS has developed serverless services for all three layers of the application stack. We will cover two services, AWS Fargate and AWS Lambda, in this post.

##### AWS Fargate

- AWS Fargate is a purpose-built serverless compute engine for containers. AWS Fargate scales and manages the infrastructure, so developers can work on what they do best, application development. It achieves this by allocating the right amount of compute. This eliminates the need to choose and manage EC2 instances, cluster capacity, and scaling. Fargate supports both Amazon ECS and Amazon EKS architecture and provides workload isolation and improved security by design.
- Fargate does support Spot and Compute Savings Plan pricing options just like with Amazon EC2 instances. So there is some flexibility on how we plan to run containers on Fargate. So we can still get a good amount of control for our container's deployment, but without needing to worry about the provisioning, patching, and managing the underlying operating systems or instances.
- And no need to scale the infrastructure in and out to meet demand like you do with EC2. As far as use cases go, AWS Fargate can be used for all of the common container use cases, including microservice architecture applications, batch processing, machine learning applications, and migrating on-premises applications to the cloud.

##### AWS Lambda

- With Lambda, we can run code without provisioning or managing servers. we can run code for virtually any type of application or backend service. This includes data processing, real-time stream processing, machine learning, WebSockets, IoT backends, mobile backends, and web applications like our employee directory application!
- Lambda runs our code on a high availability compute infrastructure and requires no administration from the user. We upload our source code in one of the languages that Lambda supports, and Lambda takes care of everything required to run and scale your code with high availability. There are no servers to manage. We get continuous scaling with subsecond metering and consistent performance.

*How Lambda works?*
The Lambda function is the foundational principle of AWS Lambda. We have the option of configuring your Lambda functions using the Lambda console, Lambda API, AWS CloudFormation, or AWS Serverless Application Model (AWS SAM). We can invoke your function directly by using the Lambda API, or we can configure an AWS service or resource to invoke your function in response to an event. Below are some essentials concepts:

- **Function**: is a resource that we can invoke to tun our code in Lambda. Lambda tuns instances of our function to process events. We can:
  - Create the function from scratch
  - Use a blueprint that AWS provides
  - Select a container image to deploy for our function
  - Browser the AWS serverless application repository.
- **Trigger**: describe when a lambda function should run. A trigger integrates out lambda function with other AWS services and event source mappings.
- **Event**: is a JSON-formatted document that contains data for a lambda function to process.
- **Application Environment**: provides a secure and isolated runtime environment for your Lambda function.
- **Deployment Package**: We deploy our Lambda function code using a deployment package. Lambda supports two types of deployment packages:
  - A **.zip** file archive – This contains your function code and its dependencies. Lambda provides the operating system and runtime for your function.
  - A container image – This is compatible with the Open Container Initiative (OCI) specification. You add your function code and dependencies to the image. You must also include the operating system and a Lambda runtime.
- **Runtime**: provides a language-specific environment that runs in an application environment.
- **Lambda function handler**: The AWS Lambda function handler is the method in your function code that processes events. When your function is invoked, Lambda runs the handler method. When the handler exits or returns a response, it becomes available to handle another event.

#### How to choose the right service

AWS offers multiple compute services, each suited for different use cases. Let's explore how to choose the right one through real-world scenarios:  

1. **Automating Inventory Updates**  
   - A developer needs to process inventory files uploaded to Amazon S3 and update a database.  
   - **EC2?** Works, but running an instance continuously for a quarterly task is inefficient.  
   - **Best Choice: AWS Lambda** – Triggers on file uploads, runs only when needed, and reduces costs.  

2. **Migrating an On-Premises Application**  
   - A Linux-based application needs to move to AWS with minimal refactoring.  
   - **Lambda or Containers?** Require significant rework.  
   - **Best Choice: EC2** – Provides flexibility, supports scaling, and mirrors an on-prem setup.  

3. **Building a Scalable Microservices Application**  
   - A new application requires quick scaling and safe deployments.  
   - **EC2?** Slower scaling.  
   - **Best Choice: ECS/EKS (Containers)** – Faster boot times, portability, and efficient scaling.  

## **Recap: Choosing the Right AWS Compute Service**  

In this post, we explored AWS compute services and their use cases. Whether you need **on-demand execution (AWS Lambda), flexible virtual machines (EC2), or scalable container management (ECS/EKS)**, AWS provides solutions to meet diverse workload requirements.

The key takeaway? **Don’t default to one service for everything**—match your choice to your use case for better cost, performance, and scalability.  

## **What’s Next?**

Stay tuned for **Part 2**, where we’ll dive into **AWS Networking**—covering **VPCs, subnets, security groups, and how AWS handles connectivity** for your cloud infrastructure! 🚀
