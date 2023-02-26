
import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import { firestore } from "./firebase";


class App extends React.Component {
    constructor(){
      super();
      this.state={
          products:[],
          loading:true
      }
  }
  componentDidMount() {
    
    //fetching all the products from the cloud firestore
    firestore
    //query for fecthing the product which we want as per our query
    .collection("products") //getting all the products
    // .where('price','>=', 999) // after fetching db we should write query
    // .where('price','==',99)
    // .where('title','==','Mouse')
    .orderBy('price','desc')
    .onSnapshot(snapshot => {
      const products = snapshot.docs.map(doc => {
        const data = doc.data();
        data["id"] = doc.id;
        return data;
      });
    
      this.setState({
         products: products,
         loading: false 
      });
    
    });
}
  handleIncreaseQuantity=(product) => {
      console.log('Heyy please increase the qty of',product);
      const {products}=this.state;
      const index=products.indexOf(product);

      // products[index].qty +=1;
      // this.setState({
      //     products
      // })

      const docRef=firestore.collection('products').doc(products[index].id);
      docRef
        .update({
          qty:products[index].qty+1
        })
        .then(()=>{
          console.log('Update successfully')
        })
        .catch((error)=>{
          console.log('Error :',error);
        })
  }
  handleDecreaseQuantity=(product) => {
      console.log('Heyy please decrease the qty of',product);
      const {products}=this.state;
      const index=products.indexOf(product);
      
      if(products[index].qty===0){
          return;
      }

      // products[index].qty -=1;
      // this.setState({
      //     products
      // })

      const docRef=firestore.collection('products').doc(products[index].id);
      docRef
        .update({
          qty:products[index].qty-1
        })
        .then(()=>{
          console.log('Update successfully')
        })
        .catch((error)=>{
          console.log('Error :',error);
        })
  }
  handleDeleteProduct = (id) =>{
      const{products}=this.state;
      // const items=products.filter((item) => item.id !==id); //[{}]

      // this.setState({
      //     products:items
      // })

      const docRef=firestore.collection('products').doc(id);
      docRef
        .delete()
        .then(()=>{
          console.log('Deleted successfully')
        })
        .catch((error)=>{
          console.log('Error :',error);
        })
  }
  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }
  getCartTotal = () => {
    const {products} = this.state;
    let cartTotal=0;
    products.map((product) => {
       cartTotal=cartTotal+product.qty*product.price
    })
    return cartTotal;
  } 
  addProduct=()=>{
    firestore
    .collection("products")
    .add({
      img:'',
      price:900,
      qty:3,
      title:'Washing Machine'
    })
    .then((docRef)=>{
      console.log('Product has been added',docRef);
    })
    .catch((error)=>{
      console.log('Error:',error);
    })

  }
  render(){
    const { products,loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20,fontSize:20}}>Add a product</button> */}
        <Cart
        products={products}
        onIncreaseQuantity={this.handleIncreaseQuantity}
        onDecreaseQuantity={this.handleDecreaseQuantity}
        onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products...</h1>}
        <div style={{padding:10,fontSize:20}}>TOTAL:{this.getCartTotal()}</div>
      </div>
    );
  }
}

export default App;
