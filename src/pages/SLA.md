---
title: Weaviate Service Level Agreement
# image: og/service/_title.jpg
---

import { MetaSEO } from '/src/theme/MetaSEO';

<MetaSEO img="og/service/_title.jpg" />

### **SERVICE LEVEL AGREEMENT (SLA)**

**Introduction**

This Service Level Agreement ("**SLA**") delineates the service levels for Weaviate's vector database services, including the Standard and Enterprise tiers valid during the term of the Agreement. The infrastructure of the services is designed for Normal Use, and the Availability is applicable solely for Normal Use of the services. Any usage beyond Normal Use may lead to a degradation of service quality and availability. Issues accessing the service due to application errors (like misuse, misconfiguration, etc.) are excluded from Availability calculations and are not considered downtime as these are the responsibility of the Customer.
<br></br>

### **Normal Use**

Normal Use refers to the utilization of the service within the parameters outlined in our official documentation. The specifics of these parameters, including any limitations or restrictions, are detailed in the documentation available to all customers. In instances where a customer wishes to operate outside of these parameters, arrangements can be discussed and agreed upon in writing between the parties. For further details, please refer to our documentation.

### **Definitions and Calculations**
<br></br>

#### **Availability**

Availability signifies that the services are functional and accessible to the Customer. The details for each parameter are as follows:

| Parameter | Standard | Professional | Business Critical |
|-----------|----------|--------------|-------------------|
| Availability per Quarter | 99.5% | 99.9% | 99.9% |

Exclusions from the calculation of Availability include planned maintenance windows, maintenance requested by the Customer, and all downtime resulting from interruptions by third parties or other factors beyond Weaviate's control.
<br></br>

#### **Non-Availability**

Non-Availability refers to periods where the service level indicators are not consistently achieved as defined below. The formal commencement of non-availability begins from the time the monitoring systems indicate such status or when the Customer notifies Weaviate at support@weaviate.io. This period concludes when Weaviate confirms the restoration of availability either through an email to the customer or an update on the relevant status page.
<br></br>

#### **Service Level Indicators (SLIs)**

The performance of the services is measured in regular intervals with the service receiving a status of Non-Availability if the SLI tests fail to achieve the expected result in three consecutive tests.
<br></br>

#### **SLI Tests**

| Test # | SLI Test | How to test | Expected Result | Test interval |
|--------|----------|-------------|-----------------|---------------|
| 1 | Data Ingest | A new object is added via API to a Weaviate schema | A response of less than 1000 ms with a HTTP status code of 200 | Every (3) minutes |
| 2 | Data Query | The Weaviate API is queried for an existing object | A response of less than 1000 ms with a HTTP status code of 200 | Every (3) minutes |
<br></br>

#### **Reaction Time**

Upon becoming aware of a Non-Availability status, Weaviate will immediately address the issue and strive to initiate remediation efforts.
<br></br>

### **Planned Maintenance Windows**

Planned maintenance windows are periods during which the availability of the services may be impacted due to scheduled maintenance activities. These windows are notified at least one week in advance to the Customer via email. Maintenance necessary to maintain operational safety due to unpredictable external circumstances may be carried out outside of these windows with immediate notification to the Customer.
<br></br>

### **Backup Policy**

Weaviate employs different backup policies for each tier:

- **Standard Tier:** Daily full backup stored in the same region for 7 days.
- **Professional Tier:** Daily full backup stored in another region for 30 days.
- **Business Critical Tier:** Daily full backup stored in another region for 30 days.
<br></br>

### **Monitoring**

Weaviate offers different monitoring solutions for each tier:

- **Standard Tier:** Public Status Page.
- **Professional Tier:** Dedicated Status Page.
- **Business Critical Tier:** Dedicated Status Page.
<br></br>

### **Service Credits**

In the event that the availability of the services as described herein is not met, Customer shall have the right to claim service credits according to the table below:

| Service Level Targets | Standard Tier | Professional Tier | Business Critical Tier |
|-----------------------|---------------|-------------------|------------------------|
| 99.9% or more | No service credits | No service credits | No service credits |
| Less than 99.9% but more than 99.5% | No service credits | 5% service credit | 5% service credit |
| Less than 99.5% but more than 99% | 5% service credit | 10% service credit | 10% service credit |
| Less than 99% but more than 98.5% | 10% service credit | 20% service credit | 20% service credit |
| Less than 98.5% but more than 98% | 20% service credit | 30% service credit | 30% service credit |
| Below 98% | 30% service credit | 30% service credit | 30% service credit |

Service credits are calculated as a percentage of the monthly fees paid by the Customer and will be applied against future payments of fees due from the Customer. To receive service credits, the Customer must notify Weaviate by email (support@weaviate.io) within 30 days from the time the availability of the services was not met.
