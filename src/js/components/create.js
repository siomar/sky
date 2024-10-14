
  export default function create(name, props, children = []) {
    const el = document.createElement(name);
  
    const attrs = Object.entries(props);
    for (let [key, value] of attrs) {
      el.setAttribute(key, value);
    }
  
    children && el.append(...children);
  
    return el;
  }