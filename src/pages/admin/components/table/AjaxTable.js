import React from 'react';
import client from './../../../../client';

export default class AjaxTable extends React.Component {
    state = {
        response: null,
        fetching: false,
    };

    constructor(props) {
        super(props)

        this.renderHeader = this.renderHeader.bind(this);
        this.renderBody = this.renderBody.bind(this);
        this.renderNotFound = this.renderNotFound.bind(this);
        this.renderLoading = this.renderLoading.bind(this);
        this.renderFooter = this.renderFooter.bind(this);
        this._fetchResponse = this._fetchResponse.bind(this);
    }

    async _fetchResponse(page = null) {
        this.setState({ fetching: true })
        
        const response = await client.get(this.getUrl(page)).catch(e => console.log(e));
        
        this.setState({ fetching: false })

        this.setState({ response: response ? response.data.data : null })
    }

    renderHeader() {
        const Header = this.props.header;

        return (
            <>
                <thead>
                    {Header ? (<Header />) :
                        (
                            <tr>
                                {this.props.headers.map((header, index) => (
                                    <th key={index} className={
                                        "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                        (this.props.color === "light"
                                            ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                            : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                    }>
                                        { header}
                                    </th>
                                ))}
                            </tr>
                        )
                    }
                </thead>
            </>
        )
    }

    renderFooter() {
        const Footer = this.props.footer;
        if (!Footer || (!this.state.response || !this.state.response.data.length)) {
            return null
        }

        return (
            <>
                <tfoot>
                    <Footer elements={this.state.response.data} />
                </tfoot>
            </>
        )
    }

    renderNotFound() {
        return !this.fetching && this.state.response && !this.state.response.data.length ? (this.props.notFound ? this.props.notFound : (this.props.headers ? (
            <>
                <tr>
                    <td colSpan={this.props.headers.length} className={
                                            "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-center" +
                                            (this.props.color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                        }>
                        <h3>Tidak ada data.</h3>
                    </td>
                </tr>
            </>
        ) : '')) : ''
    }

    renderLoading() {
        return this.state.fetching ? (this.props.loading ? this.props.loading : (this.props.headers ? (
            <>
                <tr>
                    <td colSpan={this.props.headers.length} className={
                                            "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left text-center" +
                                            (this.props.color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                        }>
                        <h3>Loading...</h3>
                    </td>
                </tr>
            </>
        ) : '')) : ''
    }

    reload() {
        return this._fetchResponse(1)
    }

    getUrl(page = null) {
        page = page ? page : this.state.response ? this.state.response.current_page + 1 : 1;
        let url = new URL(this.props.url, process.env.REACT_APP_API_URL);
        url.searchParams.set("paginate", true);
        url.searchParams.set("perPage", this.props.perPage || 10);
        url.searchParams.set("page", page);

        return `${url.pathname}?${url.searchParams}`;
    }

    componentDidUpdate({ url }) {
        if (url !== this.props.url) {
            this.state.response = null;
            this.reload();
        }
    }

    componentDidMount() {
        this.setState({
            response : null,
        });

        this._fetchResponse();
    }

    renderBody() {
        const Rows = this.props.rows;

        return (
            <>
                <tbody>
                    {this.state.response ? this.state.response.data.map((element, rowIndex) => (
                        <tr key={element.id || rowIndex}>
                            {
                                Rows ?

                                    (<Rows element={element} />) :

                                    this.props.columns.map((column, colIndex) => (
                                        <td key={colIndex} className={
                                            "px-6 align-middle border border-solid font-bold py-3 text-xs text-center uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left " +
                                            (this.props.color === "light"
                                                ? "bg-blueGray-50 text-blueGray-500 border-blueGray-100"
                                                : "bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700")
                                        }>
                                            {column.render ? column.render({
                                                element,
                                                elements: this.state.response.data,
                                                rowIndex,
                                                colIndex,
                                                response: this.state.response
                                            }) : element[column.name]}
                                        </td>
                                    ))
                            }
                        </tr>
                    )) : null}
                    {this.renderNotFound()}
                    {this.renderLoading()}
                </tbody>
                {this.renderFooter()}
            </>
        )
    }

    render() {
        return (
            <>
                <div>
                    <table className="items-center w-full bg-transparent border-collapse">
                        {this.renderHeader()}
                        {this.renderBody()}
                    </table>
                </div>
                {
                    this.state.response && this.state.response.data.length ? (
                        <div className="mt-5 px-6 w-full">
                            <div style={{ float: 'right', marginBottom: '.8rem' }}>
                                <div className="flex flex-nowrap gap-3">
                                    <button onClick={() => {
                                        if (this.state.response.current_page > 1) {
                                            this._fetchResponse(this.state.response.current_page - 1);
                                        }
                                    }} className={`outline-none block focus:outline-none rounded-full ${this.state.response.current_page > 1 ? 'text-gray-600' : 'text-gray-400'}`} style={{ padding: '7px' }}>
                                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" ><polyline points="15 18 9 12 15 6"></polyline></svg>
                                    </button>
                                    <button onClick={() => {
                                        if (this.state.response.current_page < this.state.response.last_page) {
                                            this._fetchResponse(this.state.response.current_page + 1);
                                        }
                                    }} className={`outline-none block focus:outline-none rounded-full ${this.state.response.current_page < this.state.response.last_page ? 'text-gray-600' : 'text-gray-400'}`} style={{ padding: '7px' }}>
                                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" ><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
            </>
        )
    }
};