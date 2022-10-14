/**
 * Function that receives two objects,
 * converts them to arrays,
 * and returns the values ​​that are different as an object.
 */
export default function compareObjects(obj1, obj2, asArray = false){
    const array1 = Object.entries(obj1);
    const array2 = Object.entries(obj2);
    const filtered = array2.filter( (field, i) => field[1] !== array1[i][1] );
    if(asArray){
        return filtered;
    }
    return Object.fromEntries(filtered);
}