import React, { PropTypes } from 'react';
import Layout from '../../components/Layout';

const title = 'Maki Roggers Portfolio';
const link = 'https://makiroggers.com';

class Home extends React.Component {

  static propTypes = {
    articles: PropTypes.arrayOf.isRequired,
  };

  componentDidMount() {
    document.title = title;
  }

  render() {
    return (
      <Layout>
        <h1 className="mdl-typography--title">Welcome to {title}!</h1>
        <p className="mdl-typography--body-1">
            For more information visit <a href={link}>{link}</a>
        </p>
        <hr />
        <h4 className="mdl-typography--title">Included Technologies</h4>
        <ul>
          {(this.props.articles.map((article, i) =>
            (<li key={i}>
              <a href={article.url}>{article.title}</a> by {article.author}
              <ul>
                {article.includes.map((product, n) =>
                  (<li key={n}>
                    <a href={product.url}>{product.title}</a> ({product.author})
                  </li>),
                )}
              </ul>
            </li>),
          ))}
        </ul>
        <p />
        <hr />
      </Layout>
    );
  }
}

export default Home;
