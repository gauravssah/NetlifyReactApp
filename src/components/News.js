import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner'
import Infinitespinner from './Infinitespinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";
import Footer from './Footer';

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 6,
        category: "general",
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,

    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            // apikey: "05332ad97bac4326a5f9982c84674662",
            apikey: "74cced90f2fe4c18b6b482f0cca82a9b",
            // apikey: "809ff72368874be4ab94ce7845ea6708",
            totalResults: 0,

        }

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - DailyNewsApp`;
    }

    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false,

        })




    }

    async componentDidMount() {
        this.updateNews()
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.state.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parseData.articles),
            totalResults: parseData.totalResults,
        })



    };

    render() {

        return (

            <>
                <h2 className='text-center'>DailyNews - Top {this.capitalizeFirstLetter(this.props.category)} HeadLines </h2>

                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length <= this.state.totalResults}
                    loader={<Infinitespinner />}
                    endMessage={<Footer />}

                >

                    <div className="container">


                        <div className='row'>

                            {this.state.articles.map((element) => {

                                if (element.urlToImage == null) {
                                    element.urlToImage = "https://clicxy.com/wp-content/uploads/2016/04/dummy-post-horisontal.jpg"
                                }

                                if (element.description == null) {
                                    element.description = 'No description'
                                }

                                return <div className='col-md-4 my-3' key={element.url}>
                                    <NewsItems tital={element.title.slice(0, 52) + "..."} description={element.description.slice(0, 150) + " ..."} imageUrl={element.urlToImage} newsUrl={element.url} auther={element.author} date={element.publishedAt} source={element.source} />
                                </div>
                            })}

                        </div>
                    </div>
                </InfiniteScroll >

            </>
        )
    }
}

export default News
