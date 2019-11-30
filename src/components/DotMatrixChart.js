import React, { Component } from 'react';
import Checkbox from './Checkbox';
import CountUp from 'react-countup';
import { mix } from 'chroma-js';

class DotMatrixChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nrc: true,
            telegraaf: false,
            nu: false,
            joop: false,
            nos: false,
            perKrant: false,
            articles: [],
            hover: false,
            hoverArticle: null,
            hoverPrevArticle: null,
        }
    }

    componentDidMount() {
        this.setArticles();
    }

    toggleCheckBox = (paper) => {
        this.setState({ [paper]: !this.state[paper] });
    }

    setArticles = () => {
        let newArticles = [];

        for (let i = 0; i < 500; i++) {
            let randomSwipes = Math.floor(Math.random() * (5000 - 0 + 1) + 0);
            let randomYes = Math.random() * randomSwipes;
            let randomNo = randomSwipes - randomYes;
            newArticles.push({
                id: '12123',
                paper: 'nos',
                title: 'Dit gebeurt er wanneer je een auto met automaat bij 100 km/u in zijn achteruit zet.',
                url: 'https://nos.nl',
                timestamp: '05/11/2019',
                swipes: randomSwipes,
                yes: randomYes,
                no: randomNo
            })
        }

        this.setState({ articles: newArticles });
    }

    hoverDot = (article) => {
        this.setState({
            hover: true,
            hoverArticle: article
        })
    }

    leaveDot = (article) => {
        this.setState({
            hover: false,
            hoverPrevArticle: article
        })
    }

    render() {
        return (
            <div className="dot-matrix-chart">
                <div className="row">
                    <div className="col-xs-12 col-md-7">
                        <h4>Kranten:</h4>
                        <div className="dot-matrix-chart__papers">
                            <Checkbox label="NRC" checked={this.state.nrc} onClick={() => { this.toggleCheckBox('nrc') }} />
                            <Checkbox label="Telegraaf" checked={this.state.telegraaf} onClick={() => { this.toggleCheckBox('telegraaf') }} />
                            <Checkbox label="Nu.nl" checked={this.state.nu} onClick={() => { this.toggleCheckBox('nu') }} />
                            <Checkbox label="Joop" checked={this.state.joop} onClick={() => { this.toggleCheckBox('joop') }} />
                            <Checkbox label="NOS" checked={this.state.nos} onClick={() => { this.toggleCheckBox('nos') }} />
                        </div>
                    </div>
                    <div className="col-xs-12 col-md-5">
                        <h4>Filters:</h4>
                        <div className="dot-matrix-chart__filters">
                            <select className="dropdown">
                                <option>Hoog naar laag</option>
                                <option>Laag naar hoog</option>
                                <option>Datum</option>
                            </select>
                            <Checkbox label="Per krant" checked={this.state.perKrant} onClick={() => { this.toggleCheckBox('perKrant') }} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12">
                        <div className="dot-matrix-chart__container">
                            {this.state.hover &&
                                <div className="dot-matrix-chart__info">
                                    <div className="dot-matrix-chart__info-container">
                                        <div className="dot-matrix-chart__info-title">
                                            <p>{this.state.hoverArticle.title}</p>
                                        </div>
                                        <div className="dot-matrix-chart__info-details">
                                            <a href={this.state.hoverArticle.url}>{this.state.hoverArticle.paper}</a>
                                            <span className="dot-matrix-chart__info-date">{this.state.hoverArticle.timestamp}</span>
                                        </div>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td>Swipes</td>
                                                    <td>
                                                        <span className="dot-matrix-chart__info-number--swipes">
                                                            <CountUp
                                                                start={this.state.hoverPrevArticle !== null ? this.state.hoverPrevArticle.swipes : 0}
                                                                end={this.state.hoverArticle.swipes} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Ja</td>
                                                    <td>
                                                        <span className="dot-matrix-chart__info-number--yes">
                                                            <CountUp
                                                                start={this.state.hoverPrevArticle !== null ? this.state.hoverPrevArticle.yes : 0}
                                                                end={this.state.hoverArticle.yes} />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Nee</td>
                                                    <td>
                                                        <span className="dot-matrix-chart__info-number--no">
                                                            <CountUp
                                                                start={this.state.hoverPrevArticle !== null ? this.state.hoverPrevArticle.no : 0}
                                                                end={this.state.hoverArticle.no} />
                                                        </span>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="dot-matrix-chart__info-chart">
                                        <div
                                            className="dot-matrix-chart__info-chart-yes"
                                            style={{ width: Math.round((this.state.hoverArticle.yes / this.state.hoverArticle.swipes) * 100) + '%' }}>
                                            <CountUp
                                                start={this.state.hoverPrevArticle !== null ? Math.round((this.state.hoverPrevArticle.yes / this.state.hoverPrevArticle.swipes) * 100) : 0}
                                                end={Math.round((this.state.hoverArticle.yes / this.state.hoverArticle.swipes) * 100)} />%
                                        </div>
                                        <div
                                            className="dot-matrix-chart__info-chart-no"
                                            style={{ width: Math.round((this.state.hoverArticle.no / this.state.hoverArticle.swipes) * 100) + '%' }}>
                                            <CountUp
                                                start={this.state.hoverPrevArticle !== null ? Math.round((this.state.hoverPrevArticle.no / this.state.hoverPrevArticle.swipes) * 100) : 0}
                                                end={Math.round((this.state.hoverArticle.no / this.state.hoverArticle.swipes) * 100)} />%
                                        </div>
                                    </div>
                                </div>
                            }
                            {this.state.articles.length > 0 &&
                                this.state.articles.map((article, index) => {
                                    return (
                                        <div className="dot-matrix-chart__dot-container"
                                            key={index}
                                            onMouseEnter={() => { this.hoverDot(article) }}
                                            onMouseLeave={() => { this.leaveDot(article) }}>
                                            <div className="dot-matrix-chart__dot" style={{ backgroundColor: mix('#FFD747', '#26BFBF', (article.yes / article.swipes)) }}></div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default DotMatrixChart;