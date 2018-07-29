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
    isMounted: false,
  }

  componentDidMount() {
    this.setState({isMounted: true})
    this.fetchMovies()
  }

  componentWillUnmount() {
    this.setState({isMounted: false})
  }

  fetchMovies = async (query) => {
    try {
      const response = await fetch("http://www.omdbapi.com/?apikey=eeb1be17&s=" + this.state.query)
      const results = await response.json()
      if(this.state.isMounted) {this.setState({movies: [...results['Search']]})}
    } catch(e) {
      console.log(e)
    }
  }

  handleFetchRequest = query => {
    this.setState({query})
    this.fetchMovies(this.state.query)
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
        </View>

      if(this.state.movies !== []) {
        <FlatList
          data={this.state.movies}
          renderItem={this.renderItem}
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
