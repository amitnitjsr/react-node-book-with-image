import './index.css';

export interface AddBookProps{
    imgUrl: string,
    description: string,
    price: number,
    discount: number,
    name: string
}

const AddBook = (props: AddBookProps) => {

    const openModal=(e)=>{

        const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
    }

    return(
        <div>
            <h2>Modal Example</h2>


    <button id="myBtn" onClick={openModal}>Open Modal</button>


    <div id="myModal" class="modal">


  <div class="modal-content">
    <span class="close">&times;</span>
    <p>Some text in the Modal..</p>
  </div>

</div>
        </div>
    )
}

export default AddBook;