const block1 = document.querySelector(".block1");
const block2 = document.querySelector(".block2");
const block3 = document.querySelector(".block3");
const block4 = document.querySelector(".block4");
const block6 = document.querySelector(".block6");
const reverse = document.querySelector('.reverse');
const dynamicList = document.querySelector('.dynamicList');


//**Свап блоку 1 та блоку 2**
document.querySelector('.swap').addEventListener('click', function() {
    const block1Text = document.querySelector(".block1Text")
    const block6Text = document.querySelector(".block6Text")
    const temp = block1Text.textContent;
    if (block1.classList.contains('swapped')) {
        block1.classList.remove('swapped');
        block6.classList.remove('swapped');
    }
    else {
        block1.classList.add('swapped');
        block6.classList.add('swapped');
    }
    block1Text.textContent = block6Text.textContent;
    block6Text.textContent = temp;
})

//Обчислення трапеції
document.querySelector(".calc").addEventListener("click", function() {
    block3.style.backgroundImage = "url('../source/trap.png')";
    const result = document.querySelector('.result');
    result.textContent = (7 + 13) * 8 / 2;
})


window.onload = function() {
    loadAlignment();
    loadList();
    if (localStorage.getItem('visibility')) {
        reverse.style.display = localStorage.getItem('visibility');
    }
    const savedNumber = Cookies.get("reversedNumber");
    if (savedNumber) {
        setTimeout(() => {
            const save = confirm(`У cookies збережено число: ${savedNumber}. Зберегти його?`);
            if (save) {
                localStorage.setItem("visibility", reverse.style.display = "none");
                alert("Cookies збережено! Перезавантажте сторінку.");
            } else {
                Cookies.remove('reversedNumber');
                localStorage.setItem("visibility", reverse.style.display = "flex");
                location.reload();
            }
        }, 50);
    }
};

function loadAlignment() {
    const savedBlock2Align = localStorage.getItem('block2Align');
    const savedBlock3Align = localStorage.getItem('block3Align');
    const savedBlock4Align = localStorage.getItem('block4Align');

    if (savedBlock2Align) block2.style.alignItems = savedBlock2Align;
    if (savedBlock3Align) block3.style.alignItems = savedBlock3Align;
    if (savedBlock4Align) block4.style.alignItems = savedBlock4Align;
}

document.querySelector(".reverse").addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const inputValue = this.value;

        if (inputValue && /^[1-9]\d*$/.test(inputValue)) {
            const reversedNumber = inputValue.split('').reverse().join('');
            Cookies.set('reversedNumber', reversedNumber, { expires: 7 });
            alert(`Перевернуте число: ${reversedNumber}`);
        } else {
            alert('Будь ласка, введіть натуральне число!');
        }
    }
})

document.querySelector(".align3").addEventListener("click", function() {
    if (block3.style.alignItems === "flex-start") {
        block3.style.alignItems = "center";
        localStorage.setItem("block3Align", block3.style.alignItems);
    }
    else if (block3.style.alignItems === "center") {
        block3.style.alignItems = "flex-end";
        localStorage.setItem("block3Align", block3.style.alignItems);
    }
    else {
        block3.style.alignItems = "flex-start";
        localStorage.setItem("block3Align", block3.style.alignItems);
    }
})

function loadList() {
    const savedList = JSON.parse(localStorage.getItem('list')) || [];
    savedList.forEach(item => {
        addListItem(item);
    })
}

function addListItem(text) {
    const li = document.createElement("li");
    li.textContent = text;

    const removeButton = document.createElement("button");
    removeButton.textContent = "Видалити";
    removeButton.className = "removeButton";

    removeButton.addEventListener("click", function() {
        li.remove();
        saveList();
    })

    li.appendChild(removeButton);
    dynamicList.appendChild(li);

    li.scrollIntoView({ behavior: "smooth" });
}

function saveList(){
    const items = Array.from(dynamicList.querySelectorAll("li")).map((li) => li.firstChild.textContent.trim());
    localStorage.setItem("list", JSON.stringify(items));
}

document.querySelector(".leftSave").addEventListener("click", function() {
    saveList();
    alert("Список збережено!")
})

document.querySelector(".leftAdd").addEventListener("click", function() {
    addListItem(Math.round(Math.random() * (1000000 + 1000000 + 1) -1000000));
})



