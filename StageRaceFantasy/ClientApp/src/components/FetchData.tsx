import React, { Component } from 'react';
import authService from './api-authorization/AuthorizeService';

type FetchDataState = {
  fantasyStageRaces: {}[],
  loading: boolean,
}

export class FetchData extends Component<{}, FetchDataState> {
  static displayName = FetchData.name;

  constructor(props: {}) {
    super(props);
    this.state = { fantasyStageRaces: [], loading: true };
  }

  componentDidMount() {
    this.populate();
  }

  static renderForecastsTable(fantasyStageRaces: any[]) {
    return (
      <table className='table table-striped' aria-labelledby="tableLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {fantasyStageRaces.map(fantasyStageRace =>
            <tr key={fantasyStageRace.id}>
              <td>{fantasyStageRace.id}</td>
              <td>{fantasyStageRace.name}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    const contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.fantasyStageRaces);

    return (
      <div>
        <h1 id="tableLabel" >Fantasy Stage Races</h1>
        {contents}
      </div>
    );
  }

  async populate() {
    const token = await authService.getAccessToken();
    const response = await fetch('api/fantasy-stage-races', {
      headers: !token ? {} : { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    this.setState({ fantasyStageRaces: data.content, loading: false });
  }
}
