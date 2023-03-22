import React from 'react';
import './styles.scss';
import { useState, useEffect } from 'react';
import ToggleSwitch from '/src/components/ToggleSwitch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default function PricingCalculator({props}) {
  const [embeddingSize, setEmbeddingSize] = useState(128);
  const [amountOfDataObjs, setAmountOfDataObjs] = useState(100000);
  const [queriesPerMonth, setQueriesPerMonth] = useState(100000);
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

  useEffect(() => {
    const params =  new URLSearchParams(window.location.search)
    if(params.get('sla')) setSlaTier(params.get('sla'));
    if(params.get('dimensions')) setEmbeddingSize(params.get('dimensions'));
    if(params.get('object_count')) setAmountOfDataObjs(params.get('object_count'));
    if(params.get('monthly_queries')) setQueriesPerMonth(params.get('monthly_queries'));
    if(params.get('high_availability')) setHighAvailability(params.get('high_availability') === 'true' ? true : false);
  },[])

  const handleLabel = (value) => {
    let valueFormated = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    return valueFormated;
  }

  const handleChangeEmbeddingSize = (e) => {
    let clearValue = e.target.value.replace('.','').replace(',','');
    clearValue = clearValue.replace('.','').replace(',','');
    setEmbeddingSize(clearValue)
  };

  const handleChangeAmountOfDataObjs = (e) => {
    let clearValue = e.target.value.replace('.','').replace(',','');
    clearValue = clearValue.replace('.','').replace(',','');
    setAmountOfDataObjs(clearValue)
  };

  const handleChangeQueriesPerMonth = (e) => {
    let clearValue = e.target.value.replace('.','').replace(',','');
    clearValue = clearValue.replace('.','').replace(',','');
    setQueriesPerMonth(clearValue)
  };


  const onHighAvailabilityChange = (checked) => {
    setHighAvailability(checked);
  };

  const redirectWithPrice = async () => {
    const data = {
      long_url: `https://weaviate.io/pricing?dimensions=${embeddingSize}&object_count=${amountOfDataObjs}&monthly_queries=${queriesPerMonth}&sla=${slaTier}&high_availability=${highAvailability ? 'true' : 'false'}`,
      domain: "link.weaviate.io"
    }
    await fetch('https://us-central1-semi-production.cloudfunctions.net/create-bitly', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    .then(res => console.log('success'))
    .catch(err => console.log('error',err))
  }

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
                className='labelResult'
                type="text"
                maxLength='11'
                placeholder={handleLabel(embeddingSize)}
                name="embeddingSize"
                value={handleLabel(embeddingSize)}
                onChange={handleChangeEmbeddingSize}
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
                className='labelResult'
                type="text"
                maxLength='11'
                placeholder={handleLabel(amountOfDataObjs)}
                name="amountOfDataObjs"
                value={handleLabel(amountOfDataObjs)}
                onChange={handleChangeAmountOfDataObjs}
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
          </div>
          <div className="selectContainer">
            <label>SLA Tier:</label>
            <div className="select">
              <select value={slaTier} onChange={(event) => setSlaTier(event.target.value)}>
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
            <div className='switchContainer'>
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
                  <div className='priceFormat'>
                    <p>$ <span className='test'>{price.priceStr}</span> /mo</p>
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
        <div className={'buttons'}>
            <div className={'buttonOutline'} onClick={redirectWithPrice}>
              Share this pricing
            </div>
          </div>
      </div>
    </div>
  );
}
