import React from 'react';
import {FlatList, Text, Image, View} from 'react-native';
import Row from '../src/Row';

class ScreenComponentMovies extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Movies',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  })

  state = {
    movies: [{Title: '', Year:'', imdbID: '', Type: '', Poster:'',}],
    totalResults: '',
    Response: '',
  }

  componentDidMount() {
    this.fetchMovies()
  }

  fetchMovies = async () => {
    const response = await fetch("http://www.omdbapi.com/?apikey=eeb1be17&s=action")
    const results = await response.json()
    this.setState({movies: [...results['Search']]})
  }

  renderItem = ({item}) =>
        <Row {...item}
        showDetail={() => {this.props.navigation.navigate('ScreenDetail',{
                title: item.Title, })
        }}/>

  render() {
    return (
      <FlatList
        data={this.state.movies}
        renderItem={this.renderItem}>
      </FlatList>
    );
  }
}

export default ScreenComponentMovies;
