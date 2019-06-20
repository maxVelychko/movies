import React, { useState, useEffect } from 'react';
import ItemList from './ItemList';
import { Button } from '@rmwc/button';
import { CircularProgress } from '@rmwc/circular-progress';

class MenuItemContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activePage: 1 };
  }

  componentDidMount() {
    if (this.props.searchText) {
      this.props.fetchData(this.props.searchText, this.state.activePage);
    }
  }

  componentDidUpdate(prevProps) {
    /* reset activePage after reset items */
    if (prevProps.items.length && !this.props.items.length) {
      this.setState({ activePage: 1 });
    }
  }

  onLoad = () => {
    const nextPage = this.state.activePage + 1;
    this.setState({ activePage: nextPage });

    if (this.props.searchText) {
      this.props.fetchData(this.props.searchText, nextPage);
    }
  };

  renderLoadMoreButton = () => {
    return (
      <Button 
        label="Load more" 
        icon={<CircularProgress />} 
        onClick={this.onLoad}
        disabled={this.state.activePage === this.props.totalPages}
      /> 
    )
 };

  render() {
    return (
      <div>
        <ItemList list={this.props.items}/>
        { !this.props.items.length ?  null : this.renderLoadMoreButton() }
      </div>
    );
  }
}

export default MenuItemContent;
