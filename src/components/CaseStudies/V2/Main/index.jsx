import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';
import { LinkButton, ButtonContainer } from '/src/theme/Buttons';

export default function Main() {
  return (
    <main className={styles.mainBody}>
      <div className="container">
        <div className={styles.box}>
          <div className={styles.firstColumn}>
            <span>PROJECT SUMMARY</span>
            <h2>Building an Intelligence Engine</h2>
            <p>
              {' '}
              Morningstar selected Weaviate's vector database to build a
              scalable, accurate Intelligence Engine Platform, delivering
              reliable AI-driven financial tools and dynamic document search.
            </p>
          </div>
          <div className={styles.secondColumn}>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <h3>Driving Innovation</h3>
            </div>
            <p className={styles.CsText}>
              The Intelligence Engine powers hundreds of in-house applications.
            </p>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <h3>RAG pipelines</h3>
            </div>
            <p className={styles.CsText}>
              The Intelligence Engine powers hundreds of in-house applications.
            </p>
          </div>
          <div className={styles.secondColumn}>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <h3>Financial Research</h3>
            </div>
            <p className={styles.CsText}>
              The Intelligence Engine powers hundreds of in-house applications.
            </p>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <h3>Self-serve RAG</h3>
            </div>
            <p className={styles.CsText}>
              The Intelligence Engine powers hundreds of in-house applications.
            </p>
          </div>
        </div>

        <div className={styles.bentoGrid}>
          <div className={styles.bento01}>
            <div className={styles.bentoText}>
              <span>about the company</span>
              <div className={styles.bentoLogo}></div>
              <p>
                <Link to="https://www.morningstar.com/">Morningstar</Link>, Inc.
                is a leading global provider of independent investment insights.
                Morningstar offers an extensive line of products and services
                for individual investors, financial advisors, asset managers and
                owners, retirement plan providers and sponsors, and
                institutional investors in the debt and private capital markets.
                Morningstar provides data and research insights on a wide range
                of investment offerings, including managed investment products,
                publicly listed companies, private capital markets, debt
                securities, and real-time global market data. 
              </p>
            </div>
          </div>
          <div className={styles.bento02}>
            <div className={styles.bentoText}>
              <span>challenge</span>
              <p>
                Over the last 40 years, Morningstar amassed an extensive
                collection of proprietary financial data. Morningstar has sought
                to further empower investors that rely on its data by developing
                an advanced research assistant AI application. According to
                Benjamin Barrett, Morningstar’s Head of Technology, Research
                Products, building a chatbot on that data “looks like magic, but
                when you start peeling back the layers of the onion, you have to
                ask, is it actually accurate? Is it pulling the latest,
                greatest, most relevant data? Are our answers robust and
                complete?”
              </p>
              <p>
                As his engineering team worked with Morningstar’s Quantitative
                Research team to build their Intelligence Engine Platform, they
                had to ensure an incredibly high level of accuracy in order to
                maintain their users’ trust. “We want to have one single source
                of truth. Our whole mission is to empower investor success. And
                the way to do that is to give them reliable, trustworthy
                financial data.”
              </p>
            </div>
          </div>
          <div className={styles.bento03}></div>
          <div className={styles.bento04}>
            <div className={styles.bentoText}>
              <span>why weaviate</span>
              <p>
                In early 2023, Morningstar saw early success in experiments with
                LLMs and snippets of their own data. They quickly realized the
                potential of using AI to harness decades of longform research
                content and real-time data with RAG, and started their search
                for the right vector database.
              </p>
            </div>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <p className={styles.CsText}>
                <strong>Ease-of-use:</strong> Weaviate’s open-source database
                was quick and easy for Morningstar to spin up locally in a
                Docker container and start experimenting.
              </p>
            </div>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <p className={styles.CsText}>
                <strong>Data privacy and security:</strong> Flexible deployment
                options and multi-tenant architecture allowed for strict data
                privacy and security compliance.
              </p>
            </div>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <p className={styles.CsText}>
                <strong>Flexibility and scalability:</strong> Weaviate supported
                a variety of use cases–from search engines to tailored AI
                applications–and was able to handle large and diverse data sets.
              </p>
            </div>
            <div className={styles.tagHolder}>
              <div className={styles.CsIcon}></div>
              <p className={styles.CsText}>
                <strong>Support:</strong> Weaviate offered great support from
                local development all the way to production.
              </p>
            </div>
          </div>
          <div className={styles.bentoColumn}>
            <div className={styles.bento05}>
              <div className={styles.bentoText}>
                <span>results</span>
                <p>
                  With Weaviate, Morningstar was able to build their
                  Intelligence Engine Platform, a product which solves a
                  challenge facing today’s financial services firms: how to
                  easily create and customize AI applications built on a
                  foundation of trusted financial data and research. The
                  Intelligence Engine also powers a variety of workflows, APIs,
                  and chat interfaces across Morningstar’s own product ecosystem
                  – including Mo, it’s investment research-assistant chatbot –
                  for both internal and external users.
                </p>
              </div>
            </div>
            <div className={styles.bento06}>
              <div className={styles.bentoText}>
                <div className={styles.innerText}>
                  <h3>We’re here to help!</h3>
                  <p>
                    Need support getting started with Weaviate? We’ve got your
                    back.
                  </p>
                </div>
              </div>
              <div className={styles.buttonContainer}>
                <Link to="/go/console" className={styles.buttonSmall}>
                  {'Get in touch >'}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.bento07}>
            <div className={styles.bentoText}>
              <div className={styles.innerText}>
                <h3>
                  We’d love to give you a live demo of what Weaviate can do
                </h3>
                <iframe
                  className={styles.embed}
                  src="https://embeds.beehiiv.com/15b21ebd-decd-433b-ada8-2d405e345f2e?slim=true"
                  data-test-id="beehiiv-embed"
                  height="52"
                  frameborder="0"
                  scrolling="no"
                ></iframe>
                <div className={styles.subscribe}>
                  <input type="checkbox" id="newsletter" />
                  <label>Sign me up for the weekly newsletter</label>
                </div>
              </div>
            </div>
            <div className={styles.buttonContainer}></div>
          </div>
        </div>
      </div>
    </main>
  );
}
