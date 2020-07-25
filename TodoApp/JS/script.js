let modal = document.querySelector('.modal');

window.addEventListener('mouseover', function () {
    if (event.target == modal) {
        modal.style.cursor = 'pointer';
    } else {
        modal.style.cursor = 'default';
    }
})

let addButton = document.querySelector('.addButton');
let containerShow = document.querySelector('.containerShow');
let contentCenter = document.querySelector('.contentCenter');

addButton.addEventListener('click', function () {
    //for removing Modal
    modal.classList.add('nonactive');

    //removing Active from All ListContent
    let listContents = document.querySelectorAll('.listContent');
    listContents.forEach(function (element) {
        element.classList.remove('active');
    })


    //for creating ListContent
    let listContent = document.createElement('div');
    listContent.setAttribute('class', 'listContent active');
    let listContentTop = document.createElement('div');
    listContentTop.setAttribute('class', 'listContentTop');
    let topInput = document.createElement('input');
    topInput.setAttribute('value', 'Untitled List')
    topInput.setAttribute('class', 'topInput');
    topInput.setAttribute('type', 'text');
    let icon = document.createElement('div');
    icon.setAttribute('class', 'icon');
    let iconButton = document.createElement('i');
    iconButton.setAttribute('class', 'fas fa-sync-alt iconButton');
    let listContentCenter = document.createElement('div');
    listContentCenter.setAttribute('class', 'listContentCenter');
    let centerInput = document.createElement('input');
    centerInput.setAttribute('placeholder', 'Add to your list...')
    centerInput.setAttribute('class', 'centerInput');
    let icon2 = document.createElement('div');
    icon2.setAttribute('class', 'icon');
    let iconButton2 = document.createElement('i');
    iconButton2.setAttribute('class', 'fas fa-long-arrow-alt-left iconButton2');
    let listContentBottom = document.createElement('div');
    listContentBottom.setAttribute('class', 'listContentBottom');
    let pTag = document.createElement('p');
    pTag.innerText = 'Clear all completed';
    icon.appendChild(iconButton);
    listContentTop.appendChild(topInput);
    listContentTop.appendChild(icon);
    listContent.appendChild(listContentTop);
    icon2.appendChild(iconButton2);
    listContentCenter.appendChild(centerInput);
    listContentCenter.appendChild(icon2);
    listContent.appendChild(listContentCenter);
    listContentBottom.appendChild(pTag);
    listContent.appendChild(listContentBottom);
    containerShow.appendChild(listContent)

    //removing Active class from Lists
    let existingLists = document.querySelectorAll('.lists');
    existingLists.forEach(function (element) {
        element.classList.remove('activeList');
    })

    //for Creating ListName
    let list = document.createElement('div');
    list.classList.add('lists', 'activeList');
    let listText = document.createElement('p');
    listText.setAttribute('class', 'listText')
    let remove = document.createElement('i');
    remove.setAttribute('class', 'fas fa-times remove')
    listText.innerText = topInput.value + " " + "(0)";
    list.appendChild(listText);
    list.appendChild(remove)
    contentCenter.insertBefore(list, addButton);

    //Connection between ListName and ListContent
    listContents = document.querySelectorAll('.listContent');
    existingLists = document.querySelectorAll('.lists');
    removingContent = document.querySelectorAll('.remove');

    existingLists.forEach((element, index) => {
        element.addEventListener('click', function () {
            existingLists.forEach((element) => {
                element.classList.remove('activeList');
            })
            element.classList.add('activeList');
            if (event.target != removingContent[index]) {
                modal.classList.add('nonactive')
            }

            listContents.forEach((element) => {
                element.classList.remove('active');
            })
            listContents[index].classList.add('active');
        })
        removingContent[index].onclick = function () {
            let result = confirm('Delete this list?');
            if (result == true) {
                existingLists[index].style.display = 'none';
                listContents[index].style.display = 'none';
            }
            modal.classList.remove('nonactive');
        }
    })


    //Connection ListName and TopInput
    topInput.addEventListener('keyup', function () {
        if (event.keyCode == 13) {
            let topInputs = document.querySelectorAll('.active .topInput');
            let listText = document.querySelector('.activeList .listText');
            let Checks = document.querySelectorAll('.active .fa-square')
            topInputs.forEach(element => {
                listText.innerText = element.value + " " + `(${Checks.length})`;
            });
        }
    })

    //CreatingDiv in each ListContent
    centerInput = document.querySelectorAll('.centerInput');
    listContent = document.querySelectorAll('.listContent');

    listContent.forEach((element, index) => {
        centerInput[index].addEventListener('keyup', function () {
            if (event.keyCode == 13 && centerInput[index].value.length > 0) {
                let creatingDiv = document.createElement('div');
                creatingDiv.setAttribute('class', 'creatingDiv');
                let creatingInput = document.createElement('input');
                creatingInput.value = centerInput[index].value;
                creatingInput.setAttribute('class', 'creatingInput');
                creatingInput.setAttribute('type', 'text');
                let icon3 = document.createElement('div');
                icon3.setAttribute('class', 'iconRight');
                let iconButton3 = document.createElement('i');
                iconButton3.setAttribute('class', 'fas fa-ellipsis-v iconButton3');
                let icon4 = document.createElement('div');
                icon4.setAttribute('class', 'icon2');
                let iconButton4 = document.createElement('i');
                iconButton4.setAttribute('class', 'far fa-square iconButton4');
                icon4.appendChild(iconButton4)
                icon3.appendChild(iconButton3);
                creatingDiv.appendChild(icon4)
                creatingDiv.appendChild(creatingInput);
                creatingDiv.appendChild(icon3);
                listContent[index].insertBefore(creatingDiv, listContentBottom);
                centerInput[index].value = '';

                let topInputs = document.querySelectorAll('.topInput');
                let listText = document.querySelector('.activeList .listText');
                let Checks = document.querySelectorAll('.active .fa-square');

                topInputs.forEach(element => {
                    listText.innerText = element.value + " " + `(${Checks.length})`;
                });
                let creatingInputs = document.querySelectorAll('.creatingInput');
                creatingInputs.forEach((element, index) => {
                    element.addEventListener('click', function () {
                        let icons4 = document.querySelectorAll('.icon2');
                        let icons3 = document.querySelectorAll('.iconRight');
                        let iconsSelf = document.querySelectorAll('.iconButton3');
                        iconsSelf[index].classList.replace('fas', 'far')
                        iconsSelf[index].classList.replace('fa-ellipsis-v', 'fa-trash-alt')
                        element.style.backgroundColor = '#FFFECE';
                        icons4[index].style.backgroundColor = '#FFFECE';
                        icons3[index].style.backgroundColor = '#FFFECE';

                        let trashes = document.querySelector('.fa-trash-alt');
                        trashes.onclick = function () {
                            iconsSelf[index].classList.replace('far', 'fas')
                            iconsSelf[index].classList.replace('fa-trash-alt', 'fa-ellipsis-v')
                            element.style.backgroundColor = 'white';
                            icons4[index].style.backgroundColor = 'white';
                            icons3[index].style.backgroundColor = 'white';
                        }

                        window.addEventListener('click', function () {
                            if (event.target != element && event.target != icons4 && event.target != icons3) {
                                iconsSelf[index].classList.replace('far', 'fas')
                                iconsSelf[index].classList.replace('fa-trash-alt', 'fa-ellipsis-v')
                                element.style.backgroundColor = 'white';
                                icons4[index].style.backgroundColor = 'white';
                                icons3[index].style.backgroundColor = 'white';
                            }
                        })
                    })
                });

                //Removing ListElement from Each ListContent
                let CheckBoxs = document.querySelectorAll('.active .iconButton4');
                creatingInputs = document.querySelectorAll('.active .creatingInput');

                CheckBoxs.forEach((element, index) => {
                    element.onclick = function () {
                        element.classList.toggle('far');
                        element.classList.toggle('fa-square');
                        element.classList.toggle('fas');
                        element.classList.toggle('fa-check');

                        if (element.classList.contains('fa-square')) {
                            creatingInputs[index].classList.remove('lineThrough');
                        } else {
                            creatingInputs[index].classList.add('lineThrough');
                        }

                        let topInputs = document.querySelectorAll('.topInput');
                        let listText = document.querySelector('.activeList .listText');
                        let Checks = document.querySelectorAll('.active .fa-square');

                        topInputs.forEach(element => {
                            listText.innerText = element.value + " " + `(${Checks.length})`;
                        });

                        let Removing = document.querySelector('.active .listContentBottom');
                        let Choosens = document.querySelectorAll('.active .fa-check');

                        Removing.onclick = function () {
                            Choosens.forEach(element => {
                                element.parentElement.parentElement.classList.add('nonactive');
                            })
                        }
                    }
                });
            }
        })

        let sendingButton = document.querySelectorAll('.iconButton2');
        sendingButton[index].addEventListener('click', function () {
            if (centerInput[index].value.length > 0) {
                let creatingDiv = document.createElement('div');
                creatingDiv.setAttribute('class', 'creatingDiv');
                let creatingInput = document.createElement('input');
                creatingInput.value = centerInput[index].value;
                creatingInput.setAttribute('class', 'creatingInput');
                creatingInput.setAttribute('type', 'text');
                let icon3 = document.createElement('div');
                icon3.setAttribute('class', 'iconRight');
                let iconButton3 = document.createElement('i');
                iconButton3.setAttribute('class', 'fas fa-ellipsis-v iconButton3');
                let icon4 = document.createElement('div');
                icon4.setAttribute('class', 'icon2');
                let iconButton4 = document.createElement('i');
                iconButton4.setAttribute('class', 'far fa-square iconButton4');
                icon4.appendChild(iconButton4)
                icon3.appendChild(iconButton3);
                creatingDiv.appendChild(icon4)
                creatingDiv.appendChild(creatingInput);
                creatingDiv.appendChild(icon3);
                listContent[index].insertBefore(creatingDiv, listContentBottom);
                centerInput[index].value = '';

                let topInputs = document.querySelectorAll('.active .topInput');
                let listText = document.querySelector('.activeList .listText');
                let Checks = document.querySelectorAll('.active .fa-square');

                topInputs.forEach(element => {
                    listText.innerText = element.value + " " + `(${Checks.length})`;
                });
                let creatingInputs = document.querySelectorAll('.creatingInput');
                creatingInputs.forEach((element, index) => {
                    element.addEventListener('click', function () {
                        let icons4 = document.querySelectorAll('.icon2');
                        let icons3 = document.querySelectorAll('.iconRight');
                        let iconsSelf = document.querySelectorAll('.iconButton3');
                        iconsSelf[index].classList.replace('fas', 'far')
                        iconsSelf[index].classList.replace('fa-ellipsis-v', 'fa-trash-alt')
                        element.style.backgroundColor = '#FFFECE';
                        icons4[index].style.backgroundColor = '#FFFECE';
                        icons3[index].style.backgroundColor = '#FFFECE';

                        let trashes = document.querySelector('.fa-trash-alt');
                        trashes.onclick = function () {
                            iconsSelf[index].classList.replace('far', 'fas')
                            iconsSelf[index].classList.replace('fa-trash-alt', 'fa-ellipsis-v')
                            element.style.backgroundColor = 'white';
                            icons4[index].style.backgroundColor = 'white';
                            icons3[index].style.backgroundColor = 'white';
                        }
                    })
                });

                //Removing ListElement from Each ListContent
                let CheckBoxs = document.querySelectorAll('.active .iconButton4');
                creatingInputs = document.querySelectorAll('.active .creatingInput');

                CheckBoxs.forEach((element, index) => {
                    element.onclick = function () {
                        element.classList.toggle('far');
                        element.classList.toggle('fa-square');
                        element.classList.toggle('fas');
                        element.classList.toggle('fa-check');

                        if (element.classList.contains('fa-square')) {
                            creatingInputs[index].classList.remove('lineThrough');
                        } else {
                            creatingInputs[index].classList.add('lineThrough');
                        }

                        let topInputs = document.querySelectorAll('.topInput');
                        let listText = document.querySelector('.activeList .listText');
                        let Checks = document.querySelectorAll('.active .fa-square');

                        topInputs.forEach(element => {
                            listText.innerText = element.value + " " + `(${Checks.length})`;
                        });

                        let Removing = document.querySelector('.active .listContentBottom');
                        let Choosens = document.querySelectorAll('.active .fa-check');

                        Removing.onclick = function () {
                            Choosens.forEach(element => {
                                element.parentElement.parentElement.classList.add('nonactive');
                            });
                        }
                    }
                });
            }
        })
    });
})