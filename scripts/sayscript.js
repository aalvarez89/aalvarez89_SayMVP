// Equals Function

Object.prototype.equals = function (object2) {
  //For the first loop, we only check for types
  for (propName in this) {
    //Check for inherited methods and properties - like .equals itself
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
    //Return false if the return value is different
    if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return false;
    }
    //Check instance type
    else if (typeof this[propName] != typeof object2[propName]) {
      //Different types => not equal
      return false;
    }
  }
  //Now a deeper check using other objects property names
  for (propName in object2) {
    //We must check instances anyway, there may be a property that only exists in object2
    //I wonder, if remembering the checked values from the first loop would be faster or not 
    if (this.hasOwnProperty(propName) != object2.hasOwnProperty(propName)) {
      return false;
    } else if (typeof this[propName] != typeof object2[propName]) {
      return false;
    }
    //If the property is inherited, do not check any more (it must be equa if both objects inherit it)
    if (!this.hasOwnProperty(propName))
      continue;

    //Now the detail check and recursion

    //This returns the script back to the array comparing
    /**REQUIRES Array.equals**/
    if (this[propName] instanceof Array && object2[propName] instanceof Array) {
      // recurse into the nested arrays
      if (!this[propName].equals(object2[propName]))
        return false;
    } else if (this[propName] instanceof Object && object2[propName] instanceof Object) {
      // recurse into another objects
      //console.log("Recursing to compare ", this[propName],"with",object2[propName], " both named \""+propName+"\"");
      if (!this[propName].equals(object2[propName]))
        return false;
    }
    //Normal value comparison for strings and numbers
    else if (this[propName] != object2[propName]) {
      return false;
    }
  }
  //If everything passed, let's say YES
  return true;
}

document.addEventListener("DOMContentLoaded", function () {
  // const virwire_url = 'https://virwire.com/d/urls/SAY';
  const NEWSFEED = document.getElementById('newsfeed');
  const MAINHEADER = document.getElementById('mainheader');
  
  // console.log(MAINHEADER);

  //FUNCTIONS:
  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  function timeAgo(dataMilliseconds) {
    let nowTime = Date.now() / 1000;
    let minutes = (nowTime - dataMilliseconds) / 60;

    let time_ago;

    if (minutes <= 0) {
      time_ago = '';
    } else {
      if (Math.ceil(minutes) === 1) {
        time_ago = `1 minute ago`
      } else if (minutes > 60) {
        time_ago = `${Math.floor(minutes / 60 )} hours ago`
      } else if (minutes > 1440) {
        time_ago = `${Math.floor((minutes / 60 ) / 24)} days ago`
      } else {
        time_ago = `${Math.ceil(minutes)} minutes ago`
      }
      time_ago += '&nbsp;&nbsp;';
      // console.log(time_ago);
    }
    return time_ago;

  };
  // console.log(NEWSFEED);

  window.dataObj = {
    'current': [],
    'latest': [],
    'uniqueIdArray': [],
    'added': 0,

  }
  // Fetch time from server FUNCTION --START--
  fetch('https://virwire.com/d/time', {
    method: 'POST'
  }).then(function (response) {
    console.log(response.json());
  })

  // Fetch time from server function --END--


  // Fetch Current articles FUNCTION --START--
  fetch('https://virwire.com/d/urls/SAY', {
      method: 'GET'
    })
    .then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      window.dataObj.current = data;
      console.log(data.map(e => e.uid));

      function randomColorClass() {
        return 'color_meter_path' + Math.floor((Math.random() * 8) + 1);
      }

      window.dataObj.current.forEach(element => {
        // console.log(element);
        // timeAgo(element.insert_time);
        let new_article = document.createElement('ARTICLE');
        new_article.classList.add('base');

        window.dataObj.uniqueIdArray.push(element.uid);
        

        new_article.innerHTML = `<h2 class="title"><a  href="${element.short_url}" target="_blank">${element.title}</a></h2>
          <div class="article_details">
                  ${element.top_story == 1 ? '<h4 class="alert">Top Story</h4>' : ''}
                  <h3 class="post_time">${timeAgo(element.insert_time)}	&bull; </h3>
                  <h3 class="web_url">(${element.site})</h3>
          </div>
          <div class="comp_footer">
              <section class="shares">
                      <svg class="share_button" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                        </svg>
                  <span class="shares_qty">${element.velocity.ttl_vol} shares</span>
              </section>
              <section class="emotion_meter">
              <svg class="color_meter" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421">
              <path class="${randomColorClass()}" d="M9.376576 23.147407l-1.806017-.586285 2.623815-8.076164-6.869294 4.991466-1.115765-1.535919L9.07861 12.94904H.587652v-1.898193H9.07861L2.209315 6.05938 3.32508 4.523463l6.869294 4.991465L7.57056 1.438765 9.376576.852479l2.623815 8.075092L14.624206.85248l1.804945.586286-2.623815 8.076163 6.869294-4.991465 1.116837 1.535918-6.869295 4.991466h8.490958v1.898193h-8.490958l6.869295 4.991465-1.116837 1.535919-6.869294-4.991466 2.623815 8.076164-1.804945.586285-2.623815-8.075092-2.623815 8.075092z" fill="#bfbfbf"/>
            </svg>
              </section>
          </div>`;

        NEWSFEED.appendChild(new_article);

        
      });
      window.dataObj.uniqueIdArray = window.dataObj.uniqueIdArray.sort((x, y) => x - y);
      console.log(window.dataObj.uniqueIdArray); //PLEASE ERASE THIS

    }).catch(function () {
      console.log('Source not found - 404')
    })

  // window.body.addEventListener('scroll', function(e) {
  //   if (window.body.scrollTop === 0 ) {
  //     console.log("I'm at the top of the World!")
  //   }
  // });
  // Fetch Current articles function --END--
  
  
  MAINHEADER.addEventListener('click', () => {

    if (window.dataObj.latest.length > 0) {
      window.dataObj.latest.forEach(element => {
        //window.dataObj.uniqueIdArray.push(element.uid);

        let new_article = document.createElement('ARTICLE');
        new_article.classList.add('base');

        new_article.innerHTML = `<h2 class="title"><a href="${element.short_url}" target="_blank">${element.title}</a></h2>
            <div class="article_details">
                    ${element.top_story == 1 ? '<h4 class="alert">Top Story</h4>' : ''}
                    <h3 class="post_time">${timeAgo(element.insert_time)}	&bull; </h3>
                    <h3 class="web_url">(${element.site})</h3>
            </div>
            <div class="comp_footer">
                <section class="shares">
                        <svg class="share_button" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13" fill="none"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2"/>
                          </svg>
                    <span class="shares_qty">${element.velocity.ttl_vol} shares</span>
                </section>
                <section class="emotion_meter">
                        <svg class="color_meter" viewBox="0 0 66 64" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.41421">
                            <g transform="matrix(.73747 0 0 .73747 -346.623 -684.864)">
                              <clipPath id="a">
                                <path d="M490.432 939.479c-.922-1.177-2.307-1.899-3.8-1.982-1.493-.083-2.949.481-3.996 1.549-8.028 8.257-12.616 19.373-12.616 31.043 0 24.508 19.897 44.401 44.405 44.401 24.508 0 44.405-19.893 44.405-44.401 0-11.67-4.589-22.786-12.636-31.025-1.041-1.062-2.49-1.624-3.976-1.541-1.485.082-2.863.801-3.781 1.972-.02-.015-.02-.015-.021-.015-1.849 2.361-1.706 5.716.338 7.909 5.732 6.1 8.975 14.204 8.975 22.7 0 18.381-14.923 33.301-33.304 33.301s-33.304-14.92-33.304-33.301c0-8.496 3.243-16.6 8.953-22.72 2.034-2.183 2.176-5.522.335-7.87.024-.019.024-.019.023-.02z"/>
                              </clipPath>
                              <g clip-path="url(#a)">
                                <use xlink:href="#_Image2" y="6.527" width="65.495" height="56.789" transform="matrix(1.34562 0 0 1.35098 470.02 928.671)"/>
                              </g>
                              <clipPath id="b">
                                <path d="M490.432 939.479c-.922-1.177-2.307-1.899-3.8-1.982-1.493-.083-2.949.481-3.996 1.549-8.028 8.257-12.616 19.373-12.616 31.043 0 24.508 19.897 44.401 44.405 44.401 24.508 0 44.405-19.893 44.405-44.401 0-11.67-4.589-22.786-12.636-31.025-1.041-1.062-2.49-1.624-3.976-1.541-1.485.082-2.863.801-3.781 1.972-.02-.015-.02-.015-.021-.015-1.849 2.361-1.706 5.716.338 7.909 5.732 6.1 8.975 14.204 8.975 22.7 0 18.381-14.923 33.301-33.304 33.301s-33.304-14.92-33.304-33.301c0-8.496 3.243-16.6 8.953-22.72 2.034-2.183 2.176-5.522.335-7.87.024-.019.024-.019.023-.02z"/>
                              </clipPath>
                              <g clip-path="url(#b)">
                                <use xlink:href="#_Image4" y="6.527" width="65.495" height="56.789" transform="matrix(1.34562 0 0 1.35098 470.02 928.671)"/>
                              </g>
                              <g transform="translate(-.982237 -58.5781)">
                                <circle cx="541.591" cy="999.079" r="9.118" fill="#e8cf03"/>
                                <path d="M541.743 987.25l.152.003.152.005.151.007.15.008.151.011.149.012.149.014.149.016.147.018.149.02.148.022.146.023.146.025.145.027.145.029.145.03.143.033.142.033.144.036.141.038.14.039.141.041.14.042.138.044.138.046.137.047.138.05.136.051.133.051.134.054.135.056.131.057.131.058.132.061.129.061.129.063.129.065.127.066.126.067.125.07.125.07.123.072.123.074.121.075.12.076.12.078.117.078.119.081.116.082.115.083.114.084.114.086.112.087.11.088.111.09.109.091.107.092.107.094.106.095.103.095.104.097.102.099.1.099.1.101.099.102.097.103.096.105.095.106.093.105.092.108.091.11.09.109.089.112.086.111.086.113.085.115.083.115.081.117.081.117.079.119.078.12.076.119.074.122.074.122.072.124.07.124.069.125.068.127.066.127.064.127.064.13.062.13.06.13.058.132.057.133.056.132.054.134.052.136.051.135.049.137.047.137.046.138.044.139.043.139.04.14.039.141.038.142.036.142.033.143.033.144.03.145.029.144.027.145.025.146.024.147.021.147.02.148.018.148.016.149.014.15.012.149.011.15.008.15.007.152.005.151.003.152.001.152-.001.152-.003.152-.005.151-.007.152-.008.15-.011.15-.012.144-.014.15-.016.15-.018.15-.02.15-.021.15-.024.14-.025.15-.027.15-.029.14-.03.14-.033.15-.033.14-.036.14-.038.14-.039.15-.04.14-.043.14-.044.13-.046.14-.047.14-.049.13-.051.14-.052.14-.054.13-.056.13-.057.14-.058.13-.06.13-.062.13-.063.13-.065.13-.066.12-.068.13-.069.12-.07.13-.072.12-.074.12-.074.13-.077.12-.077.12-.079.11-.081.12-.081.12-.084.11-.084.12-.086.11-.087.11-.088.11-.09.11-.091.11-.092.11-.093.11-.095.1-.096.11-.098.1-.098.1-.099.1-.101.1-.102.1-.103.1-.105.09-.105.1-.107.09-.107.09-.109.1-.11.09-.111.08-.112.09-.114.09-.114.08-.115.08-.117.09-.117.07-.118.08-.12.08-.12.08-.122.07-.122.08-.123.07-.125.07-.125.07-.126.07-.127.06-.128.07-.13.06-.13.06-.13.06-.131.06-.133.06-.134.05-.133.06-.136.05-.135.05-.137.05-.136.04-.138.05-.141.05-.138.04-.14.04-.142.04-.142.04-.14.03-.144.04-.144.03-.144.03-.145.03-.145.02-.146.03-.146.02-.148.02-.147.02-.149.02-.149.02-.149.01-.151.01-.148.01-.151.01-.151.01h-.152l-.152.01h-.304l-.152-.01h-.151l-.151-.01-.152-.01-.148-.01-.151-.01-.149-.01-.149-.02-.148-.02-.147-.02-.148-.02-.146-.02-.146-.03-.146-.02-.145-.03-.143-.03-.144-.03-.144-.04-.141-.03-.141-.04-.143-.04-.139-.04-.139-.04-.141-.05-.137-.04-.136-.05-.137-.05-.136-.05-.136-.05-.133-.06-.133-.05-.133-.06-.132-.06-.13-.06-.13-.06-.129-.06-.128-.07-.127-.06-.126-.07-.126-.07-.124-.07-.123-.07-.122-.08-.122-.07-.121-.08-.119-.08-.119-.08-.117-.07-.117-.09-.115-.08-.114-.08-.113-.09-.112-.09-.112-.09-.11-.08-.108-.1-.108-.09-.107-.09-.105-.1-.105-.09-.103-.1-.101-.1-.102-.1-.099-.1-.098-.1-.098-.1-.096-.11-.094-.1-.094-.11-.092-.11-.091-.11-.089-.11-.089-.11-.087-.11-.086-.11-.084-.12-.083-.11-.082-.12-.08-.12-.08-.11-.077-.12-.076-.12-.075-.13-.074-.12-.072-.12-.07-.13-.069-.12-.068-.13-.066-.12-.065-.13-.062-.13-.062-.13-.06-.13-.059-.13-.057-.14-.055-.13-.054-.13-.053-.14-.05-.13-.049-.14-.048-.14-.046-.14-.043-.13-.043-.14-.041-.14-.039-.15-.037-.14-.036-.14-.034-.14-.032-.15-.031-.14-.029-.14-.027-.15-.025-.15-.023-.14-.022-.15-.019-.15-.018-.15-.016-.15-.015-.14-.012-.154-.01-.151-.009-.15-.007-.151-.005-.151-.002-.151-.001-.153.001-.153.002-.152.005-.15.007-.151.009-.151.01-.151.012-.149.015-.149.016-.149.018-.148.019-.147.022-.148.023-.147.025-.145.027-.146.029-.145.031-.144.032-.144.034-.143.035-.142.038-.142.039-.141.041-.14.043-.14.044-.138.045-.137.048-.138.049-.137.05-.135.053-.135.054-.134.055-.133.057-.133.059-.132.06-.13.062-.131.063-.129.064-.127.066-.127.068-.127.069-.125.071-.125.072-.123.073-.122.075-.122.076-.119.077-.12.08-.119.08-.118.082-.116.083-.115.084-.114.086-.113.087-.112.089-.113.089-.109.091-.109.093-.108.092-.105.095-.106.097-.105.096-.103.099-.101.1-.102.101-.1.101-.098.104-.097.104-.095.105-.095.107-.094.107-.092.109-.091.111-.09.111-.088.112-.087.113-.086.114-.084.115-.083.116-.082.119-.081.118-.078.119-.078.121-.076.121-.075.123-.074.123-.072.124-.07.126-.069.126-.068.127-.066.129-.065.128-.063.129-.061.132-.061.132-.058.131-.057.134-.056.135-.054.133-.051.136-.051.138-.05.137-.047.137-.046.139-.044.14-.042.14-.041.14-.039.142-.038.143-.036.143-.033.143-.033.144-.03.145-.029.146-.027.146-.025.146-.023.148-.022.148-.02.147-.018.149-.016.149-.014.15-.012.151-.011.15-.008.151-.007.151-.005.152-.003.152-.001.152.001zm-.27 2.712l-.117.002-.117.004-.117.005-.116.007-.116.008-.115.009-.115.011-.115.013-.114.014-.114.015-.114.016-.112.018-.113.02-.112.021-.111.022-.111.023-.111.025-.11.026-.109.028-.109.028-.109.03-.107.032-.108.033-.107.034-.106.035-.105.036-.105.038-.105.039-.104.04-.103.042-.102.042-.102.044-.102.045-.1.047-.1.047-.099.049-.099.049-.098.051-.097.052-.097.054-.096.054-.095.056-.094.056-.094.058-.093.059-.092.059-.091.061-.091.062-.089.063-.089.065-.089.065-.087.066-.086.067-.086.068-.085.069-.084.071-.083.071-.082.072-.082.073-.08.074-.08.075-.079.076-.078.077-.077.078-.075.079-.076.079-.074.081-.073.081-.072.083-.071.083-.07.084-.069.085-.069.085-.067.087-.066.087-.065.088-.064.089-.063.09-.062.091-.061.091-.06.092-.059.093-.058.094-.056.094-.056.095-.054.096-.053.096-.052.098-.051.098-.05.098-.049.1-.047.1-.046.1-.045.101-.044.102-.043.103-.041.103-.041.104-.039.104-.037.105-.037.106-.035.106-.034.107-.033.107-.031.108-.03.108-.029.109-.028.11-.026.11-.025.11-.023.111-.022.112-.021.112-.019.112-.018.113-.017.114-.015.113-.014.115-.012.114-.011.115-.01.116-.008.116-.006.116-.006.117-.003.117-.003.117v.236l.003.117.003.117.006.117.006.116.008.116.01.115.011.115.012.12.014.11.015.11.017.12.018.11.019.11.021.11.022.12.023.11.025.11.026.11.028.11.029.11.03.1.031.11.033.11.034.11.035.1.037.11.037.1.039.11.041.1.041.1.043.11.044.1.045.1.046.1.047.1.049.1.05.1.051.1.052.09.053.1.054.1.056.09.056.1.058.09.059.09.06.09.061.1.062.09.063.09.064.08.065.09.066.09.067.09.069.08.069.09.07.08.071.08.072.09.073.08.074.08.076.08.075.08.077.07.078.08.079.08.08.07.08.08.082.07.082.07.083.07.084.07.085.07.086.07.086.07.087.06.089.07.089.06.089.07.091.06.091.06.092.06.093.06.094.06.094.05.095.06.096.05.097.06.097.05.098.05.099.05.099.05.1.04.1.05.102.05.102.04.102.04.103.04.104.04.105.04.105.04.105.04.106.03.107.04.108.03.107.03.109.03.109.03.109.03.11.02.111.03.111.02.111.02.112.02.113.02.112.02.114.02.114.01.114.02.115.01.115.01.115.01.116.01.116.01h.234l.117.01h.236l.117-.01h.234l.116-.01.116-.01.116-.01.115-.01.115-.01.114-.02.114-.01.113-.02.113-.02.112-.02.112-.02.112-.02.111-.02.11-.03.11-.02.11-.03.109-.03.108-.03.108-.03.107-.03.107-.04.106-.03.106-.04.105-.04.104-.04.104-.04.103-.04.103-.04.102-.04.101-.05.101-.05.1-.04.099-.05.099-.05.097-.05.098-.05.096-.06.096-.05.095-.06.095-.05.093-.06.093-.06.092-.06.091-.06.091-.06.09-.07.089-.06.088-.07.087-.06.087-.07.086-.07.084-.07.084-.07.084-.07.082-.07.081-.07.081-.08.08-.07.078-.08.078-.08.077-.07.076-.08.075-.08.074-.08.073-.08.072-.09.072-.08.07-.08.069-.09.068-.08.067-.09.066-.09.066-.09.064-.08.063-.09.062-.09.061-.1.06-.09.058-.09.058-.09.057-.1.055-.09.054-.1.054-.1.052-.09.051-.1.05-.1.048-.1.048-.1.046-.1.045-.1.044-.1.042-.11.042-.1.04-.1.039-.11.038-.1.036-.11.036-.1.034-.11.032-.11.032-.11.03-.1.029-.11.027-.11.026-.11.025-.11.023-.11.023-.12.02-.11.02-.11.018-.11.016-.12.015-.11.014-.11.013-.12.011-.115.009-.115.008-.116.007-.116.005-.117.004-.117.002-.117.001-.118-.001-.118-.002-.117-.004-.117-.005-.117-.007-.116-.008-.116-.009-.116-.011-.115-.013-.114-.014-.115-.015-.113-.016-.114-.018-.113-.02-.112-.02-.112-.023-.112-.023-.111-.025-.11-.026-.11-.027-.11-.029-.109-.03-.108-.032-.108-.032-.107-.034-.107-.036-.106-.036-.106-.038-.105-.039-.104-.04-.104-.042-.103-.042-.103-.044-.102-.045-.101-.046-.1-.048-.1-.048-.1-.05-.098-.051-.098-.052-.098-.054-.096-.054-.096-.055-.095-.057-.094-.058-.094-.058-.093-.06-.092-.061-.091-.062-.091-.063-.09-.064-.089-.066-.088-.066-.087-.067-.087-.068-.085-.069-.085-.07-.084-.072-.083-.072-.083-.073-.081-.074-.081-.075-.079-.076-.079-.077-.078-.078-.077-.078-.076-.08-.075-.081-.074-.081-.073-.082-.072-.084-.071-.084-.071-.084-.069-.086-.068-.087-.067-.087-.066-.088-.065-.089-.065-.09-.063-.091-.062-.091-.061-.092-.059-.093-.059-.093-.058-.095-.056-.095-.056-.096-.054-.096-.054-.098-.052-.097-.051-.099-.049-.099-.049-.1-.047-.101-.047-.101-.045-.102-.044-.103-.042-.103-.042-.104-.04-.104-.039-.105-.038-.106-.036-.106-.035-.107-.034-.107-.033-.108-.032-.108-.03-.109-.028-.11-.028-.11-.026-.11-.025-.111-.023-.112-.022-.112-.021-.112-.02-.113-.018-.113-.016-.114-.015-.114-.014-.115-.013-.115-.011-.116-.009-.116-.008-.116-.007-.117-.005-.117-.004-.117-.002-.118-.001-.118.001z" fill="url(#_Radial5)"/>
                              </g>
                            </g>
                            <defs>
                              <image id="_Image2" width="66" height="57" xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAA5AEIDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD7GoASgBDQA00ANPSgBpoAaaAEoAM0AXMUAIaAEIoAYaAGGgBpNADTQAmaACgC9igAxQAhFADGFAELmgBhNADc0AGaAEoA0sUANdkQZd1UdMk4oAhe7tUODMp/3ef5UAV31GIj5InJ98D/ABoAZ52/nGPagA3UAGaADNABmgCo91cuctM4+hx/KgCHFACgUAPUUASoaAJAaAFzQAtABmgCjigBaAFFADhQA8UAPFADgaAFoAM0AU6AFFACigBwoAcOlADhQAtACg0ALQBUoAdQAooAUUAOFACigBwoAWgBaAP/2Q=="/>
                              <image id="_Image4" width="66" height="57" xlink:href="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAA5AEIDAREAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCOCf3r8NnA8eMzQt5Qcc1zyidMJF+F81zSR0RZaQ1kzZEgqGUaWgWRvL0MwBhiIZ89/QY79PyrmxVb2cLLdnZg6Htal3sjrWOK8dI99IhkkArRRNoxIDNWnKa8h4akjIeDX3zimfkqk0XrW6GQCa5p0johVNe0nDY5riqQO2nO5qQtkVySR1xZOKzZodppFr9i09Im4kPzP/vH/Dp+FeJXqe1qN9D6PC0fZU1Hr1HTzhR1pRhc9CFNszrm8UZ5rqhSbO6nh2ykb5c9a29idX1Y8kr7I/DhaALNrdvEwzyKynSUjaFVxOj0m8SYABhmvLr0nE9ShVUjrPDVms05upQfLhIK9st2/L/CvHxdVxjyLd/ke5l+H9pPmey/M1NR1WGEEbx+dctHDSl0PrcPgpz6HN3/AIgiBOJBXp0sDLse7QyqfYxbrXQxOCTXfDBWPVpZbbcpHWHz/wDXrf6ojp+oxOb3ivpllsmfy37ZBvFaRyipLYl4hCGUCumnw9XqbESxkERyaqung3G8rs5r38F4c4vGq85qMera/wCCYRzZRqKNNXkxNO+L1zfWYtYoI7NVJB28ljnqTXy+P4Ejg68vf5/O1vw1/M/pDhnKMJLBU6jV5tK/r1t5dh7eJJbo7nnZs+pri/slU9LH1sKEIK0UN/tLd/FR9TsaWF+2Z70vq9gsH2r3o9gBGXr9Ro5XfofxhKuMaSvbwuSqT2OapibFeecIpJNfYYDI6dNc00cE686j5YnIeK9SZ4XQNxiuvHVlGHJHRH1XD+XJVFOW5x2lTlGOD3r89zCkpts/oLIsS6UUjp7DUHUAFjXy+IwiZ9zSqqormzbX5IHzV5NTC2NbF2K7z3rklhxWJvtXvWXsAsaDNX71hsvv0P4YnWIZpQoya+jw+DhSV2cvNKo7IxdTuzg8069XTQ9jA4TU47XJiwbmvn8XO5+g5TQUWjDs2w1fM4mNz9Jy+fLY2LWXpzXi1qZ9hhK5pW85GOa82rSue5TqqSNGC5964KlE1LP2j3rD2QrHQyyBRX9IU6MaaP4KSc2Zt5ccHms6tQ9TDYcwdQmJzzXmVpn02CoWOZ1R85rxsRK59ngIWsZlucGvFrI+xwjsaVu9eZVifR4aoXoZK8+pA9yhVLcUhHeuScD1KdS5Y841h7M2Ouuehr+gpn8H0DKu+9cNU9vDGJfdDXm1j6TCHO6j3rya59ZgjOh615NU+qwxoQdq8+oe9hy7FXBUPaoluPtXLM9SkS1idaP/2Q=="/>
                              <radialGradient id="_Radial5" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(541.591 999.079) scale(12.9202)">
                                <stop offset="0"/>
                                <stop offset=".45" stop-color="#1b1b1b"/>
                                <stop offset=".57" stop-color="#666"/>
                                <stop offset=".68" stop-color="#c2c2c2"/>
                                <stop offset=".72" stop-color="#dfdfdf"/>
                                <stop offset=".78" stop-color="#f7f7f7"/>
                                <stop offset="1" stop-color="#fff"/>
                              </radialGradient>
                            </defs>
                          </svg>
                </section>
            </div>`;

        NEWSFEED.prepend(new_article);
      })
      window.dataObj.latest = [];
      // window.dataObj.uniqueIdArray = [];
      let ALERTBUTTON = document.getElementById('new_art_alert');
      ALERTBUTTON.classList.remove("alert_toggle_on");
      ALERTBUTTON.classList.add("alert_toggle_off");
      console.log("I'm at the top!");
    }
  });

});

setInterval(function () {
  fetch('https://virwire.com/d/urls/SAY', {
      method: 'GET'
    }).then(function (response) {
      // console.log(response);
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      
      let currentDataSet = new Set(window.dataObj.uniqueIdArray);
      let newDataSet = new Set(data.map(x => x.uid));
      console.log([...currentDataSet].sort((x, y) => x - y).slice(window.dataObj.length - 25), [...newDataSet].sort((x, y) => x - y))

      if (![...currentDataSet].sort((x, y) => x - y).slice(window.dataObj.length - 25).equals([...newDataSet].sort((x, y) => x - y)) /*condition*/) {

        let idMap = window.dataObj.current.reduce((x, {
          uid
        }) => x[uid] ? x : { ...x,
          [uid]: uid
        }, {});
        // console.log('this is the idMap->', idMap);

        let filteredNewArray = data.filter(({
          uid
        }) => !idMap[uid]);
        // console.log('this is the filteredNewArray->', filteredNewArray);
        filteredNewArray.forEach(x => {
          window.dataObj.current.push(x)
          window.dataObj.latest.push(x);
          window.dataObj.uniqueIdArray.push(x.uid);
          window.dataObj.added += filteredNewArray.length;
        });
        //console.log(window.dataObj.latest, window.dataObj.added);
        // let idMap = oldArray.reduce((acc, { id }) => acc[id] ? acc : { ...acc, [id]: id }, {} )
        let ALERTBUTTON = document.getElementById('new_art_alert');
        ALERTBUTTON.classList.remove("alert_toggle_off");
        ALERTBUTTON.classList.add("alert_toggle_on")
        // console.log();
        // .style.display = 'block';
        //console.log('success!');

      } else {
        console.log('Article not found');
      }

    })
}, 5000);