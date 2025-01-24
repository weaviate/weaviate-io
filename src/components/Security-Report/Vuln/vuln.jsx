import Link from '@docusaurus/Link';
import React from 'react';
import styles from './styles.module.scss';

const socLight = 'dark';

export default function Soc2(props) {
  const { socLight } = props;
  return (
    <div className={styles[socLight]}>
      <div className={styles.soc2Container}>
        <div className="container">
          <div className={styles.box}>
            <div className={styles.soc2Box}>
              <h2>Report a Security Vulnerability</h2>

              <p>
Thanks for participating in our responsible disclosure program. Before beginning your research, we kindly request that you carefully review this program's terms and conditions. This will ensure that your efforts align with our objectives and you receive the proper recognition for any findings that meet the program criteria. Valid and quality reports that meet the below criteria will be awarded with Weaviate swag, recognition on the HackerOne platform and listed on our Weaviate Security Hall of Fame. 


Legal
* Safe Harbour: Activities conducted in a manner consistent with these criteria will be considered authorised conduct, and we will not initiate legal action against you for breach of any applicable license conditions. 
* Individuals located in a country subject to a US or EU embargo or listed on any sanctioned persons list are not permitted to participate.
* Do not publicly disclose issues or post Proofs of Concept until a fix has been confirmed by Weaviate
* Do not deliberately disrupt any Weaviate service or access any accounts or data other than your own
* All testing must be performed as good faith research, with the intent to disclose to Weaviate.

Scope

* Only testing of in-scope products detailed here is allowed:
  - Weaviate Cloud sandbox accounts
  - The console.weaviate.cloud service
  - Weaviate OSS latest released version: https://github.com/weaviate/weaviate
 
* The following are specifically out of scope, and no testing is allowed:
  - Automated scanning or reporting
  - A defense-in-depth option not implemented (such as HTTP header, Content Security Policies, clickjacking or missing cookie attributes)
  - CSRF where the impact is only to availability
  - Token reuse or self-XSS exploits
  - Any attack that exploits rate limits or lack thereof
  - Sessions that do not get invalidated (password change, 2FA etc)
  - Any attack that requires MITM or physical access to victim's device              
</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
