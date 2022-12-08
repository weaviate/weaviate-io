---
title: Weaviate Pricing
layout: default
og: /img/og/og-pricing-v2.jpg
---

<section class="sec banner-sec pricing-banner pb-0">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 text-center">
                <div class="banner-content">
                    <h1 class="banner-title">
                        <span>Weaviate </span> Cloud Services
                    </h1>
                    <p>
                        Start for <b class="text-primary">free</b> and <b class="text-primary">pay as you go</b> per <b class="text-primary">vector dimension</b> stored and queried
                    </p>
                    <p>
                        All paid plans deliver unlimited capacity over three different tiers, so your DBs may scale seamlessly
                    </p>   
                    <p>
                        Starting from <b class="text-primary">$0.05</b> per <b class="text-primary">1 million vector dimensions</b>
                    </p>
                    <div class="gap"></div>
                    <div class="btn-group">
                        <ul class="unstyled">
                            <li>
                                <a href="#register" class="w-btn w-btn-fill">Register for Private Beta</a>
                            </li>
                            <li>
                                <a href="https://console.semi.technology/" class="w-btn w-btn-fill" target="_blank">Create a free sandbox</a>
                            </li>
                        </ul>
                    </div>     
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <div class="row">
            <div class="col-md-4 text-center">
                <div class="feature-box">
                    <img src="/img/free.png" alt="discount">
                    <h2>Get started for free</h2>
                    <p>
                        Signup and get to your first 10k data objects for free. No credit card necessary.
                    </p>
                </div>
            </div>
            <div class="col-md-4 text-center">
                <div class="feature-box">
                    <img src="/img/vector.png" alt="discount">
                    <h2>Pay per ML-vector</h2>
                    <p>
                        Starting from<br>$0.05/million vector dimension​s
                    </p>
                </div>
            </div>
            <div class="col-md-4 text-center">
                <div class="feature-box">
                    <img src="/img/discount.png" alt="discount">
                    <h2>Different SLAs</h2>
                    <p>
                        Choose from the three different SLA types, for startups and enterprises
                    </p>
                </div>
            </div>
        </div>
    </div>  
</section>
<section class="sec bg-gray sec-calculator">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-6 text-center" id="calculator">
                <div class="gap"></div>
                <div class="box-content">
                    <h2>
                        Pay as you grow
                    </h2>
                    <p>
                        Our pricing is built around vector dimensions stored and queried, and different SLA-tiers have different prices per dimension. The exact calculation can be found in the <a href="#FAQ">FAQ</a> below.<br><small>(not inclusive of discounts and taxes)</small>.
                    </p>
                </div>
            </div>
        </div>
        <div class="gap"></div>
        <div class="row">
            <div class="col-md-12">
                <div class="calculator-wrap">
                    <div class="item item-one">
                        <div class="item-title">
                            <span>Vector Dimensions <b style="cursor:help;color:#D20268;text-decoration:underline;" data-toggle="popover" title="Popover title" data-content="And here's some amazing content. It's very engaging. Right?" title="V​ector dimensions are the individual dimensions per individual embedding produced by your machine learning model. ​For example, some sentence transformers have 384​ dimensions, whereas some OpenAI dimensions have up to 12,800 dimensions.​">[?]</b></span>
                        </div>
                        <div class="item-input">
                            <input type="range" class="rangeinput" id="rangeslider1" value="100" min="0" max="12800" step="1">
                        </div>
                        <div style="margin-left:2rem;">
                            <input style="max-width: 9rem;" class="form-control rangeslider_input" id="rangeslider1_input" value="100" min="0" max="12800">
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">
                            <span>Data Objects</span>
                        </div>
                        <div class="item-input">
                            <input type="range" class="rangeinput" id="rangeslider2" value="0" min="0" max="100000000" step="10000">
                        </div>
                        <div style="margin-left:2rem;">
                            <input style="max-width: 9rem;" type="text" class="form-control rangeslider_input" id="rangeslider2_input" value="0" min="0" max="250000000">
                        </div>
                    </div>
                    <div class="item">
                        <div class="item-title">
                            <span>Monthly Queries</span>
                        </div>
                        <div class="item-input">
                            <input type="range" class="rangeinput" id="rangeslider3" value="0" min="0" max="250000000" step="10000">
                        </div>
                        <div style="margin-left:2rem;">
                            <input style="max-width: 9rem;" type="text" class="form-control rangeslider_input" id="rangeslider3_input" value="0" min="0" max="1000000000">
                        </div>
                    </div>
                    <div class="item item-select">
                        <div class="item-title">
                            <span>SLA Tier</span>
                        </div>
                        <div class="item-input">
                            <select class="inputselect" id="sla-select">
                                <option value="standard">Standard</option>
                                <option value="enterprise">Enterprise</option>
                                <option value="businessCritical">Business Critical</option>
                            </select>
                        </div>
                    </div>
                    <div class="item item-submit">      
                        <div class="item-title">
                            <span>High Availability</span>
                        </div>                  
                        <div class="item-input submitfield">
                            <div class="button-wrap">
                                <label class="switch">
                                    <input type="checkbox" id="ha-select" value="true">
                                    <span class="slider round"></span>
                                </label>
                            </div>
                            <div class="main-price">
                                <a href="mailto:hello@semi.technology" class="w-btn" id="contact-sales" style="display: none">Contact Us</a>
                                <span class="total-price">Your estimated price</span>
                                <div class="total-price">
                                    <span>$</span>
                                    <strong id="total-price-val">25</strong>
                                    <span>/mo</span>
                                </div>
                                <div id="getLinkToPrice" style="display:none">
                                    <p>
                                        <button type="button" class="btn btn-secondary btn-sm" style="font-size: 0.75rem; padding: 0.25rem 0.5rem; margin-top: 1rem;">
                                            get a link to this price
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>       
    </div>
</section>
<section class="sec sec-plan">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-7 text-center text-light">
                <div class="gap"></div>
                <div class="box-content">
                    <h2>
                        Pick your plan
                    </h2>
                    <p>
                        Our pricing is designed to give you all the capabilities to build and test your applications for free. When you are ready to move to production, simply pick a plan that best suits your needs.
                    </p>
                </div>
            </div>
        </div>
        <div class="gap"></div>
        <div class="row">
            <div class="col-md-12">
                <div class="sand-box">
                    <div class="row align-items-center">
                        <div class="col-md-3 text-center">
                            <div class="pay-box one">
                                <h3 class="sandbox">Sandbox</h3>
                                <h3>Free</h3>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="pay-box">
                                <ul class="list-unstyled">
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                        Round robin region: AWS, Azure, GCP
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                        30 days lifetime
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-2">
                            <div class="pay-box">
                                <ul class="list-unstyled">
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                        Monitoring
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                        <a href="{{ site.slack_signup_url }}">Public Slack</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md-3">
                            <div class="pay-box">
                                <ul class="list-unstyled">
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                        Community support
                                    </li>
                                    <li>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                        Single AZ
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="gap gap3x"></div>
        <div class="row">
            <div class="col-md-4 text-center">
                <div class="price-item">
                    <h2>Standard</h2>
                    <div class="header">
                        <span class="fto">from</span>
                        <p class="price">
                            <span class="cr">$</span>
                            <span class="cu">25</span>
                            <span class="mo">/mo</span>
                        </p>
                    </div>
                    <div class="content">
                        <ul class="list-unstyled plan-feature">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                $0.050 per 1M vector dimensions stored or queried per month
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Round robin region: AWS, Azure, GCP
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                ∞ lifetime (until terminated)
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Hibernation after 1 hour
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Monitoring
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Public Slack
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                <span>Severity 1 - max 1h</span>
                                <span>Severity 2 max</span>
                                <span> 4h Severity 3</span>
                                <span>Severity 3 max 1bd </span>
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Multi AZ
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                HA optional
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-center">
                <div class="price-item">
                    <h2>Enterprise</h2>
                    <div class="header">
                        <span class="fto">from</span>
                        <p class="price">
                            <span class="cr">$</span>
                            <span class="cu">135</span>
                            <span class="mo">/mo</span>
                        </p>
                    </div>
                    <div class="content">
                        <ul class="list-unstyled plan-feature">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                $0.100 per 1M vector dimensions stored or queried per month
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                AWS, Azure, GCP
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                ∞ lifetime (until terminated)
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Hibernation after 8 hours
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Monitoring
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                SeMI Slack or Teams / Email
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Severity 1 - max 1h <br>
                                 Severity 2 - max 4h <br> Severity 3 - max 1bd
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Multi AZ
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                HA optional
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4 text-center">
                <div class="price-item business-item">
                    <h2>Business Critical </h2>
                    <div class="header">
                        <span class="fto">from</span>
                        <p class="price">
                            <span class="cr">$</span>
                            <span class="cu">450</span>
                            <span class="mo">/mo</span>
                        </p>
                    </div>
                    <div class="content">
                        <ul class="list-unstyled plan-feature">
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                $0.175 per 1M vector dimensions stored or queried per month
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                AWS, Azure, GCP
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                ∞ lifetime (until terminated)
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Always on
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Monitoring
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                SeMI Slack or Teams / Email
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Severity 1 - max 1h <br>
                                 Severity 2 - max 4h <br> Severity 3 - max 1bd
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                Multi AZ
                            </li>
                            <li>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Pro 5.15.4 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) --><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
                                HA optional
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="gap gap3x"></div>
        <div class="row">
            <div class="col-12 text-center">
                <a href="#register" class="w-btn">Register for Private Beta</a>
            </div>
        </div>
    </div>
</section>
<section class="sec sec-faq bg-gray pb-0">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8 text-center">
                <div class="box-content">
                    <h2 id="FAQ">
                        Frequently asked questions
                    </h2>
                    <p>
                        Let us help answer the most common questions you might have.
                    </p>
                </div>
            </div>
        </div>
        <div class="gap"></div>
        <div class="gap"></div>
        <div class="row">
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        What do you mean by "1 million vector dimensions"?
                    </h3>
                    <p>
                        In Weaviate, you can attach a vector embedding to a data object. A vector embedding can have an x-amount of dimensions. <br/>
                        To calculate <b class="text-secondary">vector dimensions</b>, multiply the <b class="text-primary">number of data objects</b> by the <b class="text-primary"> number of embedding dimensions</b>.
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        Why do you price per vector dimension?
                    </h3>
                    <p>
                        Some vectors have a lot of embeddings (sometimes more than 10k), some just a few (e.g., 90). The more vector dimensions you store, the more infrastructure is needed to optimize and maintain performance, this is the reason why we calculate with individual dimensions. We believe it's the fairest and most accurate price to give you the best experience.
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        What's the Weaviate pricing formula?
                    </h3>
                    <p>
                        You pay for the total amount of embedding dimensions stored per data object and per data object queried. For example, if you have a 100-dimensional embedding and you store 1k documents that you query 1k times per month. You pay for 200k dimensions. 
                        <br><br>
                        <code>(stored objects + objects queried) * embedding dimension size * SLA tier price per dimension</code>
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        Is there a difference between Weaviate open source and the Weaviate version used by the WCS?
                    </h3>
                    <p>
                        No, the Weaviate Cloud Service (WCS) is a different solution using the same code as Weaviate open-source. The difference is the WCS itself (i.e., SaaS) and different SLA types (opposed to the open-source BSD3 license).
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        Is there a discount for non-profits, startups, or students?
                    </h3>
                    <p>
                        ​Yes, please reach out to us at <a href="mailto:hello+discount@semi.technology">hello+discount@semi.technology</a>.​
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        ​Is the Weaviate Cloud Service SOC2 compliment?
                    </h3>
                    <p>
                        Not yet; we are currently in the process of becoming SOC2 compliant. Feel free to email us for a status update on <a href="mailto:hello+soc2@semi.technology">hello+soc2@semi.technology</a>.​
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        What is Hibernation?
                    </h3>
                    <p>
                        ​Hibernation ​is a process where a cluster goes down (i.e., "hybernates") while retaining your data after a given period. This is ideal for research or development purposes; when the service endpoints are used again, the service comes back up with a short time delay.
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        ​What is round-robin provisioning?​
                    </h3>
                    <p>
                        ​If your SLA tier contains round-robin provisioning, the Weaviate Cloud Service will provision on Amazon Web Services (AWS), Google Cloud Platform (GCP), ​or Microsoft Azure where enough resources are available.
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        Do I pay for data objects without embeddings?
                    </h3>
                    <p>
                        ​No, storage of data objects without vector embeddings is on us.​
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        ​W​hich Weaviate modules​ are available?​
                    </h3>
                    <p>
                        ​Weaviate modules based on inference APIs are automatically integrated in the cloud service. These modules currently include Hugging Face Inference and OpenAI's embeddings end-points.​
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        Can I store data from different models with different embedding sizes?
                    </h3>
                    <p>
                        Yes
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        ​My use case fluctuates in the number of data objects stored per month, how do you calculate the total number of objects per month?
                    </h3>
                    <p>
                        ​We take the median number of vectors per month measured per hour.
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        What if I have an unexpected ​usage spike?
                    </h3>
                    <p>
                        Usage spikes are -almost- always a good sign! Your Weaviate-powered app or platform is being actively used, and we don't want your bill to be in the way of your success. Spikes are analyzed at the end of the month, and occasional ones are on us.​
                    </p>
                </div>
            </div>
            <div class="col-md-6">
                <div class="faq-item">
                    <h3>
                        Who is behind Weaviate?​
                    </h3>
                    <p>
                        ​The company behind Weaviate is <a href="https://semi.technology" target="_blank">SeMI Technologies</a>. They run the Cloud Service and maintain the open source software.​
                    </p>
                </div>
            </div>
        </div>
        <div class="gap gap3x"></div>
    </div>
</section>
<section class="sec sec-newsletter pt-0">
    <div class="row justify-content-center">
        <div class="col-md-7">
            <div class="newsletter-content" id="register">
                <img src="/img/register1.png" alt="register">
                <h2>
                    Register for Private Beta
                </h2>
                <p>
                    We are currently onboarding customers onto the Weaviate Cloud Services via the Private Beta program. Please leave your contact details below if you want to join the first wave of managed vector search users. After leaving your details, a representative will reach out to you within 24 hours to investigate if you qualify for the private beta program.
                </p>
                <form class="subscribe-form">
                    <div class="row">
                        <div class="col-md-6">
                            <input type="text" class="finput bdr-bottom" placeholder="Name" id="signUpForPrivateBeta-name" required>
                        </div>
                        <div class="col-md-6">
                            <input type="email" class="finput bdr-bottom" placeholder="email" id="signUpForPrivateBeta-email" required>
                        </div>
                        <div class="col-md-12">
                            <select class="finput inputselect" id="signUpForPrivateBeta-foundHow">
                                <option value="conference talk">Conference Talk</option>
                                <option value="blogpost">Blogpost</option>
                                <option value="search-engine">Search engine (e.g., Google or DuckDuckGo)</option>
                                <option value="github-list">Github list</option>
                                <option value="reddit">Reddit</option>
                                <option value="twitter">Twitter</option>
                                <option value="friend">A friend</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        <div class="col-md-12">
                            <button class="btn w-btn-fill submit-btn" id="signUpForPrivateBeta">Sign Up for the Private Beta</button>
                        </div>
                        <div class="col-md-12" id="thank-you" style="display:none">
                            Thank you! You've received a confirmation email 🙏
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>


<!-- modal window for sharing link -->
<div class="modal fade" id="shareLinkModal" tabindex="-1" role="dialog" aria-labelledby="shareLinkModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-body">
        <p>
            Copy this link to share this pricing configuration
        </p>
        <div class="input-group input-group-lg">
            <input type="text" class="form-control" aria-label="Large" aria-describedby="inputGroup-sizing-sm" id="linkToShare">
        </div>
      </div>
    </div>
  </div>
</div>
