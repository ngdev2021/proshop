import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { Form, Button, Col } from "react-bootstrap";

const PaymentScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;


    useEffect(() => {
        if (!shippingAddress) {
        navigate("/shipping");
        }
    }, [shippingAddress, navigate]);
    
    const [paymentMethod, setPaymentMethod] = useState("PayPal");
    
    
    if (!shippingAddress) {
        navigate("/shipping");
    }
    
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };
    
    return (
        <>
        <CheckoutSteps step1 step2 step3 />
        <Form onSubmit={submitHandler}>
            <Form.Group>
            <Form.Label as="legend">Select Payment Method</Form.Label>
    
            <Col>
                <Form.Check
                type="radio"
                label="PayPal or Credit Card"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
            </Col>
            </Form.Group>
            <Button type="submit" variant="primary">
            Continue
            </Button>
        </Form>
        </>
    );
    };

export default PaymentScreen;