import React from 'React';
import {TouchableOpacity, View, Image, Text, StyleSheet,} from 'react-native';

const Row = props => (
  <TouchableOpacity style={styles.row}
    onPress={props.showDetail}>
    <Image source={{uri: props.Poster }} style={styles.image}/>
     <View style={styles.view}>
      <Text style={styles.title}>{props.Title}</Text>
      <Text>{"Year: " + props.Year}</Text>
      <Text>{"Type: " + props.Type}</Text>
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  row: {
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    margin: 5,
    },
    title:{
      paddingBottom: 5,
      fontSize: 12,
      fontFamily: 'Helvetica-Bold',
    },
    image: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    view: {
      flex: 1,
      flexWrap: 'wrap'
    },

})

export default Row;
