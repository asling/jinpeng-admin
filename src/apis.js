let serviceHost;
if(process.env.NODE_ENV === 'production'){
	//production
	serviceHost = '//gptlcm.cn:1337';
}else{
	//development
	serviceHost = '//localhost:1337';
}

export const customersRequest = `${serviceHost}/customers`;

export const employeesRequest = `${serviceHost}/employees`;

export const expensesRequest = `${serviceHost}/expenses`;

export const ordersRequest = `${serviceHost}/orders`;

export const loginRequest = `${serviceHost}/auth/local`;

export const registerRequest = `${serviceHost}/auth/local/register`;