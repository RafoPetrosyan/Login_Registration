export const date = (date) =>{
    let x = date.substring(0, 10);
    let y = date.split('T')
    let z = y[1].split('.')

    return `${x}  ${z[0]}`;
}