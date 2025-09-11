function setCookie(name, value, days=365){
  const expires = new Date(Date.now()+days*24*60*60*1000).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}
function getCookie(name){
  const m = document.cookie.match(new RegExp('(?:^|; )'+name.replace(/[-.$?*|{}()[\]\\/+^]/g,'\\$&')+'=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : null;
}

function save(){
  const arr = $('#ft_list .todo').toArray().map(el => $(el).text());
  setCookie('todos', JSON.stringify(arr));
}
function addTodo(text, persist=true){
  const $div = $('<div class="todo"></div>').text(text);
  $div.on('click', function(){
    if(confirm('Do you want to remove this to do?')){
      $(this).remove(); save();
    }
  });
  $('#ft_list').append($div);
  if(persist) save();
}

$(function(){
  const raw = getCookie('todos');
  if(raw){
    try{
      const arr = JSON.parse(raw);
      arr.forEach(t => addTodo(t, false));
    }catch{}
  }

  $('#new').on('click', function(){
    const input = prompt('New to do:');
    if(input !== null){
      const txt = input.trim();
      if(txt) addTodo(txt, true);
    }
  });
});