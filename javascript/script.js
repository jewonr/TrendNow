var videoId = [];
var src = [];
var previousLength = 0;
var count1 = 0;
var count2 = 0;

function getVideo(text) {
  var options = {
    part : "snippet",
    q : `${text}`,
    key : "AIzaSyCm-98PqmopuC6LGe5CuLqnSb7NFcNtu0Y",
    maxResults : 5,
    type : "video",
    videoEmbeddable : true
  };

  var url="https://www.googleapis.com/youtube/v3/search?";
  for(var option in options){
    url+=option+"="+options[option]+"&";
  }

  url = url.substr(0, url.length-1);

  fetch(url).then((res) => res.json().then(
    (data) => {
      renderVideo(data);
    })
  )
}

const renderVideo = (data) => {
  for(var i=0;i<5;i++){
    videoId[i] = data.items[i].id.videoId;
    src[i] = "https://www.youtube.com/embed/"+videoId[i];
  }
  let iframe = document.getElementsByClassName('player');
  let div = document.getElementById('youtubesearch');
  for(i=0;i<5;i++){
    iframe[i].setAttribute("src", src[i]);
  }
}

function replaceAt(str, char, length, idx) {
  return str.substr(0, idx) + char + str.substr(idx+length);
}

const renderRelated = (text) => {
  let iframe = document.getElementById("trends-widget-1");
  let src = iframe.getAttribute("src");
  if(count1 == 0) {
    src = replaceAt(src, search, 0, 124);
  } else {
    src = replaceAt(src, search, previousLength, 124);
  }
  count1++;
  previousLength = search.length;
  iframe.setAttribute("src", src);
  iframe.style.visibility = "visible";
}

const renderGraph = (text) => {
  let iframe = document.getElementById("trends-widget-2");
  let src = iframe.getAttribute("src");
  if(count1 == 0) {
    src = replaceAt(src, search, 0, 119);
  } else {
    src = replaceAt(src, search, previousLength, 119);
  }
  count2++;
  iframe.setAttribute("src", src);
  iframe.style.visibility = "visible";
}

document.addEventListener('DOMContentLoaded', () => {
  let submit = document.getElementById('submit');
  submit.addEventListener('click', (event) => {
    let input = document.getElementById('searchtext');
    let h2 = document.getElementsByTagName('h2');
    search = input.value;
    length = search.length;
    getVideo(search);
    renderGraph(search);
    renderRelated(search);
  });
});