/*
    GLOBAL VARIABLES
*/

const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const jobRole = document.querySelector('#title');
const jobRoleInput = document.querySelector('#other-job-role');
const design = document.querySelector('#design');
const colorSelect = document.querySelector('#color');
const colors = document.querySelectorAll('#color option');
const checkboxes = document.querySelectorAll('input[type=checkbox]');
const activities = document.querySelector('.activities');
const total = document.querySelector('.activities-cost');
const payment = document.querySelector('#payment');
const credit = document.querySelector('.credit-card');
const paypal = document.querySelector('.paypal');
const bitcoin = document.querySelector('.bitcoin');
const form = document.querySelector('form');
const card = document.querySelector('#cc-num');
const zip = document.querySelector('#zip');
const cvv = document.querySelector('#cvv');

/*
    Default settings on load.
*/

window.addEventListener("load", () => {
    nameInput.focus();
    jobRoleInput.style.display = "none";
    paypal.style.display = "none";
    bitcoin.style.display = "none";
    colorSelect.disabled = true;
  });


/*
    Job Role listener that shows another input if the user selexts "Other".
*/

jobRole.addEventListener("change", () => {
    if(jobRole.value === "other") {
        jobRoleInput.style.display = "inherit";
    }
    else {
        jobRoleInput.style.display = "none";
    }
})


/*
    T-shirt info listener that filters colors depending on the design.
*/

design.addEventListener("change", () => {

    if(design.value === "js puns") {      
        colorSelect.disabled = false;  
        colors.forEach(function(color) {
            if(color.text.toLowerCase().includes("js puns")) {
                color.style.display = "inherit";
                color.parentElement.selectedIndex = 0;
            } else {
                color.style.display = "none";
            }
        });
    } else if (design.value === "heart js") {
        colorSelect.disabled = false;
        colors.forEach(function(color) {
            if(color.text.toLowerCase().includes("♥")) {
                color.style.display = "inherit";
                color.parentElement.selectedIndex = 0;
            } else {
                color.style.display = "none";
            }
        });
    }
});


/*
    Activities registration thath limits the registration per date and shows the total payment.
*/

activities.addEventListener("change", (e) => {
    let cost = 0;
    let count=0
    checkboxes.forEach(function(item) {
        if(e.target.checked == true) {
            if(e.target.getAttribute("data-day-and-time") === item.getAttribute("data-day-and-time")) {
                item.parentElement.style.color = 'gray'
                item.disabled = true;
                e.target.disabled =false;
            } else if(e.target.parentElement.textContent.toLowerCase().includes("main")) {
                item.disabled = true;
                item.parentElement.style.color = 'gray'
                e.target.parentElement.style.color = 'black'
                e.target.disabled = false;
                total.textContent = `Total: $${e.target.getAttribute("data-cost")}`;
                item.checked = false;
            }
        } else {
            if(e.target.getAttribute("data-day-and-time") === item.getAttribute("data-day-and-time")) {
                item.disabled = false;
                item.parentElement.style.color = 'black'
            } else if(e.target.parentElement.textContent.toLowerCase().includes("main")) {
                item.disabled = false;
                item.parentElement.style.color = 'black'
                item.checked = false;
            }

        }     
    })
    checkboxes.forEach(function(item) {
        
        if(item.checked == true) {
            count++;
            cost = cost + parseInt(e.target.getAttribute("data-cost"));
            total.textContent = `Total: $${cost}`;
        } else if (item.checked == false && count === 0) {
            total.textContent = `Total: $0`;
        }
    })
});


/*
    Payment Info listener that shows only the module for the selected payment method.
*/

payment.addEventListener("change", (e) => {

    if(payment.value == "credit-card") {
        credit.style.display = "inherit";
        paypal.style.display = "none";
        bitcoin.style.display = "none";

    } else if (payment.value == "paypal") {
        credit.style.display = "none";
        paypal.style.display = "inherit";
        bitcoin.style.display = "none";

    } else if (payment.value == "bitcoin") {
        credit.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "inherit";
    } else {
        credit.style.display = "none";
        paypal.style.display = "none";
        bitcoin.style.display = "none";
    }
});


/*
    Payment Info listener that shows only the module for the selected payment method.
*/

const nameHint = document.querySelector("#name-hint");
const emailHint = document.querySelector("#email-hint");
const actsHint = document.querySelector("#activities-hint");
const cardHint = document.querySelector("#cc-hint");
const zipHint = document.querySelector("#zip-hint");
const cvvHint = document.querySelector("#cvv-hint");

/*
    Payment Info listener that shows only the module for the selected payment method.
*/


form.addEventListener("submit", (e) => {
    const cardPattern = /[^0-9][\s]*/;
    const zipPattern = /^[0-9]{5}(?:-[0-9]{4})?$/;
    let count= 0;

    if(nameInput.value === "") {
        e.preventDefault();
        nameHint.style.display = "inline";
        nameHint.parentElement.classList.add('not-valid');
        nameHint.parentElement.classList.remove('valid');
    } else {
        nameHint.style.display = "none";
        nameHint.parentElement.classList.remove('not-valid');
        nameHint.parentElement.classList.add('valid');
    }

    checkboxes.forEach(function(item) {
        if(item.checked == false && count === 0) {
            actsHint.style.display = "inline";
            actsHint.parentElement.classList.add('not-valid');
            actsHint.parentElement.classList.remove('valid');
            e.preventDefault();
        } else {
            actsHint.style.display = "none";
            actsHint.parentElement.classList.remove('not-valid');
            actsHint.parentElement.classList.add('valid');
            count++;
        }
    })

    if(payment.value == "credit-card") {
        if(card.value === "" || card.value.length > 16 || card.value.length < 13 || cardPattern.test(card.value)) {
            cardHint.style.display = "inline";
            cardHint.parentElement.classList.add('not-valid');
            cardHint.parentElement.classList.remove('valid');
            e.preventDefault();
        } else {
            cardHint.style.display = "none";
            cardHint.parentElement.classList.remove('not-valid');
            cardHint.parentElement.classList.add('valid');
        }
        if (zip.value === "" || zip.value.length !== 5 || !(zipPattern.test(zip.value))) {
            zipHint.style.display = "inline";
            e.preventDefault();
            zipHint.parentElement.classList.add('not-valid');
            zipHint.parentElement.classList.remove('valid');
        } else {
            zipHint.style.display = "none";
            zipHint.parentElement.classList.remove('not-valid');
            zipHint.parentElement.classList.add('valid');
        }
        if (cvv.value === "" || cvv.value.length !== 3){
            cvvHint.style.display = "inline";
            cvvHint.parentElement.classList.add('not-valid');
            cvvHint.parentElement.classList.remove('valid');
            e.preventDefault();
        } else {
            cvvHint.style.display = "none";
            cvvHint.parentElement.classList.remove('not-valid');
            cvvHint.parentElement.classList.add('valid');
        }
    } 
})

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('focus', () => {
        checkbox.classList.add('focus');
        checkbox.parentElement.classList.add('focus');
    });

    checkbox.addEventListener('blur', () => {
        checkbox.classList.remove('focus');
        checkbox.parentElement.classList.remove('focus');
    });
});

form.addEventListener("keyup", (e) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value === "" || !(emailPattern.test(emailInput.value))) {
        e.preventDefault();
        emailHint.style.display = "inline";
        emailHint.parentElement.classList.add('not-valid');
        emailHint.parentElement.classList.remove('valid');
    } else {
        emailHint.style.display = "none";
        emailHint.parentElement.classList.remove('not-valid');
        emailHint.parentElement.classList.add('valid');
    }
});    

hello = () => {
    return "Hello World!";
} 