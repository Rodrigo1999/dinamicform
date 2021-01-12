let expo = {
    objectToForm(obj, form, level) {
        let f = form || new FormData();
        for (let k in obj) {
            if (obj.hasOwnProperty(k)) {
                let levelProp = level ? level + '[' + k + ']' : k;
                // If it is a date, it parses to ISO format
                if (obj[k] instanceof Date) {
                    f.set(levelProp, obj[k].toISOString());
                    continue;
                }
                else if (obj[k] === null || obj[k] === undefined) {
                    f.set(levelProp, '');
                    continue;
                }
                else if (typeof obj[k] === 'object' && !(obj[k] instanceof File) && !(obj[k] instanceof Blob)) {
                    objectToForm(obj[k], f, levelProp);
                    continue;
                }
                f.set(levelProp, obj[k]);
            }
        }
        return f;
    },
    delay(fn, ms) {
        let timer = 0
        return function(...args) {
          clearTimeout(timer)
          timer = setTimeout(fn.bind(this, ...args), ms || 0)
        }
    }
}

export let objectToForm = expo.objectToForm;
export let delay = expo.delay;
export default expo;