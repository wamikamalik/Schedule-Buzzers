import React from 'react'
import { Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WhiteButton = props => (
  <TouchableOpacity style={[styles.container, props.style]} onPress={props.onPress}>
    <Text style={styles.text}>{props.children}</Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'green',
  },
  text: {
    fontSize: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 5,
    textAlign: 'center',
    color:'white'
  }
})

export default WhiteButton
