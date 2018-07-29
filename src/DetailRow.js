import React from 'react'
import {Text, View, StyleSheet} from 'react-native'


const DetailRow = props => (
  <View>
    <Text style={styles.text}>{props.Source + ' ' + ` (${props.Value})`}</Text>
  </View>
)

const styles = StyleSheet.create ({
    text :{
      fontFamily: 'Helvetica',
      fontSize: 14,
      paddingRight: 10,
      paddingLeft: 10,
      paddingTop: 10
    },
});

export default DetailRow;
