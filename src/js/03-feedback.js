import throttle from 'lodash.throttle';

const ref = {
    form: document.querySelector('.feedback-form'),
};

const LOCAL_STORAGE_KEY = "feedback-form-state";

addLocalStorageInputValue();

ref.form.addEventListener('input', throttle(onFormInput, 500));
ref.form.addEventListener('submit', onFormSubmit);

const formData = {
    email: ref.form.email.value,
    message: ref.form.message.value,    
    };

function onFormInput(event) {
    formData[event.target.name] = event.target.value;
    const stringifiedData = JSON.stringify(formData);
    localStorage.setItem(LOCAL_STORAGE_KEY, stringifiedData);
};

function onFormSubmit(event) {
    event.preventDefault();

    const dataSubmit = {
        email: event.currentTarget.email.value,
        message: event.currentTarget.message.value,
    };
    console.log(dataSubmit);

    localStorage.removeItem(LOCAL_STORAGE_KEY);
    event.currentTarget.reset();
};

function addLocalStorageInputValue() {
    let storageInputValue = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    
    if (!storageInputValue) return;
    
    ref.form.elements.email.value = storageInputValue.email;        
    ref.form.elements.message.value = storageInputValue.message;   
};