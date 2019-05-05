import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Header, Left, Button, Icon, Title, Body, Right, Content } from 'native-base'
import * as Expo from 'expo'
import { CalendarView } from './app/view/calendar/view/calendar'

export default class App extends React.Component<{}, {
  loaded: boolean
}> {
  constructor(props: {}) {
    super(props);
    this.state = {
      loaded: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({
      loaded: true
    })
  }
  render() {
    const t: any = {};
    if (!this.state.loaded) return <Text>NOT LOADED!!</Text>
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Header?</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <CalendarView visitService={t} year={2019} month={5}/>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
