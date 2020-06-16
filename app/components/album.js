import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { getPics } from '../store/actions/pictures_action';
import { bindActionCreators } from 'redux';
import Card from './card';
import PictureModal from './pictureModal';

const ITEM_WIDTH = Dimensions.get('window').width;

class Album extends PureComponent {

  constructor(props) {
    super(props);
    this.afterCloseModal = this.afterCloseModal.bind(this);
    this.state = {
      columns: 2,
      key: 1,
      isModalVisible: false,
      selectedItem: null
    };
  }

  componentDidMount() {
    //Dispatch action to call API and fetch images from state
    this.props.getPics();
  }

  //Function to handle press event when an image is clicked on flatlist
  handlePress = (item) => {
    this.setState({
      isModalVisible: true,
      selectedItem: item
    })
  }

  //Funtion to execute the call back when modal is closed
  afterCloseModal = () => {
    this.setState({
      isModalVisible: false
    });
  };

  render() {
    return (
      <View>
        {this.props.isLoading ?
        //Show loading when images are fetching via API call
          <View style={styles.loading}>
            <ActivityIndicator />
          </View>
          :
          //Otherwise, show list of images with its title in grid or list view style
          <View>
            <View style={styles.container}>
              <TouchableOpacity style={styles.buttonStyle}
                onPress={() => {
                  let { columns, key } = this.state
                  this.setState({ columns: columns == 1 ? 2 : 1, key: key == 0 ? 1 : 0 })
                }}
              >
                <Text style={styles.textStyle}>Toggle</Text>
              </TouchableOpacity>
            </View>
            {
              this.props.pictures.length ?
                <FlatList
                  key={this.state.key}
                  numColumns={this.state.columns}
                  data={this.props.pictures}
                  renderItem={
                    ({ item }) => {
                      return <Card cardItem={item}
                        itemWidth={(ITEM_WIDTH - (20 * this.state.columns)) / this.state.columns}
                        onPress={() => this.handlePress(item)}
                      />
                    }
                  }
                  keyExtractor={
                    (index) => { return `list-item-${index.id}` }
                  }
                  extraData={this.state}
                />  : null
            }
            {this.state.isModalVisible ?
            //Creating Modal which is visible when user click on a particular image
              <PictureModal modalVisible={this.state.isModalVisible} 
                handleVisibility={this.afterCloseModal} 
                selectedItem={this.state.selectedItem} />
              : null
            }
          </View>
        }
      </View>
    )
  }
};

//Function to inject state into this.props
function mapStateToProps(state) {
  return {
    pictures: state.Picture.pictures,
    isLoading: state.Picture.isLoading,
    error: state.Picture.error
  }
}

//Function to inject getPics action into this.props
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getPics }, dispatch);
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  loading: {
    marginTop: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonStyle: {
    padding: 10,
    backgroundColor: '#202646',
    borderRadius: 5,
    width: "50%",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  textStyle: {
    color: 'white'
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Album);