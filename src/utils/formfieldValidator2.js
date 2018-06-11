const checkType = Object.prototype.toString.apply;
const concat = Array.prototype.concat.apply;

/**
 * function conditionFactory
 */


/**
 * params: (value)
 * conditions : Array of Function | function 
 * 
 * 
 */
class FeildValidator {
	constructor(conditions){ 
		this.conditions = [];
		this.defaultMsg = "Some error happen...";
	}
	addCondition(condition){
		this.conditions.push(condition);
		this.conditions.push(this.defaultMsg);
		return this;
	}
	addErrorMsg(msg){
		this.conditions.push(msg);
	}
	validate(){
		if(this.conditions.length === 0) return ;
		for(let i = 0,len = this.conditions.length; i < len; i + 2){

		}
	} 

}

FeildValidator.of = function of(){
	return new FeildValidator();
}

export FeildValidator;






function _stringFormatter(value){
	if(typeof value === 'string' || typeof value === 'number' || checkType(value) === '[object Number]' || checkType(value) === '[object String]'){
		return value.toString();
	}else if(checkType(value) === '[object Function]'){

	}
	else{
		return new Error('There is a error: argument \"Value\" must be string/number/Object like String and Number.');
	}
}

function _notEmpty(value){
	if(value === "") return false;
	return true;
}

function _emailFormat(string){
	return string.indexOf(/\@/) > 0;
}

function _invalidSize(to){
	return function(value){
		let size = _getSize(_stringFormatter(value));
		if(size < to) return false;
		return true;
	}
}

function _getSize(c) {
	let size = 0;
	if(!c) return size;
	if(typeof c !== 'string') return size + 1;
	for(let i of c){
		size++;
	}	
	return size;
}

function _getValidator(type){
	if(!type) return undefined;
	if(typeof type === 'string'){
		switch(type){
			case "Text": 
				return textFeildValidator;
				break;
			case "Password":
				return passwordFieldValidator;
				break;
			default :
				return undefined;
		}
	}
	if(checkType(type) === '[object Function]'){
		return validator = type;
	}
}

//setFieldStart(1).setFieldSizeEnd(10).noEmpty(true|false).setFieldType("")