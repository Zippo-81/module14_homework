
if (localStorage.getItem("name") === null) {
  let ask = prompt('Назовите пожалуйста Ваше имя');
  let date = new Date().toLocaleDateString();
  let time = new Date().toLocaleTimeString().slice(0,-3);
  localStorage.setItem("name", ask);
  localStorage.setItem("date", date);
  localStorage.setItem("time", time);
} else {
  let name = localStorage.getItem("name");
  let date = localStorage.getItem("date");
  let time = localStorage.getItem("time");
  alert(`Добрый день, ${name}! Давно не виделись. В последний раз вы были у нас ${date} в ${time}`);
};


