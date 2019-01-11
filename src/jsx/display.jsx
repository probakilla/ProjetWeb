import ReactDOM from "react-dom";

export default function display(elt, domElt) {
  const wrapper = document.getElementById(domElt);
  wrapper ? ReactDOM.render(elt, wrapper) : false;
}
