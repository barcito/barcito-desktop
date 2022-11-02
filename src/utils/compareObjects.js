import { isArrayLikeObject, isPlainObject } from "lodash";
import { isObject, isObjectLike } from "lodash";
import { isEmpty } from "lodash";

/**
 * Function that receives two objects,
 * converts them to arrays,
 * and returns the values ​​that are different as an object.
 */
const compareObjects = (obj1, obj2, asArray = false) => {
    const array1 = Object.entries(obj1);
    const array2 = Object.entries(obj2);
    const filtered= [];
    array2.forEach( (field, i) => {
        if(field[1] && isPlainObject(field[1])/*  typeof field[1] === 'object' */){
            const sub = compareObjects(array1[i][1], field[1]);
            if(!isEmpty(sub)){
                filtered.push([field[0], sub]);
            }
        }else if(field[1] !== array1[i][1]){
            filtered.push(field);
        }
    });
    if(asArray){
        return filtered;
    }
    return Object.fromEntries(filtered);
}

export default compareObjects;