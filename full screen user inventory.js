// Делает весь ваш инвентарь на весь экран, вставить в консоль и нажать ентер
document.getElementsByClassName('block_top')[0].style.display = 'none';
var elem = document.getElementsByClassName('column_1')[0];
var user = document.getElementById('block_desktop_user');
elem.style.width = 'auto';
elem.style.maxWidth = 'initial';
elem.style.padding = '0';
user.style.height = '110vh';
user.style.width = '100vw';