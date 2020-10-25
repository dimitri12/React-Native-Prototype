import data from '../world.json'
var country_list=[]
var calling_list= []

for(var i = 0; i<data.length; i++){
  country_list[i] = {value: data[i].name};
}
for(var i = 0; i<data.length; i++){
  calling_list[i] = {value: data[i].callingCodes};
}

export default{
    country_list:country_list,
    calling_list:calling_list
}