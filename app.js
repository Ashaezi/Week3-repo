const addBtn = document.getElementById("add-button");
let items = [];

addBtn.addEventListener("click", clickHandler);

function clickHandler() {
  /**
   * Handles when the add button is clicked on
   */
  const title = document.getElementById("input-item");
  const quantity = document.getElementById("quantity");
  const description = document.getElementById("description");

  // Add new item to the list
  items.push(new Item(title.value, quantity.value, description.value, items.length===0?0:items.length).getItem());
  
  // Iterates over the 'items'list and renders each
  // of them
  populateItems();

  // After rendering items empty the form inputs
  title.value = '';
  quantity.value = 0;
  description.value = ''

}

function removeItem(itemId){
  /**
   * Removes an item from the 'items' list
   * based on the item index in the array
   * and re-renders the updated list
   */
  items.splice(itemId, 1, null);
  populateItems();
}

function populateItems(){
  /**
   * Renders all items from the items array
   */
  const parentGrid = document.getElementById('parent-grid');

  parentGrid.innerHTML = '';
  // We filter out items that are not null because
  // when removing we replace with null value so the index position
  // that was assigned when creating element does not change 
  const tmp_items = items.filter(item=>item!==null);
  // Loop through array to populate
  for(let i = 0; i < tmp_items.length; i++){
    if((i+1) !== tmp_items.length){
      parentGrid.appendChild(tmp_items[i])
      parentGrid.appendChild(document.createElement('hr'))
    }else{
      parentGrid.appendChild(tmp_items[i])
    }
  }
}

class Item {
  /**
   * The Item class is responsible for creating all
   * the necessary item elements and their respective values
   * @param {*} indexPos The position of the item in the 'items' array
   */
  constructor(title,quantity,description, indexPos=0) {
    this.grid_element = document.createElement("div");
    this.grid_item_1 = document.createElement("div");
    this.grid_item_2 = document.createElement("div");

    this.title_elem = document.createElement("h4");
    this.description_elem = document.createElement("p");
    this.quantity_elem = document.createElement("p");

    this.button_elem = document.createElement("button");
    this.button_elem.classList = ['addBtn']
    this.button_elem.type = "button";
    this.button_elem.innerText = "Remove";
    this.button_elem.onclick = ()=>removeItem(indexPos);

    this.grid_element.classList = ["grid-div"];
    this.grid_item_1.classList = ["grid-item"];
    this.grid_item_2.classList = ["grid-item"];

    this.title_elem.innerText = title;
    this.description_elem.innerText = description;
    this.quantity_elem.innerText = 'Quantity: x'+ quantity;

  }

  getItem(){
    /**
     * Appends and organizes the elements into correct 
     * html structure and returns the final Element to be
     * displayed
     */
    this.grid_item_1.appendChild(this.title_elem);
    this.grid_item_1.appendChild(this.description_elem);
    this.grid_item_1.append(this.quantity_elem);

    this.grid_item_2.appendChild(this.button_elem);

    this.grid_element.appendChild(this.grid_item_1);
    this.grid_element.appendChild(this.grid_item_2);

    return this.grid_element
  }

}