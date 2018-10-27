  document.addEventListener("DOMContentLoaded", function () {
    // const virwire_url = 'https://virwire.com/d/urls/SAY';
    const NEWSFEED = document.getElementById('newsfeed');
    const MAINHEADER = document.getElementById('mainheader');

    //FUNCTIONS:

    function timeAgo(dataMilliseconds) {
      let nowTime = Date.now() / 1000;
      let minutes = (nowTime - dataMilliseconds) / 60;

      let time_ago;

      if (minutes <= 0) {
        time_ago = '';
      } else {
        if (Math.ceil(minutes) === 1) {
          time_ago = `1 minute ago`;
        } else if (minutes > 60) {
          time_ago = `${Math.floor(minutes / 60 )} hours ago`;
        } else if (minutes > 1440) {
          time_ago = `${Math.floor((minutes / 60 ) / 24)} days ago`;
        } else {
          time_ago = `${Math.ceil(minutes)} minutes ago`;
        }
        time_ago += '&nbsp;&nbsp;';
      }
      return time_ago;

    };

    window.dataObj = {
      'current': [],
      'store': [],
      'uniqueIdArray': [],
      'added': 0,

    }
    // Fetch time from server: //     fetch('https://virwire.com/d/time', {method: 'POST'}).then(function (response) { console.log(response.json()); })
    function randomColorClass() {
      let emotion_array = ['joy', 'trust', 'fear', 'surprise', 'sadness', 'disgust', 'rage', 'interest'];
      let random_emotion = emotion_array[//4];
      Math.floor(Math.random() * 8)];
      return [`color_meter_frame_path_${random_emotion}`, `color_meter_rotator_path_${random_emotion}`, `color_meter_container_path_${random_emotion}`, random_emotion.charAt(0).toUpperCase() + random_emotion.slice(1), `tooltip_${random_emotion}`];
    }

    // Generate Syndication info: //
    function syndicationGenerator() {
      let random_variable = Math.floor((Math.random() * 3) + 1);

      let name_array = ['Jimmy', 'John', 'Robert', 'Paul'];
      let l_name_array = ['Plant', 'Page', 'Bonham', 'Jones'];

      let hash_array = ['JT9485TJJ578', '4590T6UI9GDK8', 'DF9JSERTJ89DH', 'SE0R9TGJSERT', 'FDSG0FGJS8DG', 'SD0FGJSDFG9UI9', '0S9DF8G9SDFG', 'S0DFG789SD90FG', 'SD8FG7SD8G', 'ASD8F7ASFGSDF'];
 
      if (random_variable === 1) {
        let syndication_dom = 
        `<div class="syndication">
        <button class="synd_button"><svg class="syndication_medal" xmlns="http://www.w3.org/2000/svg" viewBox="-67 0 512 512"><path class="medal_badge" d="M286.957 164.504c3.934-2.707 6.516-7.234 6.516-12.367 0-7.032-4.848-12.918-11.38-14.543l83.587-83.586c16.363-16.36 14.234-29.832 11.511-36.406C374.47 11.027 366.445 0 343.31 0H35.758C12.62 0 4.598 11.027 1.875 17.602c-2.723 6.574-4.852 20.046 11.512 36.406l83.586 83.59c-6.532 1.62-11.375 7.507-11.375 14.539 0 5.133 2.582 9.664 6.511 12.367C38.176 197.449 2.102 256.875 2.102 324.57 2.102 427.918 86.184 512 189.535 512c103.348 0 187.43-84.082 187.43-187.434 0-67.691-36.078-127.117-90.008-160.062zm59.895-134.332a33.877 33.877 0 0 1-2.383 2.625l-104.344 104.34h-71.184l7.426-7.422s0-.004.004-.004l14.188-14.191L276.082 30h67.227c1.398 0 2.57.066 3.543.172zm-157.317 43.95L145.415 30h88.237zM32.215 30.167A34.234 34.234 0 0 1 35.758 30h67.226l65.336 65.332-35.593 35.594-98.13-98.13a33.145 33.145 0 0 1-2.382-2.628zM189.535 482c-86.808 0-157.433-70.625-157.433-157.434 0-86.804 70.625-157.43 157.433-157.43 86.805 0 157.43 70.626 157.43 157.43 0 86.809-70.625 157.434-157.43 157.434zm0 0"/>
                                                                                                                              <path class="medal_star"  d="M230.875 268.227l-27.89-56.508a15 15 0 0 0-13.45-8.364h-.004a15 15 0 0 0-13.449 8.364l-27.89 56.508-62.36 9.058a15.013 15.013 0 0 0-12.11 10.211 15 15 0 0 0 3.798 15.375l45.125 43.988-10.653 62.106a15.003 15.003 0 0 0 5.965 14.672 15.003 15.003 0 0 0 15.797 1.14l55.777-29.324 55.774 29.324a14.965 14.965 0 0 0 6.98 1.723h.055c8.27-.016 14.969-6.727 14.969-15a14.98 14.98 0 0 0-.375-3.348l-10.512-61.293 45.121-43.988a15 15 0 0 0 3.797-15.375 15.013 15.013 0 0 0-12.11-10.21zm-1.043 62.652a14.995 14.995 0 0 0-4.312 13.277l6.847 39.922-35.851-18.848a15.004 15.004 0 0 0-13.961 0l-35.856 18.852 6.848-39.926a14.995 14.995 0 0 0-4.313-13.277l-29.007-28.274 40.085-5.824a14.999 14.999 0 0 0 11.293-8.207l17.926-36.324 17.93 36.324a14.999 14.999 0 0 0 11.293 8.207l40.086 5.824zm0 0"/></svg></button>
        <section class="syndicate_data">
          <p>Author: ${name_array[Math.floor(Math.random() * 3)] + ' ' + l_name_array[Math.floor(Math.random() * 3)]}</p>
          <p>Date: 10/03/2018</p>
          <p>Hash: ${hash_array[Math.floor(Math.random() * 10)]}</p>
          <button class="syndicate_approval"> Confirm </button>
        </section>
      </div>`;
      return syndication_dom;
      } else {
        return '';
      }
    }
    
    // Fetch Current articles FUNCTION --START--
    fetch('https://virwire.com/d/urls/SAY', {
        method: 'GET'
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        window.dataObj.current = data;

        


        window.dataObj.current.forEach(element => {
          let new_article = document.createElement('ARTICLE');
          new_article.classList.add('base');

          let article_emotion = randomColorClass();
          

          window.dataObj.uniqueIdArray.push(element.uid);

          new_article.innerHTML = `<h2 class="title"><a href="${element.short_url}" target="_blank">${element.title}</a></h2>
          
          <div class="article_details">
                  ${element.top_story == 1 ? '<h4 class="alert">Top Story</h4>' : ''}
                  <h3 class="post_time">${timeAgo(element.insert_time)}	&bull; </h3>
                  <h3 class="web_url">${element.site}</h3>
                  ${syndicationGenerator()}
          </div>
          <div class="component_footer">
              <section class="shares">
                      <svg class="share_button" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                  <span class="shares_qty">${element.velocity.ttl_vol} shares</span>
              </section>


              <section class="emotion_meter ${article_emotion[2]}">
                     
                          
            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421">
            <path class="${article_emotion[0]}" d="M12.00254 4.0939c4.365 0 7.909 3.544 7.909 7.909s-3.544 7.909-7.909 7.909-7.909-3.544-7.909-7.909 3.544-7.909 7.909-7.909zm0 1.977c3.274 0 5.932 2.658 5.932 5.932 0 3.273-2.658 5.931-5.932 5.931-3.274 0-5.932-2.658-5.932-5.931 0-3.274 2.658-5.932 5.932-5.932z"/>
            <path class="${article_emotion[0]}" d="M12.00254-.0001c6.624 0 12.003 5.378 12.003 12.003 0 6.624-5.379 12.002-12.003 12.002-6.624 0-12.003-5.378-12.003-12.002 0-6.625 5.379-12.003 12.003-12.003zm0 1.876c5.589 0 10.127 4.538 10.127 10.127s-4.538 10.126-10.127 10.126-10.127-4.537-10.127-10.126c0-5.589 4.538-10.127 10.127-10.127z"/>
            <g>
              <path class="${article_emotion[1]}" d="M17.543599 3.493725c-1.648898-1.074159-3.574566-1.645194-5.541926-1.645021-1.96736.000173-3.892927.571546-5.541637 1.645995l1.223861 1.879374c1.285136-.837147 2.784509-1.283257 4.317973-1.283392 1.533464-.000134 3.032915.445713 4.318198 1.282634l1.22353-1.87959z"/>
            </g>
          </svg>

          <div class="tooltiptext ${article_emotion[4]}">${article_emotion[3]}</div>
            </section>
          </div>`;

          NEWSFEED.appendChild(new_article);

        });
        window.dataObj.uniqueIdArray = window.dataObj.uniqueIdArray.sort((x, y) => x - y);

      }).catch(function () {
        console.log('Source not found - 404')
      })

    MAINHEADER.addEventListener('click', () => {

      if (window.dataObj.store.length > 0) {
        window.dataObj.store.forEach(element => {
          //window.dataObj.uniqueIdArray.push(element.uid);

          let new_article = document.createElement('ARTICLE');
          new_article.classList.add('base');
          let article_emotion = randomColorClass();

          new_article.innerHTML = `<h2 class="title"><a  href="${element.short_url}" target="_blank">${element.title}</a></h2>
          <div class="article_details">
                  ${element.top_story == 1 ? '<h4 class="alert">Top Story</h4>' : ''}
                  <h3 class="post_time">${timeAgo(element.insert_time)}	&bull; </h3>
                  <h3 class="web_url">${element.site}</h3>
                  ${syndicationGenerator()}
          </div>
          <div class="component_footer">
              <section class="shares">
                      <svg class="share_button" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                  <span class="shares_qty">${element.velocity.ttl_vol} shares</span>
              </section>


              <section class="emotion_meter ${article_emotion[2]}">
                     
                          
            <svg viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421">
            <path class="${article_emotion[0]}" d="M12.00254 4.0939c4.365 0 7.909 3.544 7.909 7.909s-3.544 7.909-7.909 7.909-7.909-3.544-7.909-7.909 3.544-7.909 7.909-7.909zm0 1.977c3.274 0 5.932 2.658 5.932 5.932 0 3.273-2.658 5.931-5.932 5.931-3.274 0-5.932-2.658-5.932-5.931 0-3.274 2.658-5.932 5.932-5.932z"/>
            <path class="${article_emotion[0]}" d="M12.00254-.0001c6.624 0 12.003 5.378 12.003 12.003 0 6.624-5.379 12.002-12.003 12.002-6.624 0-12.003-5.378-12.003-12.002 0-6.625 5.379-12.003 12.003-12.003zm0 1.876c5.589 0 10.127 4.538 10.127 10.127s-4.538 10.126-10.127 10.126-10.127-4.537-10.127-10.126c0-5.589 4.538-10.127 10.127-10.127z"/>
            <g>
              <path class="${article_emotion[1]}" d="M17.543599 3.493725c-1.648898-1.074159-3.574566-1.645194-5.541926-1.645021-1.96736.000173-3.892927.571546-5.541637 1.645995l1.223861 1.879374c1.285136-.837147 2.784509-1.283257 4.317973-1.283392 1.533464-.000134 3.032915.445713 4.318198 1.282634l1.22353-1.87959z"/>
            </g>
          </svg>

          <div class="tooltiptext ${article_emotion[4]}">${article_emotion[3]}</div>
            </section>
          </div>`;

          NEWSFEED.prepend(new_article);
        })
        window.dataObj.store = [];

        let ALERTBUTTON = document.getElementById('new_art_alert');
        ALERTBUTTON.classList.remove("alert_toggle_on");
        ALERTBUTTON.classList.add("alert_toggle_off");
      }
    });

  });

  setInterval(function () {
    fetch('https://virwire.com/d/urls/SAY', {
        method: 'GET'
      }).then(function (response) {
        return response.json();
      })
      .then(function (data) {

        let idMap = window.dataObj.current.reduce((x, {
          uid
        }) => x[uid] ? x : { ...x,
          [uid]: uid
        }, {});

        let filteredNewArray = data.filter(({
          uid
        }) => !idMap[uid]);

        if (filteredNewArray.length > 0) {
          filteredNewArray.forEach(x => {
            window.dataObj.current.push(x)
            window.dataObj.store.push(x);
            window.dataObj.uniqueIdArray.push(x.uid);
            window.dataObj.added += filteredNewArray.length;

            let ALERTBUTTON = document.getElementById('new_art_alert');
            ALERTBUTTON.classList.remove("alert_toggle_off");
            ALERTBUTTON.classList.add("alert_toggle_on");
            // ALERTBUTTON.classList;
          });
          console.log(window.dataObj.store.length);
        } else {
          console.log('Article not found');
        }
      })
  }, (10 /*Seconds*/ * 1000));