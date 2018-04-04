//VARIABLES
const form = document.getElementById("create-post");
const postsContainer = document.getElementById('posts-container');
const username = document.getElementById("username");
const text = document.getElementById("text");
const textCharCounter = document.getElementById("text-char-counter");
const usernameCharCounter = document.getElementById("username-char-counter");
const ENTER = 13;
let inputTextLength = 0;

//REQUEST
const get = (url, formData) => {
  let options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: "value=" + JSON.stringify(formData)
  };

  let requestObj = !!formData ? new Request(url, options) : new Request(url);

  return fetch(requestObj)
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return res.json();
    })
    .catch(error => console.log());
};

//UTILS
const formatDate = (sent, splitter) => {
  sent = new Date(sent);
  let dateSentFormatted =
    sent.getFullYear() +
    splitter +
    ("0" + (sent.getMonth() + 1)).slice(-2) +
    splitter +
    ("0" + sent.getDate()).slice(-2) +
    " " +
    ("0" + sent.getHours()).slice(-2) +
    ":" +
    ("0" + sent.getMinutes()).slice(-2);
  return dateSentFormatted;
}

const counterReset = () => {
  textCharCounter.innerHTML = 0;
  usernameCharCounter.innerHTML = 0;
}

//RENDER
const drawMessages = (data) => {
  // console.log(data)
  let html = '';
  data.map(message => {
    message.created
    html += `
      <div class="message col s12">
        <div class="card">
          <div class="card-content">
            <span class="card-title">${message.username}</span>
            <span class="card-created">${formatDate(message.created, '.')}</span>
            <p>${message.text}</p>
          </div>
          <div class="card-action">
            <a class="delete-message" id="${message._id}">Delete message</a>
          </div>
        </div>
      </div>
    `;
  });
  postsContainer.innerHTML = html;
  scrollDown();
  username.focus();
}

const reDrawMessages = () => {
  get('/posts').then(drawMessages);
}
const scrollDown = () => {
  postsContainer.scrollTop = postsContainer.scrollHeight - postsContainer.clientHeight;
}


//LISTEN
postsContainer.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('delete-message')) {
    get('/delete', {id: ev.target.id}).then(() => reDrawMessages());
  }
})

form.addEventListener("keyup", ev => {
  if(ev.target.id === "text"){
    inputTextLength = ev.target.value.length;
    textCharCounter.innerHTML = inputTextLength;
  }
  if(ev.target.id === "username"){
    inputTextLength = ev.target.value.length;
    usernameCharCounter.innerHTML = inputTextLength;
  }

  if (ev.keyCode === ENTER) {
    let username = ev.target.form.elements.username.value.trim();
    let text = ev.target.form.elements.text.value.trim();
    console.log(username.length)
    if (username.length < 3) {
      console.log("Username is empty or very short");
      M.toast({html: "Username is empty or very short", displayLength: 2000})
    } else if (text.length < 1 || text.length > 200) {
      console.log("Your text is empty or bigger than 200 symbols");
      M.toast({html: "Your text is empty or bigger than 200 symbols", displayLength: 2000})
    } else {
      get('/posts', {username: username, text: text})
      .then(() => reDrawMessages())
      form.reset();
      counterReset();
    }
  }
  
});

//INIT
var elem = document.querySelector('.sidenav');
var instance = M.Sidenav.init(elem, {draggable: true});
reDrawMessages();
username.focus();
window.onload = () => {
  scrollDown();
}


//delete mes OK
//normal date view OK
//scroll down in load winwdow OK
//popup or toast OK
//counter string length of 'text' input
