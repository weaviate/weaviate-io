import React from 'react';
import styles from './styles.module.scss';
import Link from '@docusaurus/Link';

export default function Study() {
  return (
    <div className={styles.bgColor}>
      <div className={styles.studyContainer}>
        <div className={styles.leftContainer}>
          <div className={styles.studyContent}>
            <h2>
              The Journey Towards Seamless Integration of Neople Assistants in
              Business Environments
            </h2>
            <p>
              Neople is a startup that uses generative artificial intelligence
              (GenAI) to create digital co-workers, called Neople Assistants,
              that help businesses achieve their customer service goals. Neople
              Assistants are uniformly integrated with the tools businesses
              already use to process customer support cases. In order to deliver
              world-class support, these digital co-workers must process large
              amounts of information from a variety of sources before responding
              to a customer case, just like a human support agent would.
            </p>
            <p>
              {' '}
              The company’s brain, or operating hub, is built on AWS with
              Weaviate as their vector database of choice for reliable, accurate
              and fast querying of company-specific knowledge. With a scalable
              and secure AI stack, Neople’s powerful platform is setting the
              standard for trusted human-AI interaction and has the potential to
              revolutionize the way we approach work.
            </p>
            <h2>Challenge</h2>
            <p>
              As Job Nijenhuis, co-founder and CTO, began building the Neople
              platform, there were several key requirements for their AI stack.
              First, they wanted to have full control over data in the platform.
              In addition, they needed to use tools that were easy, quick, and
              reliable to set up. Neople didn’t want to build their own database
              solution because they wanted to spend less time on building out
              their stack and more on features for their Neople Assistants.{' '}
            </p>
            <p>
              {' '}
              In the beginning, when Neople’s database was built with Postgres,
              it was impossible to provide   real-time responses to user
              queries. Neople Assistants search multiple times per query, and it
              could take minutes to respond to a Teams or Slack message, at
              which point a human could have completed the same task as a
              digital assistant.
            </p>
            <h2>Why Neople Chose Weaviate </h2>
            <p>
              For Job, Weaviate was the obvious choice to replace Neople’s
              original Postgres database. As a full-featured AI-native vector
              database, it gave Neople the ability to have full control over how
              they built their AI application and how they would store their
              data. The database needed to run inside the Neople tenant and
              Weaviate was easy to deploy and manage with Docker and AWS
              CloudFormation templates.{' '}
            </p>
            <p>
              Reliability and ease of use have been key for Neople as their
              customer base continues to grow – they wanted to focus more on
              improving their digital assistants and less on maintaining the
              underlying technology.{' '}
            </p>
            <p>
              Although Job had initially built custom components like a
              re-ranking mechanism to improve the accuracy of query results,
              Weaviate offered a reranking module out-of-the-box. Weaviate’s
              powerful hybrid search capabilities promised better quality search
              responses while a large and active developer community could
              provide the support Neople’s engineers needed to quickly debug
              issues and focus on new features.
            </p>
            <h2>Solution</h2>
            <p>
              Weaviate replaced Neople’s initial database. In addition to being
              quick and easy to set up, Weaviate was purpose built for AI
              applications and it showed in its ability to deliver significantly
              faster query results. Being able to take advantage of plug-n-play
              modules meant Neople could drastically improve search result
              accuracy while reducing the developer toil of maintaining custom
              built components.{' '}
            </p>
            <p>
              As an active member of Weaviate’s open source engineering
              community, Job and his team have been able to get quick support on
              challenges from Weaviate’s team as well as other community
              members. At the same time, he’s able to give back to the community
              by sharing things he’s learned along the way.
            </p>
            <p>
              <span className={styles.quote}>
                “We're really eager to learn from other people and to use
                services like Weaviate that specialize in vector databases to
                improve our offering. In the end our main goal isn’t to maintain
                a database, it’s to deliver the best results and user experience
                for our customers”
              </span>
              <br></br> Job Nijenhuis, co-founder and CTO, Neople
            </p>
            <h2>Next Steps </h2>
            <p>
              Neople’s technology is constantly evolving as the number of Neople
              Assistants working in real world virtual environments increases.
              Job and his team regularly adopt new Weaviate features as they
              become available:
            </p>
            <p>
              {' '}
              <span className={styles.quote}>
                “When we get a newsletter announcing that a new version of
                Weaviate is out, I read through it on the train back home – that
                night we will have half of the new features implemented. It
                really shows our team’s dedication to improving our offering and
                how choosing Weaviate continues to support those efforts on a
                regular basis,”
              </span>{' '}
              said Job.
            </p>
            <p>
              {' '}
              Some of Weaviate’s newest features include multi-tenancy and
              multi-modality, which Job’s team is incorporating into the Neople
              platform this year. 
            </p>
          </div>
        </div>
        <div className={styles.rightContainer}>
          <div className={styles.topSection}>
            <h2>90% faster search</h2>
            <p>
              The amount of time it takes to receive a search result has been
              reduced from taking an average of 10 seconds to less than 1
              second. This improvement allows Neople assistants to accurately
              find answers to questions faster than a human would, and makes
              them an invaluable time saver for human support teams handling
              large volumes of customer cases.
            </p>
            <h2>1000X more data objects stored</h2>
            <p>
              Compared to their original database, Neople has increased the
              number of data objects stored in their Weaviate database by a
              factor of 1000 while improving query response times. Neople
              doesn’t have to worry about their vector database scaling as the
              business continues to grow.
            </p>
            <h2>Reduced developer toil</h2>
            <p>
              By removing a custom-built re-ranking mechanism and using one of
              Weaviate’s out-of-the-box modules, Neople was able to reduce the
              number of components their engineers need to maintain so they can
              focus their efforts on improving their core offering instead.
            </p>
          </div>
          <div className={styles.bottomSection}>
            <div className={styles.logo}></div>
            <p>
              By harnessing cutting-edge AI technologies, Neople Assistants are
              trained on static subjects such as product information and FAQs,
              and dynamic information like recent customer conversations and
              real-time order management systems. A Neople Assistant learns and
              operates in the same work environment as a human employee, on
              platforms such as Slack or Microsoft Teams, or within contact
              centers like Zendesk. These digital co-workers fill the gap
              between highly specific and integrated and super general and
              all-purpose AI tools.They collaborate with human customer support
              teams to effectively and personably resolve customer inquiries,
              improving efficiency in the process.
            </p>
            <h2>Why AWS</h2>
            <p>
              Neople chose AWS as its cloud platform for its ability to support
              scalability, flexibility, and security – their architecture is
              completely serverless using AWS Lambdas and they host Weaviate on
              AWS EC2. In the coming months Neople plans to bring Amazon Bedrock
              and Amazon SageMaker into their AI stack to operationalize their
              AI workflows and improve scale. The company is also fully GDPR
              compliant and needed to work with a cloud provider that could help
              them maintain strict security standards to protect customer and
              company data.
            </p>
            <h2>About Weaviate</h2>
            <p>
              Vector databases are becoming core to the AI tech stack because
              they can handle a very large amount of unstructured data in an
              efficient way. Weaviate is an AI-native vector database available
              on the AWS marketplace that can scale to handle billions of
              vectors and millions of tenants. Customers and community members
              use Weaviate to power large-scale search and generative AI
              applications like chatbots and agents. Weaviate’s extensible
              architecture offers easy pluggability with the AI ecosystem,
              empowering developers of all levels to build and iterate faster.
              And flexible deployment options let teams abstract the burden of
              hosting and managing their database, while still meeting
              enterprise requirements for security and compliance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
