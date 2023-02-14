import React from 'react';

class CartItem extends React.Component{
   
    // testing () {
    //     const promise=new Promise((resolve,reject) => {
    //         setTimeout(() =>{
    //             resolve('done');
    //         },5000);
    //     })
    //     promise.then(() => {
    //         //setState act like a synchronus call
    //         this.setState({qty:this.state.qty+10});

    //         this.setState({qty:this.state.qty+10});

    //         this.setState({qty:this.state.qty+10});

    //         console.log('state',this.state);
    //     })
    // }
    increaseQuantity = () => {
        //this.state.qty +=1;
        // console.log('this',this.state);

        //setState from 1
        // this.setState({
        //     qty:this.state.qty +1
        // });

        // this.setState({
        //     qty:this.state.qty +5
        // });

        //setState from 2 - if prevState required use this
        // this.setState((prevState) =>{
        //     return { 
        //         qty:prevState.qty+1
        //     }
        // });

        this.setState((prevState) =>{
            return { 
                qty:prevState.qty+1
            }
        },() =>{
            console.log('this.state',this.state);
        });
        //console.log(this.state);
    }
    decreaseQuantity = () =>{
        const {qty}=this.state;
        if(qty===0){
            return;
        }
        //setState from 2 - if prevState required use this
        this.setState((prevState) =>{
            return {
                qty:prevState.qty-1
            }
        });
    }
    render(){
        console.log('this.props',this.props);
        const { price,title,qty } = this.props.product;
        const { product,onIncreaseQuantity,onDecreaseQuantity,onDeleteProduct}=this.props;
        return (
            <div className='cart-item'>
                <div className='left-block'>
                    <img style={styles.image}/>
                </div>
                <div className='right-block'>
                    <div style={{fontSize:25}}>{title}</div>
                    <div style={{color:'#777'}}>Rs.{price}</div>
                    <div style={{color:'#777'}}>Qty:{qty}</div>
                    <div className='cart-item-actions'>
                    {/* Buttons */}
                    <img
                     alt='increase'
                     className='action-icons' 
                     src='https://cdn-icons-png.flaticon.com/128/9360/9360554.png'
                     //onClick={this.increaseQuantity.bind(this)}
                     onClick={ () => onIncreaseQuantity(product)}
                     />
                    <img
                     alt='decrease'
                     className='action-icons'
                     src='https://cdn-icons-png.flaticon.com/128/992/992683.png'
                     onClick={ () => onDecreaseQuantity(product)}
                     />
                    <img
                     alt='delete'
                     className='action-icons'
                     src='https://cdn-icons-png.flaticon.com/128/1214/1214428.png'
                     onClick={ () => onDeleteProduct(product.id)}
                     />
                    </div>
                </div>
            </div>
        );
    }
}

const styles={
    image:{
        height:110,
        width:110,
        borderRadius:4,
        background:'#ccc'
    }
}
export default CartItem;