---
title: Edge and Hybrid Storage Solutions
slug: edge-and-hybrid-storage-solutions
date: '2025-04-22'
authors: 
    - Hal Ng
relates:
---

When we begining to run our workloads on AWS, we should first consider the storage options. With AWS, we can use the same infrastructures, services, APIs, and tools wherever we need them. From the cloud, to on premises, and at the edge. In this blog we will learn about the benefits, use cases, and main feature of AWS services that provide edge and hybrid solutions.

## Contents

## 1. AWS Snow Family - Edge Storage Solution

AWS offer Snow Family service to help us run operations in harsh, non-data center environments and in locations with inconsistent network connectivity. They include *AWS Snowcone*, *AWS Snowball* and *AWS Snowmobile*. 

Each devide is designed to meet the uquique compute and capacity challenges requires by different use cases. The devices also integrate with AWS sevutity, monitoring, storage management, and compute capabilities.

The AWS Snow Family offers three classifications of data transfer and edge computing solutions to solve different levels of challenges:
- *AWS Snowcone*: a small, rugged, portable, secure edge computing, storage, and data transfer device.
- *AWS Snowball*: a rugged petabyte-scale data transport device with onboard storage and compute capabilities. *AWS Snowball* has different models of *AWS Snowball* Edge devices to choose from.
- *AWS Snowmobile*: a large truck to migrate or tranport exabyte-scale datasets into and out of the AWS Cloud.

## 2.  AWS Outposts - Hybrid Storage Solutions

*AWS Outposts* brings the AWS Cloud services into your data center. AWS compute, storage, database, and other services run locally on Outposts. You can access the full range of AWS services available in the Region to build, manage, and scale on-premises applications using famililar AWS services and tools.

Outposts is available as a 42U rack that can scale from 1 rack to 96 racks to create pools of compute and storage capacity.

*AWS Outposts* currently supports Amazon Elastic Block Store for block storage. You can also include Amazon Simple Storage Service as part of your *AWS Outposts* implementation.

![Hybrid Solutions](/assets/aws_outposts.png)

### 2.1 AWS Outposts overview

*AWS Outposts* is a fully managed service that extends AWS infrastructure, services, APIs and tools to your premises. You can use AWS Outposts to build and run applications on premises using the same programming interfaces in AWS Regions. 

An Outposts is a pool of AWS compute and storage capacity deployed at a site. AWS operates, monitors, and manages this capacity as part of an AWS Region. You can create subnets on your Outposts and specify them when you create AWS resources, such as the following:
- *EC2*: Amazon Elastic Compute Cloud instances
- *EBS*: Amazon Elastic Block Store volumes
- *ECS*: Amazon Elastic Container Service Clusters
- *RDS*: Amazon Relational Database Service instances

### 2.2 AWS Outposts features

You can choose from a range of pre-validated Outposts configurations. These configuration offer a mix of EC2, EBS, S3 capacity designed to meet a variety of application and data residency needs. 

- *Compute capablities*: AWS Outposts catalog includes options supporting the latest generation Intel powered EC2 instance types with or without local instance storage.
- *Amazon EBS:* with offering local instance storage and EBS gp2 volumes for persistent block storage. Just as in the AWS Region, you can use EBS gp2 volumes for boot or data volumes. Amazon EBS provides snapshot and restore capabilities. You can increase volumns size without any performance impact. All EBS volumes and snapshots on Outposts are fully encrypted by default.
- *Amazon S3:*  S3 on Outposts delivers object storage to your on-premises AWS Outposts environment. Using the S3 API and features available in AWS Regions, S3 on Outposts makes it easy to store and retrieve data on your OutPost.
- *Amazon EBS snapshots* are a point-in-time copy of your EBS volumes. By default, snapshots of EBS volumes on your Outpost are stored on Amazon S3 in the same AWS Region. You can also use Amazon EBS local snapshots on Outposts to store snapshots of EBS volumes locally on your Outpost using Amazon S3 on Outposts. Local snapshots on Outposts require that you provision your Outpost with S3. 
- *CloudEndure migration:* AWS offers CloudEndure Migration to migrate workloads onto AWS Outposts from physical, virtual, or cloud-based sources. It simplifies and expedites migrating workloads from on-premises locations, AWS regions, and other clouds to Outposts.
- *CloudEndure Disaster Recovery* offers scalable, cost-effective business continuity for physical, virtual, and cloud-based workloads onto AWS Outposts. 
- *Networking*:
    - **VPC extension** – You can extend your existing Amazon Virtual Private Cloud (Amazon VPC) to your Outpost in your on-premises location. After installation, you can create a subnet in your Regional VPC. You can associate it with an Outpost in the same way you associate subnets with an Availability Zone in an AWS Region. Instances in Outpost subnets communicate with other instances in the AWS Region using private IP addresses, all within the same VPC.
    - **Local gateway** – Each Outpost provides a new local gateway that you can use to connect your Outpost resources with your on-premises networks. A local gateway enables low latency connectivity between the Outpost and any local data sources, users, local machinery, and equipment, or local databases.
    - **Load balancer** – You can provision an Application Load Balancer (ALB) to automatically distribute incoming HTTP and HTTPS traffic across multiple targets on your Outposts. Targets include as Amazon EC2 instances, containers, and IP addresses. ALB on Outposts is fully managed, operates in a single subnet, and scales automatically up to the capacity available on the Outposts rack. The scalability allows it to meet varying levels of application load without manual intervention.
    - **Private Connectivity** – With AWS Outposts Private Connectivity, you can establish a service link VPN connection from your Outposts to the AWS Region over AWS Direct Connect. Private Connectivity minimizes public internet exposure and removes the need for special firewall configurations.

### 2.3 Use Cases

AWS Outposts addresses a wide varity of uses cases that require low-latency or localized data processing and storage:

- *Low-latency compute:* Interactive applications, like real-time, multi-player games require low latency to deliver a high-quality gaming experience wherever players may be located in the world. Business applications, such as manufacturing execution systems (MES), high-frequency trading, and medical diagnostics, also require single-digit millisecond latencies to operate effectively. When the nearest public cloud servers are not close enough to meet application latency requirements, Outposts help you run applications where you need them to be located.
- *Local data processing:* You might not be able migrate some local datasets to the cloud for processing because of cost, size, bandwidth, or timing constraints. With Outposts, you can process data locally, while keeping your data lakes and machine learning training in a Region. With Outposts, you can set up a consistent hybrid cloud architecture to process data on premises and easily move data to the cloud for long-term archival.
- *Data residency:* Sometimes, data must remain in a particular country, state, or municipality for regulatory, contractual, or information security reasons. This requirement is often the case with financial services, healthcare, oil and gas, and other highly regulated industries. With Outposts, you can control where your workloads run and where your data resides, while using local operational tooling for things like monitoring and stability. It also allows low-friction movement of workloads between public cloud and the edge, and vice versa so that you can easily adapt to any regulatory changes.
- *Migration and modernization:* When trying to migrate to the cloud and modernize your software environment, some workloads can be challenging. Often on-premises applications are difficult to move from on-premises to the cloud because of latency-sensitive system interdependencies between the various components of the application. As dependencies arise, segmenting these migrations into smaller pieces requires latency-sensitive connectivity between various parts of the application. You can modernize latency-sensitive applications on premises and then migrate them to the cloud when ready.

## 3. AWS Storage Gateway - Hybrid Storage Solutions

*AWS Storage Gateway* is a hybrid solutin that connects an on-premises software appliance with cloud-based storage. Storage Gateway provides seemless integration with data security features between your on-premises IT env and the AWS storage infrastructure

![AWS Storage Gateway](/assets/aws_s3_gateway.png)

### 3.1 AWS Storage Gateway overview

*AWS Storage Gateway* is a storage service that gives you on-premises access to virtually unlimited cloud storage. The *AWS Storage Gateway* Family is used to simplify storage management and reduce costs for key hybrid cloud storage use cases. Use cases include moving backups to the cloud, using on-premises file shares backed by cloud storage, and providing low-latency access to data in AWS for on-premises applications.

The *AWS Storage Gateway* service provides four different types of gateways that connect on-premises applications to cloud storage and cache data locally for low-latency access. Storage Gateway offers the following types of storage gateways:

- Amazon S3 File Gateway
- Amazon FSx File Gateway
- Tape Gateway
- Volume Gateway

Storage Gateway is fast and easy to deploy. You can integrate with your existing environments and access AWS storage in a frictionless manner. The service also provides a consistent management experience using the AWS Management Console, both for on-premises gateways and for monitoring, management, and security of your other AWS services. Storage Gateway helps you reduce cost, maintenance, and scaling challenges associated with managing on-premises storage environments.

### 3.2 AWS Storage Gateway features

- *Standard storage protocols*

Storage Gateway connects to your local production or backup applications with NFS, SMB, iSCSI, or iSCSI-VTL so that you can adopt AWS Storage without needing to modify your applications. 
Using the protocol conversion and device emulation, you can do the following:
1. Access block data on volumes managed by Storage Gateway on top of Amazon S3
2. Store files as native Amazon S3 objects in fully managed cloud file shares with Amazon FSx for Windows File Server
3. Keep virtual tape backups online in a virtual tape library backed by S3 or move the backups to a tape archive tier on Amazon S3 Glacier and Amazon S3 Glacier Deep Archive

- *Fully managed cache:* The local gateway appliance maintains a cache of recently written or read data so that your applications can have low-latency access to data that is stored durably in AWS. The gateways use a read-through and write-back cache. The cache commits data locally, acknowledges the write operations, and then asynchronously copies data to AWS, all while reducing application latency.

- *Optimized and secure data transfer*

Storage Gateway provides secure upload of changed data and secure downloads of requested data. It encrypts data in transit between any type of gateway appliance and AWS using Secure Sockets Layer (SSL). Storage Gateway delivers complete protection of data from the Storage Gateway in your organization's network to the data residing in AWS. 

The service supports security features and access controls. It supplies compliances and certifications that address enterprise customers’ real and perceived security concerns when using AWS Cloud storage through the Storage Gateway optimizations. These optimizations include the following:
1. Multi-part management
2. Automatic buffering
3. Delta transfers used across all gateway types
4. Data compression applied for all block and virtual tape data

Storage Gateway offers Federal Information Processing Standard (FIPS) 140-2 compliant endpoints in AWS GovCloud (US-East) and AWS GovCloud (US-West).

- *Native AWS integrated service:* 

Use Storage Gateway to consume AWS services. As a native AWS service, Storage Gateway integrates with other AWS services for storage, backup, and management while still integrating with on-premises environments. 

The service stores files as native Amazon S3 objects or fully managed file shares in Amazon FSx for Windows File Server. The service archives virtual tapes in Amazon S3 Glacier and Amazon S3 Glacier Deep Archive, and stores Amazon EBS snapshots generated by the Volume Gateway with Amazon EBS. 

Storage Gateway also integrates with AWS Backup to manage backup and recovery of Volume Gateway volumes. This integration makes backup management more efficient, and helps you meet your business and regulatory backup compliance requirements. 

Storage Gateway publishes health and performance logs and metrics to Amazon CloudWatch and provides monitoring of metrics and alarms in the Storage Gateway console. 

Storage Gateway integrates with AWS Identity and Access Management (IAM) to help manage and secure access to Storage Gateway resources. 

Your data is encrypted by default at rest using Server-Side Encryption with Amazon S3-Managed Keys (S3-SSE). Alternatively, you can use your own encryption keys through Storage Gateway's integration with AWS Key Management Service (AWS KMS).

- *High availability on VMware:* Storage Gateway provides high availability on VMware through a set of health checks integrated with VMware vSphere High Availability (VMware HA). With this integration, Storage Gateway deployed in a VMware environment on-premises, or in VMware Cloud on AWS, will automatically recover from most service interruptions in under 60 seconds. This protects storage workloads against hardware, hypervisor, or network failures, storage errors, or software errors, such as connection timeouts and file share or volume unavailability.

### 3.3 Use Cases

*AWS Storage Gateway* are used in many different customer use cases to create a hybrid environment that connects on-premises data to storage services in the AWS Cloud.
- *Low-latency access for on-premises applications to the cloud:* Storage Gateway enables on-premises applications to use cloud storage by providing low-latency data access over standard storage protocols. A local cache stores your most recently used data on premises. The cloud provides scalability and industry-leading data protection, durability, availability, security, and performance. Storage Gateway provides a simple first step into the cloud and is designed to be easy to deploy, easy to activate, and easy for your applications to acces
- *Use on-premises file shares backed by cloud storage:* Amazon FSx File Gateway helps you access fully managed, cloud-backed file shares from on premises. FSx File Gateway reduces your costs of storing data locally. You have the flexibility to access your data in the cloud. Managing and scaling on-premises infrastructure is often burdensome and costly, requiring expensive hardware refreshes, expansion, and software licensing.  Amazon FSx File Gateway helps you reduce these on-premises costs and physical hardware footprints. Reduce costs give you more freedom to make the best decisions for your business.
- *Move backups to the cloud:* You can use Storage Gateway to securely and easily store backups in the cloud. These include database backups, file share backups, tape archives, and more. Tape Gateway provides a virtual tape library, with each virtual tape being stored in Amazon S3, and supports all major backup applications. 
- *Data protection and disaster recovery:* With a Volume Gateway configuration, you can take snapshots of your local volumes and store those snapshots in Amazon EBS. You can use those snapshots as the starting point for an Amazon EBS volume. You can then attach the volume to an Amazon EC2 instance. If a disaster occurs at a local site, set up your applications in the cloud or in a different data center and restore your snapshot to get back up and running.