---
title: AWS Fundamentals - Getting Started (Part 2)
slug: aws-fundamentals-getting-started-part-2
date: '2025-03-04'
authors: 
    - Hal Ng
relates:
    - aws-fundamentals-getting-started-part-1
---

*In my previous post, <https://hi-there.me/blogs/aws/aws-fundamentals-getting-started-part-1>, I introduced readers to AWS serverless computing and key services for hosting applications, such as Lambda and EC2, along with their fundamental aspects. In today's post, I will focus on one of the most critical components of AWS: Networking.*

## Contents

## Introduction

- *Networking* is how computers communicate with each other around the world. It is the foundation of the internet and cloud computing. In AWS, networking is a critical component that enables communication between services and resources. Understanding networking is essential for building scalable and secure applications in the cloud.

- Imagine we want to send a letter to a friend. When we send a letter we provide the following information:
  - The recipient's address
  - The return address
  - The contents of the letter

    Each address must contain the following information:

    - The recipient's name or sender's name
    - The street address
    - The city
    - The state
    - The postal code/zip code
    - The country

We need all parts of the address to ensure the letter reaches the intended recipient. Similarly, in networking, we need to provide the necessary information to ensure data reaches its destination. This information is known as an **IP address** and the way computers handle the delivery of data is known as **routing**.

### IP Address

- An IP Address, similar to a postal address, serves as a unique identifier for a device within a network, enabling communication between devices. However, instead of a street name and number, an IP address is represented as a sequence of numbers separated by periods.

- IP addresses are composed of binary digits (0s and 1s). An IPv4 address consists of 32 bits, while an IPv6 address consists of 128 bits. This increased length allows IPv6 to accommodate a significantly larger number of devices compared to IPv4.
- For example:
  - IPv4: `192.182.1.1`
  - IPv6: `2001:0db8:85a3:0000:0000:8a2e:0370:7334`

Here’s a comparison table of IPv4 and IPv6:  

| Feature          | IPv4                                | IPv6                                  |
|-----------------|------------------------------------|---------------------------------------|
| **Address Length** | 32-bit                           | 128-bit                               |
| **Address Format** | Decimal, separated by dots (e.g., `192.168.1.1`) | Hexadecimal, separated by colons (e.g., `2001:0db8:85a3::8a2e:0370:7334`) |
| **Number of Addresses** | ~4.3 billion (2³²)         | ~340 undecillion (2¹²⁸)               |
| **Address Exhaustion** | Nearly exhausted            | Practically unlimited                 |
| **Subnetting**   | Uses subnet masks (e.g., `255.255.255.0`) | Uses prefix length (e.g., `/64`)      |
| **Header Complexity** | Complex, includes options    | Simplified, more efficient            |
| **Security**     | Security optional (IPSec not required) | Built-in IPSec for end-to-end security |
| **Broadcast Support** | Supports broadcast           | No broadcast, uses multicast instead  |
| **Configuration** | Can be manual or DHCP-based     | Supports auto-configuration (SLAAC)  |
| **Compatibility** | Works with legacy networks      | Requires transition mechanisms (dual stack, tunneling) |
| **Routing Efficiency** | Less efficient due to larger routing tables | More efficient with hierarchical addressing |

### CIDR Notation

- CIDR (Classless Inter-Domain Routing) is a method for allocating IP addresses and routing that replaces the old classful addressing system (Class A, B, C). It allows more efficient use of IP addresses by enabling variable-length subnet masking (VLSM), reducing wastage, and improving routing efficiency.

- For example, the CIDR notation `192.168.1.0/24`. It begins with a starting IP address and it seperated by  `/` followed by the number. The number at the end specifies how many of the bits of the IP address are fixed. In this case, the first 24 bits are fixed, and the remaining 8 bits are variable the fixed part is 192.168.1 and the variable part is 0. 32 total bits subtracted by 24 fixed bits leaves 8 flexible bits. Each of these flexible bits can be either 0 or 1, because they are binary. That means that you have two choices for each of the 8 bits, providing 256 IP addresses in that IP range.

- The higher the number after the /, the smaller the number of IP addresses in your network. For example, a range of 192.168.1.0/24 is smaller than 192.168.1.0/16.

- When working with networks in the AWS Cloud, you choose your network size by using CIDR notation. In AWS, the smallest IP range you can have is /28, which provides 16 IP addresses. The largest IP range you can have is a /16, which provides 65,536 IP addresses.

## Virtual Private Cloud (VPC)

![VPC](/assets/aws-part-2-1.png)

- A Virtual Private Cloud (VPC) is an isolated network that you create in the AWS Cloud, similar to a traditional network in a data center. It enables you to launch AWS resources, such as EC2 instances, Lambda functions, and RDS databases, in a virtual network that you control. When you create VPC on AWS, you must define three main factors:

  - Name of the VPC
  - Region
  - IP address range (CIDR block)
Using this information, will provision a network and IP addresses for your network.

### Subnets

![Subnets](/assets/aws-part-2-2.png)

- A subnet is a smaller network inside a base network or virtual local are networks (VLANs) in a traditional, on-premises network.

- In AWS, **subnets** are used to provide high availability and connectivity options for your resources. Use a public subnets for resources that must be connected to the internet and a private subnet for resources that won't be connected to the internet.

- When you create a subnet, you must specify the following information:
  - VPC
  - Availability Zone
  - IPv4 CIDR block for your subnet

When you launch resources like EC2 instance, you launch it inside a subnet, which will located inside the **Availability Zone** you specify.

> When you create your subnets, keep high availability in mind. To maintain redundancy and fault tolerance, create at least two subnets configured in two Availability Zones.

### Reserved IPs

- AWS automatically reserves five IP addresses in each subnet to manage network functions such as routing, Domain Name System (DNS), and other services. These reserved IPs cannot be used for other resources.  

- For example, if you create a VPC with an IP range of `10.0.0.0/22`, it includes a total of **1,024 IP addresses**. If you divide this into four subnets of `/24`, each subnet will contain **256 IP addresses**, but only **251 can be used** because AWS reserves five addresses in each subnet.  

- These reserved IPs can affect your network design. A common best practice for beginners is to create a VPC with a **/16 IP range** and define subnets with **/24 IP ranges**. This approach provides a large number of available IPs at both the VPC and subnet levels, ensuring flexibility for future scaling.

![Reserved IPs](/assets/aws-part-2-3.png)

## VPC Routing

- When you create a VPC, AWS creates a route table called the *main route table*. A route table contains a set of rules, called routes, that are used to determine where network traffic is directed. AWS assumes that when you create a new VPC with subnets, you want traffic to flow between them. Therefore, the default configuration of the main route table is to allow traffic between all subnets in the local network.

- The following rules apply to the main route table:

  - Cannot delete the main route table.
  - Cannot set a gateway route table as the main route table.
  - Can replace the main route table with a custom subnet route table.
  - Can add, remove, and modify routes in the main route table.
  - Can explicitly associate a subnet with the main route table, even if it's already - implicitly associated.

![VPC Routing](/assets/aws-part-2-4.png)

## VPC Security

To secure your AWS network, you have two primary options: Network ACLs and Security Groups.

- Network ACLs serve as a first line of defense at the subnet level within your Virtual Private Cloud (VPC). They allow you to set rules that govern the flow of traffic entering and exiting each subnet. By default, these ACLs are configured to allow all traffic, meaning every packet can flow in and out until you decide to enforce stricter rules.

- Security groups operate at the instance level, providing a layer of security directly around your EC2 instances. When you launch an instance, it must be associated with at least one security group, which acts as a virtual firewall. By default, these groups are configured to **block all inbound traffic** while allowing **all outbound traffic**. This default state ensures that your instance is protected from unsolicited incoming connections unless you explicitly open the necessary ports.

- Here are some key differences between Network ACLs and Security Groups:

| Feature                   | Network ACLs                         | Security Groups                         |
|---------------------------|--------------------------------------|-----------------------------------------|
| **Level**                 | Subnet-level                         | Instance-level                          |
| **Stateful vs. Stateless**| Stateless (manual inbound & outbound rules) | Stateful (automatic response handling) |
| **Default Inbound Traffic**| Allowed                              | Blocked                                 |
| **Default Outbound Traffic**| Allowed                             | Allowed                                 |
| **Rule Application**      | Applies to all traffic at the subnet | Applies to individual EC2 instances     |

## Recap

In this post, we explored the fundamental networking components within AWS, including:

- Understanding the role of IPv4 and IPv6 addresses, their formats, and differences.
- How CIDR enables efficient IP address allocation and flexible subnetting in the AWS Cloud.
- The foundation for creating an isolated, scalable network environment in AWS.
- The role of subnets in organizing and managing network resources, and the impact of AWS-reserved IP addresses on network design.
- How AWS uses route tables to facilitate traffic flow between subnets within a VPC.
- An overview of Network ACLs and Security Groups, and their respective roles in protecting your AWS resources.

## What's Next?

In the next post, we will shift our focus to **Storage and Database Services on AWS**. We'll explore the key storage solutions, such as Amazon S3 and EBS, and dive into the various database options available, including Amazon RDS and DynamoDB. Stay tuned for an in-depth discussion on how to choose the right storage and database services to power your applications in the AWS Cloud.
