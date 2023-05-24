export function isnbValidation(rule, value) {

    if(value === undefined && value === ''){
        return Promise.resolve()
    }
    
    const isnb = value.split('-').join('')

    if (isnb.length !== 10 && isnb.length !== 13) {
        return Promise.reject(new Error('Make sure that value is valid to ISN'))
    }

    // Validation ISNB-13
    if (isnb.length === 13) {
        let sum = 0;
        for (let i = 0; i < 12; i++) {
            let digit = parseInt(isnb[i]);
            if (i % 2 == 1) {
                sum += 3*digit;
            } else {
                sum += digit;
            }
        }
        let check = (10 - (sum % 10)) % 10;
        if(check != isnb[isnb.length - 1]){
            return Promise.reject(new Error('Make sure that value is valid to ISNB'))
        }
    }

    // Validation ISNB-10
    if (isnb.length === 10) {
        let weight = 10;
        let sum = 0;
        for (let i = 0; i < 9; i++) {
            let digit = parseInt(isnb[i]);
            sum += weight*digit;
            weight--;
        }
        let check = (10 - (sum % 11)) % 11
        if (check === 10) {
            check = 'X';
        }
        if(check != isnb[isnb.length-1].toUpperCase()){
            return Promise.reject(new Error('Make sure that value is valid to ISNB'))
        }
    }

    return Promise.resolve()
}

export function dateValidation(rule, value){

    if(value === undefined || value === ''){
        return Promise.resolve()
    }

    if(isNaN(value)){
        return Promise.reject(new Error('Please, enter the year of publication'))
    }
    else{
        if(Number(value) <= 1800){
            console.log('value', value)
            return Promise.reject(new Error('Please, enter the value that more than 1800'))
        }
    }


    return Promise.resolve()
}

export function ratingValidation(rule, value){
    if(value === undefined && value === ''){
        return Promise.resolve()
    }

    if(Number(value) > 10){
        return Promise.reject(new Error('Please, enter a number between 0 and 10'))
    }

    if(isNaN(value)){
        return Promise.reject(new Error('Please, enter a number between 0 and 10'))
    }

    return Promise.resolve()
}