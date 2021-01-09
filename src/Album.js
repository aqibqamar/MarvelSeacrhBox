import React from 'react';
import axios from "axios";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import * as actions from "./Actions";
import { connect } from "react-redux";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from "react-router-dom";

const styles = theme => ({
  app: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
});

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.numberOfRecordPerPage = 9;
    this.state = {
      albumPhotos: [],
      newDataLength: this.numberOfRecordPerPage,
      previousDataLength: 0,
      album: props.allAlbums.album
    }
  }

  componentDidMount() {
    // Update the document title using the browser API
    let id = this.getID();
    let api = "https://jsonplaceholder.typicode.com/albums/" + id + "/photos";
    axios.get(api).then(response => {
      this.setState({
        albumPhotos: response.data
      });
    });
  }

  static getDerivedStateFromProps(props, state) {
    // Any time the current user changes,
    // Reset any parts of state that are tied to that user.
    // In this simple example, that's just the email.
    return {
      album: props.allAlbums.album
    };
  }

  getID = () => {
    // return (window.location.pathname);
    return window.location.pathname.match(/id=([^/]+)/)[1];
  }

  handleChange = (event, value) => {
    this.setState({
      newDataLength: (this.numberOfRecordPerPage * value),
      previousDataLength: ((this.numberOfRecordPerPage * value) - this.numberOfRecordPerPage)
    });
  };

  render() {

    const { albumPhotos, newDataLength, previousDataLength, album } = this.state;
    const { classes } = this.props;
    return (
      <div className="centerContent">
        <div>{album.title ? album.title : ""}</div>
        <div className="relativePostion">
          <span>{"Uploaded By: " + (album.title ? album.user.name : "")}</span>
          <Link key={"link"} to={"/"}>
            <ArrowBackIosIcon className="arrowIcon" />
          </Link>
        </div>

        <Grid key="grid" container className={classes.root} spacing={4}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={4}>
              {albumPhotos.map((value, index) => (
                (index < newDataLength && index >= previousDataLength) ? (
                  <Grid xs={4} key={value.id} item className="centerContent">
                    <Grid xs={6} key={value.id} item className="titleGrid">
                      <img key={"image" + value.id} src={value.thumbnailUrl} alt={"Not found"} />
                      <div key={"title" + value.id} className="imgTitle">{value.title}</div>
                    </Grid>
                  </Grid>
                ) : null
              ))}
            </Grid>
          </Grid>
        </Grid>
        <div className={classes.root} key="pagination">
          <Pagination count={parseInt(albumPhotos.length / this.numberOfRecordPerPage)} showFirstButton showLastButton onChange={this.handleChange} />
        </div>
      </div>
    )
  }

}
//connect function from react-redux, used to subscribe to the redux store
const mapStateToProps = state => {
  return {
    allAlbums: state.album_reducer.allAlbums
  };
};
//connect function from react-redux, used to subscribe to the redux store
export default connect(
  mapStateToProps,
  actions
)(withStyles(styles)(Album));