export const GenerateCode = () => {
    let char1 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
    let char2 = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  
    let int1 = Math.floor(Math.random() * 10);
    let int2 = Math.floor(Math.random() * 10);
  
    let randomCode = char1 + char2 + int1 + int2;
  
    const code = randomCode.toString().toUpperCase();
    return code;
  };