import React, { Component } from 'react';


const headerHeight = 64;
const itemHeight = 200;

const LazyScroll = ScrolledComponent => 
    
 class extends Component {

        state = {
            limit: 40,
            step: 2
        }

        componentDidMount(){
            console.log('did mount');
            window.addEventListener('scroll', this.handleScroll);
        }
        componentWillUnmount(){
            window.removeEventListener('scroll', this.handleScroll);
        }

        handleScroll = e => {
            const clientHeight = window.document.body.clientHeight;
            const scrollTop = window.document.scrollingElement.scrollTop;
            const { data:{length}, search } = this.props;
            const { limit, step } = this.state;
            const restRowNumber = Math.round((clientHeight - scrollTop)/200);

            console.log('length',length);
            console.log('limit',limit);
            console.log('restRowNumber',restRowNumber);            
            console.log('clientHeight',clientHeight);                             
            console.log('scrollTop',scrollTop);

            if (restRowNumber < 6){
                if (limit < length){
                    this.setState({limit:limit+step});
                } 
                else if (this.isRandomData){
                    this.props.sagaFetchMoreDogsAction(step);
                    this.setState({limit:limit+step});                
                }               
            }
        }

        isRandomData = () => {
            const { search = '' } = this.props;
            return search === 'random' || search === '';
        }

        render(){
            const {data, sagaFetchMoreDogsAction, ...rest} = this.props;
            const { limit } = this.state;
            return (
                <ScrolledComponent
                    {...rest}
                    data={data.slice(0, limit)}
                />
            )
        }
    }

export default LazyScroll;