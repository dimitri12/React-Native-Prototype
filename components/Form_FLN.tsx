import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList, Modal, TouchableWithoutFeedback, Keyboard, Dimensions, Alert } from 'react-native';
import colors from '../constants/colors';
var { height, width } = Dimensions.get('window');
width = width - (width * 0.3)
import { Dropdown } from 'react-native-material-dropdown';
import values from '../constants/values';


const Form_FLN = props => {

  //here the states for name, number, personal number, mail and country are initialized and their handlers are constructed
  const [enteredName, setEnteredName] = useState('');
  const [enteredPn, setEnteredPn] = useState('');
  const [enteredPhone, setEnteredPhone] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredCountry, setEnteredCountry] = useState('');

    const nameInputHandler = (nameEntered) =>{
      setEnteredName(nameEntered);
    };
    const pnInputHandler = (pnEntered) =>{
      setEnteredPn(pnEntered);
    };
    const phoneInputHandler = (phoneEntered) =>{
      setEnteredPhone(phoneEntered);
    };
    const emailInputHandler = (emailEntered) =>{
      setEnteredEmail(emailEntered);
    };
    const countryInputHandler = (countryEntered) =>{

      setEnteredCountry(countryEntered.props.children.props.children[1]);
    };
    
    
    //confirmInput functions validates the input based on the regional requirements and if the inputs are empty
    const confirmInput1 = name =>{
      if(name.trim()==''){
        return false;
      }else{
        console.log("Full Name: " + name);
        return true;
      }
    };
    const confirmInput2 = Pn =>{
      var Pn1 = Array.from(String(Pn), Number);
      
      
      if(typeof Pn == "undefined" || Pn1.length < 12){
        return false;
      }else{
        console.log("SSN: " + Pn);
        return true;
      }
    };

    const checkAt = email => {
      var i = 0;
      while(i<email.length){
        if(email[i] == '@'){
          return true;
        }
        i++;
      }
      return false;
    }

    const confirmInput3 = email =>{
      if(email.trim()== '' || !checkAt(email)){
        return false;
      }else{
        console.log("Email adress: " + email);
        return true;
      }
    };

    const phoneLocal = phoneNumber =>{
      var phoneNumber1 = Array.from(String(phoneNumber), Number);
      
      if(typeof phoneNumber == "undefined" || phoneNumber1.length < 10 || (phoneNumber1[0] != 0 && phoneNumber1[1] != 7)){
        return false;
      } else{
        return true;
      }
    };
    const phoneGlobal = phoneNumber =>{
      
      
      if(phoneNumber.length < 12 || (phoneNumber[0] != '+' && phoneNumber[1] != 4 && phoneNumber[2] != 6)){
        return false;
      } else{
        return true;
      }
    };
    const confirmInput4 = phoneNumber =>{

      if(phoneLocal(phoneNumber) || phoneGlobal(phoneNumber)){
        console.log("Mobile number: " + phoneNumber);
        return true;
      }else{
        return false;
      }
    };
 
    //This function is called when the submit button has been entered that calls the confirmInput functions
    const recordData = () => {
        if(confirmInput1(enteredName)){
          if(confirmInput2(enteredPn)){
          if(confirmInput3(enteredEmail)){
            if(confirmInput4(enteredPhone)){
              
              console.log("Country:" + enteredCountry);
              setEnteredPhone('');
              setEnteredCountry('');
            }else{
              Alert.alert("Phone Number is not correct")
            }
          
          setEnteredEmail('');
        
        }
        else {
          Alert.alert("Email not correct")
        }
        
        setEnteredPn('');
      }else {
        Alert.alert("Personal Number is not correct")
      }
      
      setEnteredName(''); 
    }else {
      Alert.alert("Name is not correct")
    }
    };
    return (
        <Modal visible={props.visible} animationType="slide">
          <TouchableWithoutFeedback onPress={()=> {
            Keyboard.dismiss();
          }}>
            
        <View style={styles.inputContainer}>
        <Text style={{ width: '100%', height:'20%', fontWeight: 'bold', fontSize: 20, paddingLeft:20, textAlign:'auto' }}>Register here to become a customer</Text>
            <TextInput textAlign='center' 
            placeholder="Full Name" 
            style={styles.input} 
            onChangeText={nameInputHandler}
            value={enteredName}
            multiline={true}/>

        
            <TextInput textAlign='center' 
            placeholder="Personal Number" 
            style={styles.input} 
            onChangeText={pnInputHandler}
            value={enteredPn}
            multiline={true}/>
          
          <TextInput textAlign='center' 
            placeholder="Email" 
            style={styles.input} 
            onChangeText={emailInputHandler}
            value={enteredEmail}
            multiline={true}/>
          
          <TextInput textAlign='center' 
            placeholder="Phone Number" 
            style={styles.input} 
            onChangeText={phoneInputHandler}
            value={enteredPhone}
            multiline={true}/>
            
            <Dropdown 
            useNativeDriver={true}
            
            valueExtractor={({value}) => {
              return (
                  <Text
                      style={{
                          textAlign: 'center'
                      }}>
                      <Text>  {value}</Text>
                  </Text>
              )
          }}
             // Use dropdownData for the data prop
             data={values.country_list}
             onChangeText={countryInputHandler}
             
          />
          <Text style={{ fontSize: 18 }}>{enteredCountry}</Text>
          <View style={styles.buttonContainer}>
              <View style={styles.button}>
              <Button title="CANCEL" 
              color={colors.cancel} 
              onPress={props.onCancelGoal}/>
              </View>
              <View style={styles.button}>
                <Button title="SUBMIT" 
                color={colors.confirm} 
                onPress={recordData}/>
              </View>
          
            </View>
        </View>
        </TouchableWithoutFeedback>
        </Modal> 
  );
};

const styles = StyleSheet.create({
   
  inputContainer: {
    flex:1,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  input : {
    width: width, 
  borderColor: 'black',
  borderWidth: 1,
  padding: 10,
  marginBottom: 10,
  fontSize:20
  },
  buttonContainer:{
    padding:50,
      flexDirection: 'row',
      justifyContent: 'space-around',
      width: '84%'
  },
  button: {
      width: '40%'
  }
});
export default Form_FLN;