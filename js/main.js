/**
 * General JS package for Weaviate.io
 */

// Format numbers
function addCommas(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

// function to get JSON
var getUrl = function(url, reqType, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = reqType;
    xhr.onload = function() {
      var status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status, xhr.response);
      }
    };
    xhr.send();
};

// Highlight JS
hljs.registerLanguage('graphql', window.hljsDefineGraphQL);
hljs.highlightAll();

// Version check for documentation version picker
var versionPicker = document.getElementById('view_version');
if (versionPicker) {
    var currentVersion = window.location.pathname.split("/")[3];
    var currentDocs = window.location.pathname.split("/")[2];
    // set the correct version
    versionPicker.innerHTML = currentVersion;
    // // on change, go to the right version
    // versionPicker.addEventListener('change', function(){
    //     var newVersion = versionPicker.value;
    //     var newLocation = window.location.pathname.replace(currentVersion, newVersion);
    //     var request = new XMLHttpRequest();
    //     request.open('GET', newLocation, true);
    //     request.onreadystatechange = function () {
    //     if (request.readyState === 4) {
    //         if (request.status === 404) {
    //         window.location = '/developers/' + currentDocs + '/' + newVersion + '/';
    //         } else {
    //         window.location = newLocation;
    //         }
    //     }
    //     };
    //     request.send();
    // });
}

// Make headers in docs clickable
var currentElement, headerId;
if(window.location.pathname.includes('/developers/')){
    var headers = document.getElementsByTagName('h1');
    for(var i = 0; i < headers.length; i++) {
        if(typeof headers[i].id != 'undefined' && headers[i].id != ''){
            currentElement = document.getElementById(headers[i].id);
            currentElement.style.cursor = 'pointer';
            currentElement.onclick = function(){
                if(window.location.hash != '#' + this.id){
                    window.location.assign('#' + this.id);
                }
            };
        }
    }
}

// Scroll docs if header has a #
if(window.location.pathname.includes('/developers/')){
    var scrollHash = function(){
        window.scrollBy(0, -100);
    }
    window.onhashchange = function(){
        scrollHash();
    };
    if(window.location.hash) {
        scrollHash();
    }
}

// Add stars and downloads from API
var dockerPulls = document.getElementById('show_containers');
var githubStars = document.getElementById('show_github_stars');
if (dockerPulls && githubStars) {
    // get docker pulls
    getUrl('https://europe-west1-semi-production.cloudfunctions.net/docker-hub-pulls', 'text', 
        function(err, data) {
        if (err !== null) {
            dockerPulls.innerHTML = '🤷';
        } else {
            dockerPulls.innerHTML = data;
        }
    });
    // get github stars
    getUrl('https://api.github.com/repos/semi-technologies/weaviate', 'json', 
        function(err, data) {
        if (err !== null) {
            githubStars.innerHTML = '🤷';
        } else {
            githubStars.innerHTML = addCommas(data.stargazers_count);
        }
    });
}

// ToC links
var toc = document.getElementById('table-of-contents');
if (toc){
    toc = toc.getElementsByTagName('a');
    for (tocKey in toc){
        if(isNaN(tocKey) === false){
        toc[tocKey].classList.add('list-link');
        }
    }
}

// set total pulls
var totalpullsDiv = document.getElementById('totalpulls');
if(totalpullsDiv){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (req.readyState === 4) {
        if (totalpullsDiv) {
            totalpullsDiv.src =
            'https://img.shields.io/badge/downloads-' +
            req.responseText +
            '-yellow?style=flat-square';
        }
      }
    };
    req.open('GET', 'https://europe-west1-semi-production.cloudfunctions.net/docker-hub-pulls');
    req.send(null);
}

// handle more info request
var requestMoreInfoBtn = document.getElementById('requestMoreInfo');
if(requestMoreInfoBtn){
    // validate the email
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    // send the documents
    function requestDocs(emailAddress, downloadlinkid){
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open('GET', 'https://europe-west1-semi-production.cloudfunctions.net/sendgrid-request-slidedeck?email=' + emailAddress + '&downloadLinkId=' + downloadlinkid);
        xmlHttp.send(null);
        return xmlHttp.status;
    }
    requestMoreInfoBtn.onclick = function(){
        // e.preventDefault();
        var emailAddress = document.getElementById('requestMoreInfo-email').value;
        if(validateEmail(emailAddress) === true){
            requestDocs(emailAddress, requestMoreInfoBtn.dataset.downloadlinkid);
            document.getElementById('requestMoreInfo-box-success').style.display = 'block';
            document.getElementById('requestMoreInfo-box-invalid-email').style.display = 'none';
        } else {
            document.getElementById('requestMoreInfo-box-invalid-email').style.display = 'block';
        }
    };
}

// TawkTo
var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
    var s1 = document.createElement("script"),s0=document.getElementsByTagName("script")[0];
    s1.async=true;
    s1.src='https://embed.tawk.to/5cacd7a453f1e453fb8cf97f/default';
    s1.charset='UTF-8';
    s1.setAttribute('crossorigin','*');
    s0.parentNode.insertBefore(s1,s0);
})();
