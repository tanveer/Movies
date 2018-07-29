import React from 'react';
import {ScrollView, Text, Image, StyleSheet, Dimensions, } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import DetailRow from '../src/DetailRow';


class ScreenComponentDetail extends React.Component {
  state = {
    Title: '',
    Year: '',
    Rated:'',
    Released: '',
    Runtime: '',
    Genre: '',
    Director: '',
    Poster: '',
    Plot: '',
    Ratings: [{Source: '', Value: '',}],
  }

  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.getParam('title'),
  })

  fetchMovieDetail = async (title) => {
    const response = await fetch("http://www.omdbapi.com/?apikey=eeb1be17&t=" + title)
    const results = await response.json()
    this.setState({...results})
  }

  render() {
    const {
      Title,
      Year,
      Rated,
      Released,
      Runtime,
      Genre,
      Director,
      Poster,
      Plot,
      Ratings,} = this.state

      const { width, height } = Dimensions.get('window')
      const {navigation} = this.props
      this.fetchMovieDetail(navigation.getParam('title'))
    return (
      <ScrollView style={{flex: 1,paddingTop: 5,}}>
        <Image  source={{uri: this.state.Poster}}
                style={{width: width, height: height / 2,
                paddingBottom: 10,}}/>

        <Text style={styles.title}>{Title}</Text>
        <Text style={styles.text}>
            {Rated  + ' ' + ` (${Runtime})`}
        </Text>
        <Text style={styles.text}>{Plot}</Text>
        <Text style={styles.text}>{'Directd by: ' + Director}</Text>
        <Text style={styles.text}>Ratings</Text>
        {Ratings.map(rating => <DetailRow  {...rating} />)}
      </ScrollView>
      );
  }
}

const styles = StyleSheet.create ({
    text :{
      fontFamily: 'Helvetica',
      fontSize: 14,
      paddingRight: 10,
      paddingLeft: 10,
      paddingBottom: 5,
    },

  title: {
    fontSize: 18,
    fontFamily: 'Helvetica-Bold',
    paddingBottom: 10,
    textAlign: 'center',
  },
})

export default ScreenComponentDetail;
