import React from 'react';
import { ButtonContainer } from '../../../theme/Buttons';
import styles from './styles.module.scss';
import { LinkButton } from '/src/theme/Buttons';


export default function HomepageIntegrations() {


  return (
    <div className={styles.integrationsSection}>
    <div className="container">
      <div className={styles.box}>

      <div className={styles.right}>
          <h2>Integrations</h2>
          <p>
            Besides Weaviate's capabilities to bring your own vectors, you can also choose one of Weaviate's modules with out-of-the-box support for vectorization. You can also pick from a wide variety of well-known neural search frameworks with Weaviate integrations.
          </p>
       {/*    <ButtonContainer position='left'>
            <LinkButton link="/developers/weaviate/modules" newTab={false}>Learn about Weaviate modules</LinkButton>
          </ButtonContainer> */}
        </div>



      </div>
    </div>

    <div className={styles.integrationsLogos} id={'interLogos'}>
          <div className={styles.inside}>
          <div className={styles.logoBg}>
            <span className={styles.logoAI} />
</div>

<div className={styles.logoBg}>
            <span className={styles.logoH} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoJ} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoD} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoCo} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoW} />
            </div>


<div className={styles.logoBg}>
            <span className={styles.logoH} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoJ} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoD} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoCo} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoW} />
            </div>
          </div>

        </div>

        <div className={styles.integrationsLogos + ' ' + styles.mobileIntegrations} >
          <div className={styles.inside}>
          <div className={styles.logoBg}>
            <span className={styles.logoAI} />
</div>
<div className={styles.logoBg}>
            <span className={styles.logoH} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoJ} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoD} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoCo} />
            </div>
            <div className={styles.logoBg}>
            <span className={styles.logoW} />
            </div>
          </div>

        </div>

    </div>
  );
}


