import React,{useState,useEffect} from "react";
import Loader from "../Loader";
import FormContainer from "../FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../Message";

const ResetMailScreen = ({history,location}) => {
  const [email, setEmail] = useState("");
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);
  return (
    <FormContainer >
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form>
        <Form.Group controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary">
          reset password
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ResetMailScreen;
