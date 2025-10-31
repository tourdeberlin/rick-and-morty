import { Component } from 'react';
import type { AppProps, AppState } from './types';
import Header from './components/Header/Header';
import CardList from './components/CardList/CardList';

export default class App extends Component<AppProps, AppState> {
  state: AppState = {
    inputValue: '',
    searchResults: [],
    loading: false,
    error: null,
  };
  constructor(props: AppProps) {
    super(props);
    console.log('constr');
  }

  handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: e.target.value });
  };

  fetchData = async (searchQuery?: string) => {
    try {
      if (searchQuery?.trim() === '') {
        const responseAll = await fetch(
          'https://rickandmortyapi.com/api/character'
        );

        if (!responseAll.ok) {
          throw new Error('No response');
        }
        const data = await responseAll.json();
        console.log(data.results);
        this.setState({ searchResults: data.results, loading: false });
      } else {
        if (searchQuery) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/character/?name=${this.validateSeachQuery(searchQuery)}`
          );
          if (!response.ok) {
            throw new Error('No response');
          }
          const data = await response.json();
          console.log(data);
          this.setState({ searchResults: data.results, loading: false });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'Неизвестная ошибка', loading: false });
      }
    }
  };

  validateSeachQuery(searchQuery: string) {
    return searchQuery.toLowerCase().trim().replace(/\s+/g, '20%');
  }

  handleSubmitButton = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.setState({ loading: true });
    const searchQuery: string = this.state.inputValue;
    this.fetchData(searchQuery);
  };

  render() {
    return (
      <div className="App">
        <Header
          inputValue={this.state.inputValue}
          onInputChange={this.handleInputChange}
          onSearchSubmit={this.handleSubmitButton}
        />

        {/* <ul>
          {this.state.searchResults.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul> */}
        <CardList results={this.state.searchResults} />
      </div>
    );
  }
}
