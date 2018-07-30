import React from 'react';
import {FlatList, Text, Image, View, TextInput, StyleSheet} from 'react-native';
import Row from '../src/Row';

class ScreenComponentMovies extends React.Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: 'Movies',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
  })

  state = {
    movies: [],
    totalResults: '',
    Response: '',
    query: '',
    page: 1,
  }

  componentDidMount() {
    this.mounted = true
  }

  componentWillUnmount() {
    this.mounted = false
    this.setState({movies: [], totalResults: '', page: 1})
  }

  fetchMovies = async () => {
    const {query, page} = this.state
    try {
      const response = await fetch(`http://www.omdbapi.com/?apikey=eeb1be17&s=${query}&page=${page}`)
      const results = await response.json()
      if(this.mounted){
        this.setState({
        movies: [...this.state.movies, ...results.Search],
        totalResults: results.totalResults})
      }
    } catch(e) {
      console.log(e)
    }
  }

  handleFetchRequest = query => {
    if(query === '') {
      this.setState({movies: [], totalResults: '', page: 1})
    }
      this.setState({query}, () => {
        this.fetchMovies()
      })

  }

  handleLoadMoreMovies = () => {
    if(+this.state.totalResults > this.state.movies.length) {
      this.setState({page: this.state.page + 1}, () => {
        this.fetchMovies()
      })
    }
  }

  renderItem = ({item}) =>
        <Row {...item}
        showDetail={() => {this.props.navigation.navigate('ScreenDetail',{
                title: item.Title, })
        }} key={item.Title}/>

  render() {
    return (
      <View style={{padding: 10,}}>
        <View style={{paddingBottom: 5, paddingTop: 5,}}>
          <TextInput style={styles.textInput} placeholder={'Search'} onChangeText={this.handleFetchRequest}/>
          <Text>{this.state.page}</Text>
        </View>

      if(this.state.movies !== []) {
        <FlatList
          data={this.state.movies}
          renderItem={this.renderItem}
          onEndReached={this.handleLoadMoreMovies}
          onEndThreshold={0}
          keyExtractor={(item, index) => `${index}`}>
        </FlatList>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    textInput: {
      borderWidth: 1,
      borderColor: 'black',
      height: 35,
      padding: 10,
    }
})

export default ScreenComponentMovies;
