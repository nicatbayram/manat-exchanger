
import React, { useState } from 'react';

import {
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';


//Constants
import { currencyByManat } from './constants';
//Component
import CurrencyButton from './components/CurrencyButton';

import Snackbar from 'react-native-snackbar';




const App = (): JSX.Element => {
  const [inputValue, setInputValue] = useState('')
  const [resultValue, setResultValue] = useState('')
  const [targetCurrency, setTargetCurrency] = useState('')
  
  const buttonPressed = (targetValue: Currency) => {
    if (!inputValue) {
      return Snackbar.show({
        text: "Enter a value to convert",
        backgroundColor: "#EA7773",
        textColor: "#000000"
      })
    }

    const inputAmount = parseFloat(inputValue)
    if (!isNaN(inputAmount)) {
      const convertedValue = inputAmount * targetValue.value
      const result = `${targetValue.symbol} ${convertedValue.toFixed(2)  }`
      setResultValue(result)
      setTargetCurrency(targetValue.name)
    } else {
      return Snackbar.show({
        text: "NOt a valid number to convert",
        backgroundColor: "#F4BE2C",
        textColor: "#000000"
      })
    }
  }

  return (
    <>
      <StatusBar/>
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <View style={styles.manatsContainer}>
            <Text style={styles.manat}>	₼ </Text>
            <TextInput
            style={styles.inputAmountField}
            maxLength={14}
            value={inputValue}
            clearButtonMode='always' 
            onChangeText={setInputValue}
            keyboardType='number-pad'
            placeholder='Enter amount in Manats'
            />
          </View>
          {resultValue && (
            <Text style={styles.resultTxt} >
              {resultValue}
            </Text>
          )}
        </View>
        <View style={styles.bottomContainer}>
          <FlatList
          numColumns={3}
          data={currencyByManat}
          keyExtractor={item => item.name}
          renderItem={({item}) => (
            <Pressable
            style={[
              styles.button, 
              targetCurrency === item.name && styles.selected
            ]}
            onPress={() => buttonPressed(item)}
            >
              <CurrencyButton {...item} />
            </Pressable>
          )}
          />
        </View>
      </View>
      
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  topContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  resultTxt: {
    width: 200,
    height: 50,
    textAlign: 'center',
    borderRadius: 12,
    borderColor: '#ffbe0b',
    fontSize: 32,
    color: '#ffbe0b',
    fontWeight: '600',
  },
  manat: {
    marginRight: 8,
    fontSize: 50,
    color: '#ffbe0b',
    fontWeight: '600',
  },
  manatsContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  inputAmountField: {
    height: 40,
    width: 200,
    marginTop: 16,
    paddingLeft: 20,
    borderWidth: 1,
    boxShadow: '0 1px 1px #ffbe0b',
    borderRadius: 10,
    borderColor: '#ffbe0b',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 3,
  },
  button: {
    flex: 1,
    margin: 6,
    height: 75,
    borderRadius: 8,
    backgroundColor: '#F5F7F8',
    elevation: 2,
    alignItems: 'center',
    paddingTop: 6,
    boxShadow: '3px 3px 3px #ffbe0b',
  },
  selected: {
    backgroundColor: '#FFF3CD',
  },
});

export default App;