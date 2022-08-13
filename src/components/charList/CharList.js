import  {Component} from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';

import './charList.scss';


class CharList extends Component {
    
    state = { 
        chars : {},
        loading : true,
        error : false
    }


    marvelService = new MarvelService();

    componentDidMount() { 
        this.updateChar()
    }

    onCharsLoaded = (chars) => { 

        this.setState({
            chars: chars,
            loading: false,
        })

    }
    onError = () => { 
        this.setState({ 
            loading : false,
            error : true
        })
    }
    updateChar = () => { 
        this.marvelService 
            .getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    render() { 

        const {chars, loading, error} = this.state

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = (loading || error) ? null  :  chars.map(item => <CharItem {...item}/> ) ;

        console.log('chars is', chars)

        return (
            <div className="char__list">
                <ul className="char__grid">
                {errorMessage}
                {spinner}
                {content}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
    
}

const CharItem = (chars) =>  {

    console.log('chars is', chars)

    const {thumbnail, name} = chars

        return ( 
            <li className="char__item">
                <img style = {thumbnail.includes('not') ? {objectFit: 'contain', objectPosition: '1px 1px'} : {objectFit: 'cover'} } src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        )

}

export default CharList;