import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, FlatList } from 'react-native';
import Form_FLN from './components/Form_FLN';

export default function App() {
  //To show the register form
  const [visible, setVisible] = useState(false);
  /*
  const [registrationData, setRegistrationData] = useState([]);
*/
  const addNameHandler = nameData => {
    setRegistrationData(currentData => [...currentData,
      {id: "Name", value: nameData}
    ]);
  };
  

  //If the user wish to cancel the registration, this function enables to change the state
  const cancelGoalAdditionHandler = () => {
    setVisible(false);
  };

  return (
    <View style={styles.screen}>
      <Text style={{ width: '100%', height:'20%', fontWeight: 'bold', fontSize: 20,alignItems: 'center', paddingLeft:20, textAlign:'auto' }}>Welcome new customer!</Text>
      <Button title="Register Here" onPress={() => setVisible(true)} />
      <Form_FLN visible={visible} onAddName={addNameHandler} onCancelGoal={cancelGoalAdditionHandler}/>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
});
