import React, { Component } from 'react'
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
  BreadcrumbItem,
  Breadcrumb,
  Media,
  Button,
  Form,
  FormGroup,
  Input,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Label,
} from 'reactstrap'
import { Link } from 'react-router-dom'
import { Control, LocalForm, Errors } from 'react-redux-form'
import { Loading } from './LoadingComponent'
import { baseUrl } from '../shared/baseUrl'
import { FadeTransform, Fade, Stagger } from 'react-animation-components'

function RenderDish({ dish }) {
  if (dish != null) {
    return (
      <div className='col-12 col-md-5 m-1'>
        <FadeTransform
          in
          transformProps={{
            exitTransform: 'scale(0.5) translateY(-50%)',
          }}
        >
          <Card>
            <CardImg width='100%' src={baseUrl + dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle> {dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </FadeTransform>
      </div>
    )
  } else {
    return <div></div>
  }
}

function RenderComments({ comments, postComment, dishId }) {
  if (comments != null) {
    const commentss = comments.map((com) => {
      return (
        <Fade in>
          <div key={com.id}>
            <Media tag='li'>
              <Media body>
                <p>{com.comment}</p>
                <p>
                  {com.author} ,
                  {new Intl.DateTimeFormat('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                  }).format(new Date(Date.parse(com.date)))}
                </p>
              </Media>
            </Media>
          </div>
        </Fade>
      )
    })
    return (
      <div className='col-12 col-md-5 m-1'>
        <h4> Comments</h4>
        <Media list className='list-unstyled'>
          <Stagger in>{commentss}</Stagger>
        </Media>
        <CommentForm dishId={dishId} postComment={postComment} />
      </div>
    )
  } else {
    return <div></div>
  }
}

const maxLength = (len) => (val) => !val || val.length <= len
const minLength = (len) => (val) => val && val.length >= len

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    })
  }

  handleSubmit(values) {
    this.toggleModal()
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    )
  }

  render() {
    return (
      <div>
        <Button outline onClick={this.toggleModal}>
          <span className='fa fa-pencil fa-lg'></span>
          Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Label htmlFor='rating' md={12}>
                  Rating
                </Label>
                <Col md={12}>
                  <Control.select
                    model='.rating'
                    name='rating'
                    className='form-control'
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='author' md={12}>
                  {' '}
                  Your Name
                </Label>
                <Col md={12}>
                  <Control.text
                    model='.author'
                    id='author'
                    name='author'
                    placeholder='Your Name'
                    className='form-control'
                    validators={{
                      minLength: minLength(3),
                      maxLength: maxLength(15),
                    }}
                  />
                  <Errors
                    className='text-danger'
                    model='.author'
                    show='touched'
                    messages={{
                      minLength: 'Must be greater than 2 characters',
                      maxLength: 'Must be 15 characters or less',
                    }}
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Label htmlFor='comment' md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model='.comment'
                    id='comment'
                    name='comment'
                    rows='10'
                    className='form-control'
                  />
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={10}>
                  <Button type='submit' color='primary'>
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </div>
    )
  }
}

const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <Loading />
        </div>
      </div>
    )
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    )
  } else if (props.dish != null)
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'> Menu </Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className='row'>
          <RenderDish dish={props.dish} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            dishId={props.dish.id}
          />
        </div>
      </div>
    )
  else return <div></div>
}

export default DishDetail
