import { useState, useEffect, useRef } from 'react';
import * as itemsAPI from '../../utilities/items-api';
import * as ordersAPI from '../../utilities/order-api';
import CategoryList from '../../components/CategoryList/CategoryList';
import MenuList from '../../components/MenuList/MenuList';

export default function Shop({ user, setUser, cart, setCart }) {
	const [menuItems, setMenuItems] = useState([]);
	const [activeCat, setActiveCat] = useState('');

	const categoriesRef = useRef([]);

	useEffect(function () {
		async function getItems() {
			const items = await itemsAPI.getAll();
			categoriesRef.current = items.reduce((cats, item) => {
				const cat = item.category.name;
				return cats.includes(cat) ? cats : [...cats, cat];
			}, []);
			categoriesRef.current.unshift('Show All');
			setMenuItems(items);
			setActiveCat(categoriesRef.current[0]);
		}
		getItems();
		async function getCart() {
			const cart = await ordersAPI.getCart();
			setCart(cart);
		}
		getCart();
	}, []);
	//console.log(menuItems);

	async function handleAddToOrder(itemId) {
		const updatedCart = await ordersAPI.addItemToCart(itemId)
		setCart(updatedCart)
	  }

	return (
		<main>
			<div>
				<CategoryList
					categories={categoriesRef.current}
					activeCat={activeCat}
					setActiveCat={setActiveCat}
				/>
			</div>
			<MenuList
				menuItems={menuItems.filter((item) => item.category.name === activeCat)}
				handleAddToOrder={handleAddToOrder}
			/>
		</main>
	);
}

//==== NEEDED COMPONENTS FOR SHOPPING SCREEN ====//
/*
    Logo
    USER PORTAL COMPONENT
    FOOTER COMPONENT
    NavBar

    - MENULIST STYLED WITH WHAT IS IN THE CATEGORY LISTS AND ITEM LISTS. 
    - CHECKOUT FEATURE
    - CART FEATURE   
    
    */

// import { useState, useEffect, useRef } from 'react';
// import * as itemsAPI from '../../utilities/items-api';
// import * as ordersAPI from '../../utilities/orders-api';
// import styles from './NewOrderPage.module.scss';
// import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../../components/Logo/Logo';
// import MenuList from '../../components/MenuList/MenuList';
// import CategoryList from '../../components/CategoryList/CategoryList';
// import OrderDetail from '../../components/OrderDetail/OrderDetail';
// import UserLogOut from '../../components/UserLogOut/UserLogOut';
// import Footer from '../../components/Footer/Footer';

// export default function ShoppingPage({ user, setUser }) {
// 	const [menuItems, setMenuItems] = useState([]);
// 	const [activeCat, setActiveCat] = useState('');
// 	const [cart, setCart] = useState(null);
// 	const categoriesRef = useRef([]);
// 	const navigate = useNavigate();

// 	useEffect(function () {
// 		async function getItems() {
// 			const items = await itemsAPI.getAll();
// 			categoriesRef.current = items.reduce((cats, item) => {
// 				const cat = item.category.name;
// 				return cats.includes(cat) ? cats : [...cats, cat];
// 			}, []);
// 			setMenuItems(items);
// 			setActiveCat(categoriesRef.current[0]);
// 		}
// 		getItems();
// 		async function getCart() {
// 			const cart = await ordersAPI.getCart();
// 			setCart(cart);
// 		}
// 		getCart();
// 	}, []);
// 	// Providing an empty 'dependency array'
// 	// results in the effect running after
// 	// the FIRST render only

// 	//========================//
// 	//==== Event Handlers ====//

// 	async function handleAddToOrder(itemId) {
// 		const updatedCart = await ordersAPI.addItemToCart(itemId);
// 		setCart(updatedCart);
// 	}

// 	async function handleChangeQty(itemId, newQty) {
// 		const updatedCart = await ordersAPI.setItemQtyInCart(itemId, newQty);
// 		setCart(updatedCart);
// 	}

// 	async function handleCheckout() {
// 		await ordersAPI.checkout();
// 		navigate('/orders');
// 	}

// 	return (
// 		<main className={styles.ShoppingPage}>
// 			<div>
// 				<Logo />
// 				<NavBar />
//                 <Footer />
// 				<CategoryList
// 					categories={categoriesRef.current}
// 					cart={setCart}
// 					setActiveCat={setActiveCat}
// 				/>
// 				<Link to="/orders" className="button btn-sm">
// 					PREVIOUS ORDERS
// 				</Link>
// 				<UserLogOut user={user} setUser={setUser} />
// 			</div>
// 			<MenuList
// 				menuItems={menuItems.filter((item) => item.category.name === activeCat)}
// 				handleAddToOrder={handleAddToOrder}
// 			/>
// 			<OrderDetail
// 				order={cart}
// 				handleChangeQty={handleChangeQty}
// 				handleCheckout={handleCheckout}
// 			/>
// 		</main>
// 	);
// }

