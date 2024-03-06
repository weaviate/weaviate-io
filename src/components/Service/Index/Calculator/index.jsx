import React from 'react';
import './SLAstyles.scss';
import { useState, useEffect } from 'react';
import ToggleSwitch from '/src/components/ToggleSwitch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Link from '@docusaurus/Link';

export default function PricingCalculator({ props }) {
  const [embeddingSize, setEmbeddingSize] = useState(128);
  const [amountOfDataObjs, setAmountOfDataObjs] = useState(0);
  const [queriesPerMonth, setQueriesPerMonth] = useState(0);
  const [slaTier, setSlaTier] = useState('standard');
  const [highAvailability, setHighAvailability] = useState(null);
  const [price, setPrice] = useState({});

  const [storageType, setStorageType] = useState('performance');
  const [activeBtn, setActiveBtn] = useState(null);

  const thresholdForEmbeddingSize = 4096;
  const thresholdForAmountOfDataObjs = 50000000;

  const [showTooltipEmbeddingSize, setShowTooltipEmbeddingSize] =
    useState(false);
  const [showTooltipAmountOfDataObjs, setShowTooltipAmountOfDataObjs] =
    useState(false);

  const storageHandleClick = (type) => {
    setStorageType(type);
    setActiveBtn(type);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setStorageType(value);
  };

  function SelectSwitch({ checked, onChange }) {
    return (
      <div className="select">
        <select
          value={checked ? 'yes' : 'no'}
          onChange={(e) => onChange(e.target.value === 'yes')}
        >
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </div>
    );
  }

  /* https://us-central1-semi-production.cloudfunctions.net/pricing-calculator-v2?embeddingSize=${embeddingSize}&amountOfDataObjs=${amountOfDataObjs}&slaTier=${slaTier}&highAvailability=${
    highAvailability ? 'true' : 'false'
  } */

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const url = `https://us-central1-semi-production.cloudfunctions.net/pricing-calculator-v2?embeddingSize=${embeddingSize}&amountOfDataObjs=${amountOfDataObjs}&slaTier=${slaTier}&highAvailability=${
        highAvailability ? 'true' : 'false'
      }&storageType=${storageType}`;
      const response = await fetch(url);
      const data = await response.json();
      setPrice(data);
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [
    highAvailability,
    slaTier,
    embeddingSize,
    amountOfDataObjs,
    /* queriesPerMonth, */
    storageType,
  ]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('sla')) setSlaTier(params.get('sla'));
    if (params.get('dimensions')) setEmbeddingSize(params.get('dimensions'));
    if (params.get('object_count'))
      setAmountOfDataObjs(params.get('object_count'));
    /*  if (params.get('monthly_queries'))
      setQueriesPerMonth(params.get('monthly_queries')); */
    if (params.get('high_availability'))
      setHighAvailability(
        params.get('high_availability') === 'true' ? true : false
      );
    if (params.get('storage_type')) setStorageType(params.get('storage_type'));
  }, []);

  const handleLabel = (value) => {
    let valueFormated = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return valueFormated;
  };

  const handleChangeEmbeddingSize = (e) => {
    let clearValue = e.target.value.replace('.', '').replace(',', '');
    clearValue = clearValue.replace('.', '').replace(',', '');
    setEmbeddingSize(clearValue);
    setShowTooltipEmbeddingSize(clearValue >= thresholdForEmbeddingSize);
  };

  const handleChangeAmountOfDataObjs = (e) => {
    let clearValue = e.target.value.replace('.', '').replace(',', '');
    clearValue = clearValue.replace('.', '').replace(',', '');
    setAmountOfDataObjs(clearValue);
    setShowTooltipAmountOfDataObjs(clearValue >= thresholdForAmountOfDataObjs);
  };

  const handleChangeQueriesPerMonth = (e) => {
    let clearValue = e.target.value.replace('.', '').replace(',', '');
    clearValue = clearValue.replace('.', '').replace(',', '');
    setQueriesPerMonth(clearValue);
  };

  const onHighAvailabilityChange = (checked) => {
    setHighAvailability(checked);
  };

  const redirectWithPrice = async (event) => {
    const data = {
      url: `https://weaviate.io/pricing?dimensions=${embeddingSize}&object_count=${amountOfDataObjs}&storage_type=${storageType}&sla=${slaTier}&high_availability=${
        highAvailability ? 'true' : 'false'
      }#mainPricingArea`,
      domain: 'link.weaviate.io',
    };

    try {
      const response = await fetch(
        'https://us-central1-semi-production.cloudfunctions.net/create-bitly',
        {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const url = await response.text();
      console.log(url);
      navigator.clipboard.writeText(url);

      // Add code to animate the button here
      const btnText = event.target.innerText;
      event.target.innerText = 'Copied to clipboard';
      setTimeout(() => {
        event.target.innerText = btnText;
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="slaCalculator">
      <div className="pricingCalculator">
        <div className="container">
          <div className="pricingBox">
            <h2 id="mainPricingArea">Estimate your cost for Serverless</h2>
            <p>
              Our pricing is built around vector dimensions stored and queried,
              and different SLA-tiers have different prices per dimension. The
              exact calculation can be found in the FAQ (not inclusive of
              discounts and taxes).
            </p>
          </div>
        </div>
        <div className="container">
          <div className="sliderArea">
            <div className="slider">
              <div className="label">
                <label>Vector Dimensions:</label>
              </div>
              <Slider
                dots={true}
                step={128}
                min={128}
                max={4096}
                value={embeddingSize}
                onChange={(embeddingSize) => {
                  setEmbeddingSize(embeddingSize);
                  setShowTooltipEmbeddingSize(
                    embeddingSize >= thresholdForEmbeddingSize
                  );
                }}
              />
              <div className="value">
                <input
                  className="labelResult"
                  type="text"
                  maxLength="11"
                  placeholder={handleLabel(embeddingSize)}
                  name="embeddingSize"
                  value={handleLabel(embeddingSize)}
                  onChange={handleChangeEmbeddingSize}
                />
                {showTooltipEmbeddingSize && (
                  <div className="customTooltip">
                    You've reached the maximum input limit.{' '}
                    <a href="#contact-sales">
                      Please reach out to us for further information.
                    </a>
                  </div>
                )}
              </div>
            </div>
            <div className="slider">
              <div className="label">
                <label>Data Objects:</label>
              </div>
              <Slider
                min={0}
                max={50000000}
                value={amountOfDataObjs}
                onChange={(amountOfDataObjs) => {
                  setAmountOfDataObjs(amountOfDataObjs);
                  setShowTooltipAmountOfDataObjs(
                    amountOfDataObjs >= thresholdForAmountOfDataObjs
                  );
                }}
              />
              <div className="value">
                <input
                  className="labelResult"
                  type="text"
                  maxLength="11"
                  placeholder={handleLabel(amountOfDataObjs)}
                  name="amountOfDataObjs"
                  value={handleLabel(amountOfDataObjs)}
                  onChange={handleChangeAmountOfDataObjs}
                />
                {showTooltipAmountOfDataObjs && (
                  <div className="customTooltip">
                    You've reached the maximum input limit.{' '}
                    <a href="#contact-sales">
                      Please reach out to us for further information.
                    </a>
                  </div>
                )}
              </div>
            </div>
            {/*    <div className="slider">
            <div className="label">
              <label>Monthly Queries:</label>
            </div>
            <Slider
              step={1000}
              min={0}
              max={100000000}
              value={queriesPerMonth}
              onChange={(queriesPerMonth) => setQueriesPerMonth(queriesPerMonth)}
            />
            <div className="value">
              <input
                className='labelResult'
                name="queriesPerMonth"
                type="text"
                maxLength='11'
                placeholder={handleLabel(queriesPerMonth)}
                value={handleLabel(queriesPerMonth)}
                onChange={handleChangeQueriesPerMonth}
              />
            </div>
          </div> */}
            <div className="selectContainer">
              <label>SLA Tier:</label>
              <div className="select">
                <select
                  value={slaTier}
                  onChange={(event) => setSlaTier(event.target.value)}
                >
                  <option value="standard">Standard</option>
                  <option value="enterprise">Enterprise</option>
                  <option value="businessCritical">Business Critical</option>
                </select>
              </div>
            </div>
            {/*  <div className="btn-group">
            <label htmlFor="storageType">Storage Type:</label>{' '}
            <div className="btn-inner">
              <button
                className={
                  activeBtn === 'performance'
                    ? 'btn-performanceHold'
                    : 'btn-peformance'
                }
                onClick={() => storageHandleClick('performance')}
              >
                Performance
              </button>

              <button
                className={
                  activeBtn === 'compression'
                    ? 'btn-compressionHold'
                    : 'btn-compression'
                }
                onClick={() => storageHandleClick('compression')}
              >
                Compression
              </button>
            </div>
          </div> */}
            <div className="selectContainer">
              <label htmlFor="storageType">Storage Type:</label>
              <div className="select">
                <select value={storageType} onChange={handleChange}>
                  <option value="compression">Compression</option>
                  <option value="performance">Performance</option>
                </select>
              </div>
            </div>
            <div className="selectContainer">
              <div className="highAva">
                <label htmlFor="highAvailability">High Availability:</label>{' '}
              </div>
              {/*   <div className="switchContainer">
              <ToggleSwitch
                id="highAvailability"
                checked={highAvailability}
                onChange={onHighAvailabilityChange}
              />
            </div> */}
              <div className="switchContainer">
                <SelectSwitch
                  checked={highAvailability}
                  onChange={setHighAvailability}
                />
              </div>
            </div>
            <div className="priceBox">
              <div className="price">
                {price.error === false && (
                  <>
                    <span>Your estimated price</span>{' '}
                    <div className="priceFormat">
                      <p>
                        ${' '}
                        <span className="test">
                          {handleLabel(price.priceStr)}
                        </span>{' '}
                        /mo
                      </p>
                    </div>
                  </>
                )}
                {price.error === true && (
                  <Link className={'buttonGradient'} to="#contact-sales">
                    Contact us for more info
                  </Link>
                )}
              </div>
            </div>
            <p>
              Does your use case not fit these parameters?{' '}
              <Link to="#contact-sales">Contact us for more info</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
