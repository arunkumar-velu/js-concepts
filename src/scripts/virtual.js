function virtualDom(dom) {
  const type = dom.tagName.toLowerCase();
  const props = {};
  if (dom.hasAttributes()) {
    for (let {name, value} of dom.attributes) {
      props[name] = value;
    }
  }
  if(dom.hasChildNodes()){
    props["children"] = [];
    for(let node of dom.childNodes){
      if(node.nodeType == 1){
        props["children"].push(virtualDom(node))
      }else{
        props["children"].push(node.textContent)
      }
    }
  }
  props.children = props.children.length == 1 ? props.children[0] : props.children
  return { type, props };
}

const html = document.createElement("div");
html.innerHTML = `<h1> this is </h1><p class="paragraph"> a <button> button </button> from <a href="https://bfe.dev"><b>BFE</b>.dev</a></p>`;
console.log(JSON.stringify(virtualDom(html)));

function renderDOM(json){
  let {type, props} = json;
  let ele;
  if(type){
    ele = document.createElement(type)
  }
  console.log(type, props, json)
  let {children, ...restProps} = props;
  for(let key in restProps){
    ele.setAttribute(key, restProps[key])
  }
  if(Array.isArray(children)){
    children.forEach(element => {
      if(typeof element !== 'string'){
        ele.append(renderDOM(element))
      }else{
        ele.append(element)
      }
    });
  }
  else{
    ele.append(children)
  }
  return ele
}
console.log(renderDOM(virtualDom(html)))
//   expect(virtualize(html)).toEqual({
//     type: 'div',
//     props: {
//       children: [
//         {
//           type: 'h1',
//           props: {
//             children: ' this is '
//           }
//         },
//         {
//           type: 'p',
//           props: {
//             className: 'paragraph',
//             children: [
//               ' a ',
//               {
//                 type: 'button',
//                 props: {
//                   children: ' button '
//                 }
//               },
//               ' from ',
//               {
//                 type: 'a',
//                 props: {
//                   href: 'https://bfe.dev',
//                   children: [
//                     {
//                       type: 'b',
//                       props: {
//                         children: 'BFE'
//                       }
//                     },
//                     '.dev'
//                   ]
//                 }
//               }
//             ]
//           }
//         }
//       ]
//     }
//   })
