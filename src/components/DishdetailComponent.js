import React, { Component} from 'react';
import {Card , CardImg, CardImgOverlay, CardText,CardBody, CardTitle, Media} from 'reactstrap';

class DishDetail extends Component{
    constructor(props) {
        super(props);
        
    }

    renderDish(dish) {
        if(dish != null){
            return(
                    <div>
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle> {dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                    </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    renderComments(comments){
        if(comments != null){
            console.log("rendercomments")
            const commentss = comments.map((com) => {
                return (
                  <div key={com.id}>
                    <Media tag="li">
                      <Media body >
                        <p>{com.comment}</p>
                        <p>{com. author} , {com.date}</p>
                      </Media>
                    </Media>
                  </div>
                );
            })
            return(
                    <div>
                        <h4> Comments</h4>
                        <Media list className="list-unstyled">
                        {commentss}
                        </Media>
                        
                    </div>
            )
        }
        else{
            return(
                <div>
                    <p>
                        Yasmine
                    </p>
                </div>
            )
        }
    }

    checknull(dish){
        if(dish != null){
            console.log(dish.comments)
            return(
                this.renderComments(dish.comments)
            )
        }
    }

    render(){
        
        return(
            
        <div className="container">
            <div className="row">

                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.dish)}
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.checknull(this.props.dish)}
                </div>
            </div>
        </div>
        )
    }

}

export default DishDetail;