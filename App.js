import { StatusBar } from 'expo-status-bar';
import * as Clipboard from 'expo-clipboard';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Image, Alert } from 'react-native';

export default function App() {
  const [todo, setTodo] = useState('');
  const [todoItems, setTodoItems] = useState([]);
  const [error, setError] = useState('');

  const handleInputChange = (text) => {
    if (text.length < 8) {
      setError('Please enter at least 8 characters');
    } else {
      setError('');
    }
    setTodo(text);
  };

  const addTodo = () => {
    if (error) {
      return;
    }
    setTodoItems([...todoItems, todo]);
    setTodo('');
  };

  const deleteTodo = (index) => {
    Alert.alert(
      "Delete Todo",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          let itemsCopy = [...todoItems];
          itemsCopy.splice(index, 1);
          setTodoItems(itemsCopy);
        }}
      ]
    );
  };

  const copyToClipboard = (text) => {
    Clipboard.setStringAsync(text);
  };

  return (
    <View style={styles.container}>
      
      <Image
        style={{ width: 300, height: 200, marginBottom: 20}}
        source={{ uri: 'https://miro.medium.com/v2/resize:fit:1200/1*Egsr7tXlF_icXIkS_Unlig.jpeg' }}
      />

    <TextInput
      style={styles.todoInput}
      onChangeText={handleInputChange}
      value={todo}
    />
    {error ? <Text style={{color: 'red'}}>{error}</Text> : null}
    <Button title="Add Todo" onPress={addTodo} />
    <View style={{flex: 1, marginTop: 20}}>
      <ScrollView>
        {todoItems.map((item, index) => (
          <View key={index} style={styles.todoItemContainer}>
            <View style={styles.todoItem}>
              <Text>{item}</Text>
              <View style={styles.buttonContainer}>
                <View style={styles.button}>
                  <Button title="Copy"  color="#ab30ff" onPress={() => copyToClipboard(item)}/>
                </View>
                <View style={styles.button}>
                  <Button title="Delete" color="#d61f2c" onPress={() => deleteTodo(index)}/>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
    <StatusBar style="auto" />
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingTop:60,
    padding: 20,
  },
  todoInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    marginBottom: 10,
    padding: 10,
  },
  todoItemContainer: {
    padding: 10, 
    marginBottom: 10, 
    borderWidth: 1,
    borderColor: '#ddd',
  },
  todoItem: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      width: '100%',
  },
  buttonContainer: {
      flexDirection: 'row',
      marginLeft: 'auto',
  },
  button: {
      marginLeft: 20,
  },
});