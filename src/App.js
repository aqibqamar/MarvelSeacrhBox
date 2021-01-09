import React from 'react';
import axios from "axios";
// import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import * as actions from "./Actions";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
const styles = theme => ({
  app: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.numberOfRecordPerPage = 5;
    this.state = {
      albumData: props.allAlbums.albumData,
      newDataLength: this.numberOfRecordPerPage,
      previousDataLength: 0
    }
  }

  componentDidMount() {
    // Update the document title using the browser API
    if (this.props.allAlbums.albumData.length === 0) {
      let api = "https://jsonplaceholder.typicode.com/albums/";
      axios.get(api).then(response => {
        return response.data;
      }).then((responseData) => {
        axios.get("http://jsonplaceholder.typicode.com/users").then((userData) => {
          responseData.map((albumItem) => {
            userData.data.find((userItem) => {
              if (userItem.id === albumItem.userId) {
                albumItem.user = userItem
              }
            });
          });
          this.setState({
            albumData: responseData
          });
        });
      });
    } else {
      this.setState({
        albumData: this.props.allAlbums.albumData
      });
    }
  }

  handleChange = (event, value) => {
    this.setState({
      newDataLength: (this.numberOfRecordPerPage * value),
      previousDataLength: ((this.numberOfRecordPerPage * value) - this.numberOfRecordPerPage)
    });
  };

  storeData = (album, albumData) => {
    this.props.setData({ album, albumData })
  }
  render() {
    const { albumData, newDataLength, previousDataLength } = this.state;
    const { classes } = this.props;
    return (
      <div className="centerContent">
        <div key="title" className="pageTitle">{"List Of Alnums"}</div>
        <List key="list" className={classes.app}>
          {albumData.map((album, index) => (
            (index < newDataLength && index >= previousDataLength) ? (
              <React.Fragment key={index}>
                <ListItem key={"name" + index} alignItems="flex-start">
                  <ListItemText key={"listItemText" + index}
                    primary={"ALBUM TITLE: " + album.title}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary"
                          key={"typo" + index}
                        >
                          {"User Name: " + (album.user.name)}
                        </Typography>
                        <Link key={"link" + index} to={"/album/id=" + album.id} onClick={() => { this.storeData(album, albumData) }}>
                          <Button key="button" className="float-right" variant="contained" color="primary">
                            View More
                        </Button>
                        </Link>

                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider key={"divider" + index} variant="inset" component="li" />
              </React.Fragment>
            ) : null
          ))}
        </List>
        <div className={classes.root} key="pagination">
          <Pagination count={parseInt(albumData.length / this.numberOfRecordPerPage)} showFirstButton showLastButton onChange={this.handleChange} />
        </div>
      </div>
    )
  }

}
const mapStateToProps = state => {
  return {
    allAlbums: state.album_reducer.allAlbums
  };
};
//connect function from react-redux, used to subscribe to the redux store
export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(App));