
// ширина вікна
const windowWidth = window.innerWidth;

// розміри
const viewport = [1200, 991, 776, 460];

// scroll
const scroll = document.querySelector('.levus-scroll');

// scroll elements
let items = scroll.querySelectorAll('.scroll-item');

// дублюємо всі елементи скрола
items.forEach(item => {
  const clone = item.cloneNode(!0);
  scroll.append(clone);
});

// new (all) scroll elements
items = scroll.querySelectorAll('.scroll-item');

// one item size
const width = 200;

// sizes
const sizes = [];

// z-index
let zIdex = 0;

//
let num = 0;

// fill sizes
items.forEach((item, i) => sizes.push(i * width - width ));

move();

// left
const left = document.querySelector('.levus-scroll-nav .left');

// right
const right = document.querySelector('.levus-scroll-nav .right');

// scroll to left
left.addEventListener('click', () => {
  const first = sizes.pop();
  sizes.unshift(first);
  move();
});

// scroll to right
right.addEventListener('click', () => {
  const last = sizes.shift();
  sizes.push(last);
  move();
});

// function move 1 item
function move(){
  items.forEach((item, i) => {
    item.style.transform = `translateX(${sizes[i]}px)`;

    if(sizes[i] === width) num = 3;
    else if(sizes[i] === width - width || sizes[i] === width + width) num = 2;
    else num = 0;
    
    item.style.zIndex = num;
  });
}
