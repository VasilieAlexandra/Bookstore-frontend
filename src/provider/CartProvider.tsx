
import React, {
    ReactNode,
    useEffect,
    useState,
    useContext,
    createContext,
} from 'react'
import IOrderLineData from '../types/OrderLine'


export interface CartContextModel {
    cart: Array<IOrderLineData>
    numBooks: number

    addToCart: (orderLine: IOrderLineData) => void
    removeFromCart: (orderLine: IOrderLineData) => void
    updateCart: (orderLine: IOrderLineData, q: number) => void
    emptyCart: () => void
    getTotalPrice: () => number
}

export const CartContext = createContext<CartContextModel>(
    {} as CartContextModel,
)


export function useCart(): CartContextModel {
    return useContext(CartContext)
}

export interface CartProviderProps {
    children?: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps): JSX.Element => {
    const [cart, setCart] = useState<Array<IOrderLineData>>([]);
    const [numBooks, setNumBooks] = useState<number>(0);

    const addToCart = (orderLine: IOrderLineData) => {
        console.log("Added!")
        if (getIndex(orderLine) === -1) {
            setCart([...cart, orderLine]);
            setNumBooks(numBooks + 1);
        }
        else {
            const ind = getIndex(orderLine);
            if (cart[ind].quantity + 1 <= orderLine.book!.quantity) {
                cart[ind].quantity += 1;
                setNumBooks(numBooks + 1);
            }
        }

    }


    const getIndex = (book: IOrderLineData) => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].idBook === book.idBook)
                return i;
        }
        return -1;
    }

    const removeFromCart = (orderLine: IOrderLineData) => {
        if (numBooks > 0) {
            var newCart = [...cart]
            newCart.splice(getIndex(orderLine), 1);
            setCart(newCart);
            setNumBooks(numBooks - orderLine.quantity);
        }

    }


    const updateCart = (orderLine: IOrderLineData, q: number) => {
        console.log("Updated!")
        const ind = getIndex(orderLine);
        if (cart[ind].book!.quantity-q>= 0) {

            setNumBooks(numBooks + q - cart[ind].quantity);
            cart[ind].quantity = q;
        }

    }

    const emptyCart = () => {
        setCart([]);
        setNumBooks(0);
    }

    const getTotalPrice = () => {
        var total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].quantity * cart[i].book!.price
        }
        return total;
    }
    useEffect(() => {

    }, []);

    const values = {
        cart,
        numBooks,
        addToCart,
        removeFromCart,
        updateCart,
        emptyCart,
        getTotalPrice,
    }
    return <CartContext.Provider value={values}>{children}</CartContext.Provider>
}


