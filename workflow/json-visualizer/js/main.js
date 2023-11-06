const objectMarking = '{}';
const arrayMarking = '[]';
const wrapperInputArea = document.querySelector('.json__item')
const inputArea = document.querySelector('.json__field_input');
const outputArea = document.querySelector('.json__field_output');
const buttonFormat = document.querySelector('.button__submit');

function createObjectComponent (json) {
    const arraysObject = Object.entries(json);
    const elementBox = document.createElement('ul');
    elementBox.classList.add('json__content');

    arraysObject.forEach(([key, value]) => {
        const elementBoxItem = crateElementBoxItem (key);
        elementBox.append(elementBoxItem);

        if (value === null) {
            value = 'null';
        }

        const buttonTagWrapper = createButtonTag(value);

        addContentDependingOnType(value, elementBoxItem, buttonTagWrapper);
    })

    return elementBox;
}

function addContentDependingOnType(value, elementBoxItem, buttonTagWrapper) {
    if (Array.isArray(value) || typeof value === 'object') {
        const objectComponent = createObjectComponent(value);
        elementBoxItem.classList.add('button');
        elementBoxItem.append(buttonTagWrapper);
        elementBoxItem.appendChild(objectComponent);

        elementBoxItem.onclick = addOnclickInButton(elementBoxItem);
    } else {
        const simpleComponent = createSimpleComponent(value);
        elementBoxItem.appendChild(simpleComponent);
    }
}

function crateElementBoxItem (key) {
    const elementBoxItem = document.createElement('li');
    const elementWithButtonName = document.createElement('span');

    elementWithButtonName.classList.add('button__name', 'button__name_black');
    elementWithButtonName.innerText = `${key}:`;

    elementBoxItem.append(elementWithButtonName);

    return elementBoxItem;
}

function createButtonTag (value) {
    const buttonTag = document.createElement('span');
    buttonTag.classList.add('button__tag');

    if (Array.isArray(value)) {
        buttonTag.innerText = arrayMarking;
    } else if (typeof value === 'object') {
        buttonTag.innerText = objectMarking;
    }

    return buttonTag;
}

function addOnclickInButton (button) {
    return (event) => {
        event.preventDefault();
        event.stopPropagation();
        button.classList.toggle('active');
    }
}

function createSimpleComponent (value) {
    const simpleComponent = document.createElement('span');
    simpleComponent.classList.add('json__simple');

    switch (true) {
        case value === "null":
        case typeof value === "boolean":
            simpleComponent.innerText = value;
            simpleComponent.style.color = "#c03e3e";
            break;
        case typeof value === "string":
            simpleComponent.innerText = `"${value}"`;
            simpleComponent.style.color = "#009567";
            break;
        case typeof value === "number":
            simpleComponent.innerText = value;
            simpleComponent.style.color = "#12b2b7";
            break;
    }

    return simpleComponent;
}

buttonFormat.onclick = () => {
    try {
        outputArea.innerHTML = '';
        let jsonToObject = JSON.parse(inputArea.value);

        if (wrapperInputArea.classList.contains('active')) {
            wrapperInputArea.classList.remove('active');
        }

        const buttonWrapperObjectComponent = createObjectComponent(jsonToObject);
        const mainComponentObject = createTheMainComponentOfTheObject();

        mainComponentObject.append(buttonWrapperObjectComponent);
    } catch (e) {
        const errorComponent = document.querySelector('.json__error');

        wrapperInputArea.classList.add('active');
        errorComponent.innerText = e.message;
    }
}

function createTheMainComponentOfTheObject ()  {
    const buttonJsonObject = document.createElement('div');
    buttonJsonObject.classList.add('button', 'button_black');
    buttonJsonObject.onclick = addOnclickInButton(buttonJsonObject);

    const buttonJsonObjectName = document.createElement('span');
    buttonJsonObjectName.classList.add('button__name');
    buttonJsonObjectName.innerText = `Big Object ${objectMarking}`;

    buttonJsonObject.append(buttonJsonObjectName);

    outputArea.append(buttonJsonObject);

    return buttonJsonObject;
}

console.log(JSON.stringify({
    "name": "John",
    "age": 30,
    "isAdmin": false,
    "courses": ["html", "css", "js"],
    "wife": null
}))








