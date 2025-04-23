---
title: AWS Fundamentals - Getting Started (Part 3)
slug: aws-fundamentals-getting-started-part-3
date: '2025-04-23'
authors: 
    - Hal Ng
relates:
    - aws-fundamentals-getting-started-part-2
    - aws-fundamentals-getting-started-part-1
    - edge-and-hybrid-storage-solutions
---
 
When you consider running your workloads on AWS, you might first consider your storage options. AWS storage provides the services you need to build the storage solution that's right for your business.

In this post, you will learn the primary storage types and the differences between them. You will also discover the block, file and object storage services to build the foundation of your cloud IT environment.

## Contents

## 1. On-Premises Storage versus AWS Cloud Storage

Nowaday, more and more organizations are moving to the cloud. They starts with an assetment of their existing on-premises storage infrastructure. Organizations that take the time to identity where and how their data is stored,...

So why organizations moe to the cloud? Below is some of the befefits of moving to cloud:
- Increase organizational agility
- Accelerate ability to innovate
- Strengthen security
- Reduce costs
- Operational expense versus capital investment

Cloud storage is typically purchased from a third-party cloud vendor that owns and operates data storage capacity and delivers it over the internet in a pay-as-you-go model. These cloud storage vendors manage capacty, security, and durability to make data accessible to your applications all around the world.

Cloud storage is a reliable, scalable, and secure place for your data. AWS offers a complete range of services for you to store, access, govern, and analyze your data to reduce costs, increase agility, and accelerate innovation. You don't have to perform a one-to-one replacement of your on-premises storage *(also known as lift and shift)*. Instead, you can re-platform or re-architect your storage to optimize cost, manageability, and performance based on your application needs. 

Whether on premises or in a cloud environment, you have three primary types of storage: **block, file, and object**. Different storage hardware manufacturers and cloud service providers implement these storage types differently. However, the fundamenrals for each storage type are basically the same, regardless of where the storage type is located, who manufactures the hardware, or who provides the service. The specific features and functionality differ based on how the manufacturer or service provider implements the storage.

- **Block Storage**

Is raw storage in which the hardware storage device or drive is a disk or volume that is formatted and attached to the compute system for use. The storage is formatted into predefined continuous segments on the storage device. These segments are called blocks. The blocks are the basic fixed storage units used to store data on the device.

Storage devices can be hard disk drives (HDDs), solid state drives (SSDs), or newer types of storage devices, such as Non-Volatile Memory Express (NVMe). In addition to individual storage devices, you can deploy block storage on storage area network (SAN) systems.

The storage device is used by the operating system or an application that has the capabilities to manage block storage directly. For cases in which the application manages the block storage, the application often shares management with an operating system.

- **File storage**

File storage is built on top of block storage, typically serving as a file share or file server. File storage is created using an operating system that formats and manages the reading and writing of data to the block storage devices. The name file storage comes from the primary use of storing data as files typically in a directory tree hierarchy.

The two most common storage protocols for file storage are Server Message Block (SMB) and Network File System (NFS). You can use the network protocols to communicate with remote computers and servers. You can also use server resources or share, open, and edit files.

The operating system manages the storage protocol and the operation of the file system. The file system can be Windows Server, Linux, or a specialized operating system used on network attached storage (NAS) devices or clustered NAS systems.

- **Object Storage**

Object storage is also built on top of block storage. Object storage is created using an operating system that formats and manages the reading and writing of data to the block storage devices. The name object storage comes from the primary use of storing the data within a binary object. Unlike file storage, object storage does not differentiate between types of data. The type of data or the file type becomes part of the data's metadata.

An object is made up of a larger set of blocks organized by using a predetermined size. For example, one object storage system uses binary object sizes of 128 megabytes (MB). Smaller files or data are stored at a binary level within the object. Larger data files are stored by spreading the data across multiple objects.

Object storage is recognized for its inherent availability of the file objects. Some systems support file versioning, file tracking, and file retention.

## 2. AWS Storage Portfolio

The AWS Storage portfolio consists of the core storage services and other closely associated services. You select the services you need based on what you are trying to accomplish.

With AWS storage, you can quickly provision the storage that is best suited for your application or use case. You can use a combination of storage services to meet your requirements without the need to provision, host, and maintain separate systems.

Because you pay for only resources that you use, you can provision storage to do the following:
- Test new applications
- Test use cases
- Try different storage service for your existing ones.

When you are finished, you can delete the storage resource.

AWS offers service that are designed to provide edge and hybrid cloud solutions. Edge compute and storage solutions for remote or disconnected locations and hybrid solutions to connect your on-premises infrastructure to storage services in the AWS Cloud

Data transfer services are designed to copy or transfer your on-premises data to and from the core AWS Storage services in the AWS Cloud. 

Data protection services provide optional services to meet your data redundancy and disaster requirement needs. Some services are standalone service options and some are integrated into the core storage services.

![Portfolio](/assets/aws_storage_service_portfolio.jpg)

## 3. How to choose the right storage solution in the cloud

### 3.1. Storage characteristics and requirements

You must understand the different characteristics of your application or workflow that are required to select the services that best fit your workload. Example characteristics are shareable, file size, cache size, access patterns, latency, throughput, and persistence of data. Those characteristics can lead you toward the best storage solution, such as block storage, or object storage.

To optimize storage, the first step is to understand the performance profile for each of your workloads. Conduct a performance analysis to measure input/output operations per second (IOPS), throughput, and other variables. Define your storage performance requirements. Identify your workload’s most important storage performance metrics. Use those metrics to set boundaries. Implement improvement strategies as part of a data-driven approach, using benchmarking or load testing. Use this data to identify where your storage solution is or can be constrained. Examine storage and configuration options to improve the solution. 

AWS storage services are optimized for different storage scenarios. No single data storage option is ideal for all workloads. When evaluating your storage requirements, consider data storage options for each workload separately.

Determine the expected growth rate for your workload and choose a storage solution that will meet those rates. Object and file storage solutions, such as Amazon S3 and Amazon Elastic File System, enable unlimited storage.


### 3.2. Questions to help determine storage requirements

The following questions help you to segment data within each of your workloads and determine your storage requirements:
- *How often and how quickly do you need to access your data?* AWS offers storage options and pricing tiers for frequently accessed, less frequently accessed, and infrequently accessed data.
- *Does your data store require high IOPS or throughput?* AWS provides categories of storage that are optimized for performance and throughput. Understanding IOPS and throughput requirements will help you provision the right amount of storage and avoid overpaying.

- *What storage access protocols are required?* Pre-existing applications are often developed based on specific operating systems. The operating system can affect the access protocol. For example, Linux-based applications that require file system access usually require NFS. Windows-based applications require SMB as the protocol. 

- *How critical (durable) is your data?* Critical or regulated data needs to be retained at almost any expense and tends to be stored for a long time.

- *How sensitive is your data?* Highly sensitive data must be protected from accidental and malicious changes, not only data loss or corruption. Durability, cost, and security are equally important to consider.

- *How large is your dataset?* Knowing the total size of the dataset helps in estimating storage capacity and cost.

- *How transient is your data?* Transient data is short-lived and typically does not require high durability. (Note: Durability refers to average annual expected data loss.) Clickstream and Twitter data are good examples of transient data.

- *How much are you prepared to pay to store the data?* Setting a budget for data storage will inform your decisions about storage options.

### 3.3. Evaluate available configuration options 

Evaluate the various characteristics and configuration options and how they relate to storage. Understand where and how to use the following elements to optimize storage space and performance for your workload:
- Provisioned IOPS
- Solid state drives (SSD)
- Hard disk drives (HDD)
- Object storage
- Archival storage
- Ephemeral (temporary) storage 

### 3.4. Determine storage characteristics 

When you evaluate a storage solution, determine the available storage characteristics, such as the following:

- Ability to share the storage
- Ideal file size and maximum file size
- Storage cache size
- Average or expected latency
- Maximum throughput
- Maximum IOPS
- Persistence of data

Then match your requirements to the AWS service that best fits your needs.

## 4. AWS storage services

### 4.1. Block storage - Amazon EBS

The AWS block storage portfolio consists of two types of block storage services: Amazon Elastic Compute Cloud (Amazon EC2) instance storage and Amazon Elastic Block Store (Amazon EBS). Amazon EBS also includes an integrated snapshot service. Amazon EBS is the primary block storage service. 

#### 4.1.1. Amazon EC2 instance store

An instance store provides temporary (ephemeral) block-level storage for your instance. This storage is located on disks that are physically attached to the host computer where the compute instance is. Instance stores resemble Amazon EBS storage in initial configuration options. However, their architecture most closely resembles direct attached disk drives. An instance store provides submillisecond latencies between the EC2 instance and the storage.

Only specific Amazon EC2 instance types support instance stores. The available storage type is directly associated to the EC2 instance type. An instance store consists of one or more instance store volumes exposed as block devices. The size of an instance store and the number of devices available vary by instance type. 

Instance store is ideal for the following use cases:

- Temporary storage of information that changes frequently, such as buffers, caches, scratch data, and other temporary content
- Data that is replicated across a fleet of instances, such as a load-balanced pool of web servers

Instances stores are not recommended for most block storage workloads.

As ephemeral storage, instance stores are not replicated or spread across multiple devices to improve durability and availability. An instance store is nonpersistent and is terminated when the associated EC2 instance is terminated.

#### 4.1.2. Amazon EBS overview

Amazon EBS is an easy-to-use, high performance, block storage service. It is designed for use with Amazon EC2 compute instances for both throughput and transaction-intensive workloads at any scale. 

AWS recommends Amazon EBS for data that must be quickly accessible and requires long-term persistence. EBS volumes are well suited for use as the primary storage for file systems, databases, or any applications that require fine granular updates and access to raw, unformatted, block-level storage. Amazon EBS is well suited to both database-style applications that rely on random reads and writes and to throughput-intensive applications that perform long, sequential reads and writes.

EBS volumes behave like raw, unformatted block devices. You can mount these block devices as EBS volumes on your EC2 instances. EBS volumes that are attached to an EC2 instance are exposed as raw block storage volumes that persist independently from the life of the instance. You can create a file system on top of these volumes or use them in any way you would use a block device (such as a hard drive). You can dynamically change the configuration of a volume attached to an EC2 instance, unlike traditional disk drives that come in fixed sizes.

You can choose from different EBS volume types to balance optimal price and performance. You can achieve single-digit millisecond latency for high-performance database workloads, such as SAP HANA, or gigabyte-per-second throughput for large, sequential workloads such as Apache Hadoop. You can change EBS volume types, tune performance, or increase volume size without disrupting your critical applications. Amazon EBS provides you cost-effective block storage when you need it.

Designed for mission-critical systems, EBS volumes are replicated within an AWS Availability Zone and can scale to store petabytes of data. Also, you can use EBS snapshots with automated lifecycle policies to back up your volumes in Amazon Simple Storage Service (Amazon S3). You can do this  while ensuring geographic protection of your data and business continuity.

With Amazon EBS, you pay only for the storage and resources that you provisio

- *Amazon EBS features:*
    - **Single Availability Zone**: You create an EBS volume in a specific Availability Zone, and then attach it to an EC2 instance in that same Availability Zone. The proximity of your Amazon EBS volume to your Amazon EC2 instance provides low latency and high-performance block storage for your workload.
    - **Persistent**: Amazon EBS volumes are durable and persistent by default. Your EBS volume survives even if your EC2 instance is terminated. Your data is preserved for your future use and persists until you decide to delete it. Root EBS volumes created with an EC2 instance are terminated with the instance by default. However, you can modify the volume to be persistent.
    - **Volume types**: Amazon EBS provides multiple volume types that you can use to optimize storage performance and cost for a broad range of applications. These volume types are divided into two major categories: SSD-backed storage for transactional workloads, such as databases, virtual desktops, and boot volumes, and HDD-backed storage for throughput-intensive workloads, such as MapReduce and log processing. 
    - **Elastic volumes**: Using the Elastic Volumes feature, you can adapt your volumes as the needs of your applications change. Use this feature to increase capacity, tune performance, and change the type of any new or existing current generation volume dynamically, with no downtime or performance impact. You can easily right-size your deployment and adapt to performance changes.
    - **High availability and high durability**: EBS volumes are designed to be highly available, reliable, and durable at no additional charge to you. EBS volume data is replicated across multiple servers in an Availability Zone to prevent the loss of data from the failure of any single component. Amazon EBS volumes are designed to provide 99.8–99.9 percent durability with an annual failure rate (AFR) of 0.1–0.2 percent. Amazon EBS also supports a snapshot feature, which is a good way to take point-in-time backups of your data. 
    - **Data encryption**: You can create your EBS volumes as encrypted volumes to meet a wide range of data-at-rest encryption requirements for regulated/audited data and applications. When you create an encrypted EBS volume and attach it to a supported instance type, data stored at rest on the volume, disk I/O, and snapshots that were created from the volume are all encrypted. The encryption occurs on the servers that host EC2 instances, providing encryption of data in transit from EC2 instances to Amazon EBS storage.
    - **Native snapshot support**:You can create point-in-time snapshots of EBS volumes, which are persisted to Amazon S3. Snapshots protect data for long-term durability. You can use snapshots to restore your data to new volumes, expand the size of a volume, or move volumes across Availability Zones. The same snapshot can be used to instantiate as many volumes as you want. You can copy these snapshots across AWS Regions. You pay for only the storage capacity consumed for your snapshot data.
    - **AWS Backup support**: AWS Backup supports backing up your EBS volumes. With AWS Backup, you can centralize and automate data protection across multiple Amazon EBS volumes. AWS Backup offers a cost-effective, fully managed, policy-based service that further simplifies data protection at scale. 
    - **Performance moniotring**: Performance metrics, such as bandwidth, throughput, latency, and average queue length, are available through the AWS Management Console. Amazon CloudWatch provides these metrics so that you can monitor the performance of your volumes. You can make sure that you are providing enough performance for your applications and paying only for resources you need.

- *Amazon EBS use cases:* The functionality and available performance options make Amazon EBS a good storage option for many workloads and use cases. In this section, you will learn about the most common use cases for Amazon EBS storage, including enterprise applications, relational databases, nonrelational (NoSQL) databases, big data analytics, and file systems and media workflows:

### 4.2. File Storage

AWS currently offers three different managed file storage services to meet your application, workflow, and use-case requirements. In addition, you can use Amazon EBS to create self-managed file systems.

For running file systems workflows on AWS, you can select from Amazon Elastic File System (Amazon EFS), Amazon FSx for Lustre, Amazon FSx for NetApp ONTAP, Amazon FSx for OpenZFS, Amazon FSx for Windows File Server, or you can build your own high-performance network file system designed for your workload protocol.

- Amazon EFS is a scalable, elastic, cloud-native file system for Linux. Amazon EFS supports the Network File System (NFS) protocol.
- Amazon FSx for Lustre is an AWS fully managed parallel file system built on Lustre for high performance computing (HPC) workloads. FSx for Lustre supports the Lustre POSIX-compliant protocol.
- Amazon FSx for NetApp ONTAP is the NetApp ONTAP operating system implemented as a fully managed service. FSx for NetApp ONTAP support iSCSI for block storage, NFS protocol for POSIX-compliant access, and SMB protocol for Windows-compatible access.
- Amazon FSx for OpenZFS is an AWS fully managed implementation of the Open Zettabyte File System (ZFS). FSx for OpenZFS supports NFS and SMB protocols for a wide range of application implementations. 
    - Note: SMB protocol access is not support at initial service launch.
- Amazon FSx for Windows File Server is an AWS fully managed file system for Windows environments. FSx for Windows File Server supports the Server Message Block (SMB) protocol.
- Using Amazon EC2 and Amazon EBS, you can quickly create your own high-performance block storage for building your own network file system, including the following protocols and systems:
    - SMB
    - NFS
    - Extents File System (XFS) 
    - General Parallel File System (GPFS)
    - Zettabyte File System (ZFS)
    - Other customer files systems

You can choose the file system that you need to optimize your applications or workflows. You can bring your media workflows and use their native file system running on EC2 instances and store your data on EBS volumes.

### 4.3. Object Storage - S3

Amazon Simple Storage Service (Amazon S3) is an object storage service that offers industry-leading scalability, data availability, security, and performance. This means that customers of all sizes and segments can use it to store and protect any amount of data for a range of use cases. Use cases include the following:

- Data lakes
- Websites
- Mobile applications
- Backup and restore
- Archive
- Enterprise applications
- IoT devices
- Big data analytics 

Amazon S3 provides easy-to-use management features so that you can organize your data and configure finely-tuned access controls to meet your specific business, organizational, and compliance requirements. Amazon S3 is designed for 99.999999999 percent (11 9s) of durability.

#### 4.3.1. Amazon S3 overview

Amazon Simple Storage Service (Amazon S3) is storage for the internet. It is designed to make web-scale or cloud-native computing easier. Amazon S3 integrates with the widest range of other AWS services so that you can create robust workloads for your organization. 

Amazon S3 has a simple web service interface that you can use to store and retrieve any amount of data from anywhere on the web. Amazon S3 uses standards-based REST APIs designed to work with any internet-development toolkit. 

Amazon S3 has various features that you can use to organize and manage your data in ways that support specific use cases, enable cost efficiencies, enforce security, and meet compliance requirements. Data is stored as objects within resources called buckets. A single object can be up to 5 terabytes in size. You can access objects through S3 Access Points or directly through the bucket hostname.

S3 features include the following capabilities:

- Appending metadata tags to objects
- Moving and storing data across different S3 storage classes
- Configuring and enforcing data access controls
- Securing data against unauthorized users
- Running big data analytics
- Monitoring data at the object or bucket levels
- Viewing storage usage and activity trends across your organization

Amazon S3 has a flat, non-hierarchical structure. All objects are stored in S3 buckets and can be organized with shared names called prefixes.

Amazon S3 provides industry-leading performance for cloud object storage. Amazon S3 supports parallel requests. This means that you can scale your S3 performance by the factor of your compute cluster, without customizing your application. Performance scales per prefix, so you can use as many prefixes as you need in parallel to achieve the required throughput. You can have a virtually unlimited number of prefixes. Amazon S3 performance supports at least 3,500 requests per second to add data and 5,500 requests per second to retrieve data. Each S3 prefix can support these request rates, making it simple to increase performance significantly.

Amazon S3 provides strong read-after-write consistency for PUT and DELETE actions on objects in your Amazon S3 bucket in all AWS Regions. This applies to both writes to new objects and PUT actions that overwrite existing objects and DELETE actions. In addition, read operations on Amazon S3 Select, Amazon S3 access control lists, Amazon S3 object tags, and object metadata (for example, HEAD object) are strongly consistent.

#### 4.3.2. Amazon S3 storage classes

Amazon S3 offers a range of storage classes designed for different use cases. Every S3 storage class supports a specific data access level at corresponding costs or geographic location. S3 storage classes include:

- S3 Standard for general-purpose storage of frequently accessed data
- S3 Standard-Infrequent Access (S3 Standard-IA) for less frequently accessed data
- S3 One Zone-Infrequent Access (S3 One Zone-IA) for less frequently accessed data and lower availability requirements
- S3 Intelligent-Tiering for data with unknown or changing access patterns
- Amazon S3 Glacier Instant Retrieval for lower-cost archival storage that may require retrieval at any time.  
- Amazon S3 Glacier Flexible Retrieval for low-cost archival storage with retrieval time from minutes to hours
- Amazon S3 Glacier Deep Archive (S3 Glacier Deep Archive) for lowest-cost storage with retrieval times up to 12 hours
- Amazon S3 on Outposts for on-premises hybrid data storage and satisfying data residency requirements. 

Amazon S3 also offers capabilities to manage your data throughout its lifecycle. When an S3 lifecycle policy is set, your data transfers to a different storage class automatically without any changes to your application.

You can use S3 Storage Class Analysis to monitor access patterns across objects to discover data that should be moved to lower-cost storage classes. Then, you can use this information to configure an S3 Lifecycle policy that makes the data transfer. 

S3 Lifecycle policies can also be used to expire objects at the end of their lifecycles. You can store data with changing or unknown access patterns in S3 Intelligent-Tiering. The lifecycle policy moves your data automatically based on changing access patterns between two low-latency access tiers optimized for frequent and infrequent access. When subsets of objects become rarely accessed over long periods of time, you can activate two archive access tiers designed for asynchronous access that are optimized for archive access.

#### 4.3.3. Amazon S3 features

- Amazon S3 management and monitoring
- Amazon S3 storage analytics and insights
- Amazon S3 access management and security
- Amazon S3 data processing and query

#### 4.3.4. Amazon S3 use cases

Amazon S3 use cases are similar to those of many file storage systems. With virtually unlimited storage low costs, Amazon S3 is a strong storage solution for data-intensive and long-term data storage requirements.
- Backup and restore
- Disaster recovery
- Archive
- Data lakes and big data analytics
- Hybrid cloud storage
- Cloud-native applications

## 5. Recap

This blog serves as a detailed guide to understanding and selecting the most suitable storage solutions within the **AWS Cloud ecosystem**, comparing them to traditional on-premises approaches.

- It begins with a comparison between **on-premises storage and AWS cloud storage**, outlining the benefits, limitations, and considerations of moving data to the cloud.

- Next, it introduces the **AWS Storage Portfolio**, showcasing the breadth of services AWS offers to meet diverse storage needs, from block and file storage to scalable object storage.

- The blog then walks readers through a **step-by-step framework** for choosing the right storage solution. This includes evaluating **storage characteristics and requirements**, asking the right **guiding questions**, reviewing **configuration options**, and pinpointing the **key attributes** of a storage workload.

- Finally, the blog provides a deep dive into specific **AWS storage services**:
  - **Block Storage** via **Amazon EBS** and **EC2 instance store** for high-performance workloads.
  - **File Storage** options for applications that require file system access.
  - **Object Storage** through **Amazon S3**, covering its **overview**, various **storage classes**, **key features**, and **common use cases**, reinforcing S3's versatility as a cornerstone of cloud-native storage.