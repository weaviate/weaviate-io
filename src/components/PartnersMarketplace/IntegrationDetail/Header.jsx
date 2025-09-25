// src/components/PartnersMarketplace/IntegrationDetail/Header.jsx
import React from 'react';
import Link from '@docusaurus/Link';

// Hero/header layout + buttons live here
import headerCss from '/src/components/PartnersMarketplace/Header/styles.module.scss';

// Hub card/tag styles (e.g., .cardTag) live here
import hubCss from '/src/components/PartnersMarketplace/styles.module.scss';

// Detail-page additive styles (hero padding, tag row spacing, etc.)
import css from './styles.module.scss';

export default function IntegrationHeader({
  name,
  image,
  description,
  tags = [],
  docsUrl,
  ctas = [],
}) {
  return (
    <header
      className={[headerCss.headerSecurity, css.hero].filter(Boolean).join(' ')}
    >
      <div className="container">
        <div className={headerCss.box}>
          <div className={css.logoRow}>
            {image && (
              <img src={image} alt={`${name} logo`} className={css.heroLogo} />
            )}
            <h1 className={css.heroTitle}>{name}</h1>
          </div>

          <div className={headerCss.headerBox}>
            <p>{description}</p>

            <div className={css.tagRow}>
              {tags.map((t) => (
                <span key={t} className={hubCss.cardTag}>
                  {t}
                </span>
              ))}
            </div>

            <div className={headerCss.buttonsContainer}>
              {docsUrl && (
                <Link to={docsUrl} className={headerCss.buttonOutline}>
                  Docs
                </Link>
              )}
              {ctas.map((c) => (
                <Link
                  key={c.url}
                  to={c.url}
                  className={headerCss.buttonGradient}
                >
                  {c.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
