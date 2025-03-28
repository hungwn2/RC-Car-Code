import React from 'react';
import {render, screen} from '@testing-library/react';
import Cart from '../components/Cart';
import {BroswerRouter} from 'react-router-dom';
import userEvent from '@testing-library/user-event';

describe('cart tests', ()=>{
    it('matches snapshot', ()=>{
        const {asFragment}=render(
            <Cart totalPrice={1000} itemsCount={10} cart={[]}/>
        );
        espect(asFragment()).toMatchSnapshot();
        
    });

    it ('renders cart total price', ()=>{
        render(<Cart totalPrice={55} cart={[]} />);
        const totalValue=screen.getByTestId('totalValue');
        expect(totalValue).toHaveTextContent('$55');
    });
    it ('renders item total count', ()=>{
        render(<Cart totalPrice={55} itemsCount={10} cart={[]}/>);
        const itemBtn=screen.getByRole('button');
        expect(itemBtn).toHaveTextContent('Checkout 10 items');
    });
});