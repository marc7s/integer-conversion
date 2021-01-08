document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('num_hex').addEventListener('keydown', (e) => {
        if(((e.keyCode > 57 && e.keyCode < 65) || e.keyCode > 70 || e.keyCode < 48) && e.keyCode != 8){
            e.preventDefault();
        }
    });
}, false);

function handleInput(el){
    if(el.value != ''){
        document.getElementById('num_hex').value = document.getElementById('num_hex').value.toUpperCase();
        let decInput = document.getElementById('num_dec');
        let bits = document.getElementById('bits').value;
        switch(el.id){
            case 'num_hex':
                decInput.value = convertFromHex(el.value);
                break;
            case 'num_bin':
                decInput.value = convertFromBin(padBin(el.value));
                break;
            case 'num_bin2k':
                decInput.value = convertFromBin2k(padBin(el.value));
                break;
        }
        val = parseInt(decInput.value);
        
        if(isBitError(val, bits)){
            let inputs = ['num_dec', 'num_hex', 'num_bin', 'num_bin2k'];
            inputs.forEach((id) => {
                if(id != el.id)
                    document.getElementById(id).value = '';
            });
            document.getElementById('bitError').style.opacity = 1;
        }else{
            document.getElementById('bitError').style.opacity = 0;
    
            document.getElementById('num_hex').value = val.toString(16).toUpperCase();
    
            if(val < 0){
                document.getElementById('num_bin').value = 'NaN';
                document.getElementById('num_bin2k').value = padBin((Math.pow(2, bits) + val).toString(2));
            }
            else{
                document.getElementById('num_bin').value = padBin(val.toString(2));
                document.getElementById('num_bin2k').value = padBin(val.toString(2));
            }
        }
    }else{
        document.getElementById('num_dec').value = '';
        document.getElementById('num_hex').value = '';
        document.getElementById('num_bin').value = '';
        document.getElementById('num_bin2k').value = '';
    }
}
function convertFromHex(val){
    return parseInt(val, 16);
}
function convertFromBin(val){
    return parseInt(val, 2);
}
function convertFromBin2k(val){
    let bits = document.getElementById('bits').value;
    if(val[0])
        return -(Math.pow(2, bits) - parseInt(val.substring(1), 2));
    return parseInt(val, 2);
}
function updateValues(){
    if(isBitError(val, bits)){
        document.getElementById('bitError').style.opacity = '1';
    }else{
        document.getElementById('bitError').style.opacity = '0';
        handleInput(document.getElementById('num_dec'));
    }
}
function padBin(val){
    let bits = document.getElementById('bits').value;
    let pStr = new Array(parseInt(bits) + 1).join('0');
    return pStr.substring(val.length) + val;
}
function isBitError(val, bits){
    return val >= Math.pow(2, bits) || val <= -Math.pow(2, bits);
}
function toggleDarkMode(el){
    if(el.checked)
        document.getElementsByTagName("body")[0].className = 'dark';
    else
        document.getElementsByTagName("body")[0].className = 'light';
}