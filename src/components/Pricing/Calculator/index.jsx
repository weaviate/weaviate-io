import React from 'react';
import './styles.scss';
import { useState, useEffect } from 'react';
import ToggleSwitch from '../../ToggleSwitch';
import Slider from 'react-rangeslider';

export default function PricingCalculator() {
  const [embeddingSize, setEmbeddingSize] = useState(100);
  const [amountOfDataObjs, setAmountOfDataObjs] = useState(0);
  const [queriesPerMonth, setQueriesPerMonth] = useState(0);
  const [slaTier, setSlaTier] = useState('standard');
  const [highAvailability, setHighAvailability] = useState(false);
  const [price, setPrice] = useState({});

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      const url = `https://us-central1-semi-production.cloudfunctions.net/pricing-calculator?embeddingSize=${embeddingSize}&amountOfDataObjs=${amountOfDataObjs}&queriesPerMonth=${queriesPerMonth}&slaTier=${slaTier}&highAvailability=${
        highAvailability ? 'true' : 'false'
      }`;
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
    queriesPerMonth,
  ]);

  const onHighAvailabilityChange = (checked) => {
    setHighAvailability(checked);
  };

  return (
    <div className="pricingCalculator">
      <div className="container">
        <div className="pricingBox">
          <h2>Pay as you grow</h2>
          <p>
            Our pricing is built around vector dimensions stored and queried,
            and different SLA-tiers have <br /> different prices per dimension.
            The exact calculation can be found in the FAQ below. <br /> (not
            inclusive of discounts and taxes).
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
              step={1}
              min={100}
              max={12800}
              value={embeddingSize}
              onChange={(embeddingSize) => setEmbeddingSize(embeddingSize)}
            />
            <div className="value">
              <input
                type="text"
                placeholder={embeddingSize}
                name="embeddingSize"
                value={embeddingSize.valueAsNumber}
                onChange={(e) => parseInt(setEmbeddingSize(e.target.value))}
              />
            </div>
          </div>
          <div className="slider">
            <div className="label">
              <label>Data Objects:</label>
            </div>
            <Slider
              step={2}
              min={0}
              max={100000000}
              value={amountOfDataObjs}
              onChange={(amountOfDataObjs) =>
                setAmountOfDataObjs(amountOfDataObjs)
              }
            />
            <div className="value">
              <input
                type="text"
                placeholder={amountOfDataObjs}
                name="amountOfDataObjs"
                value={amountOfDataObjs.valueAsNumber}
                onChange={(e) => parseInt(setAmountOfDataObjs(e.target.value))}
              />
            </div>
          </div>
          <div className="slider">
            <div className="label">
              <label>Monthly Queries:</label>
            </div>
            <Slider
              step={3}
              min={0}
              max={250000000}
              value={queriesPerMonth}
              onChange={(queriesPerMonth) =>
                setQueriesPerMonth(queriesPerMonth)
              }
            />
            <div className="value">
              <input
                name="queriesPerMonth"
                type="text"
                placeholder={queriesPerMonth}
                value={queriesPerMonth.valueAsNumber}
                onChange={(e) => parseInt(setQueriesPerMonth(e.target.value))}
              />
            </div>
          </div>
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
              <span className="focus"></span>
            </div>
          </div>
          <div className="priceBox">
            <div className="highAva">
              <label htmlFor="highAvailability">High Availability:</label>{' '}
            </div>
            <div className="switchContainer">
              <ToggleSwitch
                id="highAvailability"
                checked={highAvailability}
                onChange={onHighAvailabilityChange}
              />
            </div>
            <div className="price">
              {price.error === false && (
                <>
                  <span>Your estimated price</span>{' '}
                  <div className="priceFormat">
                    <p>
                      $ <span className="test">{price.priceStr}</span> /mo
                    </p>
                  </div>
                </>
              )}
              {price.error === true && (
                <a href="mailto:hello@weaviate.io" className="salesBtn">
                  Contact Us
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
