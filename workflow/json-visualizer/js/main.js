const objectMarking = '{}';
const arrayMarking = '[]';
const wrapperInputArea = document.querySelector('.json__item')
const inputArea = document.querySelector('.json__field_input');
const outputArea = document.querySelector('.json__field_output');
const buttonFormat = document.querySelector('.button__submit');

function createObjectComponent (json) {
    const elementBox = document.createElement('ul');

    for (let [key, value] of Object.entries(json)) {
        const elementBoxItem = document.createElement('li');
        const elementWithButtonName = document.createElement('span');

        elementBoxItem.classList.add()

        elementWithButtonName.classList.add('button__name', 'button__name_black');
        elementWithButtonName.innerText = `${key}:`;

        elementBoxItem.style.marginLeft = '26px';
        elementBoxItem.append(elementWithButtonName);

        elementBox.append(elementBoxItem);

        const buttonTag = document.createElement('span');

        switch (true) {
            case value === null:
                value = 'null';
                break;
            case Array.isArray(value):
                buttonTag.innerText = objectMarking;
                break;
            case typeof value === 'object':
                buttonTag.innerText = arrayMarking;
                break;
        }

        switch (true) {
            case Array.isArray(value):
            case typeof value === 'object':
                buttonTag.classList.add('button__tag');
                buttonTag.style.marginLeft = '4px';

                elementBoxItem.classList.add('button');
                elementBoxItem.append(buttonTag);

                elementBoxItem.appendChild(createObjectComponent(value));
                break;
            default:
                elementBoxItem.appendChild(createSimpleComponent(value));
        }
    }

    return elementBox;
}

function createSimpleComponent (value) {
    const simpleComponent = document.createElement('span');

    simpleComponent.classList.add('json__simple');
    simpleComponent.style.marginLeft = '8px';

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

        const buttonJsonObject = document.createElement('div');
        buttonJsonObject.classList.add('button', 'button_black');

        const buttonJsonObjectName = document.createElement('span');
        buttonJsonObjectName.classList.add('button__name');
        buttonJsonObjectName.innerText = `Big Object ${objectMarking}`;
        buttonJsonObject.append(buttonJsonObjectName);

        outputArea.append(buttonJsonObject);

        buttonJsonObject.append(createObjectComponent(jsonToObject));
        const buttonsCollection = document.querySelectorAll('.button');

        for(let button of buttonsCollection) {
            button.onclick = (event) => {
                event.preventDefault();
                event.stopPropagation();
                const elem = event.target.closest('.button');
                elem.classList.toggle('active');
            }
        }
    } catch (e) {
        const errorComponent = document.querySelector('.json__error');

        wrapperInputArea.classList.add('active');
        errorComponent.innerText = e.message;
    }
}









