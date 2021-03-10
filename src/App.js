import './App.css';
import React from 'react';
import {Button, Col, Dropdown, Image, Menu, Row, Space} from "antd";


class ObjectMetadata extends React.Component {
  render() {
    return (
      <div>{this.props.metadata.name}: {this.props.metadata.value}</div>
    );
  }
}

ObjectMetadata.propTypes = {};

class ObjectDetails extends React.Component {

  render() {
    return (
      this.props.object ?
        <div>
          <h1>{this.props.object.name}</h1>
          <Row>
            <Col span={6}>
              <Image src={this.props.object.img}/>
            </Col>
            <Col span={18}>
              <ObjectMetadata metadata={this.props.object.metadata}/>
            </Col>
          </Row>
          <p>{this.props.object.description}</p>
        </div>
        :
        <div>Nie mam ulubionych</div>
    )
  }
}

class PlatformDetails extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selection: props.selectedItem,
    }
  }

  changeSelection = newItem => {
    this.setState({selection: newItem});
  }

  componentDidUpdate(prevProps) {
    if (prevProps.platformItems !== this.props.platformItems) {
      this.setState({
        selection: this.props.selectedItem,
      })
    }
  }

  render() {
    return (
      <div>
        <h1>{this.props.platformName}</h1>
        <Row>
          <Col span={6}>
            <div>
              {this.props.platformItems.map(item =>
                <div>
                  <Button type={item === this.state.selection ? "primary" : "default"}
                          onClick={() => this.changeSelection(item)}>{item.name}</Button>
                </div>
              )}
            </div>
          </Col>
          <Col span={18}>
            <ObjectDetails object={this.state.selection}/>
          </Col>
        </Row>
      </div>
    )
  }
}


class Site extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      selectedPlatform: props.platforms[0],
      selectedItem: props.platforms[0].platformItems[0],
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Moje top 10!</h1>
        <Space wrap>
          {
            this.props.platforms.map(platform => (
              <Dropdown overlay={this.generateMenuItems(platform)}
                        placement="topCenter"
                        onClick={() => this.selectPlatform(platform)}>
                <Button type={
                  platform === this.state.selectedPlatform ? "primary" : "default"
                }>{platform.platformName}</Button>
              </Dropdown>
            ))
          }
        </Space>
        <p/>
        <PlatformDetails platformName={this.state.selectedPlatform.platformName}
                         platformItems={this.state.selectedPlatform.platformItems}
                         selectedItem={this.state.selectedItem}/>
      </div>
    )
  }

  generateMenuItems = platform => (
    <Menu>
      {
        (platform.platformItems || []).map(
          element => {
            return <Menu.Item onClick={() => this.setState({
              selectedPlatform: platform,
              selectedItem: element
            })}>{element.name}</Menu.Item>
          }
        )
      }
    </Menu>
  );

  selectPlatform = newSelectedPlatform => {
    this.setState({
      selectedPlatform: newSelectedPlatform,
      selectedItem: newSelectedPlatform.platformItems[0],
    })
  }

}

function App() {
  const nowaListaWszystkiego = [
    {
      id: 1,
      platformName: "Netflix",
      platformItems: [
        {
          "id": 1,
          "name": "Criminal Minds",
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Criminal-Minds.svg/1200px-Criminal-Minds.svg.png",
          "description": "Super serial polecam!",
          "metadata": {
            "name": "Author",
            "value": "Ktos",
          },
          "rating": 5
        },
        {
          "id": 2,
          "name": "Rick and Morty",
          "img": "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg",
          "description": "Bardzo Super serial polecam!",
          "metadata": {
            "name": "Author",
            "value": "Ktos",
          },
          "rating": 5
        }
      ]
    },
    {
      id: 2,
      platformName: "Spotify",
      platformItems: [
        {
          "id": 1,
          "name": "Dupa",
          "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Criminal-Minds.svg/1200px-Criminal-Minds.svg.png",
          "description": "Super serial polecam!",
          "metadata": {
            "name": "Author",
            "value": "Ktos",
          },
          "rating": 5
        },
        {
          "id": 2,
          "name": "Cycki",
          "img": "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg",
          "description": "Bardzo Super serial polecam!",
          "metadata": {
            "name": "Author",
            "value": "Ktos",
          },
          "rating": 5
        }],
    },
    {
      id: 3,
      platformName: "HBO GO",
      platformItems: [],
    },
    {
      id: 4,
      platformName: "YouTube",
      platformItems: [],
    }
  ];

  return (
    <Site platforms={nowaListaWszystkiego}/>
  );
}

export default App;
