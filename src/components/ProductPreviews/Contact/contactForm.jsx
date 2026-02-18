import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';

const PREVIEW_TO_HUBSPOT_VALUE = {
  engram: 'Engram - Memory for Agents',
  'model-eval': 'Model Evaluation Tool - Cloud Console',
  hfresh: 'HFresh - Weaviate DB',
};

const HUBSPOT_FIELD_NAME = 'early_access_productfeature';

function getPreviewFromUrl() {
  try {
    const url = new URL(window.location.href);
    return url.searchParams.get('preview');
  } catch (e) {
    return null;
  }
}

function setHubspotDropdownInsideIframe(value) {
  if (!value) return;

  let tries = 0;
  const maxTries = 80; // ~8s
  const delay = 100;

  const tick = () => {
    tries++;

    const iframe =
      document.querySelector('#hubspotForm iframe.hs-form-iframe') ||
      document.querySelector('#hubspotForm iframe');

    if (!iframe || !iframe.contentWindow) {
      if (tries < maxTries) return window.setTimeout(tick, delay);
      return;
    }

    const doc = iframe.contentWindow.document;
    const select = doc.querySelector(`select[name="${HUBSPOT_FIELD_NAME}"]`);

    if (select) {
      const values = Array.from(select.options).map((o) => o.value);

      if (!values.includes(value)) {
        if (tries < maxTries) return window.setTimeout(tick, delay);
        return;
      }

      select.value = value;
      select.classList.remove('is-placeholder');
      select.dispatchEvent(new Event('input', { bubbles: true }));
      select.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }

    if (tries < maxTries) window.setTimeout(tick, delay);
  };

  tick();
}

export default function ContactForm() {
  const [title, setTitle] = useState('Get in touch with us');
  const [previewKey, setPreviewKey] = useState(null);

  const scriptRef = useRef(null);
  const formCreatedRef = useRef(false);

  const selectedValue = useMemo(() => {
    if (!previewKey) return null;
    return PREVIEW_TO_HUBSPOT_VALUE[previewKey] || null;
  }, [previewKey]);

  useEffect(() => {
    const sync = () => setPreviewKey(getPreviewFromUrl());

    sync();
    window.addEventListener('popstate', sync);
    window.addEventListener('previewchange', sync);

    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('previewchange', sync);
    };
  }, []);

  useEffect(() => {
    if (selectedValue)
      setTitle(
        <>
          Request early access:
          <br />
          {selectedValue}
        </>,
      );
    else setTitle('Get in touch with us');

    setHubspotDropdownInsideIframe(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    const ensureScript = () =>
      new Promise((resolve) => {
        if (window.hbspt && window.hbspt.forms) return resolve();

        if (scriptRef.current) {
          scriptRef.current.addEventListener('load', resolve, { once: true });
          return;
        }

        const script = document.createElement('script');
        script.src = '//js.hsforms.net/forms/embed/v2.js';
        script.async = true;
        script.setAttribute('data-cookieconsent', 'ignore');
        script.addEventListener('load', resolve, { once: true });

        document.body.appendChild(script);
        scriptRef.current = script;
      });

    const createFormOnce = async () => {
      if (formCreatedRef.current) {
        setHubspotDropdownInsideIframe(selectedValue);
        return;
      }

      await ensureScript();
      if (!window.hbspt || !window.hbspt.forms) return;

      const mount = document.getElementById('hubspotForm');
      if (mount) mount.innerHTML = '';

      window.hbspt.forms.create({
        portalId: '8738733',
        formId: '1fe0b40e-9218-4f92-aa3f-874562bd1702',
        target: '#hubspotForm',
        onFormReady: () => {
          formCreatedRef.current = true;
          setHubspotDropdownInsideIframe(selectedValue);
        },
      });
    };

    createFormOnce();
  }, []);

  return (
    <div className={styles.contactBackground} id="register-interest">
      <div className="container">
        <div className={styles.contactContainer}>
          <div className={styles.contactSection}>
            <form className={styles.formContact}>
              <h2 className={styles.title}>{title}</h2>
              <div id="hubspotForm" data-hs-forms-root="true" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
