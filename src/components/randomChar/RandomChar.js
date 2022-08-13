import  {Component} from 'react';
import Spinner from '../spinner/Spinner';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component  {
    constructor(props) { 
        super(props);
        
        console.log('Constructor')
    }
    state = { 
        char: {},
        loading : true,
        error : false,
    }

   marvelService = new MarvelService();

    componentDidMount() { 
        console.log( 'Mount')
        this.updateChar();
    }
    componentDidUpdate() { 
       
    }
    componentWillUnmount() { 
        console.log('unmount' )
    }

    onCharLoaded = (char) => { 
        console.log('update')
        if(char.description !== undefined && char.description.length > 200) { 
            char.description = char.description.substring(0, 200) + '...'
        }
        
        this.setState({
            char : char, 
            loading : false
        })
    }



    onError = () => { 
        this.setState({
            loading : false,
            error : true
        })
    }

   updateChar = () => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000); 
    // console.log(id)
    // const id = 1011127;
    // const id = 1011025; 
    // const id = 1011332; 
        this.setState({ 
            error : false
        })
        this.marvelService
            .getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }

    render() { 
        console.log('Render' )
        const {char, loading, error} = this.state;
        console.log('char is', char )
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = (loading || error) ? null  : <View char = {char}/> ;

        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button  
                    onClick={this.updateChar}
                    className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>
            </div>
        )

    }

    
}
// Easy render component
const View = ({char}) =>  {
    const {thumbnail, name, description, homepage, wiki } = char
    const clazz = thumbnail.includes('not') ? 'randomchar__not' : 'randomchar__img'  
    return ( 
        <div className="randomchar__block">
            <img src={thumbnail} 
            
            alt="Random character" 
            className={clazz}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description }
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;


function count (string) { 
    const count ={} 
    
    string.split('').forEach(el => {
        count[el] = count[el] ? (count[el] + 1) : 1 
    });
    
    return count
}

// console.log(count('ada'))


function findOdd(A) {
    
    for(let i = 0; i < A.length; i++) { 
        const count = A.filter(value => value === A[i]).length;
        if(count % 2 ) { 
            return A[i]
        }
    }
    return -1 
  }

//   console.log(findOdd([20,1,-1,2,-2,3,3,5,5,1,2,4,20,4,-1,-2,5])) // => 5 


  function countPositivesSumNegatives(input) {

    let arr = 0
    let arr2 = []
    if ( input === null || input.length === 0 ) return []
    
    console.log('done')
    input.forEach(item => { 
        if (item > 0 && item !== 0 )  arr++
        if (item < 0 )  arr2.push(item) 
    })
    arr2 = arr2.reduce((a, b) => {
        return a + b
    }, 0)

    return [arr, arr2]
  
}

//   console.log(countPositivesSumNegatives(null))