import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const VulnLight = 'dark';

export default function Vuln(props) {
  const { socLight } = props;
  return (
    <div className={styles[VulnLight]}>
      <div className={styles.VulnContainer}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.VulnBox}>
              <h2>Report a Security Vulnerability</h2>
<p>Thanks for participating in our responsible disclosure program. Before beginning your research, we kindly request that you carefully review this program's terms and conditions. This will ensure that your efforts align with our objectives and that you receive the proper recognition for any findings that meet the program criteria. Valid and quality reports that meet the below criteria will be awarded with Weaviate swag, recognition on the HackerOne platform and listed on our Weaviate Security Hall of Fame.</p>
<figure class="table">
    <table>
        <tbody>
            <tr>
                <td>
                    <strong>Legal</strong>
                    <ul>
                        <li>Safe Harbour: Activities conducted in a manner consistent with these criteria will be considered authorised conduct, and we will not initiate legal action against you for breach of any applicable license conditions.</li>
                        <li>Individuals located in a country subject to a US or EU embargo or listed on any sanctioned persons list are not permitted to participate.</li>
                        <li>Do not publicly disclose issues or post Proofs of Concept until a fix has been confirmed by Weaviate.</li>
                        <li>Do not deliberately disrupt any Weaviate service or access any accounts or data other than your own.</li>
                        <li>All testing must be performed as good faith research, with the intent to disclose to Weaviate.</li>
                    </ul>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Scope</strong>
                    <ul>
                        <li>Only testing of in-scope products detailed here is allowed: <ul>
                                <li>Weaviate Cloud sandbox accounts.</li>
                                <li>The console.weaviate.cloud service.</li>
                                <li>Weaviate OSS latest released version: <a target="_blank" rel="noopener noreferrer" href="https://github.com/weaviate/weaviate">https://github.com/weaviate/weaviate</a>.</li>
                            </ul>
                        </li>
                        <li>The following are specifically out of scope, and no testing is allowed: <ul>
                                <li>Automated scanning or reporting.</li>
                                <li>A defense-in-depth option not implemented (such as HTTP header, Content Security Policies, clickjacking or missing cookie attributes).</li>
                                <li>CSRF where the impact is only to availability.</li>
                                <li>Token reuse or self-XSS exploits - Any attack that exploits rate limits or lack thereof.</li>
                                <li>Sessions that do not get invalidated (password change, 2FA etc).</li>
                                <li>Any attack that requires MITM or physical access to victim's device.</li>
                            </ul>
                        </li>
                    </ul>
                </td>
            </tr>
        </tbody>
    </table>
</figure>
<div className={styles.buttons}>
          <Link
            className={styles.buttonGradient}
            to="https://hackerone.com/d1294485-7463-45e9-9597-c59d4417fa98/embedded_submissions/new"
          >
            Create a Report
          </Link>
        </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
