function isObject(p){
	return Object.prototype.toString.apply(p) === '[object Object]';
}

function isFunction(p){
	return Object.prototype.toString.apply(p) === '[object Function]';
}

export default function Validator(){
	const _conditionArr = [];
    let root;
    return {
      at: function at(obj){
      	const self = this;
        if(!isObject(obj)) return new Error("sorry, param \'obj\' must be Object type");
        root = obj;
        function FieldValidator(){
        	this.validate = function validate(value){
		        var result = _conditionArr.some((conditioner,key) => {
		        	if(!root) return new Error("param \'at\' must be required.");
		        	if(!conditioner || !isFunction(conditioner)) return false;
		          	return !conditioner(root)(value);
		        });
		        return !result;
	      	}
        };
        FieldValidator.prototype = self;
        return new FieldValidator();
      },
      add: function add(conditioner){
        if(!isFunction(conditioner)) return false;
        _conditionArr.push(conditioner);
        return this;
      },
      
    }
}


/**
 * Return:
 * 		result
 * Parameters:
 * 		condition - Required Function - condition function used to validate your field correct or not 
 * 		failCallback - Optional Function(param: Object|String|* - validator root element) when validate failed it calls
 * 		successCallback - Optional Function(param: * - validator root element) when validate failed it calls
 * 
 */

export function makeCondition(condition /* optional params */,failCallback,successCallback){
    // failCallback = failCallback != null && isFunction(failCallback) ? failCallback : typeof failCallback === 'string' ? new Function("return failCallback") : new Function("return \'\'");
    // successCallback = successCallback != null && isFunction(successCallback) ? successCallback : typeof successCallback === 'string' ? new Function("return successCallback") : new Function("return \'\'");
    return function conditioner(field){
      if(!isObject(field)) return new Error("Wrong!");
      return function f(value){
      	if(!condition || !isFunction(condition))  return new Error("Wrong~~");
      	const result = condition(value); // true => right false => wrong
        if(result){
          successCallback != null && isFunction(successCallback) && successCallback(field,value);
        }else{
          failCallback != null && isFunction(failCallback) && failCallback(field,value);
        }
        return result
      };
    }
  }

