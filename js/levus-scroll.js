// 26-06-2020

class LevusScroll {
  constructor(elements) {
    // wrapper
    this.elements = document.querySelector(elements);
    // elements
    this.items = this.elements.querySelectorAll('.scroll-item');
    // to left button 
    this.left = this.elements.querySelector('.left');
    // to right button
    this.right = this.elements.querySelector('.right');
    // temporary array
    this.sizes = [];
    // one item size
    this.width = 1;
    // z-index
    this.zIndex = 0;
  }

  getElements() {
    // change quantity
    this.items.forEach(item => {
      const clone = item.cloneNode(!0);
      this.elements.append(clone);
    });

    this.items = this.elements.querySelectorAll('.scroll-item');
    return this.items;
  }

  toSizes(){
    this.items.forEach((item, i) => this.sizes.push(i * this.width - this.width));
  }

  arrows(){
    this.left.addEventListener('click', () => {
      const first = this.sizes.pop();
      this.sizes.unshift(first);
      this.move();
    });

    this.right.addEventListener('click', () => {
      const last = this.sizes.shift();
      this.sizes.push(last);
      this.move();
    });    
  }

  move(){
    if (this.elements.offsetWidth < 400) {
      this.width = this.elements.offsetWidth;
      this.items.forEach((item, i) => {
        item.style.width = `${this.width}px`;

        item.style.transform = `translateX(${this.sizes[i] * this.width}px)`;

        if (this.sizes[i] === 0) this.zIndex = 3;
        else if(this.sizes[i] === -1 || this.sizes[i] === 1) this.zIndex = 2;
        else this.zIndex = 0;

        item.style.zIndex = this.zIndex;
      });
    }

    else if (this.elements.offsetWidth < 600) {
      this.width = this.elements.offsetWidth / 2;
      this.items.forEach((item, i) => {
        item.style.width = `${this.width}px`;

        item.style.transform = `translateX(${this.sizes[i] * this.width}px)`;

        if (this.sizes[i] === 0 || this.sizes[i] === 1 || this.sizes[i] === 2) this.zIndex = 3;
        else this.zIndex = 0;

        item.style.zIndex = this.zIndex;
      });
    }

    else if (this.elements.offsetWidth > 599) {
      this.width = this.elements.offsetWidth / 3;
      this.items.forEach((item, i) => {
        item.style.width = `${this.width}px`;

        item.style.transform = `translateX(${this.sizes[i] * this.width}px)`;

        if (this.sizes[i] === 1) this.zIndex = 3;
        else if (this.sizes[i] ===  0 || this.sizes[i] === 2) this.zIndex = 2;
        else this.zIndex = 0;

        item.style.zIndex = this.zIndex;
      });
    }
  }
  
  resize(){
    window.addEventListener('resize', this.move);
  }

  init() {
    this.getElements();
    this.toSizes();
    this.arrows();
    this.resize();
    this.move();
  }

}

(new LevusScroll('.levus-scroll-wrapper')).init();